import {
  EngineContractSubscription,
  useEngineUnsubcribeContractSubscription,
} from "@3rdweb-sdk/react/hooks/useEngine";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Flex,
  useDisclosure,
  Stack,
  FormControl,
  UseDisclosureReturn,
} from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { ChainIcon } from "components/icons/ChainIcon";
import { TWTable } from "components/shared/TWTable";
import { useAllChainsData } from "hooks/chains/allChains";
import { useState } from "react";
import { Button, FormLabel, LinkButton, Text } from "tw-components";
import { FiTrash } from "react-icons/fi";
import { useTrack } from "hooks/analytics/useTrack";
import { useTxNotifications } from "hooks/useTxNotifications";

interface ContractSubscriptionTableProps {
  instanceUrl: string;
  contractSubscriptions: EngineContractSubscription[];
  isLoading: boolean;
  isFetched: boolean;
}

const columnHelper = createColumnHelper<EngineContractSubscription>();

export const ContractSubscriptionTable: React.FC<
  ContractSubscriptionTableProps
> = ({ instanceUrl, contractSubscriptions, isLoading, isFetched }) => {
  const removeDisclosure = useDisclosure();
  const [selectedContractSub, setSelectedContractSub] =
    useState<EngineContractSubscription>();
  const { chainIdToChainRecord } = useAllChainsData();
  const columns = [
    columnHelper.accessor("chainId", {
      header: "Chain",
      cell: (cell) => {
        const { chainId } = cell.row.original;
        const chain = chainIdToChainRecord[parseInt(chainId)];
        if (chain) {
          const chainNameDisplay = (
            <Flex align="center" gap={2}>
              <ChainIcon size={12} ipfsSrc={chain?.icon?.url} />
              <Text>{chain.name}</Text>
            </Flex>
          );

          return chainNameDisplay;
        }
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
            maxW="100%"
          >
            {cell.getValue()}
          </LinkButton>
        );
      },
    }),
    columnHelper.accessor("lastIndexedBlock", {
      header: "last indexed block",
      cell: (cell) => {
        return cell.getValue();
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
    "Successfully removed relayer",
    "Failed to remove relayer",
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
            action: "unsubscribe-contract-subscription",
            label: "success",
            instance: instanceUrl,
          });
        },
        onError: (error) => {
          onError(error);
          trackEvent({
            category: "engine",
            action: "unsubscribe-contract-subscription",
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
        <ModalHeader>Unsubscribe Contract Subscription</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            <Text>
              This action will delete all indexed data from this contract. Are
              you sure you want to unsubscribe this contract?
            </Text>
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
              <Text>{contractSub.contractAddress}</Text>
            </FormControl>
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
