"use client";
import {
	Drawer,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";

import CategoryList from "@/app/games/_components/category-list";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Category, neverHaveIEverCategories } from "@/data/categories";
import useDrawer from "@/hooks/use-drawer";
import { cn } from "@/lib/utils";
import { ScrollText, Settings, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const NeverHaveIEverDrawer = () => {
	const { mainDrawer } = useDrawer();
	const { game } = mainDrawer.data;
	const open = mainDrawer.type === "neverHaveIEverDrawer";
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();
	const category = searchParams.get("selectedCategory");
	const selectedCategory = neverHaveIEverCategories.find(
		(c) => c.slug === category
	);
	const onCategorySelect = (category: Category) => {
		const params = new URLSearchParams(searchParams.toString());
		if (category.slug === selectedCategory?.slug) {
			params.delete("selectedCategory");
		} else {
			params.set("selectedCategory", category.slug);
		}
		// Update the URL with the new search params
		router.push(`${pathname}?${params.toString()}`);
	};
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
									categories={neverHaveIEverCategories}
									activeCategory={selectedCategory}
									onSelect={onCategorySelect}
								/>
							</div>
						</div>
					</div>
					<DrawerFooter className="">
						<Link
							onClick={() => {
								mainDrawer.onClose();
							}}
							//remove spaces in url
							href={cn(
								selectedCategory?.id !== undefined
									? `/games/${game?.slug}?category=${selectedCategory?.slug}`
									: `/games/${game?.slug}`
							)}
						>
							<Button>Démarrer le jeu</Button>
						</Link>
					</DrawerFooter>
				</ScrollArea>
			</DrawerContent>
		</Drawer>
	);
};

export default NeverHaveIEverDrawer;
