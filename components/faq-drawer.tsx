"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import useDrawer from "@/hooks/use-drawer";
import { X } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

const FAQDrawer = () => {
	const { mainDrawer } = useDrawer();
	const open = mainDrawer.type === "FAQ";
	return (
		<Drawer open={open} onClose={mainDrawer.onClose}>
			<DrawerContent className="h-[95dvh] px-4">
				<div className="flex flex-col h-full">
					<DrawerHeader className="flex justify-between items-center">
						<div className="flex flex-col gap-2 justify-center">
							<div className="flex gap-2">
								<DrawerTitle className="flex gap-2 text-left text-xl font-bold">
									FAQ
								</DrawerTitle>
								<Image
									className=""
									priority
									src="/icons/question-mark.svg"
									height={20}
									width={20}
									alt="Follow us on Twitter"
								/>
							</div>

							<DrawerDescription className="text-left italic">
								Vous trouverez ici les réponses aux questions qu&apos;on me pose
								souvent
							</DrawerDescription>
						</div>

						<Button
							onMouseDown={mainDrawer.onClose}
							variant="ghost"
							size="icon"
							className="h-12 w-12 shrink-0 rounded-full"
						>
							<X />
							<span className="sr-only">Ajouter</span>
						</Button>
					</DrawerHeader>
					<ScrollArea className="overflow-y-auto pb-8">
						<Accordion type="single" collapsible className="mx-4">
							<AccordionItem value="item-1">
								<AccordionTrigger>
									<div className="flex gap-2 items-center text-lg py-2 justify-start">
										Pourquoi La Gouz ?
										<Image
											priority
											src="/icons/thinking-face.svg"
											height={20}
											width={20}
											alt="Follow us on Twitter"
										/>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<ScrollArea className="max-h-[400px] overflow-y-auto w-full">
										<div className="overflow-clip">
											<p className="text-sm">
												C&apos;est une{" "}
												<span className="font-bold">excellente question</span>{" "}
												qui mérite d&apos;être répondue.
												<br /> <br />
												Un beau jour j&apos;étais au bar en train de boire une
												ou deux bières (oui oui).
												<br />
												Cela faisait plusieurs semaines que je cherchais un nom,
												sans succès.
												<br /> <br />
												<span className="font-bold">Soudain!!</span> une idée
												m&apos;est venue.
												<br />
												Pourquoi ne pas demander l&apos;avis de Camille G, plus
												communément appelée la Gouz, qui fêtait son anniversaire
												ce jour là ?
												<br />
												Après moult réflexions et moult verres, j&apos;ai décidé
												(je sais toujours pas pourquoi) d&apos;appeler cette
												application <span className="font-bold">La Gouz</span>.
												<br />
												<br />
												Depuis, j&apos;ai décidé d&apos;arrêter l&apos;alcool
												pour ne plus prendre de décisions hâtives.
											</p>
										</div>
									</ScrollArea>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-2">
								<AccordionTrigger>
									<div className="flex gap-2 items-center text-lg py-2 justify-start">
										Qu&apos;attendre de La Gouz ?
										<Image
											priority
											src="/icons/sparkles.svg"
											height={20}
											width={20}
											alt="Follow us on Twitter"
										/>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									Yes. It comes with default styles that matches the other
									components&apos; aesthetic.
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-3">
								<AccordionTrigger>
									<div className="flex gap-2 items-center text-lg py-2 justify-start">
										Les cocktails sont gratuits ??
										<Image
											priority
											src="/icons/tropical-drink.svg"
											height={20}
											width={20}
											alt="Follow us on Twitter"
										/>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									Yes. It&apos;s animated by default, but you can disable it if
									you prefer.
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</ScrollArea>
				</div>
			</DrawerContent>
		</Drawer>
	);
};

export default FAQDrawer;
