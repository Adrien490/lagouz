"use client";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";

interface PlayerFormProps {
	onSubmit: (values: { name: string }) => void;
}

const PlayerForm = ({ onSubmit }: PlayerFormProps) => {
	const form = useForm({
		defaultValues: {
			name: "",
		},
	});

	const submit = async (values: { name: string }) => {
		onSubmit(values);
		form.reset();
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(submit)}>
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
