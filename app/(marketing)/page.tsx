"use client";
import { FlipWords } from "@/components/aceternity/flip-words";
import IconButton from "@/components/icon-button";
import LoginDrawer from "@/components/login-drawer";
import Logo from "@/components/logo";
import Marquee from "@/components/magicui/marquee";
import { Button } from "@/components/ui/button";
import games from "@/data/games";
import useDrawer from "@/hooks/use-drawer";
import { MessageCircleQuestion } from "lucide-react";
import Image from "next/image";
import FAQDrawer from "../games/_components/faq-drawer";

const Page = () => {
	const words = ["incroyables", "good vibes", "inoubliables "];
	const { mainDrawer } = useDrawer();
	return (
		<div className="relative flex flex-col pb-8">
			<div className="z-20 fixed top-0 left-0 right-0 px-6 h-14 py-2 flex items-center justify-between bg-transparent">
				<Logo />
				<div className="flex gap-1">
					<IconButton drawerType="FAQ" icon={<MessageCircleQuestion />} />
				</div>
			</div>
			<div className="relative pt-32 overflow-hidden h-full">
				<div className="absolute inset-0 bg-grid-white/[0.06] [mask-image:linear-gradient(to_bottom,white_5%,transparent_100%)] pointer-events-none select-none"></div>
				<div className="flex flex-col px-6">
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
									c&apos;est ça d&apos;être une star 😎
								</span>
							</div>
						</Button>
					</div>
				</div>
			</div>
			<div className="relative mt-20 flex flex-col gap-4 px-6">
				<h3 className="text-2xl font-bold mb-8">La Gouz, qu&apos;est-ce ?</h3>
				<div className="flex gap-4">
					<div className="grow overflow-clip">
						<p className="text-xs leading-tight">
							On est d&apos;accord : Toz c&apos;est pas ouf pour faire des
							soirées. Et en plus on peut pas rajouter nos propres phrases dans
							les jeux...
							<br />
							<br />
							Ben let&apos;s go ! J&apos;ai geeké pendant des mois pour sortir
							cette app et j&apos;espère qu&apos;elle fera l&apos;unanimité
							bhahahaha.
							<br />
							<br />
							Pourquoi La Gouz ? Tu le découvriras bien assez tôt... <br /> En
							attendant, clique ici 😇
						</p>
						<Button className="bg-transparent border-2 border-white mt-8 w-full">
							Commencer à jouer !
						</Button>
					</div>
					<video
						className="rounded-lg border-2 border-white"
						width="175"
						height="120"
						autoPlay
						muted
						loop
					>
						<source src="/cam.mp4" type="video/mp4" />
						Your browser does not support the video tag.
					</video>
				</div>
			</div>
			<div className="relative mt-20">
				<h3 className="text-2xl font-bold px-6 mb-8">Des jeux de ouf !</h3>
				<Marquee className="[--duration:20s]">
					{games.map((game) => (
						<div
							className="flex gap-2 rounded-lg w-[250px] h-[110px] border border-white"
							key={game.id}
						>
							<Image
								src={game.imageUrl}
								className="rounded-l-lg"
								width={100}
								height={110}
								alt={game.name}
							/>

							<div className="flex flex-col pr-2 py-2">
								<h3 className="text-sm font-bold">{game.name}</h3>
								<p className="text-xs text-zinc-500 overflow-clip">
									{game.description}
								</p>
							</div>
						</div>
					))}
				</Marquee>
			</div>
			<LoginDrawer />
			<FAQDrawer />
		</div>
	);
};

export default Page;
