import auth from "@/lib/auth";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
	const { isAuthenticated } = await auth();

	if (isAuthenticated) {
		return NextResponse.redirect(new URL("/games", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/"], // Ajustez les chemins selon vos besoins
};
