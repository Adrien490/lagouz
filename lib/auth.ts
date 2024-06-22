"use server";

import { cookies } from "next/headers";

// Fonction asynchrone pour vérifier si l'utilisateur est authentifié
const auth = async () => {
	// Récupère le cookie "sessionToken"
	const sessionToken = cookies().get("sessionToken");

	return {
		isAuthenticated: sessionToken ? true : false,
	};
};

export default auth;
