import { NextResponse, type NextRequest } from "next/server";
import { ROLE_COOKIE, TOKEN_COOKIE } from "@/lib/auth/cookies";

export function proxy(request: NextRequest) {
  const token = request.cookies.get(TOKEN_COOKIE)?.value;
  const role = request.cookies.get(ROLE_COOKIE)?.value;
  const pathname = request.nextUrl.pathname;

  if (!token) {
    const loginUrl = new URL("/auth/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  const roleSegment = pathname.split("/")[2]?.toUpperCase();
  if (
    ["CUSTOMER", "PROVIDER", "ADMIN"].includes(roleSegment) &&
    role !== roleSegment
  ) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
