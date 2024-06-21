"use client";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useDialog } from "@/hooks/use-dialog";
import Image from "next/image";
import { Button } from "./ui/button";

const ConfirmationDialog = () => {
	const { isOpen, type, onClose, data } = useDialog();
	const open = isOpen && type === "confirmation";
	const title = data.title;
	const message = data.message;
	const handleConfirm = () => {
		if (data.onConfirm) {
			data.onConfirm();
		}
		onClose();
	};
	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent>
				<div className="flex flex-col px-4 justify-center">
					<DialogHeader className="flex justify-between items-center">
						<DialogTitle className="text-xl font-bold">
							{title ? title : "Confirmation"}
						</DialogTitle>
					</DialogHeader>
					<div className="flex flex-col mt-4 gap-6 items-center">
						<p className="text-md font-medium text-center">{message}</p>
						<div className="flex gap-4">
							<Button
								className="py-8 rounded-full bg-[#D51013] border-white border-4"
								onClick={onClose}
							>
								<div className="flex gap-2 items-center">
									<span className="text-lg font-bold">Non</span>
									<Image
										priority
										src="/icons/negative-squared-cross-mark.svg"
										height={20}
										width={20}
										alt="Cross Mark"
									/>
								</div>
							</Button>
							<Button
								className="py-8 rounded-full border-white border-4"
								onClick={handleConfirm}
							>
								<div className="flex gap-2 items-center">
									<span className="text-lg font-bold">Oui</span>
									<Image
										priority
										src="/icons/confirmed.svg"
										height={20}
										width={20}
										alt="Confirmed"
									/>
								</div>
							</Button>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ConfirmationDialog;
