"use client";
import {
	Drawer,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";

import CategoryList from "@/components/category-list";
import StartGameButton from "@/components/start-game-button";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NeverHaveIEverCategories } from "@/data/categories";
import { useCategorySelection } from "@/hooks/use-category-selection";
import useDrawer from "@/hooks/use-drawer";
import { ScrollText, Settings, X } from "lucide-react";

const GameDrawer = () => {
	const { mainDrawer } = useDrawer();
	const { game } = mainDrawer.data;
	const open = mainDrawer.type === "neverHaveIEverDrawer";
	const { selectedCategory } = useCategorySelection();
	return (
		<Drawer open={open} onClose={mainDrawer.onClose}>
			<DrawerContent className="flex flex-col pointer-events-auto">
				<DrawerHeader className="mb-4 flex justify-between items-center">
					<DrawerTitle className="">{game?.name}</DrawerTitle>
					<Button
						onMouseDown={mainDrawer.onClose}
						variant="ghost"
						size="icon"
						className="h-12 w-12 shrink-0 rounded-full"
					>
						<X />
						<span className="sr-only">Ajouter</span>
					</Button>
				</DrawerHeader>
				<ScrollArea className="overflow-y-auto flex flex-col justify-between">
					<div className="mt-2 grow pb-4 flex flex-col">
						<h3 className="px-4 text-xl mb-2  font-bold flex italic">
							Règles du jeu
							<ScrollText className="ml-2" />
						</h3>
						<div className="px-4 mt-4 mb-4">
							<p className="text-base text-md">{game?.rules}</p>
						</div>

						<div className="flex flex-col gap-2 mt-4">
							<div className="px-4">
								<h3 className="text-xl font-bold flex italic mb-4">
									Options
									<Settings className="ml-2" />
								</h3>
							</div>
							<div className="px-4">
								<CategoryList
									categories={NeverHaveIEverCategories}
									defaultCategory={NeverHaveIEverCategories[1]}
									displayRandomCategory
								/>
							</div>
						</div>
					</div>
					<DrawerFooter className="">
						<StartGameButton
							href={`/${game?.slug}?category=${selectedCategory?.slug}`}
						/>
					</DrawerFooter>
				</ScrollArea>
			</DrawerContent>
		</Drawer>
	);
};

export default GameDrawer;
