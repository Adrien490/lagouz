"use client";

import {
	CategorySelectionStore,
	createCategorySelectionStore,
} from "@/hooks/category-selection-store";
import { createContext, useContext, useRef, type ReactNode } from "react";
import { useStore } from "zustand";

export type CategorySelectionStoreApi = ReturnType<
	typeof createCategorySelectionStore
>;

export const CategorySelectionStoreContext = createContext<
	CategorySelectionStoreApi | undefined
>(undefined);

export interface CategorySelectionProviderProps {
	children: ReactNode;
}

export const CategorySelectionProvider = ({
	children,
}: CategorySelectionProviderProps) => {
	const storeRef = useRef<CategorySelectionStoreApi>();
	if (!storeRef.current) {
		storeRef.current = createCategorySelectionStore();
	}

	return (
		<CategorySelectionStoreContext.Provider value={storeRef.current}>
			{children}
		</CategorySelectionStoreContext.Provider>
	);
};

export const useCategorySelectionStore = <T,>(
	selector: (store: CategorySelectionStore) => T
): T => {
	const categorySelectionStoreContext = useContext(
		CategorySelectionStoreContext
	);

	if (!categorySelectionStoreContext) {
		throw new Error(
			`useCategorySelectionStore must be used within CategorySelectionStoreProvider`
		);
	}

	return useStore(categorySelectionStoreContext, selector);
};
