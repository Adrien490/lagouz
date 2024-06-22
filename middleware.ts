import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
	// Récupérer le token de session depuis les cookies
	const sessionToken = req.cookies.get("sessionToken");

	// Définir l'URL cible si l'utilisateur est connecté
	const targetUrl = new URL("/games", req.url);

	// Vérifier si le token de session existe
	if (sessionToken) {
		// Rediriger vers /games si le token de session est présent
		return NextResponse.redirect(targetUrl);
	}

	// Continuer vers la page demandée si le token de session n'est pas présent
	return NextResponse.next();
}

// Appliquer le middleware uniquement à la page d'accueil
export const config = {
	matcher: "/",
};
