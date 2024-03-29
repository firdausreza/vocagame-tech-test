import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
	const currentUser = request.cookies.get("session")?.value;
	const path = request.nextUrl.pathname;

	if (!currentUser && (path === "/" || path === "/profile")) {
		return NextResponse.redirect(new URL("/auth/login", request.url));
	} else if (currentUser && (path === "/" || path.includes("/auth"))) {
		return NextResponse.redirect(new URL("/profile", request.url));
	}
}
