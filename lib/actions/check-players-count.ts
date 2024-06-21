"use server";
//check if the numlber of players is > 2
// server action

import prisma from "@/lib/db";

const checkPlayersCount = async () => {
	const players = await prisma.player.findMany();
	if (players.length > 2) {
		return true;
	} else {
		return false;
	}
};

export default checkPlayersCount;
