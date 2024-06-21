"use client";

import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import { Swiper } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

interface SwiperCardsProps {
	children: React.ReactNode;
	swiperRef: React.RefObject<SwiperType | null>;
	handleSlideChange: (swiper: SwiperType) => void;
}

const SwiperCards = ({
	handleSlideChange,
	swiperRef,
	children,
}: SwiperCardsProps) => {
	const setSwiperRef = (swiper: SwiperType) => {
		if (swiperRef && "current" in swiperRef) {
			(swiperRef as React.MutableRefObject<SwiperType | null>).current = swiper;
		}
	};

	return (
		<Swiper
			onSlideChange={handleSlideChange}
			effect={"cards"}
			grabCursor={true}
			modules={[EffectCards]}
			className="w-[240px] h-[320px]"
			onSwiper={setSwiperRef}
		>
			{children}
		</Swiper>
	);
};

export default SwiperCards;
