import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Placeholder for rate-limit / audit hooks.
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/create-store", "/my-stores/:path*", "/store-editor/:path*", "/billing/:path*", "/supplier/:path*", "/admin/:path*", "/api/:path*"]
};
