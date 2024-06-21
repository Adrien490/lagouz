"use client";

import { Category } from "@/data/categories";
import { useCategorySelection } from "@/hooks/use-category-selection";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { BorderBeam } from "./magicui/border-beam";

interface CategoryListProps {
	categories: Category[];
	defaultCategory?: Category | null;
	displayRandomCategory?: boolean;
}

const CategoryList = ({
	categories,
	defaultCategory,
	displayRandomCategory = true,
}: CategoryListProps) => {
	const { selectedCategory, selectCategory } = useCategorySelection();

	useEffect(() => {
		if (defaultCategory) {
			selectCategory(defaultCategory);
		}
	}, [defaultCategory, selectCategory]);

	const onClick = (category: Category) => {
		selectCategory(category);
	};

	const data = displayRandomCategory
		? categories
		: categories.filter((category) => category.id !== null);

	return (
		<div className="grid grid-cols-2 gap-4">
			{data.map((category) => (
				<motion.div
					key={category.id}
					className="bg-gradient-to-r from-transparent to-muted border-2 relative flex-1 py-6 p-4 rounded-lg opacity-90 flex flex-col items-center justify-center gap-2"
					onClick={(e) => {
						e.preventDefault();
						onClick(category);
					}}
					initial={{ scale: 1 }}
					animate={{ scale: category.id === selectedCategory?.id ? 1.1 : 1 }}
					transition={{ duration: 0.3 }}
					whileTap={{ scale: 0.95 }}
				>
					<h2 className="text-xl font-bold">
						{category.name} <span className="">{category.icon}</span>
					</h2>
					<p className="text-[10px] italic">{category.description}</p>
					<div
						className={cn(
							"rounded-lg p-0",
							category.id !== selectedCategory?.id && "hidden"
						)}
					>
						<BorderBeam size={100} borderWidth={3} duration={10} delay={9} />
					</div>
				</motion.div>
			))}
		</div>
	);
};

export default CategoryList;
