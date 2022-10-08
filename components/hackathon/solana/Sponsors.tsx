import { Flex, VStack } from "@chakra-ui/react";
import { Text } from "tw-components";

export const Sponsors: React.FC = () => {
  return (
    <VStack w="full" borderBottom="1px solid #FFFFFF1A" pb={20}>
      <Text>OUR SPONSORS</Text>
      <Flex
        w="full"
        justify="space-between"
        align="center"
        mt={4}
        px={20}
        flexDir={{ base: "column", md: "row" }}
      >
        <Text fontSize="32px">Sponsor A</Text>
        <Text fontSize="32px">Sponsor B</Text>
        <Text fontSize="32px">Sponsor C</Text>
        <Text fontSize="32px">Sponsor D</Text>
        <Text fontSize="32px">Sponsor E</Text>
      </Flex>
    </VStack>
  );
};
