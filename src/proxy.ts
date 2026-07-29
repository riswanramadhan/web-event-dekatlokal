import { NextResponse, type NextRequest } from "next/server";

import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/admin/session";

const LOGIN_PATH = "/admin/login";

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Exact match only: a prefix check would also let "/admin/login-anything"
  // bypass the session gate.
  if (pathname === LOGIN_PATH || pathname === `${LOGIN_PATH}/`) {
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const isValid = await verifySessionToken(token);

  if (!isValid) {
    const response = NextResponse.redirect(new URL(LOGIN_PATH, request.url));

    // Drop an expired or tampered cookie so the browser stops resending it.
    if (token) {
      response.cookies.delete(ADMIN_SESSION_COOKIE);
    }

    return response;
  }

  // Cache and indexing headers for the admin area are set in next.config.ts
  // so they also cover the login page, which never reaches this branch.
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
