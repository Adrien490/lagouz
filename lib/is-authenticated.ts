"use server";

import { cookies } from "next/headers";

// Fonction asynchrone pour vérifier si l'utilisateur est authentifié
const isAuthenticated = async () => {
	// Récupère le cookie "sessionToken"
	const sessionToken = cookies().get("sessionToken");
	// Retourne true si le cookie existe, sinon false
	return sessionToken ? true : false;
};

export default isAuthenticated;
