import { AppLayout } from "components/app-layouts/app";
import { ContractsList } from "components/payments/contracts/overview/contracts-list";
import { PaymentsSidebar } from "core-ui/sidebar/payments";
import { PageId } from "page-id";
import { Link } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const PaymentsContracts: ThirdwebNextPage = () => {
  return (
    <div>
      Payments Contracts Index
      <br />
      <ContractsList />
      {/* new link */}
      <Link href="/dashboard/payments/contracts/new">New / Import </Link>
    </div>
  );
};

PaymentsContracts.getLayout = (page, props) => (
  <AppLayout {...props} hasSidebar={true}>
    <PaymentsSidebar activePage="contracts" />
    {page}
  </AppLayout>
);

PaymentsContracts.pageId = PageId.PaymentsContracts;

export default PaymentsContracts;
