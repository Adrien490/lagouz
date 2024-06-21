"use client";

import IconButton from "@/components/icon-button";
import SwiperCards from "@/components/swiper-cards";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { NeverHaveIEverCard } from "@prisma/client";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Settings, Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

interface NeverIHaveEverWrapperProps {
	neverHaveIEverCards: NeverHaveIEverCard[];
}

const NeverIHaveEverWrapper = ({
	neverHaveIEverCards,
}: NeverIHaveEverWrapperProps) => {
	const router = useRouter();
	const [cards, setCards] = useState<NeverHaveIEverCard[]>([]);
	const [progress, setProgress] = useState(0);
	const swiperRef = useRef<SwiperType | null>(null);

	useEffect(() => {
		const shuffledCards = neverHaveIEverCards.sort(() => Math.random() - 0.5);
		setCards(shuffledCards);
	}, [neverHaveIEverCards]);

	const handleSlideChange = (swiper: SwiperType) => {
		const totalSlides = swiper.slides.length - 1;
		const currentIndex = swiper.activeIndex;
		const newProgress = (currentIndex / totalSlides) * 100 || 0;
		setProgress(newProgress);
	};

	const handlePrev = () => {
		if (swiperRef.current) {
			swiperRef.current.slidePrev();
		}
	};

	const handleNext = () => {
		if (swiperRef.current) {
			swiperRef.current.slideNext();
		}
	};
	const controlsButtons = [
		{
			icon: <Undo2 />,
			bgColor: "bg-red-400",
			onClick: handlePrev,
		},
		{
			icon: <Check />,
			bgColor: "bg-green-400",
			onClick: handleNext,
		},
	];
	return (
		<div className="flex flex-col h-full overflow-x-hidden">
			<div className="px-4 py-4 flex items-center justify-between">
				<IconButton
					dialogType="confirmation"
					icon={<ArrowLeft />}
					data={{
						title: "Quitter le jeu ?",
						message: "Tu veux vraiment quitter le jeu ?",
						onConfirm: () => {
							router.push("/");
						},
					}}
				/>
				<Progress
					indicatorColor="#FF0086"
					className="w-[240px]"
					value={progress}
				/>

				<IconButton drawerType="cardManagerDrawer" icon={<Settings />} />
			</div>
			<div className="flex flex-col mt-16 gap-8 items-center">
				<SwiperCards
					swiperRef={swiperRef}
					handleSlideChange={handleSlideChange}
				>
					{cards.map((card, index) => (
						<SwiperSlide
							className="rounded-lg border-4 border-white bg-[#FF0086]"
							key={card.id}
						>
							<div className="h-full flex flex-col">
								<div className="flex justify-between mt-3">
									<div className="ml-3 bg-transparent border-2 border-white rounded-md px-2 flex items-center justify-center">
										<h3 className="uppercase text-lg font-extrabold tracking-tight">
											Je n&apos;ai <br /> jamais
										</h3>
									</div>
									<span className="text-white text-lg font-extrabold mr-3">
										#{index + 1}
									</span>
								</div>

								<div className="mb-4 overflow-y-auto overflow-x-hidden mt-4 px-4 grow">
									<p className="w-full uppercase font-bold text-md mt-4 break-words">
										{card.name}
									</p>
								</div>
							</div>
						</SwiperSlide>
					))}
				</SwiperCards>
				<div className="flex gap-8 items-center">
					{controlsButtons.map((button, index) => (
						<motion.div whileTap={{ scale: 0.9 }} key={index}>
							<Button
								onClick={button.onClick}
								className={cn(
									`border-white border-4 w-[70px] h-[70px] rounded-full`,
									button.bgColor
								)}
								variant="ghost"
							>
								{button.icon}
							</Button>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);
};

export default NeverIHaveEverWrapper;
