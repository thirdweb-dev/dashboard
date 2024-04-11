import { useRouter } from "next/router";
import { useEffect } from "react";

const DashboardConnect = () => {
	const router = useRouter();

	useEffect(() => {
		router.push("/dashboard/connect/playground");
	}, [router]);

	return null;
};

export default DashboardConnect;
