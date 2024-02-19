import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
	const currentUser = request.cookies.get("session")?.value;
	const path = request.nextUrl.pathname;

	if (!currentUser && path === "/profile") {
		return NextResponse.redirect(new URL("/auth/login", request.url));
	}
}
