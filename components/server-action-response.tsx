"use client";

import { cn } from "@/lib/utils";
import { ShieldX } from "lucide-react";

type Props = {
	result: {
		data?: {
			message: string;
			status: string;
		};
		serverError?: string;
		fetchError?: string;
		validationErrors?: Record<string, string[] | undefined>;
	};
};

const ServerActionResponse = ({ result }: Props) => {
	const { data, serverError, fetchError, validationErrors } = result;
	return (
		<div
			className={cn(
				"flex items-center justify-between py-2 px-4 rounded-md",
				(Object.keys(result).length === 0 || result === undefined) && "hidden",
				data?.status === "200" ? "bg-green-400" : "bg-red-400"
			)}
		>
			<h2 className="text-md font-bold">
				{serverError
					? serverError
					: data?.message
					? data.message
					: fetchError
					? fetchError
					: validationErrors &&
					  Object.keys(validationErrors).map((key) => (
							<div key={key}>{validationErrors[key]?.join(", ")}</div>
					  ))}
			</h2>
			<ShieldX className="w-6 h-6 text-white font-bold" />
		</div>
	);
};

export default ServerActionResponse;
