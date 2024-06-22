"use client";
import { Vortex } from "@/components/magicui/vortex";
import useDrawer from "@/hooks/use-drawer";

const Hero = () => {
	const { mainDrawer } = useDrawer();
	return (
		<div className="w-full h-[90dvh] gradient-mask-b-[transparent,rgba(0,0,0,1.0)_30px,rgba(0,0,0,0.5)_80%]">
			<Vortex
				backgroundColor="transparent"
				rangeY={600}
				particleCount={250}
				baseHue={120}
				className="flex items-center flex-col justify-center px-8 md:px-10  py-4 w-full h-full "
			>
				<h2 className="text-white text-2xl md:text-6xl font-bold text-center">
					La meilleure application de jeux
				</h2>
				<p className="text-white text-sm md:text-2xl mt-6 text-center">
					Pour s&apos;enjailler avec les potes et créer des souvenirs mémorables
				</p>
				<div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
					<button
						onClick={() => {
							mainDrawer.onOpen("loginDrawer");
						}}
						className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-white text-white  rounded-lg font-bold"
					>
						Commencer maintenant
					</button>
				</div>
			</Vortex>
		</div>
	);
};

export default Hero;
