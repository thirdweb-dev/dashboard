import { validPaymentsChainIdsMainnets } from "@3rdweb-sdk/react/hooks/usePayments";
import { Center, Stack } from "@chakra-ui/react";
import { EnablePaymentsButton } from "components/payments/enable-payments-button";
import { Card, Heading, Text } from "tw-components";

interface NoPaymentsEnabledProps {
  contractAddress: string;
  chainId?: number;
}

export const NoPaymentsEnabled: React.FC<NoPaymentsEnabledProps> = ({
  contractAddress,
  chainId,
}) => {
  const isMainnet = validPaymentsChainIdsMainnets.includes(chainId ?? 0);

  return (
    <Card p={8} bgColor="backgroundCardHighlight" my={6}>
      <Center as={Stack} spacing={4}>
        <Stack spacing={2}>
          <Heading size="title.sm" textAlign="center">
            No payments enabled
          </Heading>
          <Text>
            {isMainnet
              ? "You need to KYC first before being able to enable payments on mainnet"
              : "You need to enable payments first to be able to create a checkout"}
          </Text>
        </Stack>
        {chainId && !isMainnet && (
          <EnablePaymentsButton
            contractAddress={contractAddress}
            chainId={chainId}
          />
        )}
      </Center>
    </Card>
  );
};
