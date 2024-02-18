import { EngineInstance } from "@3rdweb-sdk/react/hooks/useEngine";
import { useLoggedInUser } from "@3rdweb-sdk/react/hooks/useLoggedInUser";
import { AppLayout } from "components/app-layouts/app";
import { EngineInstancesList } from "components/company-settings/states/engine-list";
import { CompanySettingsNavigation } from "components/company-settings/company-settings-navigation";
import { EngineNoConnectedWallet } from "components/company-settings/states/no-connected-wallet";
import { PageId } from "page-id";
import { useState } from "react";
import { ThirdwebNextPage } from "utils/types";
import { SettingsSidebar } from "core-ui/sidebar/settings";

const CompanySettings: ThirdwebNextPage = () => {
  const { isLoggedIn } = useLoggedInUser();
  const [connectedInstance, setConnectedInstance] = useState<
    EngineInstance | undefined
  >();

  if (!isLoggedIn) {
    return <EngineNoConnectedWallet />;
  }

  if (connectedInstance) {
    return (
      <CompanySettingsNavigation
        instance={connectedInstance}
        setConnectedInstance={setConnectedInstance}
      />
    );
  }

  return <EngineInstancesList setConnectedInstance={setConnectedInstance} />;
};

CompanySettings.getLayout = (page, props) => (
  <AppLayout {...props} hasSidebar={true}>
    <SettingsSidebar activePage="billing" />
    {page}
  </AppLayout>
);

CompanySettings.pageId = PageId.CompanySettings;

export default CompanySettings;
