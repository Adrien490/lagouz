"use server";

import db from "@/lib/db";
import { NeverHaveIEverCardSchema } from "@/lib/schemas";
import { flattenValidationErrors } from "next-safe-action";
import { revalidatePath } from "next/cache";
import auth from "../auth";
import { actionClient } from "../safe-action";

const updateNeverHaveIEverCard = actionClient
	.schema(NeverHaveIEverCardSchema, {
		handleValidationErrorsShape: (ve) =>
			flattenValidationErrors(ve).fieldErrors,
	})
	.action(async ({ parsedInput: { id, name, categoryId } }) => {
		const { isAuthenticated } = await auth();
		if (!isAuthenticated) {
			return {
				status: "401",
				message: "Vous devez être authentifié pour mettre à jour une carte.",
			};
		}
		const existingCard = await db.neverHaveIEverCard.findFirst({
			where: {
				id: id,
			},
		});

		if (!existingCard) {
			return {
				status: "404",
				message: "Aucune carte avec cet ID n'existe.",
			};
		}

		await db.neverHaveIEverCard.update({
			where: {
				id: id,
			},
			data: {
				name: name,
				categoryId: categoryId,
			},
		});

		revalidatePath("/games/never-have-i-ever");
		return {
			status: "200",
			message: "Carte mise à jour avec succès.",
		};
	});

export default updateNeverHaveIEverCard;
