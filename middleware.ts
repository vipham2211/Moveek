import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const protectedPathsAdmin = [
    "/dashboard",
    "/manage-users/:path*",
    "/manage-movies/:path*",
  ];

  if (
    protectedPathsAdmin.some((path) =>
      request.nextUrl.pathname.startsWith(path)
    )
  ) {
    const rememberMeCookie = request.cookies.get("REMEMBERME");
    if (
      !rememberMeCookie ||
      JSON.parse(rememberMeCookie.value).maLoaiNguoiDung === "KhachHang"
    ) {
      return NextResponse.redirect(new URL("/not-found", request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith("/thong-tin-ve")) {
   
    let index = request.nextUrl.pathname.lastIndexOf('/');
    let maLichChieu = request.nextUrl.pathname.substring(index + 1);
   
    if(!request.cookies.has("checkout") || maLichChieu !==request.cookies.get("checkout")?.value ){
      return NextResponse.redirect(new URL("/not-found", request.url));
    }
  }
  if(request.nextUrl.pathname.startsWith("/chon-ghe")){
    if(request.cookies.has("checkout") ){
      const response = NextResponse.next()
      response.cookies.delete('checkout')
      return response
    }
  }
}
