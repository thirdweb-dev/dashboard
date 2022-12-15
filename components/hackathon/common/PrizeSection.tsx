import { Center, Divider, Flex } from "@chakra-ui/react";
import React from "react";
import { Heading, Text } from "tw-components";

interface IPrizeSection {
  prizes: {
    title: string;
    prize: string;
  }[];
}

export const PrizeSection: React.FC<IPrizeSection> = ({ prizes }) => {
  return (
    <Flex flexDir="column">
      <Heading size="title.2xl" textAlign="center">
        Prizes
      </Heading>
      <Flex
        w="full"
        mb={20}
        mt={10}
        justifyContent="center"
        gap={{ base: 6, md: 8 }}
      >
        {prizes.map(({ title, prize }, i) => (
          <React.Fragment key={title}>
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
          </React.Fragment>
        ))}
      </Flex>
    </Flex>
  );
};
