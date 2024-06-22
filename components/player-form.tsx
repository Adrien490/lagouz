"use client";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import createPlayer from "@/lib/actions/create-player";
import { PlayerFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";

const PlayerForm = () => {
	const { execute, result, isExecuting } = useAction(createPlayer);
	const form = useForm({
		resolver: zodResolver(PlayerFormSchema),
		defaultValues: {
			name: "",
		},
	});

	const onSubmit = async () => {
		execute(form.getValues());
		form.reset();
	};

	return (
		<Form {...form}>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit(onSubmit)();
				}}
			>
				<div className="flex gap-2 items-center">
					<FormField
						name="name"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<Input
									className="text-center opacity-60 rounded-full"
									placeholder="Nom du joueur"
									{...field}
								/>
							</FormItem>
						)}
					/>
					<Button className="rounded-full" variant="ghost" type="submit">
						{isExecuting ? (
							<Loader2 className="w-6 h-6 animate-spin text-green-300" />
						) : (
							<Plus className="w-6 h-6 text-green-300" />
						)}
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default PlayerForm;
