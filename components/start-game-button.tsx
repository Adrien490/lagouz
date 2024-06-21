"use client";

import { Button } from "@/components/ui/button";
import useDrawer from "@/hooks/use-drawer";
import Link from "next/link";

interface StartGameButtonProps {
	href: string;
}

const StartGameButton = ({ href }: StartGameButtonProps) => {
	const { mainDrawer } = useDrawer();
	return (
		<Link onClick={mainDrawer.onClose} href={href}>
			<Button className="w-full py-4 text-lg border" variant="default">
				Jouer maintenant !
			</Button>
		</Link>
	);
};

export default StartGameButton;
