import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// List of protected routes
const protectedRoutes = ["/", "/patients", "/medcert", "/prescription", "/userlist", "/logs"];
const publicPaths = ["/signin", "/signup",];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const isAuth = !!token;
  const isSignInPage = request.nextUrl.pathname === "/signin";

  if (!isAuth && !isSignInPage) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/:path*",
    "/patients/:path*",
    "/medcert/:path*",
    "/prescription/:path*",
    "/userlist",
    "/logs"
  ],
};