import { PlayerListDrawerProps } from "@/app/games/_components/player-list-drawer";
import { NeverHaveIEverCardFormProps } from "@/app/games/never-have-i-ever/_components/never-have-i-ever-card-form";
import { Game } from "@/data/games";
import { NeverHaveIEverCard } from "@prisma/client";
import { create } from "zustand";

export type DrawerType =
	| "confirmationDrawer"
	| "gameDrawer"
	| "loginDrawer"
	| "FAQ"
	| "cardManagerDrawer"
	| "nestedDrawer"
	| "playerListDrawer"
	| "neverHaveIEverDrawer"
	| "neverHaveIEverCardFormDrawer";

export interface DrawerData {
	message?: string;
	game?: Game;
	cards?: NeverHaveIEverCard[];
	card?: NeverHaveIEverCard;
	NeverHaveIEverFormProps?: NeverHaveIEverCardFormProps;
	PlayerListDrawerProps?: PlayerListDrawerProps;
	// autres propriétés...
}

interface DrawerStore {
	mainDrawer: {
		type: DrawerType | null;
		data: DrawerData;
		onOpen: (type: DrawerType, data?: DrawerData) => void;
		onClose: () => void;
	};
	nestedDrawer: {
		type: DrawerType | null;
		data: DrawerData;
		onOpen: (type: DrawerType, data?: DrawerData) => void;
		onClose: () => void;
	};
}

const useDrawer = create<DrawerStore>((set) => ({
	mainDrawer: {
		type: null,
		data: {},
		onOpen: (type, data = {}) =>
			set((state) => ({
				mainDrawer: { ...state.mainDrawer, type, data },
			})),
		onClose: () =>
			set((state) => ({
				mainDrawer: { ...state.mainDrawer, type: null, data: {} },
			})),
	},
	nestedDrawer: {
		type: null,
		data: {},
		onOpen: (type, data = {}) =>
			set((state) => ({
				nestedDrawer: { ...state.nestedDrawer, type, data },
			})),
		onClose: () =>
			set((state) => ({
				nestedDrawer: { ...state.nestedDrawer, type: null, data: {} },
			})),
	},
}));

export default useDrawer;
