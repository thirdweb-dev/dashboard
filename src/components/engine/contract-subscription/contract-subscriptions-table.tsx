import {
  EngineContractSubscription,
  useEngineSubscriptionsLastBlock,
  useEngineUnsubcribeContractSubscription,
} from "@3rdweb-sdk/react/hooks/useEngine";
import {
  Flex,
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Tooltip,
  UseDisclosureReturn,
  useDisclosure,
} from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { ChainIcon } from "components/icons/ChainIcon";
import { TWTable } from "components/shared/TWTable";
import { format } from "date-fns";
import { useTrack } from "hooks/analytics/useTrack";
import { useAllChainsData } from "hooks/chains/allChains";
import { useTxNotifications } from "hooks/useTxNotifications";
import { thirdwebClient } from "lib/thirdweb-client";
import { useEffect, useState } from "react";
import { FiInfo, FiTrash } from "react-icons/fi";
import { defineChain, eth_getBlockByNumber, getRpcClient } from "thirdweb";
import { Button, Card, FormLabel, LinkButton, Text } from "tw-components";

interface ContractSubscriptionTableProps {
  instanceUrl: string;
  contractSubscriptions: EngineContractSubscription[];
  isLoading: boolean;
  isFetched: boolean;
  autoUpdate: boolean;
}

const columnHelper = createColumnHelper<EngineContractSubscription>();

export const ContractSubscriptionTable: React.FC<
  ContractSubscriptionTableProps
> = ({
  instanceUrl,
  contractSubscriptions,
  isLoading,
  isFetched,
  autoUpdate,
}) => {
  const removeDisclosure = useDisclosure();
  const [selectedContractSub, setSelectedContractSub] =
    useState<EngineContractSubscription>();
  const { chainIdToChainRecord } = useAllChainsData();

  const columns = [
    columnHelper.accessor("chainId", {
      header: "Chain",
      cell: (cell) => {
        const chain = chainIdToChainRecord[parseInt(cell.getValue())];
        return (
          <Flex align="center" gap={2}>
            <ChainIcon size={12} ipfsSrc={chain?.icon?.url} />
            <Text>{chain.name}</Text>
          </Flex>
        );
      },
    }),
    columnHelper.accessor("contractAddress", {
      header: "Contract Address",
      cell: (cell) => {
        const { chainId } = cell.row.original;
        const chain = chainIdToChainRecord[parseInt(chainId)];
        const explorer = chain?.explorers?.[0];

        return (
          <LinkButton
            variant="ghost"
            isExternal
            size="xs"
            href={explorer ? `${explorer.url}/address/${cell.getValue()}` : "#"}
            fontFamily="mono"
          >
            {cell.getValue()}
          </LinkButton>
        );
      },
    }),
    columnHelper.accessor("lastIndexedBlock", {
      header: "Latest Block",
      cell: (cell) => {
        const { chainId } = cell.row.original;
        return (
          <ChainLastBlock
            instanceUrl={instanceUrl}
            chainId={chainId}
            autoUpdate={autoUpdate}
          />
        );
      },
    }),
  ];

  return (
    <>
      <TWTable
        title="contract subscriptions"
        data={contractSubscriptions}
        columns={columns}
        isLoading={isLoading}
        isFetched={isFetched}
        onMenuClick={[
          {
            icon: FiTrash,
            text: "Remove",
            onClick: (contractSub) => {
              setSelectedContractSub(contractSub);
              removeDisclosure.onOpen();
            },
            isDestructive: true,
          },
        ]}
      />

      {selectedContractSub && removeDisclosure.isOpen && (
        <RemoveModal
          contractSub={selectedContractSub}
          disclosure={removeDisclosure}
          instanceUrl={instanceUrl}
        />
      )}
    </>
  );
};

const ChainLastBlockTimestamp = ({
  chainId,
  blockNumber,
}: {
  chainId: string;
  blockNumber: bigint;
}) => {
  const rpcRequest = getRpcClient({
    client: thirdwebClient,
    chain: defineChain(parseInt(chainId)),
  });
  const [lastBlockTimestamp, setLastBlockTimestamp] = useState<Date | null>(
    null,
  );

  // Get the block timestamp to display how delayed the last processed block is.
  useEffect(() => {
    (async () => {
      try {
        const block = await eth_getBlockByNumber(rpcRequest, {
          blockNumber,
          includeTransactions: false,
        });
        setLastBlockTimestamp(new Date(Number(block.timestamp) * 1000));
      } catch (e) {
        console.error("Failed to get block details:", e);
      }
    })();
  }, [rpcRequest, blockNumber]);

  if (!lastBlockTimestamp) {
    return null;
  }

  return (
    <Card bgColor="backgroundHighlight">
      <Text>{format(lastBlockTimestamp, "PP pp z")}</Text>
    </Card>
  );
};

const ChainLastBlock = ({
  instanceUrl,
  chainId,
  autoUpdate,
}: {
  instanceUrl: string;
  chainId: string;
  autoUpdate: boolean;
}) => {
  const lastBlockQuery = useEngineSubscriptionsLastBlock(
    instanceUrl,
    chainId,
    autoUpdate,
  );
  if (!lastBlockQuery.data) {
    return null;
  }

  return (
    <Flex gap={2} align="center">
      <Text>{lastBlockQuery.data}</Text>
      <Tooltip
        borderRadius="md"
        bg="transparent"
        boxShadow="none"
        label={
          <ChainLastBlockTimestamp
            chainId={chainId}
            blockNumber={BigInt(lastBlockQuery.data)}
          />
        }
        shouldWrapChildren
        placement="auto"
      >
        <FiInfo />
      </Tooltip>
    </Flex>
  );
};

const RemoveModal = ({
  contractSub,
  disclosure,
  instanceUrl,
}: {
  contractSub: EngineContractSubscription;
  disclosure: UseDisclosureReturn;
  instanceUrl: string;
}) => {
  const { mutate: unsubscribeContractSub } =
    useEngineUnsubcribeContractSubscription(instanceUrl);
  const trackEvent = useTrack();
  const { onSuccess, onError } = useTxNotifications(
    "Successfully removed contract subscription.",
    "Failed to remove contract subscription.",
  );
  const { chainIdToChainRecord } = useAllChainsData();

  const onClick = () => {
    unsubscribeContractSub(
      {
        chainId: contractSub.chainId,
        contractAddress: contractSub.contractAddress,
      },
      {
        onSuccess: () => {
          onSuccess();
          disclosure.onClose();
          trackEvent({
            category: "engine",
            action: "remove-contract-subscription",
            label: "success",
            instance: instanceUrl,
          });
        },
        onError: (error) => {
          onError(error);
          trackEvent({
            category: "engine",
            action: "remove-contract-subscription",
            label: "error",
            instance: instanceUrl,
            error,
          });
        },
      },
    );
  };

  return (
    <Modal isOpen={disclosure.isOpen} onClose={disclosure.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Remove Contract Subscription</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            <Text>
              This action will delete all stored data for this contract
              subscription.
            </Text>
            <Card as={Flex} flexDir="column" gap={4}>
              <FormControl>
                <FormLabel>Chain</FormLabel>
                <Flex align="center" gap={2}>
                  <ChainIcon
                    size={12}
                    ipfsSrc={
                      chainIdToChainRecord[parseInt(contractSub.chainId)].icon
                        ?.url
                    }
                  />
                  <Text>
                    {chainIdToChainRecord[parseInt(contractSub.chainId)].name}
                  </Text>
                </Flex>
              </FormControl>
              <FormControl>
                <FormLabel>Contract Address</FormLabel>
                <Text fontFamily="mono">{contractSub.contractAddress}</Text>
              </FormControl>
            </Card>
          </Stack>
        </ModalBody>
        <ModalFooter as={Flex} gap={3}>
          <Button type="button" onClick={disclosure.onClose} variant="ghost">
            Cancel
          </Button>
          <Button type="submit" colorScheme="red" onClick={onClick}>
            Remove
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
