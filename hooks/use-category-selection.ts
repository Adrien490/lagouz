// hooks/useCategorySelection.ts
import { create } from "zustand";
import { Category } from "@/data/categories";

interface CategorySelectionStore {
	selectedCategory: Category | null;
	selectCategory: (category: Category) => void;
	clearSelection: () => void;
}

export const useCategorySelection = create<CategorySelectionStore>((set) => ({
	selectedCategory: null,
	selectCategory: (category) => set({ selectedCategory: category }),
	clearSelection: () => set({ selectedCategory: null }),
}));
