"use client";

import useDrawer from "@/hooks/use-drawer";

const LoginButton = ({ children }: { children: React.ReactNode }) => {
	const { mainDrawer } = useDrawer();

	return (
		<span onClick={() => mainDrawer.onOpen("loginDrawer")}>{children}</span>
	);
};

export default LoginButton;
