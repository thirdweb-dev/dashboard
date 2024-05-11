import { useEngineContractSubscription } from "@3rdweb-sdk/react/hooks/useEngine";
import { Flex, FormControl, Switch } from "@chakra-ui/react";
import { useState } from "react";
import { FormLabel, Heading, Link, Text } from "tw-components";
import { ContractSubscriptionTable } from "./contract-subscriptions-table";
import { AddContractSubscriptionButton } from "./add-contract-subscription-button";

interface EngineContractSubscriptionsProps {
  instanceUrl: string;
}

export const EngineContractSubscriptions: React.FC<
  EngineContractSubscriptionsProps
> = ({ instanceUrl }) => {
  const [autoUpdate, setAutoUpdate] = useState<boolean>(true);
  const contractSubscriptionsQuery = useEngineContractSubscription(instanceUrl);

  return (
    <Flex flexDir="column" gap={4}>
      <Flex flexDir="row" gap={2} justify="space-between">
        <Flex flexDir="column" gap={2}>
          <Heading size="title.md">Contract Subscriptions</Heading>
          <Text>
            Subscribe to event logs and transaction receipts on any contract.{" "}
            <Link
              href="https://portal.thirdweb.com/engine/features/contract-subscriptions"
              color="primary.500"
              isExternal
            >
              {" "}
              Learn more about contract subscriptions
            </Link>
            .
          </Text>
        </Flex>
        <Flex>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="auto-update" mb="0">
              Auto-Update
            </FormLabel>
            <Switch
              isChecked={autoUpdate}
              onChange={() => setAutoUpdate((val) => !val)}
              id="auto-update"
            />
          </FormControl>
        </Flex>
      </Flex>
      <ContractSubscriptionTable
        instanceUrl={instanceUrl}
        contractSubscriptions={contractSubscriptionsQuery.data ?? []}
        isLoading={contractSubscriptionsQuery.isLoading}
        isFetched={contractSubscriptionsQuery.isFetched}
        autoUpdate={autoUpdate}
      />
      <AddContractSubscriptionButton instanceUrl={instanceUrl} />
    </Flex>
  );
};
