"use client";

import games from "@/data/games";
import useDrawer from "@/hooks/use-drawer";
import { itemVariants } from "@/lib/animations";
import { motion } from "framer-motion";
import Image from "next/image";

const GameList = () => {
	const { mainDrawer } = useDrawer();

	return (
		<div className="flex py-4 snap-y flex-col grow overflow-y-auto gap-4 overflow-x-hidden">
			{games.map((game) => (
				<motion.div
					onClick={() =>
						mainDrawer.onOpen(game.drawerType, {
							game: game,
						})
					}
					key={game.slug}
					className="relative cursor-pointer rounded-lg bg-white/10 flex gap-3"
					variants={itemVariants}
					initial="hidden"
					animate="visible"
					whileTap="click"
				>
					<div className="relative w-[225px] h-[125px] rounded-l-lg overflow-hidden">
						<Image
							src={game.imageUrl}
							alt={game.name}
							fill
							className="object-cover"
						/>
					</div>
					<div className="w-full flex flex-col pr-4">
						<h2 className="text-lg font-bold mt-2">{game.name}</h2>
						<p className="text-sm text-muted-foreground">{game.description}</p>
					</div>
				</motion.div>
			))}
		</div>
	);
};

export default GameList;
