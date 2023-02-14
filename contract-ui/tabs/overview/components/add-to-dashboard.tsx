import { useEVMContractInfo } from "@3rdweb-sdk/react/hooks/useActiveChainId";
import { useAddContractMutation } from "@3rdweb-sdk/react/hooks/useRegistry";
import {
  useContractList,
  useMultiChainRegContractList,
} from "@3rdweb-sdk/react/hooks/useSDK";
import { Flex, Icon } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react/evm";
import { TransactionButton } from "components/buttons/TransactionButton";
import { useTrack } from "hooks/analytics/useTrack";
import { useTxNotifications } from "hooks/useTxNotifications";
import { getDashboardChainRpc } from "lib/rpc";
import { useMemo, useState } from "react";
import { FiCheck } from "react-icons/fi";
import { Button, Card, Text } from "tw-components";

const TRACKING_CATEGORY = "add_to_dashboard_upsell";

type AddToDashboardCardProps = {
  contractAddress: string;
};

export const AddToDashboardCard: React.FC<AddToDashboardCardProps> = ({
  contractAddress,
}) => {
  const chain = useEVMContractInfo()?.chain;
  const addContract = useAddContractMutation();
  const trackEvent = useTrack();
  const walletAddress = useAddress();

  const oldRegistryContractList = useContractList(
    chain?.chainId || -1,
    chain ? getDashboardChainRpc(chain) : "",
    walletAddress,
  );

  const newRegistryContractList = useMultiChainRegContractList(walletAddress);

  const [addedToDashboard, setAddedToDashboard] = useState(false);

  const isAlreadyOnDashboard = useMemo(() => {
    const onOldRegistry =
      oldRegistryContractList.isFetched &&
      oldRegistryContractList.data?.find(
        (c) => c.address === contractAddress,
      ) &&
      oldRegistryContractList.isSuccess;

    const onNewRegistry =
      newRegistryContractList.isFetched &&
      newRegistryContractList.data?.find(
        (c) => c.address === contractAddress,
      ) &&
      newRegistryContractList.isSuccess;

    return onOldRegistry || onNewRegistry || addedToDashboard;
  }, [
    addedToDashboard,
    contractAddress,
    newRegistryContractList.data,
    newRegistryContractList.isFetched,
    newRegistryContractList.isSuccess,
    oldRegistryContractList.data,
    oldRegistryContractList.isFetched,
    oldRegistryContractList.isSuccess,
  ]);

  const statusUnknown = useMemo(() => {
    return (
      !oldRegistryContractList.isFetched || !newRegistryContractList.isFetched
    );
  }, [newRegistryContractList.isFetched, oldRegistryContractList.isFetched]);

  const { onSuccess: onAddSuccess, onError: onAddError } = useTxNotifications(
    "Successfully added to dashboard",
    "Failed to add to dashboard",
  );

  if (!walletAddress) {
    return null;
  }

  return (
    <Card as={Flex} flexDirection="column" gap={4}>
      <Text size="body.sm" lineHeight={1.25}>
        Add this contract to your dashboard to easily access it again later.
      </Text>
      <Flex>
        {isAlreadyOnDashboard ? (
          <Button
            size="sm"
            w="full"
            leftIcon={<Icon as={FiCheck} />}
            colorScheme="green"
            isDisabled
          >
            On your dashboard
          </Button>
        ) : (
          <Flex direction="column" gap={1} w="full" align="center">
            <TransactionButton
              transactionCount={1}
              size="sm"
              w="full"
              colorScheme="blue"
              isLoading={addContract.isLoading || statusUnknown}
              isDisabled={!chain?.chainId || isAlreadyOnDashboard}
              onClick={() => {
                if (!chain) {
                  return;
                }
                trackEvent({
                  category: TRACKING_CATEGORY,
                  action: "add-to-dashboard",
                  label: "attempt",
                  contractAddress,
                });
                addContract.mutate(
                  {
                    contractAddress,
                    chainId: chain.chainId,
                  },
                  {
                    onSuccess: () => {
                      onAddSuccess();
                      trackEvent({
                        category: TRACKING_CATEGORY,
                        action: "add-to-dashboard",
                        label: "success",
                        contractAddress,
                      });
                      setAddedToDashboard(true);
                    },
                    onError: (err) => {
                      onAddError(err);
                      trackEvent({
                        category: TRACKING_CATEGORY,
                        action: "add-to-dashboard",
                        label: "error",
                        contractAddress,
                        error: err,
                      });
                    },
                  },
                );
              }}
            >
              Add to dashboard
            </TransactionButton>
            <Text size="body.sm" opacity={0.6}>
              This action is gasless.
            </Text>
          </Flex>
        )}
      </Flex>
    </Card>
  );
};
