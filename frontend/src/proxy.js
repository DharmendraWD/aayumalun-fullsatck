

import { NextResponse } from "next/server";

// --- Protected Routes ---
const PROTECTED_ROUTES = [
  "/admin/dashboard",
];

function isProtectedRoute(pathname) {
  return PROTECTED_ROUTES.some(route => pathname.startsWith(route));
}

export default async function proxy(req) {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;

  console.log("Proxy running on:", pathname);

  // --- Extract token once ---
  const token =
    req.cookies.get("token")?.value ||
    req.headers.get("authorization")?.replace("Bearer ", "");

  //  Redirect logged-in users away from /login
  if (pathname === "/admin/login" && token) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url)); 
  }

  // If token exists, verify it, verify token if it is changed or not, if token in not valid then send to login
  if (token && pathname.startsWith('/admin') && pathname !== '/admin/login') {
    try {
      console.log("first")
      const response = await fetch(`${process.env.BASE_API}/me`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include',
        cache: 'no-store'
      });

      if (!response.ok) {
        const loginUrl = new URL('/admin/login', req.url);
        const res = NextResponse.redirect(loginUrl);
        res.cookies.delete('token');
        return res;
      }

      console.log(response.ok)

  return NextResponse.next();
    } catch (error) {
      console.error("Auth check failed:", error);
      const loginUrl = new URL('/admin/login', req.url);
      const res = NextResponse.redirect(loginUrl);
      res.cookies.delete('token');
      return res;
    }
  }

  // ⭐ If route NOT protected → allow
  if (!isProtectedRoute(pathname)) {
    return NextResponse.next();
  }

  // ⭐ Protected route but no token → send to login
  if (!token) {
    const url = new URL("/admin/login", req.url);
    url.searchParams.set("unauth", "1");
    return NextResponse.redirect(url);
  }

  // ⭐ Everything OK → allow access
  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
