import { Flex, SimpleGrid } from "@chakra-ui/react";
import { Text } from "tw-components";

export const Sponsors: React.FC = () => {
  return (
    <Flex w="full" pb={20} flexDir="column">
      <Text size="label.md" textAlign="center">
        OUR SPONSORS
      </Text>
      <SimpleGrid
        columns={4}
        gap={4}
        flexDir={{ base: "column", md: "row" }}
        alignContent="center"
      >
        <Text fontSize="32px">Sponsor A</Text>
        <Text fontSize="32px">Sponsor B</Text>
        <Text fontSize="32px">Sponsor C</Text>
        <Text fontSize="32px">Sponsor D</Text>
      </SimpleGrid>
    </Flex>
  );
};
