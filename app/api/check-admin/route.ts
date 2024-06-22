import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
	const cookieStore = cookies();
	const sessionToken = cookieStore.get("sessionToken");

	if (sessionToken) {
		return NextResponse.json({ isAdmin: true });
	} else {
		return NextResponse.json({ isAdmin: false });
	}
}
