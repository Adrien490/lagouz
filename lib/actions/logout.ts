"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { actionClient } from "../safe-action";

const logout = actionClient.action(async () => {
	const cookieStore = cookies();
	const sessionToken = cookieStore.get("sessionToken");
	console.log("sessionToken", sessionToken);
	if (!sessionToken) {
		return { error: "Pas de session trouvée" };
	}
	cookieStore.delete("sessionToken");
	redirect("/");
});

export default logout;
