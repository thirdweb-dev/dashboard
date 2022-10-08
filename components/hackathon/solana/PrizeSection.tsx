import { Flex, HStack } from "@chakra-ui/react";
import { Heading, Text } from "tw-components";

export const PrizeSection: React.FC = () => {
  const prizes = [
    {
      title: "1st Place",
      prize: "$5,000",
    },
    {
      title: "2nd Place",
      prize: "$3,000",
    },
    {
      title: "3rd Place",
      prize: "$2,000",
    },
  ];
  return (
    <HStack
      w="full"
      mt={20}
      align="center"
      mx="auto"
      justify="center"
      alignSelf="center"
      flexDir={{ base: "column", md: "row" }}
    >
      {prizes.map(({ title, prize }, i) => (
        <Flex
          flexDir="column"
          key={title}
          align="center"
          px={{ base: 0, md: 10 }}
          py={{ base: 10, md: 0 }}
          borderRight={{
            base: "none",
            md: i !== prizes.length - 1 ? "1px solid #FFFFFF1A" : undefined,
          }}
          borderBottom={{
            base: i !== prizes.length - 1 ? "1px solid #FFFFFF1A" : undefined,
            md: "none",
          }}
        >
          <Heading fontSize="40px" color="white">
            {prize}
          </Heading>
          <Text mt={1} fontSize="32px" fontWeight={500} color="#FFFFFF99">
            {title}
          </Text>
        </Flex>
      ))}
    </HStack>
  );
};
