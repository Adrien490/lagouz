"use client";

import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import useDrawer from "@/hooks/use-drawer";
import { NeverHaveIEverCardSchema } from "@/lib/schemas";
import { X } from "lucide-react";
import Image from "next/image";
import { z } from "zod";
import NeverHaveIEverCardForm from "./never-have-i-ever-card-form";

interface NeverHaveIEverCardFormDrawerProps {
	handleCreate: (values: z.infer<typeof NeverHaveIEverCardSchema>) => void;
	handleUpdate: (values: z.infer<typeof NeverHaveIEverCardSchema>) => void;
}

const NeverHaveIEverCardFormDrawer = ({
	handleCreate,
	handleUpdate,
}: NeverHaveIEverCardFormDrawerProps) => {
	const { nestedDrawer } = useDrawer();
	const open = nestedDrawer.type === "neverHaveIEverCardFormDrawer";
	return (
		<Drawer
			open={open}
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
					<NeverHaveIEverCardForm
						initialValues={nestedDrawer.data.card}
						handleSubmit={(values) => {
							if ("id" in values) {
								handleUpdate(values);
							} else {
								handleCreate(values);
							}
						}}
					/>
				</div>
			</DrawerContent>
		</Drawer>
	);
};

export default NeverHaveIEverCardFormDrawer;
