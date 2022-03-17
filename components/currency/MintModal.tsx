import {
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { parseUnits, formatUnits } from "@ethersproject/units";
import { useActiveCurrencyModule } from "context/sdk/modules/currency-context";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useId } from "react-id-generator";
import { CurrencyTokenSchema, CurrencyTokenInput } from "schema/tokens";
import { useEthers } from "@usedapp/core";

interface IMintModal {
  isOpen: boolean;
  onClose: () => void;
}
export const MintModal: React.FC<IMintModal> = ({ isOpen, onClose }) => {
  const [currentBalance, setCurrentBalance] = useState<string>();

  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CurrencyTokenSchema),
  });

  const [isMinting, setIsMinting] = useState(false);
  const [formId] = useId(1, "currency-mint-form");

  const { module, items, refresh } = useActiveCurrencyModule((c) => c);
  const item = items.length > 0 ? items[0] : null;

  const onSubmit: (data: CurrencyTokenInput) => Promise<void> = useCallback(
    async (data) => {
      console.log("onSubmit", data);
      if (!module || !item) {
        console.log("!module or !item");
        return;
      }

      setIsMinting(true);

      try {
        await module?.mint(parseUnits(data.amount, item?.decimals));
        await refresh();
      } catch (err) {
        console.error("minting failed!", err);
      } finally {
        setIsMinting(false);

        onClose();
      }
    },
    [module, item, onClose, refresh],
  );

  React.useEffect(() => {
    if (!module) {
      return;
    }
    module.balance().then((bal) => setCurrentBalance(bal.displayValue));
  }, [module]);

  return (
    <Modal isCentered size="4xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader as={Heading}>Mint More Currency</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {item ? (
            <HStack spacing={8}>
              <Center flexGrow={1}>
                <Stack spacing={2}>
                  <Heading size="sm">Total Supply</Heading>
                  <Text>{formatUnits(item.totalSupply, item.decimals)}</Text>

                  <Heading size="sm">Contract Balance</Heading>
                  <Text>{currentBalance}</Text>
                </Stack>
              </Center>

              <Stack width="50%">
                <form id={formId} onSubmit={handleSubmit(onSubmit)}>
                  <FormControl isRequired isInvalid={!!errors.amount}>
                    <FormLabel>Amount</FormLabel>
                    <Input step="any" type="number" {...register("amount")} />
                    <FormErrorMessage>
                      {errors?.amount?.message}
                    </FormErrorMessage>
                  </FormControl>
                </form>
              </Stack>
            </HStack>
          ) : (
            <Spinner />
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            isLoading={isMinting}
            type="submit"
            form={formId}
            colorScheme="teal"
            mr={3}
          >
            Mint
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
