"use server";

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
		const existingCard = await db.neverHaveIEverCard.findFirst({
			where: {
				name: name,
			},
		});

		if (existingCard) {
			throw new Error("Une carte avec ce nom existe déjà.");
		}

		const card = await db.neverHaveIEverCard.create({
			data: {
				name: name,
				categoryId: categoryId,
			},
		});
		revalidatePath("/games/never-have-i-ever");
		return card;
	});

export default createNeverHaveIEverCard;
