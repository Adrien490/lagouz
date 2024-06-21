"use server";

import db from "@/lib/db";
import { NeverHaveIEverCardSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";

const updateNeverHaveIEverCard = async (formData: FormData) => {
	const name = formData.get("name");
	const id = formData.get("id");
	const categoryId = formData.get("categoryId");
	const validatedData = NeverHaveIEverCardSchema.safeParse({
		id: Number(id),
		name: name as string,
		categoryId: Number(categoryId),
	});

	if (!validatedData.success) {
		return { error: "Les données du formulaire ne sont pas valides." };
	}

	const existingCard = await db.neverHaveIEverCard.findFirst({
		where: {
			id: Number(id),
		},
	});

	if (!existingCard) {
		return { error: "Aucune carte avec cet ID n'existe." };
	}

	const updatedCard = await db.neverHaveIEverCard.update({
		where: {
			id: Number(id),
		},
		data: {
			name: name as string,
			categoryId: Number(categoryId),
		},
	});

	revalidatePath("/never-have-i-ever");
	return updatedCard;
};

export default updateNeverHaveIEverCard;
