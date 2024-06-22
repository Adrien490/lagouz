"use server";

import db from "@/lib/db";
import { actionClient } from "@/lib/safe-action";
import { flattenValidationErrors } from "next-safe-action";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const deletePlayer = actionClient
	.schema(
		z.object({
			id: z.number().int().positive(),
		}),
		{
			handleValidationErrorsShape: (ve) =>
				flattenValidationErrors(ve).fieldErrors,
		}
	)
	.action(async ({ parsedInput: { id } }) => {
		const existingPlayer = await db.player.findFirst({
			where: {
				id: id,
			},
		});

		if (!existingPlayer) {
			return { error: "Aucun joueur avec cet id n'existe." };
		}

		await db.player.delete({
			where: {
				id: existingPlayer.id,
			},
		});

		revalidatePath("/");
	});

export default deletePlayer;
