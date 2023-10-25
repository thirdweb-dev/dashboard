import { AppLayout } from "components/app-layouts/app";
import { PaymentsSidebar } from "core-ui/sidebar/payments";
import { useRouter } from "next/router";
import { PageId } from "page-id";
import { ThirdwebNextPage } from "utils/types";

const PaymentsPurchasesDetail: ThirdwebNextPage = () => {
  const { query } = useRouter();
  return <div>Payments Details: {query.id}</div>;
};

PaymentsPurchasesDetail.getLayout = (page, props) => (
  <AppLayout {...props} hasSidebar={true}>
    <PaymentsSidebar activePage="purchases" />
    {page}
  </AppLayout>
);

PaymentsPurchasesDetail.pageId = PageId.PaymentsPurchasesDetail;

export default PaymentsPurchasesDetail;
