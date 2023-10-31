import { Flex } from "@chakra-ui/react";
import { Card, Heading, Text } from "tw-components";
import { usePaymentsEnabledContracts } from "@3rdweb-sdk/react/hooks/usePayments";
import { AddressCopyButton } from "tw-components/AddressCopyButton";

export const EnabledContracts = () => {
  const { data } = usePaymentsEnabledContracts();

  return (
    <Flex flexDir="column" gap={6}>
      <Heading size="title.md">Enabled Contracts</Heading>
      {data?.contract?.map((c) => (
        <Card key={c.id} as={Flex} flexDir="column" gap={4}>
          <Flex flexDir="column">
            <Text color="bgBlack">{c.display_name}</Text>
            <Text>{c.chain}</Text>
          </Flex>
          <Flex gap={6}>
            <Flex flexDir="column" gap={1}>
              <Text>Contract ID</Text>
              <AddressCopyButton address={c.id} size="xs" title="contract ID" />
            </Flex>
            <Flex flexDir="column" gap={1}>
              <Text>Contract Address</Text>
              <AddressCopyButton address={c.address} size="xs" />
            </Flex>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};
