import { useApiAuthToken } from "@3rdweb-sdk/react/hooks/useApi";
import { Card } from "@chakra-ui/react";
import { AppLayout } from "components/app-layouts/app";
import { PaymentsSidebar } from "core-ui/sidebar/payments";
import {
  ContractsByOwnerIdQueryVariables,
  useContractsByOwnerIdQuery,
} from "graphql/queries/__generated__/ContractsByOwnerId.generated";
import { PageId } from "page-id";
import { Link } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const PaymentsContracts: ThirdwebNextPage = () => {
  const { paymentsSellerId } = useApiAuthToken();
  const { data, error, loading, previousData, refetch } =
    useContractsByOwnerIdQuery({
      variables: {
        ownerId: paymentsSellerId,
      } as ContractsByOwnerIdQueryVariables,
    });

  return (
    <div>
      Payments Contracts Index
      <br />
      {data?.contract?.map((c) => {
        return (
          <Card key={c.id}>
            {c.id}: {c.display_name}
          </Card>
        );
      })}
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
