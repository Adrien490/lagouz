"use client";
import LoginDrawer from "@/components/login-drawer";
import Logo from "@/components/logo";
import useAuth from "@/hooks/use-auth";
import Hero from "./_components/hero";

const Page = () => {
	const { isAuthenticated } = useAuth();
	return (
		<div className="h-full">
			<div className="h-14 py-2 flex justify-center items-center bg-transparent">
				<Logo />
			</div>
			<Hero />
			<div className="grow flex justify-center mt-8 overflow-y-auto overflow-x-hidden"></div>

			<LoginDrawer />
		</div>
	);
};

export default Page;
