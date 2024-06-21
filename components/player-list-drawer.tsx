"use client";

import { Drawer, DrawerContent } from "@/components/ui/drawer";
import useDrawer from "@/hooks/use-drawer";
import createPlayer from "@/lib/actions/create-player";
import deletePlayer from "@/lib/actions/delete-player";
import { PlayerFormSchema } from "@/lib/schemas";
import { Player } from "@prisma/client";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { z } from "zod";
import FormError from "./form-error";
import PlayerForm from "./player-form";
import PlayerItem from "./player-item";

const PlayerListDrawer = () => {
	const { mainDrawer } = useDrawer();
	const open = mainDrawer.type === "playerListDrawer";
	const [players, setPlayers] = useState<Player[]>([]);
	const [message, setMessage] = useState<string | null>(
		mainDrawer.data?.message ?? null
	);

	useEffect(() => {
		const fetchPlayers = async () => {
			try {
				const response = await fetch("/api/players");
				if (!response.ok) {
					throw new Error("Erreur lors de la récupération des joueurs");
				}
				const players = await response.json();
				setPlayers(players);
			} catch (error) {
				console.error("Failed to fetch players:", error);
			}
		};

		if (open) {
			setMessage(mainDrawer.data?.message ?? null);
			fetchPlayers();
		}
	}, [mainDrawer.data?.message, open]);

	const onSubmit = async (values: z.infer<typeof PlayerFormSchema>) => {
		try {
			const formData = new FormData();
			formData.append("name", values.name);
			const player = await createPlayer(formData);
			if (player) {
				setPlayers([...players, player]);
			} else {
				throw new Error("Le joueur n'a pas été créé");
			}
		} catch (error) {
			console.error("Erreur lors de la création du joueur:", error);
		}
	};

	const onDelete = async ({ playerName }: { playerName: string }) => {
		await deletePlayer(playerName);
		setPlayers(players.filter((player) => player.name !== playerName));
	};

	return (
		<Drawer open={open} onClose={mainDrawer.onClose}>
			<DrawerContent className="flex flex-col h-[70dvh]">
				{message && <FormError>{message}</FormError>}
				<div className="w-60 mx-auto mt-4 mb-4">
					<PlayerForm onSubmit={onSubmit} />
				</div>

				<div className="mb-2 grow flex flex-col gap-2 overflow-y-auto overflow-x-hidden">
					<AnimatePresence>
						{players.map((player) => (
							<PlayerItem key={player.id} player={player} onDelete={onDelete} />
						))}
					</AnimatePresence>
				</div>
			</DrawerContent>
		</Drawer>
	);
};

export default PlayerListDrawer;
