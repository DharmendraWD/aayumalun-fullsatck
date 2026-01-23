import { NextResponse } from "next/server";

const PROTECTED_ROUTES = [
  "/admin/dashboard",
  "/admin/hero",
  "/admin/about",
  "/admin/mission",
  "/admin/team",
  "/admin/gallery",
  "/admin/blogs",
  "/admin/messages",
  "/admin/faqs",
  "/admin/others",
  "/admin/manage-users",
  "/admin/change-password",
];

export default async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Only care about admin routes
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const isProtected = PROTECTED_ROUTES.some(route =>
    pathname.startsWith(route)
  );

  const cookieHeader = req.headers.get("cookie") || "";

  // 👉 LOGIN PAGE
  if (pathname === "/admin/login") {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/me`, {
        headers: {
          cookie: cookieHeader,
        },
        credentials: "include",
      });

      // Token valid → redirect to dashboard
      if (res.ok) {
        return NextResponse.redirect(
          new URL("/admin/dashboard", req.url)
        );
      }
    } catch (err) {
      // ignore
    }

    // Token missing / invalid → allow login page
    return NextResponse.next();
  }

  // 👉 PROTECTED ROUTES
  if (isProtected) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/me`, {
        headers: {
          cookie: cookieHeader,
        },
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Unauthorized");
      }

      return NextResponse.next();
    } catch (err) {
      return NextResponse.redirect(
        new URL("/admin/login", req.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
