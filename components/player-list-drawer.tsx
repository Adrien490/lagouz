"use client";

import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import useDrawer from "@/hooks/use-drawer";
import deletePlayer from "@/lib/actions/delete-player";
import { Player } from "@prisma/client";
import { AnimatePresence } from "framer-motion";
import { Loader2, X } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import FormError from "./form-error";
import PlayerForm from "./player-form";
import { Button } from "./ui/button";

export interface PlayerListDrawerProps {
	players: Player[];
}

const PlayerListDrawer = ({ players }: PlayerListDrawerProps) => {
	const { mainDrawer } = useDrawer();
	const open = mainDrawer.type === "playerListDrawer";
	const message = mainDrawer.data?.message ?? null;
	const { execute, result, isExecuting } = useAction(deletePlayer);

	const handleDelete = (id: number) => {
		execute({ id });
	};

	return (
		<Drawer open={open} onClose={mainDrawer.onClose}>
			<DrawerContent className="flex flex-col h-[75dvh]">
				<DrawerHeader className="w-full">
					<DrawerTitle className="text-center">
						Liste des joueurs ({players.length})
					</DrawerTitle>
				</DrawerHeader>
				{message && <FormError>{message}</FormError>}
				<div className="w-60 mx-auto mt-4 mb-4 flex gap-2 items-center">
					<PlayerForm />
					{isExecuting && (
						<Loader2 className="animate-spin text-red-300 w-6 h-6" />
					)}
				</div>

				<div className="mb-2 grow flex flex-col gap-2 overflow-y-auto overflow-x-hidden">
					<AnimatePresence>
						{players.map((player) => (
							<div
								key={player.id}
								className="flex rounded-full bg-muted opacity-80 w-60 mx-auto h-14 justify-between items-center pl-4"
							>
								<p className="text-sm text-left flex-1 font-bold truncate">
									{player.name}
								</p>

								<Button variant="ghost" onClick={() => handleDelete(player.id)}>
									<X className="text-red-300" />
								</Button>
							</div>
						))}
					</AnimatePresence>
				</div>
			</DrawerContent>
		</Drawer>
	);
};

export default PlayerListDrawer;
