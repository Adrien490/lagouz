"use client";

import NeverHaveIEverCardDrawer from "@/app/never-have-i-ever/_components/never-have-i-ever-card-drawer";
import GameDrawer from "@/app/never-have-i-ever/_components/never-have-i-ever-drawer";
import ConfirmationDialog from "@/components/confirmation-dialog";
import FAQDrawer from "@/components/faq-drawer";
import PlayerListDrawer from "@/components/player-list-drawer";
import SearchDialog from "@/components/search-dialog";

const ModalProvider = () => {
	return (
		<>
			<PlayerListDrawer />
			<FAQDrawer />
			<GameDrawer />
			<NeverHaveIEverCardDrawer />
			<ConfirmationDialog />
			<SearchDialog />
		</>
	);
};

export default ModalProvider;
