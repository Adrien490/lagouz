"use client";
import NeverHaveIEverCardList from "@/app/never-have-i-ever/_components/never-have-i-ever-card-list";
import Search from "@/components/search";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDialog } from "@/hooks/use-dialog";
import useDrawer from "@/hooks/use-drawer";
import { useSearch } from "@/hooks/use-search";
import createNeverHaveIEverCard from "@/lib/actions/create-never-have-i-ever-card";
import deleteNeverHaveIEverCard from "@/lib/actions/delete-never-have-i-ever-card";
import updateNeverHaveIEverCard from "@/lib/actions/update-never-have-i-ever-card";
import { NeverHaveIEverCardSchema } from "@/lib/schemas";
import { NeverHaveIEverCard } from "@prisma/client";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { z } from "zod";
import NeverHaveIEverCardFormDrawer from "./never-have-i-ever-card-form-drawer";

const NeverHaveIEverCardDrawer = () => {
	const { mainDrawer, nestedDrawer } = useDrawer();
	const openMain = mainDrawer.type === "cardManagerDrawer";
	const [cards, setCards] = useState<NeverHaveIEverCard[]>([]);
	const [filteredCards, setFilteredCards] = useState<NeverHaveIEverCard[]>([]);
	const { onOpen } = useDialog();
	const { search } = useSearch();

	useEffect(() => {
		setFilteredCards(
			cards.filter((card) =>
				card.name.toLowerCase().includes(search.toLowerCase())
			)
		);
	}, [cards, search]);

	useEffect(() => {
		const fetchCards = async () => {
			try {
				const response = await fetch("/api/never-have-i-ever-cards");
				if (!response.ok) {
					throw new Error("Erreur lors de la récupération des cartes");
				}
				const cards = await response.json();
				setCards(cards);
				setFilteredCards(cards);
			} catch (error) {
				console.error("Failed to fetch cards:", error);
			}
		};
		fetchCards();
	}, []);

	const handleDelete = async (card: NeverHaveIEverCard) => {
		const formData = new FormData();
		formData.append("id", card.id.toString());
		try {
			await deleteNeverHaveIEverCard(formData);
			setCards((prevCards) => prevCards.filter((c) => c.id !== card.id));
		} catch (error) {
			console.error("Failed to delete card:", error);
		}
	};

	const handleCreate = async (
		card: z.infer<typeof NeverHaveIEverCardSchema>
	) => {
		const formData = new FormData();
		formData.append("name", card?.name ?? "");
		formData.append("categoryId", card?.categoryId.toString() ?? "");

		const result = await createNeverHaveIEverCard(formData);
		if ("error" in result) {
			console.error("Failed to create card:", result.error);
			return;
		}

		setCards((prevCards) => [...prevCards, result]);
		nestedDrawer.onClose();
	};

	const handleUpdate = async (
		card: z.infer<typeof NeverHaveIEverCardSchema>
	) => {
		const formData = new FormData();
		formData.append("id", card?.id?.toString() ?? "");
		formData.append("name", card?.name ?? "");
		formData.append("categoryId", card?.categoryId?.toString() ?? "");

		const result = await updateNeverHaveIEverCard(formData);
		if ("error" in result) {
			console.error("Failed to update card:", result.error);
			return;
		}
		setCards((prevCards) =>
			prevCards.map((c) => (c.id === card.id ? result : c))
		);
		nestedDrawer.onClose();
	};

	const onCreateButtonClick = () => {
		nestedDrawer.onOpen("neverHaveIEverCardFormDrawer");
	};

	const onUpdateButtonClick = (card: NeverHaveIEverCard) => {
		nestedDrawer.onOpen("neverHaveIEverCardFormDrawer", { card });
	};

	const onDeleteButtonClick = (card: NeverHaveIEverCard) => {
		onOpen("confirmation", {
			title: "Tu es sur ?",
			message: "Tu veux vraiment supprimer cette carte ?",
			onConfirm: () => {
				handleDelete(card);
			},
		});
	};

	return (
		<Drawer
			dismissible={true}
			shouldScaleBackground={true}
			open={openMain}
			onClose={mainDrawer.onClose}
		>
			<DrawerContent className="flex flex-col h-[95dvh]">
				<DrawerHeader className="flex flex-col gap-4 pt-0 pb-2">
					<div className="flex justify-between items-center">
						<DrawerTitle className="flex gap-2 items-center">
							Je n&apos;ai jamais...
							<Image
								src="/icons/playing-cards.svg"
								alt="Playing cards"
								width={30}
								height={30}
							/>
						</DrawerTitle>
						<Button
							onMouseDown={mainDrawer.onClose}
							variant="ghost"
							size="icon"
							className="h-12 w-12 shrink-0 rounded-full"
						>
							<X />
						</Button>
					</div>
					<div className="flex justify-between items-center">
						<p className="text-sm font-bold">({filteredCards.length} cartes)</p>
						<Search />
					</div>
				</DrawerHeader>
				<ScrollArea className="overflow-y-auto grow">
					{filteredCards.length > 0 ? (
						<NeverHaveIEverCardList
							onDeleteButtonClick={onDeleteButtonClick}
							onUpdateButtonClick={onUpdateButtonClick}
							cards={filteredCards}
						/>
					) : (
						<div className="flex justify-center items-center h-full">
							<p className="text-foreground italic">Aucune carte trouvée</p>
						</div>
					)}
				</ScrollArea>

				<div className="flex justify-center items-center py-2 px-4">
					<Button
						className="py-6 text-lg font-bold border-4 border-white bg-[#FF0086] w-full"
						variant="ghost"
						onClick={onCreateButtonClick}
					>
						Ajouter une carte
					</Button>
				</div>

				<NeverHaveIEverCardFormDrawer
					handleCreate={handleCreate}
					handleUpdate={handleUpdate}
				/>
			</DrawerContent>
		</Drawer>
	);
};

export default NeverHaveIEverCardDrawer;
