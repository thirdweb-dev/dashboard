import {
  CreateEngineContractSubscription,
  useEngineAddContractSubscription,
} from "@3rdweb-sdk/react/hooks/useEngine";
import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Icon,
  FormControl,
  Input,
  UseDisclosureReturn,
} from "@chakra-ui/react";
import { useTrack } from "hooks/analytics/useTrack";
import { useTxNotifications } from "hooks/useTxNotifications";
import { useForm } from "react-hook-form";
import { Button, FormLabel } from "tw-components";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useAllChainsData } from "hooks/chains/allChains";
import { NetworkDropdown } from "components/contract-components/contract-publish-form/NetworkDropdown";
import { isAddress } from "ethers/lib/utils";

interface AddContractSubscriptionButtonProps {
  instanceUrl: string;
}

export const AddContractSubscriptionButton: React.FC<
  AddContractSubscriptionButtonProps
> = ({ instanceUrl }) => {
  const disclosure = useDisclosure();

  return (
    <>
      <Button
        onClick={disclosure.onOpen}
        variant="ghost"
        size="sm"
        leftIcon={<Icon as={AiOutlinePlusCircle} boxSize={6} />}
        colorScheme="primary"
        w="fit-content"
      >
        Add Contract Subscription
      </Button>

      {disclosure.isOpen && (
        <AddModal instanceUrl={instanceUrl} disclosure={disclosure} />
      )}
    </>
  );
};

export interface AddModalInput {
  chainId: string;
  contractAddress: string;
}

const AddModal = ({
  instanceUrl,
  disclosure,
}: {
  instanceUrl: string;
  disclosure: UseDisclosureReturn;
}) => {
  const { mutate: addContractSubscription } =
    useEngineAddContractSubscription(instanceUrl);
  const { chainIdToChainRecord } = useAllChainsData();
  const trackEvent = useTrack();
  const { onSuccess, onError } = useTxNotifications(
    "Contract Subscription created successfully.",
    "Failed to create contract subscription.",
  );

  const form = useForm<AddModalInput>({
    defaultValues: {
      chainId: "84532",
    },
  });

  const onSubmit = (data: AddModalInput) => {
    const createContractSubscriptionData: CreateEngineContractSubscription = {
      chainId: chainIdToChainRecord[parseInt(data.chainId)].chainId.toString(),
      contractAddress: data.contractAddress,
    };

    addContractSubscription(createContractSubscriptionData, {
      onSuccess: () => {
        onSuccess();
        disclosure.onClose();
        trackEvent({
          category: "engine",
          action: "add-contract-subscription",
          label: "success",
          instance: instanceUrl,
        });
      },
      onError: (error) => {
        onError(error);
        trackEvent({
          category: "engine",
          action: "add-contract-subscription",
          label: "error",
          instance: instanceUrl,
          error,
        });
      },
    });
  };

  return (
    <Modal isOpen={disclosure.isOpen} onClose={disclosure.onClose} isCentered>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={form.handleSubmit(onSubmit)}>
        <ModalHeader>Add Contract Subscription</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex flexDir="column" gap={4}>
            <FormControl isRequired>
              <FormLabel>Chain</FormLabel>
              <NetworkDropdown
                value={parseInt(form.watch("chainId"))}
                onSingleChange={(val) =>
                  form.setValue("chainId", val.toString())
                }
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Contract Address</FormLabel>
              <Input
                type="text"
                placeholder="Enter contract address to subscribe"
                {...form.register("contractAddress")}
              />
            </FormControl>
          </Flex>
        </ModalBody>

        <ModalFooter as={Flex} gap={3}>
          <Button type="button" onClick={disclosure.onClose} variant="ghost">
            Cancel
          </Button>
          <Button
            type="submit"
            colorScheme="primary"
            isDisabled={!form.formState.isValid}
          >
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

/**
 * Returns a list of valid addresses from a comma or newline-separated string.
 *
 * Example:
 *  input: 0xa5B8492D8223D255dB279C7c3ebdA34Be5eC9D85,0x4Ff9aa707AE1eAeb40E581DF2cf4e14AffcC553d
 *  output:
 *  [
 *    0xa5B8492D8223D255dB279C7c3ebdA34Be5eC9D85,
 *    0x4Ff9aa707AE1eAeb40E581DF2cf4e14AffcC553d,
 *  ]
 */
export const parseAddressListRaw = (raw: string): string[] | undefined => {
  const addresses = raw
    .split(/[,\n]/)
    .map((entry) => entry.trim())
    .filter((entry) => isAddress(entry));
  return addresses.length > 0 ? addresses : undefined;
};
