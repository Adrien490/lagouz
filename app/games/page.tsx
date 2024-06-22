import GameList from "@/app/games/_components/game-list";
import PlayerListDrawer from "@/app/games/_components/player-list-drawer";
import IconButton from "@/components/icon-button";
import LoginButton from "@/components/login-button";
import LoginDrawer from "@/components/login-drawer";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import db from "@/lib/db";
import isAuthenticated from "@/lib/is-authenticated";
import { cn } from "@/lib/utils";
import { Lock, MessageCircleQuestion, Users2 } from "lucide-react";
import LogoutButton from "./_components/logout-button";

const Page = async () => {
	const players = await db.player.findMany();
	const isLogged = await isAuthenticated();

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
					{isLogged ? (
						<LogoutButton />
					) : (
						<LoginButton>
							<Button className="p-1" variant="ghost">
								<Lock />
							</Button>
						</LoginButton>
					)}
				</div>
			</div>
			<GameList />
			<PlayerListDrawer players={players} />
			{!isLogged && <LoginDrawer />}
		</div>
	);
};

export default Page;
