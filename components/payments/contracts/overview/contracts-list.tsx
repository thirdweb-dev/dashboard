import { useApiAuthToken } from "@3rdweb-sdk/react/hooks/useApi";
import { Flex } from "@chakra-ui/react";
import {
  ContractsByOwnerIdQueryVariables,
  useContractsByOwnerIdQuery,
} from "graphql/queries/__generated__/ContractsByOwnerId.generated";
import { Card } from "tw-components";

export const ContractsList: React.FC = () => {
  const { paymentsSellerId } = useApiAuthToken();
  const { data, error, loading, previousData, refetch } =
    useContractsByOwnerIdQuery({
      variables: {
        ownerId: paymentsSellerId,
      } as ContractsByOwnerIdQueryVariables,
    });
  return (
    <Flex flexDir="column" gap={4}>
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
