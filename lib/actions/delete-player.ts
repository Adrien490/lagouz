"use server";

import db from "@/lib/db";
import { PlayerFormSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";

const deletePlayer = async (formData: FormData) => {
	const validatedData = PlayerFormSchema.safeParse({
		name: formData.get("name"),
	});

	if (!validatedData.success) {
		return { error: validatedData.error.flatten().fieldErrors };
	}

	const { name } = validatedData.data;

	const existingPlayer = await db.player.findFirst({
		where: {
			name: name,
		},
	});

	if (!existingPlayer) {
		throw new Error("Aucun joueur avec ce nom n'existe.");
	}

	await db.player.delete({
		where: {
			id: existingPlayer.id,
		},
	});

	revalidatePath("/");
};

export default deletePlayer;
