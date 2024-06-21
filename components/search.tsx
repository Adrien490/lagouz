"use client";

import { useDialog } from "@/hooks/use-dialog";
import { useSearch } from "@/hooks/use-search";
import { SearchIcon, X } from "lucide-react";
import { useEffect } from "react";
import { Button } from "./ui/button";

const Search = () => {
	const { search, setSearch } = useSearch();
	const { onOpen } = useDialog();

	const onDeleteFilter = () => {
		setSearch("");
	};

	useEffect(() => {
		setSearch(search);
	}, [search, setSearch]);

	return (
		<>
			{search ? (
				<div className="max-w-[150px] border rounded-lg px-4 flex items-center justify-between">
					<p className="text-sm italic truncate">{search}</p>
					<Button className="pr-0" variant="ghost" onClick={onDeleteFilter}>
						<X className="text-red-300" />
					</Button>
				</div>
			) : (
				<Button
					variant="ghost"
					className="flex text-sm gap-2 rounded-xl border-l border-b border-white/10"
					onClick={() => onOpen("search")}
				>
					Rechercher <SearchIcon className="w-4 h-4" />
				</Button>
			)}
		</>
	);
};

export default Search;
