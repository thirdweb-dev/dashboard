import { FormControl, Input, Stack } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useClaimNFT } from "@thirdweb-dev/react/solana";
import type { NFTCollection, NFTDrop } from "@thirdweb-dev/sdk/solana";
import { TransactionButton } from "components/buttons/TransactionButton";
import { useTrack } from "hooks/analytics/useTrack";
import { useTxNotifications } from "hooks/useTxNotifications";
import { useForm } from "react-hook-form";
import { FormErrorMessage, FormHelperText, FormLabel } from "tw-components";

interface ClaimTabProps {
  program: NFTDrop;
  tokenId: string;
}

export const ClaimTab: React.FC<ClaimTabProps> = ({ program, tokenId }) => {
  const trackEvent = useTrack();
  const solWallet = useWallet();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<{ to: string; amount: string }>({
    defaultValues: { to: solWallet.publicKey?.toBase58() || "", amount: "1" },
  });

  const claim = useClaimNFT(program);

  const { onSuccess, onError } = useTxNotifications(
    "Claim successful",
    "Error claiming",
  );
  return (
    <Stack pt={3}>
      <form
        onSubmit={handleSubmit((data) => {
          trackEvent({
            category: "nft",
            action: "claim",
            label: "attempt",
          });
          claim.mutate(data, {
            onSuccess: () => {
              trackEvent({
                category: "nft",
                action: "claim",
                label: "success",
              });
              onSuccess();
              reset();
            },
            onError: (error) => {
              trackEvent({
                category: "nft",
                action: "claim",
                label: "error",
                error,
              });
              onError(error);
            },
          });
        })}
      >
        <Stack gap={3}>
          <Stack spacing={6} w="100%" direction={{ base: "column", md: "row" }}>
            <FormControl isRequired isInvalid={!!errors.to}>
              <FormLabel>To Address</FormLabel>
              <Input
                placeholder={PublicKey.default.toBase58()}
                {...register("to")}
              />
              <FormHelperText>Enter the address to claim to.</FormHelperText>
              <FormErrorMessage>{errors.to?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.to}>
              <FormLabel>Amount</FormLabel>
              <Input
                type="number"
                placeholder="1"
                {...register("amount")}
              />
              <FormHelperText>Enter the amount of NFTs to claim.</FormHelperText>
              <FormErrorMessage>{errors.amount?.message}</FormErrorMessage>
            </FormControl>
          </Stack>
          <TransactionButton
            ecosystem="solana"
            transactionCount={1}
            isLoading={claim.isLoading}
            type="submit"
            colorScheme="primary"
            alignSelf="flex-end"
          >
            Claim
          </TransactionButton>
        </Stack>
      </form>
    </Stack>
  );
};
