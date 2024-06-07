import { AppLayout } from "components/app-layouts/app";
import { SettingsSidebar } from "core-ui/sidebar/settings";
import { PageId } from "page-id";
import { ThirdwebNextPage } from "utils/types";
import { AccountStatus, useAccount } from "@3rdweb-sdk/react/hooks/useApi";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useLoggedInUser } from "@3rdweb-sdk/react/hooks/useLoggedInUser";
import { Billing } from "components/settings/Account/Billing";
import { BillingConnectWalletPrompt } from "components/settings/Account/Billing/ConnectWallet";

const SettingsBillingPage: ThirdwebNextPage = () => {
  const { isLoggedIn, isLoading } = useLoggedInUser();
  const meQuery = useAccount({
    refetchInterval: (account) =>
      [
        AccountStatus.InvalidPayment,
        AccountStatus.InvalidPaymentMethod,
      ].includes(account?.status as AccountStatus)
        ? 1000
        : false,
  });

  const { query, replace } = useRouter();
  const { data: account } = meQuery;

  const { payment_intent, source_redirect_slug } = query;

  useEffect(() => {
    if (payment_intent || source_redirect_slug) {
      replace("/dashboard/settings/billing");
    }
  }, [payment_intent, replace, source_redirect_slug]);

  if (!isLoading && !isLoggedIn) {
    return <BillingConnectWalletPrompt />;
  }

  if (!account) {
    return null;
  }

  return <Billing account={account} />;
};

SettingsBillingPage.pageId = PageId.SettingsUsage;

SettingsBillingPage.getLayout = (page, props) => (
  <AppLayout {...props} hasSidebar={true}>
    <SettingsSidebar activePage="billing" />

    {page}
  </AppLayout>
);

export default SettingsBillingPage;
