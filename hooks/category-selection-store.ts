import { createStore } from "zustand/vanilla";
import { Category } from "@/data/categories";

// Définition de l'état du store
export type CategorySelectionState = {
	selectedCategory: Category | undefined;
};

// Définition des actions du store
export type CategorySelectionActions = {
	selectCategory: (category: Category) => void;
	clearSelection: () => void;
};

// Combinaison de l'état et des actions
export type CategorySelectionStore = CategorySelectionState &
	CategorySelectionActions;

// État initial par défaut
export const defaultInitState: CategorySelectionState = {
	selectedCategory: undefined,
};

// Création du store avec l'état initial
export const createCategorySelectionStore = (
	initState: CategorySelectionState = defaultInitState
) => {
	return createStore<CategorySelectionStore>()((set) => ({
		...initState,
		selectCategory: (category) => set({ selectedCategory: category }),
		clearSelection: () => set({ selectedCategory: undefined }),
	}));
};
