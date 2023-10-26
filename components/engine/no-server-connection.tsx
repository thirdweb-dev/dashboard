import { Flex } from "@chakra-ui/react";
import { Card, Text } from "tw-components";

export const NoServerConnection = () => {
  return (
    <Card py={8}>
      <Flex flexDir="column" gap={4}>
        <Text textAlign="center">
          A connection with the Engine wasn&apos;t possible, please ensure the
          URL is correct and the server is up and running.
        </Text>
      </Flex>
    </Card>
  );
};
