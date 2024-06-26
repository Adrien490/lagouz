import ModalProvider from "@/providers/modal-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "La Gouz",
	description: "La meilleure app pour animer vos soirées !",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="fr">
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/icon.ico" sizes="any" />
			</head>
			<body className={inter.className}>
				<div className="relative lg:container h-full mx-auto">
					<Toaster />
					<ModalProvider />
					{children}
				</div>
			</body>
		</html>
	);
}
