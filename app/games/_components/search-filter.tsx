"use client";

import { Button } from "@/components/ui/button";
import { useDialog } from "@/hooks/use-dialog";
import { SearchIcon, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SearchFilter = () => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();
	const search = searchParams.get("search") || "";
	const { onOpen } = useDialog();

	const onDeleteFilter = () => {
		const params = new URLSearchParams(searchParams);
		if (params.has("search")) {
			params.delete("search");
			router.push(`${pathname}`);
		}
	};

	return (
		<>
			{search ? (
				<div
					onClick={onDeleteFilter}
					className="cursor-pointer max-w-[150px] border rounded-lg px-4 flex items-center justify-between"
				>
					<p className="text-sm italic truncate">{search}</p>
					<Button className="pr-0" variant="ghost">
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

export default SearchFilter;
