import { type ApiKey, useApiKeys } from "@3rdweb-sdk/react/hooks/useApi";
import { useLoggedInUser } from "@3rdweb-sdk/react/hooks/useLoggedInUser";
import { AppLayout } from "components/app-layouts/app";
import { ApiKeyDetails } from "components/settings/ApiKeys/Details";
import { EditApiKey } from "components/settings/ApiKeys/Edit";
import { ConnectWalletPrompt } from "components/settings/ConnectWalletPrompt";
import { SettingsSidebar } from "core-ui/sidebar/settings";
import { useRouter } from "next/router";
import { PageId } from "page-id";
import { useEffect, useState } from "react";
import type { ThirdwebNextPage } from "utils/types";

const SettingsApiKeyPage: ThirdwebNextPage = () => {
	const [apiKey, setApiKey] = useState<ApiKey | null>(null);
	const [editing, setEditing] = useState(false);
	const keysQuery = useApiKeys();
	const router = useRouter();
	const { user } = useLoggedInUser();

	useEffect(() => {
		if (keysQuery?.data) {
			const activeKey = keysQuery?.data.find(
				(key) => key.id === router.query.id,
			);

			if (!activeKey) {
				router.push("/dashboard/settings/api-keys");
				return;
			}
			setApiKey(activeKey);
		}
	}, [keysQuery?.data, router]);

	if (!user) {
		return <ConnectWalletPrompt />;
	}

	if (!apiKey) {
		return null;
	}

	return editing ? (
		<EditApiKey apiKey={apiKey} onCancel={() => setEditing(false)} />
	) : (
		<ApiKeyDetails apiKey={apiKey} onEdit={() => setEditing(true)} />
	);
};

SettingsApiKeyPage.getLayout = (page, props) => (
	<AppLayout {...props} hasSidebar={true}>
		<SettingsSidebar activePage="apiKey" />
		{page}
	</AppLayout>
);

SettingsApiKeyPage.pageId = PageId.SettingsApiKey;

export default SettingsApiKeyPage;
