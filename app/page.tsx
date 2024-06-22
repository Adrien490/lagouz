"use client";
import LoginDrawer from "@/components/login-drawer";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import useAdmin from "@/hooks/use-admin";
import useDrawer from "@/hooks/use-drawer";
import { cn } from "@/lib/utils";

const Page = () => {
	const { mainDrawer } = useDrawer();
	const { isAdmin } = useAdmin();
	console.log(isAdmin);
	return (
		<div className="h-full flex flex-col px-4">
			<div
				className={cn(
					"h-14 py-2 flex items-center bg-background opacity-95 z-20"
				)}
			>
				<Logo />
			</div>

			<div className="grow flex justify-center mt-8 overflow-y-auto overflow-x-hidden"></div>
			<div className="flex h-20 bg-background justify-center items-center">
				<Button
					variant="ghost"
					onClick={() => {
						mainDrawer.onOpen("loginDrawer");
					}}
				>
					Se connecter
				</Button>
			</div>
			<LoginDrawer />
		</div>
	);
};

export default Page;
