import { useContractList } from "@3rdweb-sdk/react";
import { useRemoveContractMutation } from "@3rdweb-sdk/react/hooks/useRegistry";
import { Flex } from "@chakra-ui/react";
import {
  useActiveChainId,
  useAddress,
  useChainId,
  useContractType,
} from "@thirdweb-dev/react";
import { TransactionButton } from "components/buttons/TransactionButton";
import { useTrack } from "hooks/analytics/useTrack";
import { useTxNotifications } from "hooks/useTxNotifications";
import * as React from "react";
import { Card, Heading, Text } from "tw-components";

interface RemoveContractProps {
  contractAddress: string;
}

export const RemoveContract: React.FC<RemoveContractProps> = ({
  contractAddress,
}) => {
  const trackEvent = useTrack();
  const activeChainId = useActiveChainId();
  const address = useAddress();
  const contractList = useContractList(activeChainId || -1, address);
  const { data: contractType } = useContractType(contractAddress);
  const removeContract = useRemoveContractMutation();
  const chainId = useChainId();

  const { onSuccess, onError } = useTxNotifications(
    "Successfully removed from dashboard",
    "Failed to remove from dashboard",
  );

  const shouldShow =
    contractList.isFetched &&
    contractList.data?.find((c) => c.address === contractAddress) &&
    contractList.isSuccess;

  return shouldShow ? (
    <Card p={0}>
      <Flex direction="column">
        <Flex p={{ base: 6, md: 10 }} as="section" direction="column" gap={4}>
          <Flex direction="column" gap={1}>
            <Heading size="title.md">Remove from dashboard</Heading>
            <Text>
              Removing this contract will permanently remove it from the
              dashboard. Your contract will{" "}
              <strong>still exist on the blockchain</strong>.
            </Text>
          </Flex>
        </Flex>
        <TransactionButton
          w="full"
          mt="auto"
          justifySelf="flex-end"
          isLoading={removeContract.isLoading}
          transactionCount={1}
          colorScheme="red"
          type="submit"
          loadingText="Removing..."
          size="md"
          borderRadius="xl"
          borderTopLeftRadius="0"
          borderTopRightRadius="0"
          onClick={() => {
            trackEvent({
              category: `${
                contractType !== "custom" ? "prebuilt" : "custom"
              }-contract`,
              action: "add-to-dashboard",
              label: "attempt",
              contractAddress,
            });

            if (contractAddress) {
              if (chainId) {
                removeContract.mutate(
                  {
                    contractAddress,
                    contractType: contractType || "custom",
                    chainId,
                  },
                  {
                    onSuccess: () => {
                      onSuccess();
                      trackEvent({
                        category: `${
                          contractType !== "custom" ? "prebuilt" : "custom"
                        }-contract`,
                        action: "add-to-dashboard",
                        label: "success",
                        contractAddress,
                      });
                    },
                    onError: (err) => {
                      onError(err);
                      trackEvent({
                        category: `${
                          contractType !== "custom" ? "prebuilt" : "custom"
                        }-contract`,
                        action: "add-to-dashboard",
                        label: "error",
                        contractAddress,
                        error: err,
                      });
                    },
                  },
                );
              }
            }
          }}
        >
          Remove from dashboard
        </TransactionButton>
      </Flex>
    </Card>
  ) : null;
};
