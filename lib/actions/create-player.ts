"use server";

import db from "@/lib/db";
import { PlayerFormSchema } from "@/lib/schemas";

const createPlayer = async (formData: FormData) => {
	const validatedData = PlayerFormSchema.safeParse({
		name: formData.get("name"),
	});

	if (!validatedData.success) {
		return { error: validatedData.error.flatten().fieldErrors };
	}

	const { name } = validatedData.data;

	const existingPlayer = await db.player.findFirst({
		where: {
			name,
		},
	});

	if (existingPlayer) {
		throw new Error("Un joueur avec ce nom existe déjà.");
	}
	//check if name exists

	const player = await db.player.create({
		data: {
			name,
		},
	});
	return player;
};

export default createPlayer;
