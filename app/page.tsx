"use client";
import GameList from "@/components/game-list";
import IconButton from "@/components/icon-button";
import SparklesText from "@/components/magicui/sparkles-text";
import { cn } from "@/lib/utils";
import { MessageCircleQuestion, Users2 } from "lucide-react";

const Page = () => {
	return (
		<div className="relative h-full flex flex-col px-4 justify-between">
			<div
				className={cn(
					"h-14 px-4 flex items-center bg-background justify-between  opacity-95 z-20"
				)}
			>
				<SparklesText className="text-3xl" text="La Gouz" />
				<div className="flex items-center gap-2">
					<IconButton drawerType="playerListDrawer" icon={<Users2 />} />
					<IconButton drawerType="FAQ" icon={<MessageCircleQuestion />} />
				</div>
			</div>

			<GameList />
		</div>
	);
};

export default Page;
