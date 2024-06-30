"use client";
import { FlipWords } from "@/components/aceternity/flip-words";
import IconButton from "@/components/icon-button";
import LoginDrawer from "@/components/login-drawer";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import useDrawer from "@/hooks/use-drawer";
import { MessageCircleQuestion } from "lucide-react";
import FAQDrawer from "../games/_components/faq-drawer";

const Page = () => {
	const words = ["incroyables", "good vibes", "inoubliables "];
	const { mainDrawer } = useDrawer();
	return (
		<div className="relative flex flex-col">
			<div className="z-20 fixed top-0 left-0 right-0 px-6 h-14 py-2 flex items-center justify-between bg-transparent">
				<Logo />
				<div className="flex gap-1">
					<IconButton drawerType="FAQ" icon={<MessageCircleQuestion />} />
				</div>
			</div>
			<div className="relative pb-40 pt-32 overflow-hidden px-6 h-full">
				<div className="absolute inset-0 bg-grid-white/[0.06] [mask-image:linear-gradient(to_bottom,white_5%,transparent_100%)] pointer-events-none select-none"></div>
				<div className="flex flex-col">
					<h1 className="text-4xl md:text-7xl font-bold mb-6 relative text-left text-zinc-100 max-w-[24rem]">
						Transformez vos soirées en moments
						{""}
						<FlipWords words={words} />
					</h1>
					<h2 className="relative text-sm sm:text-xl text-zinc-500 tracking-wide mb-8 text-left max-w-2xl antialiased leading-loose">
						Oui oui Chacal t&apos;es pas prêt à ce que tu vas voir
					</h2>
					<div className="flex flex-col gap-2">
						<Button
							onClick={() => mainDrawer.onOpen("loginDrawer")}
							className=" bg-white text-black no-underline flex space-x-2 group cursor-pointer relative hover:shadow-2xl transition duration-200 shadow-zinc-900 p-px font-semibold px-4 py-2 w-full sm:w-52 h-14 rounded-2xl text-sm text-center items-center justify-center"
						>
							Commencer maintenant !
						</Button>
						<Button
							onClick={() => mainDrawer.onOpen("FAQ")}
							className="bg-background border-2 border-white text-white flex space-x-2 group cursor-pointer relative hover:shadow-2xl transition duration-200 shadow-zinc-900 p-px font-semibold px-4 py-2 w-full sm:w-52 h-14 rounded-2xl text-sm text-center items-center justify-center"
						>
							<div className="flex flex-col gap-1">
								<span className="">Lire la FAQ</span>
								<span className="text-xs text-zinc-500">
									Parce que je suis une star 😎
								</span>
							</div>
						</Button>
					</div>
				</div>
				<div className="grow flex justify-center mt-8 overflow-y-auto overflow-x-hidden"></div>

				<LoginDrawer />
				<FAQDrawer />
			</div>
		</div>
	);
};

export default Page;
