"use client";
import Search from "@/app/games/_components/search";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import { useDialog } from "@/hooks/use-dialog";
import useDrawer from "@/hooks/use-drawer";
import { truncate } from "@/lib/utils";
import { NeverHaveIEverCard } from "@prisma/client";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import NeverHaveIEverCardFormDrawer from "./never-have-i-ever-card-form-drawer";

interface NeverHaveIEverCardDrawerProps {
	cards: NeverHaveIEverCard[];
}

const NeverHaveIEverSettingsDrawer = ({
	cards,
}: NeverHaveIEverCardDrawerProps) => {
	const { mainDrawer, nestedDrawer } = useDrawer();

	const { onOpen } = useDialog();

	return (
		<Drawer
			shouldScaleBackground={true}
			open={mainDrawer.type === "cardManagerDrawer"}
			onClose={mainDrawer.onClose}
		>
			<DrawerContent className="flex flex-col h-[95dvh]">
				<DrawerHeader className="flex flex-col gap-4 pt-0 pb-2">
					<div className="flex justify-between items-center">
						<DrawerTitle className="flex gap-2 items-center">
							Je n&apos;ai jamais...
							<Image
								src="/icons/playing-cards.svg"
								alt="Playing cards"
								width={30}
								height={30}
							/>
						</DrawerTitle>
						<Button
							onMouseDown={mainDrawer.onClose}
							variant="ghost"
							size="icon"
							className="h-12 w-12 shrink-0 rounded-full"
						>
							<X />
						</Button>
					</div>
					<div className="flex justify-between items-center">
						<p className="text-sm font-bold">({cards.length} cartes)</p>
						<Search />
					</div>
				</DrawerHeader>
				<div className="overflow-y-auto grow flex flex-col gap-2">
					{cards.length > 0 ? (
						cards.map((card) => (
							<motion.div
								key={card.id}
								className="bg-muted justify-between rounded-lg flex items-center overflow-hidden"
								whileTap={{ scale: 0.97 }}
							>
								<div
									onClick={() =>
										nestedDrawer.onOpen("neverHaveIEverCardFormDrawer", {
											card,
										})
									}
									className="flex-1 py-4 px-4 h-full"
								>
									<p className="font-medium text-md break-words">
										{truncate(card.name, 50)}
									</p>
									<span className="text-xs italic text-muted-foreground">
										Créée le {new Date(card.createdAt).toLocaleDateString()}
									</span>
								</div>

								<Button
									className="text-red-200 h-full"
									variant="ghost"
									onClick={() => {}}
								>
									<X className="text-red-300" />
								</Button>
							</motion.div>
						))
					) : (
						<div className="flex justify-center items-center h-full">
							<p className="text-foreground italic">Aucune carte trouvée</p>
						</div>
					)}
				</div>

				<div className="flex justify-center items-center py-2 px-4">
					<Button
						className="py-6 text-lg font-bold border-4 border-white bg-[#FF0086] w-full"
						variant="ghost"
						onClick={() => {
							nestedDrawer.onOpen("neverHaveIEverCardFormDrawer");
						}}
					>
						Ajouter une carte
					</Button>
				</div>

				<NeverHaveIEverCardFormDrawer />
			</DrawerContent>
		</Drawer>
	);
};

export default NeverHaveIEverSettingsDrawer;
