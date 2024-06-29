"use server";

import db from "@/lib/db";
import { NeverHaveIEverCardSchema } from "@/lib/schemas";
import { flattenValidationErrors } from "next-safe-action";
import { revalidatePath } from "next/cache";
import { actionClient } from "../safe-action";

const updateNeverHaveIEverCard = actionClient
	.schema(NeverHaveIEverCardSchema, {
		handleValidationErrorsShape: (ve) =>
			flattenValidationErrors(ve).fieldErrors,
	})
	.action(async ({ parsedInput: { id, name, categoryId } }) => {
		console.log(id);
		const existingCard = await db.neverHaveIEverCard.findFirst({
			where: {
				id: id,
			},
		});

		if (!existingCard) {
			return { error: "Aucune carte avec cet ID n'existe." };
		}

		const updatedCard = await db.neverHaveIEverCard.update({
			where: {
				id: id,
			},
			data: {
				name: name,
				categoryId: categoryId,
			},
		});

		revalidatePath("/games/never-have-i-ever");
		return updatedCard;
	});

export default updateNeverHaveIEverCard;
