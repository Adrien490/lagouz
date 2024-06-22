"use client";

import FAQDrawer from "@/app/games/_components/faq-drawer";
import SearchDialog from "@/app/games/_components/search-dialog";
import GameDrawer from "@/app/games/never-have-i-ever/_components/never-have-i-ever-drawer";
import ConfirmationDialog from "@/components/confirmation-dialog";

const ModalProvider = () => {
	return (
		<>
			<FAQDrawer />
			<GameDrawer />
			<ConfirmationDialog />
			<SearchDialog />
		</>
	);
};

export default ModalProvider;
