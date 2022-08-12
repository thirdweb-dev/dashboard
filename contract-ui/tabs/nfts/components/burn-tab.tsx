import { FormControl, Input, Stack } from "@chakra-ui/react";
import { NFTContract, useBurnNFT } from "@thirdweb-dev/react";
import { Erc1155 } from "@thirdweb-dev/sdk";
import { TransactionButton } from "components/buttons/TransactionButton";
import { useTrack } from "hooks/analytics/useTrack";
import { useTxNotifications } from "hooks/useTxNotifications";
import React from "react";
import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Text,
} from "tw-components";

interface BurnTabProps {
  contract: NFTContract | undefined;
  tokenId: string;
}

export const BurnTab: React.FC<BurnTabProps> = ({ contract, tokenId }) => {
  const trackEvent = useTrack();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ to: string; amount: string }>({
    defaultValues: { to: "", amount: "1" },
  });

  const burn = useBurnNFT(contract);

  const { onSuccess, onError } = useTxNotifications(
    "Burn successful",
    "Error burnring",
  );

  const requiresAmount = contract instanceof Erc1155;

  return (
    <Stack pt={3}>
      <form
        onSubmit={handleSubmit((data) => {
          trackEvent({
            category: "nft",
            action: "burn",
            label: "attempt",
          });
          burn.mutate(
            {
              tokenId,
              amount: data.amount,
            },
            {
              onSuccess: () => {
                trackEvent({
                  category: "nft",
                  action: "burn",
                  label: "success",
                });
                onSuccess();
              },
              onError: (error) => {
                trackEvent({
                  category: "nft",
                  action: "burn",
                  label: "error",
                  error,
                });
                onError(error);
              },
            },
          );
        })}
      >
        <Stack gap={3}>
          <Text>
            This action will not remove the token from the blockchain, but it
            will lower the total supply.
          </Text>
          <Stack spacing={6} w="100%" direction={{ base: "column", md: "row" }}>
            {requiresAmount && (
              <FormControl isRequired={requiresAmount} isInvalid={!!errors.to}>
                <FormLabel>Amount</FormLabel>
                <Input placeholder={"1"} {...register("amount")} />
                <FormHelperText>
                  How many would you like to burn?
                </FormHelperText>
                <FormErrorMessage>{errors.to?.message}</FormErrorMessage>
              </FormControl>
            )}
          </Stack>
          <TransactionButton
            transactionCount={1}
            isLoading={burn.isLoading}
            type="submit"
            colorScheme="primary"
            alignSelf="flex-end"
          >
            Burn
          </TransactionButton>
        </Stack>
      </form>
    </Stack>
  );
};
