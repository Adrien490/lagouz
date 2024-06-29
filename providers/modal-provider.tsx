"use client";

import FAQDrawer from "@/app/games/_components/faq-drawer";
import SearchDialog from "@/app/games/_components/search-dialog";
import ConfirmationDialog from "@/components/confirmation-dialog";
import { Loader } from "@/components/ui/loader";
import { Suspense } from "react";

const ModalProvider = () => {
	return (
		<>
			<FAQDrawer />
			<ConfirmationDialog />
			<Suspense fallback={<Loader />}>
				<SearchDialog />
			</Suspense>
		</>
	);
};

export default ModalProvider;
