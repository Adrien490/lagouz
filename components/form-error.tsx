"use client";

import { Terminal } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

const FormError = ({ children }: { children: React.ReactNode }) => {
	return (
		<Alert className="bg-red-400 rounded-md">
			<Terminal className="h-4 w-4" />
			<AlertDescription className="text-left text-[11px]">
				{children}
			</AlertDescription>
		</Alert>
	);
};

export default FormError;
