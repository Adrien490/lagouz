"use server";

import auth from "@/lib/auth";
import db from "@/lib/db";
import { NeverHaveIEverCardSchema } from "@/lib/schemas";
import { flattenValidationErrors } from "next-safe-action";
import { revalidatePath } from "next/cache";
import { actionClient } from "../safe-action";

const createNeverHaveIEverCard = actionClient
	.schema(NeverHaveIEverCardSchema, {
		handleValidationErrorsShape: (ve) =>
			flattenValidationErrors(ve).fieldErrors,
	})
	.action(async ({ parsedInput: { name, categoryId } }) => {
		const { isAuthenticated } = await auth();
		if (!isAuthenticated) {
			return {
				status: "401",
				message: "Vous devez être authentifié pour créer une carte.",
			};
		}
		const existingCard = await db.neverHaveIEverCard.findFirst({
			where: {
				name: name,
			},
		});

		if (existingCard) {
			return {
				status: "409",
				message: "Une carte avec ce nom existe déjà.",
			};
		}

		await db.neverHaveIEverCard.create({
			data: {
				name: name,
				categoryId: categoryId,
			},
		});
		revalidatePath("/games/never-have-i-ever");
		return {
			status: "200",
			message: "Carte créée avec succès.",
		};
	});

export default createNeverHaveIEverCard;
