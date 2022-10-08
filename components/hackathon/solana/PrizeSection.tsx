import { Flex } from "@chakra-ui/react";
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
    <Flex w="full" align="center" justify="center" mt={20}>
      {prizes.map(({ title, prize }, i) => (
        <Flex
          flexDir="column"
          key={title}
          align="center"
          px={20}
          borderRight={
            i !== prizes.length - 1 ? "1px solid #FFFFFF1A" : undefined
          }
        >
          <Heading fontSize="40px" color="white">
            {prize}
          </Heading>
          <Text mt={1} fontSize="32px" fontWeight={500} color="#FFFFFF99">
            {title}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
};
