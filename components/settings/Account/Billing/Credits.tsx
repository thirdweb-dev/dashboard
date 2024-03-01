import { Flex } from "@chakra-ui/react";
import { Heading, Text, Card } from "tw-components";
import { useAccountCredits } from "@3rdweb-sdk/react/hooks/useApi";
import { format } from "date-fns";

const formatToDollars = (cents: number) => {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  }).format(cents);
};

export const BillingCredits = ({ }) => {
  const { data: credits } = useAccountCredits();

  console.log({ credits });

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
            <Text color="bgBlack">{credit.name}</Text>
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
                  {format(
                    new Date(credit.expiryDate as string),
                    "MMM dd, yyyy",
                  )}
                </Text>
              </Flex>
            </Flex>
          </Card>
        ))}
      </Flex>
    </Flex>
  );
};
