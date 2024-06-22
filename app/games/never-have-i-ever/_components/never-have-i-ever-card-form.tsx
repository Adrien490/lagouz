"use client";

import CategoryList from "@/app/games/_components/category-list";
import SubmitButton from "@/app/games/_components/submit-button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NeverHaveIEverCategories } from "@/data/categories";
import { useCategorySelection } from "@/hooks/use-category-selection";
import { NeverHaveIEverCardSchema } from "@/lib/schemas";
import { useForm } from "react-hook-form";
import { z } from "zod";

export interface NeverHaveIEverCardFormProps {
	initialValues?: {
		name: string;
		categoryId: number;
		id?: number;
	};
}

const NeverHaveIEverCardForm = ({
	initialValues,
}: NeverHaveIEverCardFormProps) => {
	const { selectedCategory } = useCategorySelection();
	const initialValuesCategory =
		NeverHaveIEverCategories.find(
			(category) => category.id === initialValues?.categoryId
		) ?? null;
	const defaultCategory = initialValuesCategory ?? selectedCategory ?? null;
	const isCreatingCard = !initialValues;
	const form = useForm({
		defaultValues: initialValues || {
			name: "",
			categoryId: 0,
		},
	});

	const onSubmit = (values: z.infer<typeof NeverHaveIEverCardSchema>) => {
		const data = {
			...values,
			categoryId: selectedCategory?.id ?? 0,
		};
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					name="name"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<Input
								autoFocus
								className="text-md py-4"
								placeholder="Eu 3 plans culs en même temps"
								{...field}
							/>
						</FormItem>
					)}
				/>

				<CategoryList
					categories={NeverHaveIEverCategories}
					displayRandomCategory={false}
					defaultCategory={defaultCategory}
				/>

				<div className="pt-8 pb-4 w-full">
					<SubmitButton>
						{isCreatingCard ? "Créer la carte" : "Modifier la carte"}
					</SubmitButton>
				</div>
			</form>
		</Form>
	);
};

export default NeverHaveIEverCardForm;
