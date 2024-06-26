"use client";

interface SubmitButtonProps {
	children: React.ReactNode;
}

const SubmitButton = ({ children }: SubmitButtonProps) => {
	return (
		<button
			type="submit"
			className="w-full inline-flex h-14 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
		>
			{children}
		</button>
	);
};

export default SubmitButton;
