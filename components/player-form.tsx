"use client";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import createPlayer from "@/lib/actions/create-player";
import { PlayerFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";

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
				<FormField
					name="name"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<Input
								className="text-center opacity-60 border-white border-4 rounded-full"
								placeholder="Nom du joueur"
								{...field}
							/>
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
};

export default PlayerForm;
