"use client";

import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import useDrawer from "@/hooks/use-drawer";
import { X } from "lucide-react";
import Image from "next/image";
import NeverHaveIEverCardForm from "./never-have-i-ever-card-form";

const NeverHaveIEverCardFormDrawer = () => {
	const { nestedDrawer } = useDrawer();
	return (
		<Drawer
			open={nestedDrawer.type === "neverHaveIEverCardFormDrawer"}
			onClose={() => {
				nestedDrawer.onClose();
			}}
			shouldScaleBackground={true}
		>
			<DrawerContent>
				<DrawerHeader className="flex justify-between items-center">
					<DrawerTitle className="flex gap-2">
						Je n&apos;ai jamais...
						<Image
							src="/icons/playing-cards.svg"
							alt="Heart Pulse"
							width={30}
							height={30}
						/>
					</DrawerTitle>
					<Button
						onMouseDown={nestedDrawer.onClose}
						variant="ghost"
						size="icon"
						className="h-12 w-12 shrink-0 rounded-full"
					>
						<X />
					</Button>
				</DrawerHeader>

				<div className="px-4 mt-4 mb-4">
					<NeverHaveIEverCardForm initialValues={nestedDrawer.data.card} />
				</div>
			</DrawerContent>
		</Drawer>
	);
};

export default NeverHaveIEverCardFormDrawer;
