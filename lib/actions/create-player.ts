"use server";

import db from "@/lib/db";
import { actionClient } from "@/lib/safe-action";
import { PlayerFormSchema } from "@/lib/schemas";
import { flattenValidationErrors } from "next-safe-action";
import { revalidatePath } from "next/cache";

const createPlayer = actionClient
	.schema(PlayerFormSchema, {
		handleValidationErrorsShape: (ve) =>
			flattenValidationErrors(ve).fieldErrors,
	})
	.action(async ({ parsedInput: { name } }) => {
		const existingPlayer = await db.player.findFirst({
			where: {
				name,
			},
		});

		if (existingPlayer) {
			return { error: "Un joueur avec ce nom existe déjà." };
		}
		//check if name exists

		const player = await db.player.create({
			data: {
				name,
			},
		});

		revalidatePath("/games");
		return player;
	});

export default createPlayer;
