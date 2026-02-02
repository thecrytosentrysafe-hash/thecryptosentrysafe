import { NextRequest, NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { auth } from "./lib/auth";
import { verifyToken } from "./lib/jwt";
import { PASSCODE_TOKEN } from "./lib/utils";
import { compareValue } from "./lib/bcrypt";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  try {
    if (
      pathname.startsWith("/login") ||
      pathname.startsWith("/register")
    ) {
      return NextResponse.next();
    }

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.redirect(
        new URL(`/login?redirectUrl=${pathname}`, request.url)
      );
    }

    if (!session.user.emailVerified) {
      if (pathname !== "/verify-email") {
        return NextResponse.redirect(
          new URL("/verify-email", request.url)
        );
      }
      return NextResponse.next();
    }

    if (!session.user.passcode) {
      if (pathname !== "/passcode/create") {
        return NextResponse.redirect(
          new URL("/passcode/create", request.url)
        );
      }
      return NextResponse.next();
    }

    const passcodeToken = (await cookies()).get(PASSCODE_TOKEN);

    if (!passcodeToken) {
      if (pathname !== "/passcode") {
        return NextResponse.redirect(new URL("/passcode", request.url));
      }
      return NextResponse.next();
    }

    let passcode = "";
    try {
      passcode = verifyToken(passcodeToken.value).passcode;
    } catch (error) {
      if (pathname !== "/passcode") {
        return NextResponse.redirect(new URL("/passcode", request.url));
      }
    }

    const passcodeIsValid = await compareValue(passcode, session.user.passcode);

    if (!passcodeIsValid) {
      if (pathname !== "/passcode") {
        return NextResponse.redirect(new URL("/passcode", request.url));
      }
      return NextResponse.next();
    }

    if (pathname.startsWith("/admin")) {
      if (session.user.role !== "admin") {
        return NextResponse.redirect(
          new URL("/dashboard", request.url)
        );
      }
    }

    return NextResponse.next();

  } catch (err) {
    console.error("proxy error:", err);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/buy/:path*",
    "/settings/:path*",
    "/notifications/:path*",
    "/passcode/:path*",
    "/swap/:path*",
    "/card/:path*",
    "/referral",
    "/send/:path*",
    "/verify-email",
    "/receive/:path*",
    "/crypto/:path*",
    "/admin/:path*",
  ],
};