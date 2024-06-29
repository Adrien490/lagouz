import GameList from "@/app/games/_components/game-list";
import PlayerListDrawer from "@/app/games/_components/player-list-drawer";
import IconButton from "@/components/icon-button";
import LoginButton from "@/components/login-button";
import LoginDrawer from "@/components/login-drawer";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import auth from "@/lib/auth";
import db from "@/lib/db";
import { cn } from "@/lib/utils";
import { Lock, MessageCircleQuestion, Users2 } from "lucide-react";
import LogoutButton from "./_components/logout-button";
import NeverHaveIEverDrawer from "./never-have-i-ever/_components/never-have-i-ever-drawer";

const Page = async () => {
	const players = await db.player.findMany();
	const { isAuthenticated } = await auth();

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
					{isAuthenticated ? (
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
			<NeverHaveIEverDrawer />
			{!isAuthenticated && <LoginDrawer />}
		</div>
	);
};

export default Page;
