import { AppLayout } from "components/app-layouts/app";
import { PaymentsSidebar } from "core-ui/sidebar/payments";
import { PageId } from "page-id";
import { ThirdwebNextPage } from "utils/types";

const PaymentsSettings: ThirdwebNextPage = () => {
  return <div>Payments Settings</div>;
};

PaymentsSettings.getLayout = (page, props) => (
  <AppLayout {...props} hasSidebar={true}>
    <PaymentsSidebar activePage="settings" />
    {page}
  </AppLayout>
);

PaymentsSettings.pageId = PageId.PaymentsSettings;

export default PaymentsSettings;
