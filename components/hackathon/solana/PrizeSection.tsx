import { Center, Divider, Flex, HStack } from "@chakra-ui/react";
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
      flexDir="row"
      gap={4}
    >
      {prizes.map(({ title, prize }, i) => (
        <>
          <Flex flexDir="column" key={title} align="center">
            <Heading size="title.lg">{prize}</Heading>
            <Text mt={1} size="label.lg" color="gray.500">
              {title}
            </Text>
          </Flex>
          {i < prizes.length - 1 && (
            <Center height={14}>
              <Divider orientation="vertical" />
            </Center>
          )}
        </>
      ))}
    </HStack>
  );
};
