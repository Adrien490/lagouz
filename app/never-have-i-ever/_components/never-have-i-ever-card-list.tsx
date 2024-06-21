"use client";

import { NeverHaveIEverCategories } from "@/data/categories";
import { itemVariants } from "@/lib/animations";
import { truncate } from "@/lib/utils";
import { NeverHaveIEverCard } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "../../../components/ui/button";

interface NeverHaveIEverCardListProps {
	onUpdateButtonClick: (card: NeverHaveIEverCard) => void;
	onDeleteButtonClick: (card: NeverHaveIEverCard) => void;
	cards: NeverHaveIEverCard[];
}

const NeverHaveIEverCardList = ({
	onUpdateButtonClick,
	onDeleteButtonClick,
	cards,
}: NeverHaveIEverCardListProps) => {
	return (
		<div className="px-4 flex flex-col gap-2 grow">
			<AnimatePresence>
				{cards.map((card) => {
					const category = NeverHaveIEverCategories.find(
						(category) => category.id === card.categoryId
					);
					return (
						<motion.div
							key={card.id}
							className="bg-muted justify-between rounded-lg flex items-center overflow-hidden"
							variants={itemVariants}
							whileTap="click"
						>
							<div
								onClick={() => onUpdateButtonClick(card)}
								className="flex-1 py-4 px-4 h-full"
							>
								<p className="font-medium text-md break-words">
									{truncate(card.name, 50)}
								</p>
								<span className="text-xs italic text-muted-foreground">
									Créée le {new Date(card.createdAt).toLocaleDateString()}
								</span>
							</div>
							<div className="w-10 h-full mr-4">
								<Button
									className="text-red-200 h-full"
									variant="ghost"
									onClick={() => onDeleteButtonClick(card)}
								>
									<X className="text-red-300" />
								</Button>
							</div>
						</motion.div>
					);
				})}
			</AnimatePresence>
		</div>
	);
};

export default NeverHaveIEverCardList;
