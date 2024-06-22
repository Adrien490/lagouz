"use client";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import useDrawer from "@/hooks/use-drawer";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "./login-form";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

const LoginDrawer = () => {
	const { mainDrawer } = useDrawer();

	return (
		<Drawer
			shouldScaleBackground={true}
			open={mainDrawer.type === "loginDrawer"}
			onClose={mainDrawer.onClose}
		>
			<DrawerContent className="flex flex-col pb-8 px-4">
				<DrawerHeader className="flex flex-col gap-2 items-center">
					<DrawerTitle className="flex gap-2">
						Saisir le mot de passe
						<Image src="/icons/lock.svg" alt="Lock" width={30} height={30} />
					</DrawerTitle>
					<DrawerDescription>
						Pour accéder à l&apos;application en mode administrateur, saisir le
						mot de passe
					</DrawerDescription>
				</DrawerHeader>
				<ScrollArea className="overflow-y-auto">
					<div className="pt-4 flex items-center flex-col">
						<LoginForm />
						<div className="flex gap-2 w-full items-center">
							<div className="bg-white/10 h-2 w-full rounded-lg"></div>
							<h4 className="text-center text-2xl">OU</h4>
							<div className="bg-white/10 h-2 w-full rounded-lg"></div>
						</div>
						<Link
							onClick={() => mainDrawer.onClose()}
							className="mt-8"
							href="/games"
						>
							<Button className="py-4 text-lg" variant="secondary">
								Continuer en mode invité
							</Button>
						</Link>
					</div>
				</ScrollArea>
			</DrawerContent>
		</Drawer>
	);
};

export default LoginDrawer;
