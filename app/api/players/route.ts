import db from "@/lib/db"; // Assurez-vous que db est configuré correctement pour Prisma

export async function GET() {
	try {
		const players = await db.player.findMany();
		return Response.json(players);
	} catch (error) {
		console.error("Failed to fetch players:", error);
		return Response.json({ error: "Failed to fetch players" });
	}
}
