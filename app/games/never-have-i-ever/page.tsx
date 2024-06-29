import { neverHaveIEverCategories } from "@/data/categories";
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
	let categoryId: number | undefined = undefined;
	let cards;
	const allCards = await db.neverHaveIEverCard.findMany({
		where: {
			name: {
				contains: searchParams.search,
			},
		},
	});

	try {
		if (categorySlug) {
			const category = neverHaveIEverCategories.find(
				(category) => category.slug === categorySlug
			);

			if (category) {
				categoryId = category.id;
			}
		}
		if (categoryId === undefined) {
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

	return (
		<NeverHaveIEverWrapper
			allCards={allCards}
			neverHaveIEverCards={cards.sort(() => Math.random() - 0.5)}
		/>
	);
};

export default Page;
