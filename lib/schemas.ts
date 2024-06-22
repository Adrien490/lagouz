//playerForm schema
import { z } from "zod";

export const PlayerFormSchema = z.object({
	name: z.string().min(1, "Le nom du joueur ne peut pas être vide."),
});

export const NeverHaveIEverCardSchema = z.object({
	id: z.number().int().optional(),
	name: z.string().min(1, "Le nom est obligatoire"),
	categoryId: z.number().int().min(1, "La catégorie est obligatoire"),
});

export const DeleteNeverHaveIEverCardSchema = z.object({
	id: z.number().int(),
});

export const AdminFormSchema = z.object({
	password: z.string().min(1, "Le mot de passe est obligatoire"),
});
