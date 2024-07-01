"use client";

import SearchDialog from "@/app/games/_components/search-dialog";
import ConfirmationDialog from "@/components/confirmation-dialog";
import { Loader } from "@/components/loader";
import { Suspense } from "react";

const ModalProvider = () => {
	return (
		<>
			<ConfirmationDialog />
			<Suspense fallback={<Loader />}>
				<SearchDialog />
			</Suspense>
		</>
	);
};

export default ModalProvider;
