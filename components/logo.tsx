"use client";

import Image from "next/image";

const Logo = () => {
	return (
		<div className="flex items-center space-x-2">
			<div className="relative w-[65px] h-[40px]">
				<Image src="/logo.png" alt="La Gouz" fill />
			</div>
			<h1 className="text-sm italic font-bold">La Gouz</h1>
		</div>
	);
};

export default Logo;
