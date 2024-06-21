"use client";

import games, { Game } from "@/data/games";
import useDrawer from "@/hooks/use-drawer";
import checkPlayersCount from "@/lib/actions/check-players-count";
import { itemVariants, listVariants } from "@/lib/animations";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const GameList = () => {
	const { mainDrawer } = useDrawer();
	const onClick = async (game: Game) => {
		const playersCount = await checkPlayersCount();
		if (playersCount) {
			mainDrawer.onOpen(game.drawerType, {
				game: game,
			});
		} else {
			mainDrawer.onOpen("playerListDrawer", {
				message: "Ajoutez au moins 2 joueurs pour jouer !",
			});
		}
	};
	return (
		<motion.div
			className="flex py-8 snap-y flex-col grow overflow-y-auto gap-4 overflow-x-hidden"
			variants={listVariants}
			initial="hidden"
			animate="visible"
			exit="exit"
		>
			<AnimatePresence>
				{games.map((game) => (
					<motion.div
						onClick={() => onClick(game)}
						key={game.slug}
						className="relative cursor-pointer rounded-lg bg-white/10 flex gap-3"
						variants={itemVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
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
							<p className="text-sm text-muted-foreground">
								{game.description}
							</p>
						</div>
					</motion.div>
				))}
			</AnimatePresence>
		</motion.div>
	);
};

export default GameList;
