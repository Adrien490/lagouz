import db from "@/lib/db"; // Assurez-vous que db est configuré correctement pour Prisma

export async function GET() {
	try {
		const cards = await db.neverHaveIEverCard.findMany();
		return Response.json(cards);
	} catch (error) {
		console.error("Failed to fetch cards:", error);
		return Response.json({ error: "Failed to fetch cards" });
	}
}
