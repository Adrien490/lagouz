"use client";

import { Category } from "@/data/categories";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { BorderBeam } from "../../../components/magicui/border-beam";

interface CategoryListProps {
	categories: Category[];
	onSelect: (category: Category) => void;
	activeCategory?: Category | undefined;
}

const CategoryList = ({
	categories,
	onSelect,
	activeCategory,
}: CategoryListProps) => {
	return (
		<div className="grid grid-cols-2 gap-4">
			{categories.map((category, index) => (
				<motion.div
					key={index}
					className="bg-gradient-to-r from-transparent to-muted border-2 relative flex-1 py-6 p-4 rounded-lg opacity-90 flex flex-col items-center justify-center gap-2"
					onClick={() => {
						onSelect(category);
					}}
					initial={{ scale: 1 }}
					animate={{ scale: category.id === activeCategory?.id ? 1.1 : 1 }}
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
							category.id !== activeCategory?.id && "hidden"
						)}
					>
						<BorderBeam size={80} borderWidth={3} duration={10} delay={9} />
					</div>
				</motion.div>
			))}
		</div>
	);
};

export default CategoryList;
