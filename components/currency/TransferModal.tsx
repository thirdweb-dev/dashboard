import { useTokenData, useTokenModule } from "@3rdweb-sdk/react";
import { useWeb3 } from "@3rdweb/hooks";
import {
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { formatUnits, parseUnits } from "@ethersproject/units";
import { MismatchButton } from "components/shared/MismatchButton";
import { BigNumber, ethers } from "ethers";
import { useSingleQueryParam } from "hooks/useQueryParam";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { FiSend } from "react-icons/fi";

interface IMintModal {
  isOpen: boolean;
  onClose: () => void;
}

const FORM_ID = "TransferModal-form";

interface TransferModalFormValues {
  amount: string;
  to: string;
}

export const TransferModal: React.FC<IMintModal> = ({ isOpen, onClose }) => {
  const { address } = useWeb3();

  const tokenAddress = useSingleQueryParam("token");
  const module = useTokenModule(tokenAddress);
  const { data: item, refetch } = useTokenData(tokenAddress);

  const [currentBalance, setCurrentBalance] = useState(BigNumber.from(0));

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TransferModalFormValues>({ defaultValues: { to: address } });

  const onSubmit: (data: TransferModalFormValues) => Promise<void> =
    useCallback(
      async (data) => {
        if (!module || !item) {
          return;
        }
        try {
          await module?.transfer(
            data.to,
            parseUnits(data.amount, item?.decimals),
          );
          await refetch();
        } catch (err) {
          console.error("minting failed!", err);
        } finally {
          onClose();
        }
      },
      [module, item, refetch, onClose],
    );

  React.useEffect(() => {
    if (!module) {
      return;
    }
    const subscription = watch((value, { name }) => {
      const to = value.to;
      if (name === "to" && to !== undefined) {
        if (ethers.utils.isAddress(to)) {
          setCurrentBalance(BigNumber.from(0));
          module
            ?.balanceOf(to)
            .then((b) => setCurrentBalance(BigNumber.from(b.value)));
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [module, watch]);

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader as={Heading}>Transfer Tokens</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {item ? (
            <Stack spacing={8}>
              <Stack>
                <form id={FORM_ID} onSubmit={handleSubmit(onSubmit)}>
                  <Stack spacing={4}>
                    <FormControl isRequired isInvalid={!!errors.to}>
                      <Heading as={FormLabel} size="label.md">
                        To Address
                      </Heading>
                      <InputGroup>
                        <Input
                          fontFamily="mono"
                          fontSize="body.md"
                          {...register("to")}
                        />
                      </InputGroup>
                      <FormErrorMessage>{errors?.to?.message}</FormErrorMessage>
                    </FormControl>

                    <FormControl isRequired isInvalid={!!errors.amount}>
                      <Heading as={FormLabel} size="label.md">
                        Amount
                      </Heading>
                      <Input
                        fontFamily="mono"
                        fontSize="body.md"
                        step="any"
                        type="number"
                        {...register("amount")}
                      />
                      <FormErrorMessage>
                        {errors?.amount?.message}
                      </FormErrorMessage>
                    </FormControl>
                  </Stack>
                </form>
              </Stack>
              <Divider />
              <Stack spacing={2} opacity={watch("to") ? 1 : 0.5}>
                <Table variant="simple">
                  <TableCaption>Outcome of successful transfer</TableCaption>
                  <Thead>
                    <Tr>
                      <Th isNumeric>Current Balance</Th>
                      <Th isNumeric>New Balance</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td fontFamily="mono" isNumeric>
                        {watch("to")
                          ? formatUnits(currentBalance, item.decimals)
                          : 0}
                      </Td>
                      <Td fontFamily="mono" isNumeric>
                        {watch("to")
                          ? formatUnits(
                              currentBalance.add(
                                parseUnits(
                                  watch("amount") || "0",
                                  item.decimals,
                                ),
                              ),
                              item.decimals,
                            )
                          : 0}
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </Stack>
            </Stack>
          ) : (
            <Spinner />
          )}
        </ModalBody>

        <ModalFooter>
          <MismatchButton
            isLoading={isSubmitting}
            type="submit"
            form={FORM_ID}
            colorScheme="primary"
            rightIcon={<FiSend />}
            isDisabled={!watch("to") || !watch("amount")}
          >
            Send Transfer
          </MismatchButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
