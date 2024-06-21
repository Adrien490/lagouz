"use server";

import db from "@/lib/db";
import { NeverHaveIEverCardSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";

const createNeverHaveIEverCard = async (formData: FormData) => {
	const name = formData.get("name");
	const categoryId = formData.get("categoryId");

	const validatedData = NeverHaveIEverCardSchema.safeParse({
		name: name as string,
		categoryId: Number(categoryId),
	});

	if (!validatedData.success) {
		return { error: "Les données du formulaire ne sont pas valides." };
	}

	const { name: validatedName, categoryId: validatedCategoryId } =
		validatedData.data;

	const existingCard = await db.neverHaveIEverCard.findFirst({
		where: {
			name: validatedName,
		},
	});

	if (existingCard) {
		return { error: "Une carte avec ce nom existe déjà." };
	}

	const card = await db.neverHaveIEverCard.create({
		data: {
			name: validatedName,
			categoryId: validatedCategoryId,
		},
	});
	revalidatePath("/never-have-i-ever");
	return card;
};

export default createNeverHaveIEverCard;
