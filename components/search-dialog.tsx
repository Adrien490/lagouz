"use client";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useDebounce } from "@/hooks/use-debounce";
import { useDialog } from "@/hooks/use-dialog";
import { useSearch } from "@/hooks/use-search";
import Image from "next/image";
import { useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const SearchDialog = () => {
	const { isOpen, type, onClose } = useDialog();
	const { search, setSearch } = useSearch();
	const debouncedSearch = useDebounce(search, 500); // Use the debounce hook with a delay of 500ms
	const open = isOpen && type === "search";

	const onSearch = (search: string) => {
		setSearch(search);
	};

	useEffect(() => {
		setSearch(debouncedSearch);
	}, [debouncedSearch, setSearch]);

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader className="flex justify-between items-center gap-">
					<DialogTitle className="text-xl font-bold flex gap-2">
						Ajouter un filtre
					</DialogTitle>
				</DialogHeader>
				<div className="flex flex-col mt-4 gap-6 items-center">
					<div className="flex gap-4">
						<Input
							placeholder="Rechercher..."
							value={search}
							onChange={(e) => onSearch(e.target.value)}
						/>
					</div>
					<Button
						onClick={() => {
							onClose();
						}}
						className="flex gap-2 text-lg border-2 border-white"
						variant="ghost"
					>
						Valider
						<Image
							src="/icons/confirmed.svg"
							alt="Valider"
							width={20}
							height={20}
						/>
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default SearchDialog;
