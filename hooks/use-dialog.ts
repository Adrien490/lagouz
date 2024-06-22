import { ConfirmationDialogProps } from "@/components/confirmation-dialog";
import { create } from "zustand";

export type DialogType = "confirmation" | "info" | "warning" | "search";

export interface DialogData {
	confirmationDialogProps?: ConfirmationDialogProps;
	title?: string;
	message?: string;
	onConfirm?: () => void;
	onSearch?: (search: string) => void;
	// autres propriétés...
}

interface DialogStore {
	type: DialogType | null;
	data: DialogData;
	isOpen: boolean;
	onOpen: (type: DialogType, data?: DialogData) => void;
	onClose: () => void;
}

export const useDialog = create<DialogStore>((set) => ({
	type: null,
	data: {},
	isOpen: false,
	onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
	onClose: () => set({ type: null, isOpen: false }),
}));
