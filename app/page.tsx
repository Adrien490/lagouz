import GameList from "@/components/game-list";
import IconButton from "@/components/icon-button";
import Logo from "@/components/logo";
import PlayerListDrawer from "@/components/player-list-drawer";
import db from "@/lib/db";
import { cn } from "@/lib/utils";
import { MessageCircleQuestion, Users2 } from "lucide-react";

const Page = async () => {
	const players = await db.player.findMany();

	return (
		<div className="h-full flex flex-col px-4">
			<div
				className={cn(
					"h-14 py-2 flex items-center bg-background justify-between opacity-95 z-20"
				)}
			>
				<Logo />
				<div className="flex items-center gap-2">
					<IconButton drawerType="playerListDrawer" icon={<Users2 />} />
					<IconButton drawerType="FAQ" icon={<MessageCircleQuestion />} />
				</div>
			</div>
			<GameList />
			<PlayerListDrawer players={players} />
		</div>
	);
};

export default Page;
