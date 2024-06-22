"use client";

import { DialogData, DialogType, useDialog } from "@/hooks/use-dialog";
import useDrawer, { DrawerData, DrawerType } from "@/hooks/use-drawer";
import { SheetData } from "@/hooks/use-sheet";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface IconButtonProps {
	drawerType?: DrawerType;
	dialogType?: DialogType;
	linkUrl?: string;
	icon: React.ReactNode;
	data?: DrawerData | SheetData | DialogData;
	onClick?: () => void;
}

const IconButton = ({
	drawerType,
	dialogType,
	linkUrl,
	icon,
	data,
	onClick: onClickProp,
}: IconButtonProps) => {
	const { mainDrawer, nestedDrawer } = useDrawer();
	const { onOpen: onOpenDialog } = useDialog();
	const router = useRouter();

	const onClick = () => {
		if (onClickProp) {
			onClickProp();
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
