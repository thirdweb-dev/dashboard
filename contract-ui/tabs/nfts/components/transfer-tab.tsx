import { FormControl, Icon, Input, Stack } from "@chakra-ui/react";
import { NFTContract, useTransferNFT } from "@thirdweb-dev/react";
import { Erc1155 } from "@thirdweb-dev/sdk";
import { TransactionButton } from "components/buttons/TransactionButton";
import { constants } from "ethers";
import { useTxNotifications } from "hooks/useTxNotifications";
import React from "react";
import { useForm } from "react-hook-form";
import { IoMdSend } from "react-icons/io";
import { FormErrorMessage, FormHelperText, FormLabel } from "tw-components";

interface TransferTabProps {
  contract: NFTContract | undefined;
  tokenId: string;
}

export const TransferTab: React.FC<TransferTabProps> = ({
  contract,
  tokenId,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ to: string; amount: string }>({
    defaultValues: { to: "", amount: "1" },
  });

  const transfer = useTransferNFT(contract);

  const { onSuccess, onError } = useTxNotifications(
    "Transfer successful",
    "Error transferring",
  );

  const requiresAmount = contract instanceof Erc1155;
  console.log({ contract });

  return (
    <Stack pt={3}>
      <form
        onSubmit={handleSubmit((data) => {
          transfer.mutate(
            {
              tokenId,
              to: data.to,
              amount: data.amount,
            },
            {
              onError,
              onSuccess: () => {
                onSuccess();
              },
            },
          );
        })}
      >
        <Stack align="center">
          <Stack spacing={6} w="100%" direction={{ base: "column", md: "row" }}>
            <FormControl isRequired isInvalid={!!errors.to}>
              <FormLabel>To Address</FormLabel>
              <Input placeholder={constants.AddressZero} {...register("to")} />
              <FormHelperText>Enter the address to transfer to.</FormHelperText>
              <FormErrorMessage>{errors.to?.message}</FormErrorMessage>
            </FormControl>
            {requiresAmount && (
              <FormControl isRequired={requiresAmount} isInvalid={!!errors.to}>
                <FormLabel>Amount</FormLabel>
                <Input placeholder={"1"} {...register("amount")} />
                <FormHelperText>
                  How many would you like to transfer?
                </FormHelperText>
                <FormErrorMessage>{errors.to?.message}</FormErrorMessage>
              </FormControl>
            )}
          </Stack>
          <TransactionButton
            transactionCount={1}
            isLoading={transfer.isLoading}
            type="submit"
            colorScheme="primary"
          >
            Transfer
          </TransactionButton>
        </Stack>
      </form>
    </Stack>
  );
};
