import { useApiAuthToken } from "@3rdweb-sdk/react/hooks/useApi";
import { Flex } from "@chakra-ui/react";
import {
  ContractsByOwnerIdQueryVariables,
  useContractsByOwnerIdQuery,
} from "graphql/queries/__generated__/ContractsByOwnerId.generated";
import { Card } from "tw-components";
import { PaymentContracts } from "../payment-contracts";

export const ContractsList: React.FC = () => {
  const { paymentsSellerId } = useApiAuthToken();
  const { data, error, loading, previousData, refetch } =
    useContractsByOwnerIdQuery({
      variables: {
        ownerId: paymentsSellerId,
      } as ContractsByOwnerIdQueryVariables,
    });

  console.log({ data });

  return (
    <Flex flexDir="column" gap={4}>
      <PaymentContracts />
      {data?.contract?.map((c) => {
        return (
          <Card key={c.id}>
            {c.id}: {c.display_name}
          </Card>
        );
      })}
    </Flex>
  );
};
