import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const LOGIN_PATH = "/admin/login";

function readPublicEnvironment() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const publishableKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();

  if (!url || !publishableKey) {
    return null;
  }

  return { url, publishableKey };
}

// Next.js 16 Proxy is Node-only, while the OpenNext Cloudflare adapter
// requires the network boundary to use the Edge runtime. This auth gate uses
// Web APIs only, so the supported middleware convention keeps it portable.
export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Exact match only: a prefix check would also let "/admin/login-anything"
  // bypass the session gate.
  const isLoginRoute =
    pathname === LOGIN_PATH || pathname === `${LOGIN_PATH}/`;

  const environment = readPublicEnvironment();

  // Without credentials nothing can be verified. Fail closed for the panel and
  // let the login page render its own configuration notice.
  if (!environment) {
    return isLoginRoute
      ? NextResponse.next()
      : NextResponse.redirect(new URL(LOGIN_PATH, request.url));
  }

  // This response accumulates refreshed auth cookies and must be the object
  // that is ultimately returned, otherwise the refreshed session is dropped.
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    environment.url,
    environment.publishableKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value } of cookiesToSet) {
            request.cookies.set(name, value);
          }

          response = NextResponse.next({ request });

          for (const { name, value, options } of cookiesToSet) {
            response.cookies.set(name, value, options);
          }
        },
      },
    },
  );

  // getUser() validates the token with the auth server and refreshes it when
  // needed. getSession() must not be used here: it trusts the cookie contents
  // without verification.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (isLoginRoute) {
    // Deliberately no "already signed in, skip the login form" redirect here.
    //
    // Being signed in does not imply being an administrator: authorization
    // comes from the admin_users allowlist, which is checked in the dashboard
    // layout. Redirecting an authenticated non-admin to /admin would bounce
    // them straight back to this route, producing an endless redirect loop.
    // That state is reachable in practice, for example when an admin row is
    // removed while its Supabase account still holds a valid session.
    return response;
  }

  if (!user) {
    const redirectResponse = NextResponse.redirect(
      new URL(LOGIN_PATH, request.url),
    );

    // Preserve any cookie clearing performed during the failed refresh.
    for (const cookie of response.cookies.getAll()) {
      redirectResponse.cookies.set(cookie);
    }

    return redirectResponse;
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
