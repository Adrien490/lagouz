"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useDialog } from "@/hooks/use-dialog";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const SearchDialog = () => {
	const { isOpen, type, onClose } = useDialog();
	const [search, setSearch] = useState("");
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();
	const open = isOpen && type === "search";

	const onSearch = (searchTerm: string) => {
		const params = new URLSearchParams(searchParams);
		if (searchTerm) {
			setSearch(searchTerm);
			params.set("search", searchTerm);
		} else {
			setSearch("");
			params.delete("search");
		}
		router.push(`${pathname}?${params.toString()}`);
	};

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
							value={search}
							placeholder="Rechercher..."
							onChange={(e) => {
								onSearch(e.target.value);
							}}
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
