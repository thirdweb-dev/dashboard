import {
  useEngineChainIndexer,
  useEngineContractSubscription,
} from "@3rdweb-sdk/react/hooks/useEngine";
import { Flex, FormControl, Switch } from "@chakra-ui/react";
import { FormLabel, Heading, Link, Text } from "tw-components";
import { ContractSubscriptionTable } from "./contract-subs-table";
import { AddContractSubscriptionButton } from "./add-contract-subs-button";
import { useState } from "react";

interface EngineContractSubscriptionsProps {
  instanceUrl: string;
}

export const EngineContractSubscriptions: React.FC<
  EngineContractSubscriptionsProps
> = ({ instanceUrl }) => {
  const [autoUpdate, setAutoUpdate] = useState<boolean>(true);
  const contractSubscriptions = useEngineContractSubscription(instanceUrl);
  const chainIndexer = useEngineChainIndexer(
    instanceUrl,
    Array.from(
      new Set((contractSubscriptions.data || []).map((sub) => sub.chainId)),
    ),
    autoUpdate,
  );

  const contractSubsOverview = (contractSubscriptions.data || []).map((sub) => {
    const chain = chainIndexer.data?.find(
      (_chain) => _chain.chainId === sub.chainId,
    );
    return {
      ...chain,
      ...sub,
    };
  });

  return (
    <Flex flexDir="column" gap={4}>
      <Flex flexDir="row" gap={2} justify="space-between">
        <Flex flexDir="column" gap={2}>
          <Heading size="title.md">Contract Subscriptions</Heading>
          <Text>
            Subscribe to any contract on any chain for on-chain events
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
          <FormControl display="flex" alignItems="right">
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
        contractSubscriptions={contractSubsOverview || []}
        isLoading={contractSubscriptions.isLoading}
        isFetched={contractSubscriptions.isFetched}
      />
      <AddContractSubscriptionButton instanceUrl={instanceUrl} />
    </Flex>
  );
};
