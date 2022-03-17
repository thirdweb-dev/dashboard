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
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { parseUnits, formatUnits } from "@ethersproject/units";
import { useActiveCurrencyModule } from "context/sdk/modules/currency-context";
import { BigNumber, ethers } from "ethers";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useId } from "react-id-generator";
import { CurrencyTokenSchema, CurrencyTokenInput } from "schema/tokens";
import { useEthers } from "@usedapp/core";

interface IMintModal {
  isOpen: boolean;
  onClose: () => void;
}
export const TransferModal: React.FC<IMintModal> = ({ isOpen, onClose }) => {
  const { account } = useEthers();
  const [watching, setWatching] = useState("");
  const [currentBalance, setCurrentBalance] = useState(BigNumber.from(0));

  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const [isMinting, setIsMinting] = useState(false);
  const [formId] = useId(1, "currency-mint-form");

  const { module, items, refresh } = useActiveCurrencyModule((c) => c);
  const item = items.length > 0 ? items[0] : null;

  const onSubmit: (data: { to: string; amount: string }) => Promise<void> =
    useCallback(
      async (data) => {
        if (!module || !item) {
          return;
        }

        setIsMinting(true);

        try {
          await module?.transfer(
            data.to,
            parseUnits(data.amount, item?.decimals),
          );
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
    const subscription = watch((value, { name, type }) => {
      if (name === "to") {
        if (ethers.utils.isAddress(value.to)) {
          setWatching(value.to);
          module
            ?.balanceOf(value.to)
            .then((b) => setCurrentBalance(BigNumber.from(b.value)));
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [module, watch]);

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
                  <Heading size="sm">Current Balance</Heading>
                  <Text>{formatUnits(currentBalance, item.decimals)}</Text>
                  <Heading size="sm">New Balance</Heading>
                  <Text>
                    {formatUnits(
                      currentBalance.add(
                        parseUnits(watch("amount") || "0", item.decimals),
                      ),
                      item.decimals,
                    )}
                  </Text>
                </Stack>
              </Center>

              <Stack width="50%">
                <form id={formId} onSubmit={handleSubmit(onSubmit)}>
                  <Stack spacing={4}>
                    <FormControl isRequired isInvalid={!!errors.to}>
                      <FormLabel>To Address</FormLabel>
                      <InputGroup>
                        <Input {...register("to")} />
                        <InputRightElement width="4.5rem">
                          <Button
                            maxH="1.75rem"
                            size="sm"
                            opacity={watch("to") ? 0.2 : 1.0}
                            _hover={{
                              opacity: 1.0,
                            }}
                            onClick={() => setValue("to", account || "")}
                          >
                            Fill
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>{errors?.to?.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl isRequired isInvalid={!!errors.amount}>
                      <FormLabel>Amount</FormLabel>
                      <Input step="any" type="number" {...register("amount")} />
                      <FormErrorMessage>
                        {errors?.amount?.message}
                      </FormErrorMessage>
                    </FormControl>
                  </Stack>
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
