import {
  Flex,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { useChainId } from "@thirdweb-dev/react";
import { TransactionButton } from "components/buttons/TransactionButton";
import { NetworkSelectorButton } from "components/selects/NetworkSelectorButton";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Heading, Text } from "tw-components";

type ImportModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const defaultValues = {
  contractAddress: "",
};

export const ImportModal: React.FC<ImportModalProps> = (props) => {
  const form = useForm({
    defaultValues,
  });

  const onClose = useCallback(() => {
    form.reset(defaultValues);
    props.onClose();
  }, [form, props]);

  const router = useRouter();
  const chainId = useChainId();

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Modal isOpen={props.isOpen} onClose={onClose} isCentered size="lg">
      <ModalOverlay />
      <ModalContent
        as="form"
        onSubmit={form.handleSubmit((data) => {
          router.push(
            `/${chainId || 1}/${data.contractAddress}?import=true&add=true`,
          );
          setIsLoading(true);
        })}
        p={8}
        rounded="lg"
      >
        <Flex gap={6} direction="column">
          <Flex gap={1} direction="column">
            <Heading size="title.sm">Import Contract</Heading>
            <Text color="faded">
              Import an already deployed contract into thirdweb by entering a
              contract address below.
            </Text>
          </Flex>
          <Flex gap={3} direction="column">
            <Input
              placeholder="Contract address"
              {...form.register("contractAddress")}
            />

            <NetworkSelectorButton />
          </Flex>
          <TransactionButton
            ml="auto"
            colorScheme="primary"
            type="submit"
            transactionCount={1}
            isLoading={isLoading}
            isGasless
          >
            Import
          </TransactionButton>
        </Flex>
      </ModalContent>
    </Modal>
  );
};
