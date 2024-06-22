import { useEffect, useState } from "react";

const useAdmin = () => {
	const [isAdmin, setIsAdmin] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkAdminStatus = async () => {
			try {
				const response = await fetch("/api/check-admin", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
				});

				const result = await response.json();
				if (result.isAdmin) {
					setIsAdmin(true);
				}
			} catch (error) {
				console.error(
					"Erreur lors de la vérification de l'administrateur",
					error
				);
			}

			setLoading(false);
		};

		checkAdminStatus();
	}, []);

	return { isAdmin, loading };
};

export default useAdmin;
