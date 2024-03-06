import { Flex } from "@chakra-ui/react";
import { Heading, Text, Card } from "tw-components";
import { useAccountCredits } from "@3rdweb-sdk/react/hooks/useApi";
import { format } from "date-fns";
import { Optimism } from "@thirdweb-dev/chains";
import { ChainIcon } from "components/icons/ChainIcon";

const formatToDollars = (cents: number) => {
  const dollars = cents / 100;
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  }).format(dollars);
};

export const BillingCredits = () => {
  const { data: credits } = useAccountCredits();

  return (
    <Flex direction="column" gap={2}>
      <Heading size="title.lg" as="h1">
        Credits
      </Heading>

      <Flex flexDir="column" gap={4}>
        <Text size="body.md">
          Your credits can be used to cover gas fees for any on-chain action.
          This includes contract deploys, contract write actions, and sponsored
          transactions through paymaster.
        </Text>
        {credits?.map((credit) => (
          <Card key={credit.name} p={6} as={Flex} flexDir="column" gap={3}>
            <Flex gap={2}>
              {credit.name.includes("OP ") && (
                <ChainIcon ipfsSrc={Optimism.icon.url} size={24} />
              )}
              <Text color="bgBlack">{credit.name}</Text>
            </Flex>
            <Flex gap={6}>
              <Flex flexDir="column" gap={1}>
                <Text>Remaining Credits</Text>
                <Text color="bgBlack">
                  {formatToDollars(credit.remainingValueUsdCents)}
                </Text>
              </Flex>
              <Flex flexDir="column" gap={1}>
                <Text>Claimed Credits (All-Time)</Text>
                <Text color="bgBlack">
                  {formatToDollars(credit.originalGrantUsdCents)}
                </Text>
              </Flex>
              <Flex flexDir="column" gap={1}>
                <Text>Expires On</Text>
                <Text color="bgBlack">
                  {format(new Date(credit.expiresAt as string), "MMM dd, yyyy")}
                </Text>
              </Flex>
            </Flex>
          </Card>
        ))}
      </Flex>
    </Flex>
  );
};
