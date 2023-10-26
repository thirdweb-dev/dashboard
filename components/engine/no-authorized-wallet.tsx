import { Flex } from "@chakra-ui/react";
import { Card, Text } from "tw-components";

export const NoAuthorizedWallet = () => {
  return (
    <Card py={8}>
      <Flex flexDir="column" gap={4}>
        <Text textAlign="center">
          You do not have permission to view this Engine instance. Please
          connect from a wallet that has permissions or add the admin of the
          Instance to give them to you.
        </Text>
      </Flex>
    </Card>
  );
};
