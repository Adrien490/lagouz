"use client";

import ServerActionResponse from "@/components/server-action-response";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { neverHaveIEverCategories } from "@/data/categories";
import useDrawer from "@/hooks/use-drawer";
import createNeverHaveIEverCard from "@/lib/actions/create-never-have-i-ever-card";
import updateNeverHaveIEverCard from "@/lib/actions/update-never-have-i-ever-card";
import { useCategorySelectionStore } from "@/providers/category-selection-provider";
import { Loader2, X } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import CategoryList from "../../_components/category-list";
import SubmitButton from "../../_components/submit-button";

const NeverHaveIEverCardFormDrawer = () => {
	const { nestedDrawer } = useDrawer();
	const initialValues = nestedDrawer.data.card ?? null;
	const { selectedCategory, selectCategory } = useCategorySelectionStore(
		(state) => ({
			selectedCategory: state.selectedCategory,
			selectCategory: state.selectCategory,
		})
	);

	const form = useForm({
		//resolver: zodResolver(NeverHaveIEverCardSchema),
		defaultValues: {
			name: initialValues?.name ?? "",
			categoryId: initialValues?.id ?? 0,
		},
	});

	const { executeAsync, result, isExecuting, reset } = useAction(
		initialValues ? updateNeverHaveIEverCard : createNeverHaveIEverCard,
		{
			onSuccess: ({ data }) => {
				if (data?.status === "200") {
					nestedDrawer.onClose();
				}
			},
		}
	);

	const onSubmit = async () => {
		const data = initialValues
			? {
					...form.getValues(),
					id: initialValues.id,
					categoryId: selectedCategory?.id ?? 0,
			  }
			: { ...form.getValues(), categoryId: selectedCategory?.id ?? 0 };
		await executeAsync(data);
		form.reset();
	};

	useEffect(() => {
		if (initialValues) {
			form.reset({
				name: initialValues.name,
				categoryId: initialValues.id,
			});
			const category = neverHaveIEverCategories.find(
				(category) => category.id === initialValues.categoryId
			);
			if (category) {
				selectCategory(category);
			}
		} else {
			form.reset({
				name: "",
				categoryId: 0,
			});
		}
	}, [form, initialValues, selectCategory]);

	return (
		<Drawer
			open={nestedDrawer.type === "neverHaveIEverCardFormDrawer"}
			onClose={() => {
				nestedDrawer.onClose();
				form.reset();
				reset();
			}}
			shouldScaleBackground={true}
		>
			<DrawerContent>
				<DrawerHeader className="flex justify-between items-center">
					<DrawerTitle className="flex gap-2 items-center">
						Je n&apos;ai jamais...
						<Image
							src="/icons/playing-cards.svg"
							alt="Heart Pulse"
							width={30}
							height={30}
						/>
						{isExecuting && <Loader2 className="w-6 h-6 animate-spin" />}
					</DrawerTitle>
					<Button
						onMouseDown={nestedDrawer.onClose}
						variant="ghost"
						size="icon"
						className="h-12 w-12 shrink-0 rounded-full"
					>
						<X />
					</Button>
				</DrawerHeader>

				<div className="px-4 mt-4 mb-4">
					<ServerActionResponse result={result} />
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="mt-2 space-y-6"
						>
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
								categories={neverHaveIEverCategories.filter(
									(category) => category.id !== undefined
								)}
								onSelect={(category) => {
									selectCategory(category);
								}}
								activeCategory={selectedCategory}
							/>

							<div className="pt-8 pb-4 w-full">
								<SubmitButton>
									{!initialValues ? "Créer la carte" : "Modifier la carte"}
								</SubmitButton>
							</div>
						</form>
					</Form>
				</div>
			</DrawerContent>
		</Drawer>
	);
};

export default NeverHaveIEverCardFormDrawer;
