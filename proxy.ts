import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const cookie = req.cookies.get("admin_auth");

  if (!cookie && req.nextUrl.pathname !== "/admin/login") {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
