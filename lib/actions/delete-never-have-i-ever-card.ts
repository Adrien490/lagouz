"use server";

import db from "@/lib/db";

import { DeleteNeverHaveIEverCardSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";

const deleteNeverHaveIEverCard = async (formData: FormData) => {
	const id = Number(formData.get("id"));
	const validatedData = DeleteNeverHaveIEverCardSchema.safeParse({
		id: id,
	});

	if (!validatedData.success) {
		return { error: validatedData.error.flatten().fieldErrors };
	}

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

	revalidatePath("/never-have-i-ever");

	return deletedCard;
};

export default deleteNeverHaveIEverCard;
