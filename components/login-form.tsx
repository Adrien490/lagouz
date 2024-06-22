"use client";

import SubmitButton from "@/app/games/_components/submit-button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import login from "@/lib/actions/login";
import { AdminFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";

const LoginForm = () => {
	const { execute, result } = useAction(login);
	const form = useForm({
		resolver: zodResolver(AdminFormSchema),
		defaultValues: {
			password: "",
		},
	});

	const onSubmit = async () => {
		execute(form.getValues());
		console.log(form.getValues());
		form.reset();
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					name="password"
					control={form.control}
					render={({ field }) => (
						<FormItem {...field}>
							<InputOTP maxLength={6}>
								<InputOTPGroup>
									<InputOTPSlot index={0} />
									<InputOTPSlot index={1} />
									<InputOTPSlot index={2} />
									<InputOTPSlot index={3} />
									<InputOTPSlot index={4} />
									<InputOTPSlot index={5} />
								</InputOTPGroup>
							</InputOTP>
						</FormItem>
					)}
				/>

				<div className="pt-8 pb-4 w-full">
					<SubmitButton>Je veux être admin</SubmitButton>
				</div>
			</form>
		</Form>
	);
};

export default LoginForm;
