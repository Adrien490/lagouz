"use client";

import { Player } from "@prisma/client";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "./ui/button";

interface PlayerItemProps {
	player: Player;
	onDelete: ({ playerName }: { playerName: string }) => void;
}

const PlayerItem = ({ player, onDelete }: PlayerItemProps) => {
	return (
		<motion.div
			key={player.id}
			className="flex rounded-full bg-muted opacity-80 w-60 mx-auto h-14 justify-between"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}
		>
			<div className="px-4 h-full flex items-center w-[calc(100%-3rem)]">
				<p className="text-sm text-left font-bold truncate">{player.name}</p>
			</div>
			<div className="w-10 h-full mr-4">
				<Button
					onMouseDown={() => onDelete({ playerName: player.name })}
					className="h-full"
					variant="ghost"
				>
					<X className="text-red-300" />
				</Button>
			</div>
		</motion.div>
	);
};

export default PlayerItem;
