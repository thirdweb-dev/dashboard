import { Flex } from "@chakra-ui/react";
import { useGetAllCheckoutQuery } from "graphql/queries/__generated__/GetAllCheckout.generated";
import { Card } from "tw-components";

export const PurchasesList: React.FC = () => {
  const checkouts = useGetAllCheckoutQuery();

  return (
    <Flex flexDir="column" gap={4}>
      {checkouts.data?.checkout?.map((c) => {
        return (
          <Card key={c.owner_id}>
            <Flex key={c.owner_id} flexDir="column">
              <div>
                <b>owner: </b>
                {c.owner_id}
              </div>
              <div>
                <b>chain: </b>
                {c.contract_chain}
              </div>
              <div>
                <b>created at: </b>
                {c.created_at}
              </div>
            </Flex>
          </Card>
        );
      })}
    </Flex>
  );
};
