import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
const authRoutes = ["/reset-password", "/login"];
export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (token && authRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }
  if (
    authRoutes.includes(request.nextUrl.pathname) ||
    request.nextUrl.pathname.startsWith("/reset-password")
  ) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};
