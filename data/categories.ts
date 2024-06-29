export type Category = {
	id: number | undefined;
	name: string;
	slug: string;
	description: string;
	icon: string;
	color: string;
};

export const neverHaveIEverCategories = [
	{
		id: 1,
		name: "Hot",
		slug: "hot",
		description: "Attentions vos yeux",
		icon: "🔥",
		color: "#FF0000",
	},
	{
		id: 2,
		name: "Soft",
		slug: "soft",
		description: "C'est plus calme ici...",
		icon: "🥰",
		color: "#00FF00",
	},
	{
		id: undefined,
		name: "Aléatoire",
		slug: "aleatoire",
		description: "Aléatoire",
		icon: "🤷‍♂️",
		color: "#000000",
	},
];

export const truthOrDareCategories = [
	{
		id: 1,
		name: "Vérité",
		slug: "truth",
		description: "Vrai ou faux",
		icon: "🤷‍♂️",
		color: "#000000",
	},
	{
		id: 2,
		name: "Action",
		slug: "dare",
		description: "Défis",
		icon: "🤷‍♂️",
		color: "#000000",
	},
];
