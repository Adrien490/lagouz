"use client";

import FAQDrawer from "@/app/games/_components/faq-drawer";
import SearchDialog from "@/app/games/_components/search-dialog";
import ConfirmationDialog from "@/components/confirmation-dialog";

const ModalProvider = () => {
	return (
		<>
			<FAQDrawer />
			<ConfirmationDialog />
			<SearchDialog />
		</>
	);
};

export default ModalProvider;
