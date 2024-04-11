import { useRouter } from "next/router";
import { useEffect } from "react";

const SettingsPage = () => {
	const router = useRouter();

	useEffect(() => {
		router.push("/dashboard/settings/api-keys");
	}, [router]);

	return null;
};

export default SettingsPage;
