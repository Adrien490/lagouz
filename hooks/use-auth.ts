import auth from "@/lib/auth";
import { useEffect, useState } from "react";

const useAuth = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkAuth = async () => {
			const { isAuthenticated } = await auth();
			setIsAuthenticated(isAuthenticated);
			setLoading(false);
		};

		checkAuth();
	}, []);

	return { isAuthenticated, loading };
};

export default useAuth;
