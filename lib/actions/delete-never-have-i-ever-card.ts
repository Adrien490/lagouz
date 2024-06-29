"use server";

import db from "@/lib/db";

import { flattenValidationErrors } from "next-safe-action";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { actionClient } from "../safe-action";

const deleteNeverHaveIEverCard = actionClient
	.schema(
		z.object({
			id: z.number(),
		}),
		{
			handleValidationErrorsShape: (ve) =>
				flattenValidationErrors(ve).fieldErrors,
		}
	)
	.action(async ({ parsedInput: { id } }) => {
		const existingCard = await db.neverHaveIEverCard.findFirst({
			where: {
				id: id,
			},
		});

		if (!existingCard) {
			return { error: "Aucune carte avec cet ID n'existe." };
		}

		const deletedCard = await db.neverHaveIEverCard.delete({
			where: {
				id: existingCard.id,
			},
		});

		revalidatePath("/games/never-have-i-ever");

		return deletedCard;
	});

export default deleteNeverHaveIEverCard;
