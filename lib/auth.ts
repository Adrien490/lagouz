"use server";

import { cookies } from "next/headers";

const auth = async () => {
	const sessionToken = cookies().get("sessionToken");

	return {
		isAuthenticated: sessionToken ? true : false,
	};
};

export default auth;
