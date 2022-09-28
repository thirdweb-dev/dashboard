import { Flex } from "@chakra-ui/react";
import { Text } from "tw-components";

export const ChainDeprecation = () => {
  return (
    <Flex
      padding="20px"
      borderRadius="xl"
      bg="red.600"
      opacity={0.8}
      direction="column"
      mb={8}
    >
      <Text color="white">
        This network is being deprecated October 5th. Please migrate your
        contract to a new network.
      </Text>
    </Flex>
  );
};
