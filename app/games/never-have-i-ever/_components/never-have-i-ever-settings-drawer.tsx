"use client";
import SearchFilter from "@/app/games/_components/search-filter";
import ShinyButton from "@/components/magicui/shiny-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import { Loader } from "@/components/ui/loader";
import { neverHaveIEverCategories } from "@/data/categories";
import { useDialog } from "@/hooks/use-dialog";
import useDrawer from "@/hooks/use-drawer";
import deleteNeverHaveIEverCard from "@/lib/actions/delete-never-have-i-ever-card";
import { cn, truncate } from "@/lib/utils";
import { NeverHaveIEverCard } from "@prisma/client";
import { motion } from "framer-motion";
import { Plus, UndoDot, X } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import NeverHaveIEverCardFormDrawer from "./never-have-i-ever-card-form-drawer";

interface NeverHaveIEverCardDrawerProps {
	cards: NeverHaveIEverCard[];
}

const NeverHaveIEverSettingsDrawer = ({
	cards,
}: NeverHaveIEverCardDrawerProps) => {
	const { mainDrawer, nestedDrawer } = useDrawer();
	const { execute, result, isExecuting } = useAction(deleteNeverHaveIEverCard);

	const { onOpen, onClose } = useDialog();

	return (
		<Drawer
			dismissible={false}
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
							{isExecuting && <Loader textColor="red" />}
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
						<SearchFilter />
					</div>
				</DrawerHeader>
				<div className="overflow-y-auto px-4 grow flex flex-col gap-2">
					{cards.length > 0 ? (
						cards.map((card) => {
							const category = neverHaveIEverCategories.find(
								(category) => category.id === card.categoryId
							);
							return (
								<motion.div
									key={card.id}
									className="bg-muted whitespace-nowrap justify-between rounded-lg flex items-center"
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
											{truncate(card.name, 30)}
										</p>
										<Badge
											className={cn(
												"mt-2",
												category?.slug === "hot" ? "bg-red-400" : "bg-green-400"
											)}
										>
											{category?.name}
											<span className="ml-2">{category?.icon}</span>
										</Badge>
										<p className="mt-2 text-xs italic text-muted-foreground">
											Créée le {new Date(card.createdAt).toLocaleDateString()}
										</p>
									</div>

									<Button
										className="text-red-200"
										variant="ghost"
										onClick={() =>
											onOpen("confirmation", {
												confirmationDialogProps: {
													title: "Supprimer la carte",
													message:
														"Êtes-vous sur de vouloir supprimer cette carte ?",
													onConfirm: () => {
														execute({ id: card.id });
														onClose();
													},
												},
											})
										}
									>
										<X className="text-red-300" />
									</Button>
								</motion.div>
							);
						})
					) : (
						<div className="flex justify-center items-center h-full">
							<p className="text-foreground text-sm italic">
								Aucune carte trouvée...
							</p>
						</div>
					)}
					<div className="backdrop-blur-sm fixed bg-gradient-to-b from-transparent to-background/50 bottom-0 py-2 left-0 flex justify-between items-center right-0 px-4">
						<ShinyButton
							text="Ajouter une carte"
							Icon={Plus}
							onClick={() => {
								nestedDrawer.onOpen("neverHaveIEverCardFormDrawer");
							}}
						/>
						<Button
							onClick={() => mainDrawer.onClose()}
							className="border-l border-white/20 h-full"
							variant="ghost"
						>
							<UndoDot className="" />
						</Button>
					</div>
				</div>

				<NeverHaveIEverCardFormDrawer />
			</DrawerContent>
		</Drawer>
	);
};

export default NeverHaveIEverSettingsDrawer;
