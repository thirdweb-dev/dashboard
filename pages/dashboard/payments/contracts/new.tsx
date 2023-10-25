import { AppLayout } from "components/app-layouts/app";
import { PaymentsSidebar } from "core-ui/sidebar/payments";
import { PageId } from "page-id";
import { ThirdwebNextPage } from "utils/types";

const PaymentsContractsNew: ThirdwebNextPage = () => {
  return <div>Payments Contracts New</div>;
};

PaymentsContractsNew.getLayout = (page, props) => (
  <AppLayout {...props} hasSidebar={true}>
    <PaymentsSidebar activePage="contracts" />
    {page}
  </AppLayout>
);

PaymentsContractsNew.pageId = PageId.PaymentsContractsNew;

export default PaymentsContractsNew;
