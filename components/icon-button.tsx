"use client";

import { DialogData, DialogType, useDialog } from "@/hooks/use-dialog";
import useDrawer, { DrawerData, DrawerType } from "@/hooks/use-drawer";
import { SheetData, SheetType, useSheet } from "@/hooks/use-sheet";
import { NeverHaveIEverCard } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface IconButtonProps {
	sheetType?: SheetType;
	drawerType?: DrawerType;
	dialogType?: DialogType;
	linkUrl?: string;
	icon: React.ReactNode;
	data?: DrawerData | SheetData | DialogData;
	onClick?: () => void;
}

export type IconButtonData = NeverHaveIEverCard[] | "gameDrawer";

const IconButton = ({
	sheetType,
	drawerType,
	dialogType,
	linkUrl,
	icon,
	data,
	onClick: onClickProp,
}: IconButtonProps) => {
	const { onOpen: onOpenSheet } = useSheet();
	const { mainDrawer, nestedDrawer } = useDrawer();
	const { onOpen: onOpenDialog } = useDialog();
	const router = useRouter();

	const onClick = () => {
		if (onClickProp) {
			onClickProp();
		}
		if (sheetType) {
			onOpenSheet(sheetType, data);
		}
		if (drawerType) {
			mainDrawer.onOpen(drawerType, data);
		}
		if (dialogType) {
			onOpenDialog(dialogType, data);
		}
		if (linkUrl) {
			router.push(linkUrl);
		}
	};

	return (
		<Button onClick={onClick} variant="ghost" className="p-1">
			{icon}
		</Button>
	);
};

export default IconButton;
