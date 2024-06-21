import { DrawerType } from "@/hooks/use-drawer";

export type Game = {
	id: number;
	name: string;
	slug: string;
	rules: string;
	imageUrl: string;
	description: string;
	drawerType: DrawerType;
};

const games: Game[] = [
	{
		id: 1,
		name: "Je n'ai jamais",
		slug: "never-have-i-ever",
		rules: "Découvrez les vérités cachées de vos amis !",
		imageUrl: "/jenaijamais.png",
		description: "Découvrez les vérités cachées de vos amis !",
		drawerType: "neverHaveIEverDrawer",
	},
	{
		id: 2,
		name: "Black Stories",
		slug: "black-stories",
		rules: "Découvrez les vérités cachées de vos amis !",
		imageUrl: "/blackstories.jpg",
		description:
			"Explorez des scénarios sombres et mystérieux, mettant à l'épreuve vos capacités de déduction et votre imagination.",
		drawerType: "neverHaveIEverDrawer",
	},
	{
		id: 3,
		name: "Action ou vérité",
		slug: "action-ou-verite",
		rules: "Découvrez les vérités cachées de vos amis !",
		imageUrl: "/actionouverite.webp",
		description:
			"Sortez de votre zone de confort ! Renforcer les liens entre amis et créer des souvenirs mémorables.",
		drawerType: "neverHaveIEverDrawer",
	},
	{
		id: 4,
		name: "Juduku",
		slug: "juduku",
		rules: "Découvrez les vérités cachées de vos amis !",
		imageUrl: "/juduku.jpeg",
		description: "Pimentez vos soirées !",
		drawerType: "neverHaveIEverDrawer",
	},
	{
		id: 5,
		name: "Qui dans la pièce",
		slug: "qui-dans-la-piece",
		rules: "Découvrez les vérités cachées de vos amis !",
		imageUrl: "/quidanslapiece.jpeg",
		description:
			"Deviner des caractéristiques ou des histoires concernant les personnes présentes. Parfait pour briser la glace!",
		drawerType: "neverHaveIEverDrawer",
	},
];

export default games;
