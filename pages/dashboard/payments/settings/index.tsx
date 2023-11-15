import { useAccount } from "@3rdweb-sdk/react/hooks/useApi";
import { Flex } from "@chakra-ui/react";
import { AppLayout } from "components/app-layouts/app";
import { PaymentsSettingsAccount } from "components/payments/settings/payment-settings-account";
import { PaymentsSettingsChecklist } from "components/payments/settings/payment-settings-checklist";
import { PaymentsSidebar } from "core-ui/sidebar/payments";
import { PageId } from "page-id";
import { ThirdwebNextPage } from "utils/types";

const PaymentsSettings: ThirdwebNextPage = () => {
  const { data: account } = useAccount();

  return (
    <Flex flexDir="column" gap={8}>
      {account?.id && <PaymentsSettingsChecklist accountId={account.id} />}
      {account?.id && <PaymentsSettingsAccount accountId={account.id} />}
    </Flex>
  );
};

PaymentsSettings.getLayout = (page, props) => (
  <AppLayout {...props} hasSidebar={true}>
    <PaymentsSidebar activePage="settings" />
    {page}
  </AppLayout>
);

PaymentsSettings.pageId = PageId.PaymentsSettings;

export default PaymentsSettings;
