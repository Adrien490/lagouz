"use client";
import useDrawer from "@/hooks/use-drawer";

const Hero = () => {
	const { mainDrawer } = useDrawer();
	return (
		<button
			onClick={() => {
				mainDrawer.onOpen("loginDrawer");
			}}
			className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-white text-white  rounded-lg font-bold"
		>
			Commencer maintenant
		</button>
	);
};

export default Hero;
