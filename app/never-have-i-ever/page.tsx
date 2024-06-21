import { NeverHaveIEverCategories } from "@/data/categories";
import db from "@/lib/db";
import NeverHaveIEverWrapper from "./_components/never-have-i-ever-wrapper";

const Page = async ({
	params,
	searchParams,
}: {
	params: { id: string };
	searchParams: { [key: string]: string };
}) => {
	const categorySlug = searchParams.category;
	let categoryId: number | null = null;
	let cards;

	try {
		if (categorySlug) {
			const category = NeverHaveIEverCategories.find(
				(category) => category.slug === categorySlug
			);

			if (category) {
				categoryId = category.id;
			}
		}
		if (categoryId === 0) {
			cards = await db.neverHaveIEverCard.findMany();
		} else {
			cards = categoryId
				? await db.neverHaveIEverCard.findMany({
						where: {
							categoryId: categoryId,
						},
				  })
				: await db.neverHaveIEverCard.findMany();
		}
	} catch (error) {
		console.error("Database error:", error);
		return <div>Error loading cards</div>;
	}

	return <NeverHaveIEverWrapper neverHaveIEverCards={cards} />;
};

export default Page;
