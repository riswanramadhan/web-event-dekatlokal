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

export default async function proxy(request: NextRequest) {
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
    // Already signed in: skip the login form. Authorization is still enforced
    // by the dashboard layout, so a non-admin lands back here.
    if (user) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

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
