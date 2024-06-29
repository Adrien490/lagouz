import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import * as React from "react";

const loaderVariants = cva(
	"inline-flex items-center justify-center animate-spin",
	{
		variants: {
			size: {
				small: "h-4 w-4",
				medium: "h-6 w-6",
				large: "h-8 w-8",
			},
			textColor: {
				primary: "text-primary",
				green: "text-green-400",
				red: "text-red-400",
				secondary: "text-secondary",
				destructive: "text-destructive",
				neutral: "text-muted-foreground",
			},
		},
		defaultVariants: {
			size: "medium",
			textColor: "neutral",
		},
	}
);

export interface LoaderProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof loaderVariants> {
	asChild?: boolean;
}

const Loader = React.forwardRef<HTMLDivElement, LoaderProps>(
	({ className, size, textColor, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "div";
		return (
			<Comp
				className={cn(loaderVariants({ size, textColor, className }))}
				ref={ref}
				{...props}
			>
				<Loader2 />
			</Comp>
		);
	}
);
Loader.displayName = "Loader";

export { Loader, loaderVariants };
