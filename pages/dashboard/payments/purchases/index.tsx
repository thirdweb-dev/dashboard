import { AppLayout } from "components/app-layouts/app";
import { PurchasesList } from "components/payments/purchases/overview/purchases-list";
import { PaymentsSidebar } from "core-ui/sidebar/payments";
import { PageId } from "page-id";
import { Link } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const PaymentsPurchases: ThirdwebNextPage = () => {
  const id = Math.random().toString(36).substring(7);
  return (
    <div>
      Payments Purchases Index
      <br />
      <br />
      {/* ID link */}
      <Link href={`/dashboard/payments/purchases/${id}`}>/ID page link</Link>
      {/* test */}
      <PurchasesList />
    </div>
  );
};

PaymentsPurchases.getLayout = (page, props) => (
  <AppLayout {...props} hasSidebar={true}>
    <PaymentsSidebar activePage="purchases" />
    {page}
  </AppLayout>
);

PaymentsPurchases.pageId = PageId.PaymentsPurchases;

export default PaymentsPurchases;
