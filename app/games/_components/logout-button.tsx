"use client";

import { Button } from "@/components/ui/button";
import { useDialog } from "@/hooks/use-dialog";
import logout from "@/lib/actions/logout";
import { LogOut } from "lucide-react";
import { useAction } from "next-safe-action/hooks";

const Logout = () => {
	const { execute, result, isExecuting } = useAction(logout);
	const { onOpen, onClose } = useDialog();
	const handleLogout = () => {
		onOpen("confirmation", {
			confirmationDialogProps: {
				title: "Déconnexion",
				message: "Voulez-vous vous déconnecter ?",
				onConfirm: () => {
					execute();
				},
			},
		});
	};
	return (
		<Button variant="ghost" className="p-1" onClick={handleLogout}>
			<LogOut />
		</Button>
	);
};

export default Logout;
