"use server";

import { flattenValidationErrors } from "next-safe-action";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { actionClient } from "../safe-action";
import { AdminFormSchema } from "../schemas";

const login = actionClient
	.schema(AdminFormSchema, {
		handleValidationErrorsShape: (ve) =>
			flattenValidationErrors(ve).fieldErrors,
	})
	.action(async ({ parsedInput: { password } }) => {
		const isAdmin = password === process.env.ADMIN_PASSWORD;
		if (!isAdmin) {
			return { error: "Mot de passe incorrect, bien essayé !" };
		}
		const sessionToken = uuidv4();
		const cookieStore = cookies();
		cookieStore.set("sessionToken", sessionToken);
		redirect("/games");
	});

export default login;
