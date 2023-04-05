/* eslint-disable no-restricted-imports */
import { Container, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { FC } from "react";

const Why: FC = () => {
  return (
    <Container
      maxW={{
        base: "full",
        md: "55%",
      }}
      display="flex"
      flexDirection="column"
      gap={16}
    >
      <Heading
        fontSize="56px"
        w="min"
        bgGradient="linear(to-r, #743F9E, #BFA3DA)"
        bgClip="text"
        alignSelf="center"
      >
        Why?
      </Heading>
      <Flex
        p={0}
        fontSize="32px"
        position="relative"
        direction="column"
        fontWeight="bold"
        lineHeight="120%"
      >
        <Text color="white">
          2022 was a difficult year for crypto. <br />
          For those that continued building,
        </Text>
        <Text
          bgGradient="linear(to-r, #4830A4, #9786DF)"
          bgClip="text"
          w="fit-content"
          mt={0}
        >
          We salute you.{" "}
        </Text>
        <Image
          src="/assets/bear-market-airdrop/Ellipse-100.png"
          position="absolute"
          top={14}
          left={-4}
          alt="scribble"
          display={{
            base: "none",
            xl: "block",
          }}
        />
      </Flex>
      <Flex
        fontSize="32px"
        position="relative"
        direction="column"
        fontWeight="bold"
        lineHeight="120%"
      >
        <Text color="white">We are giving away 101,887 lootbox prizes</Text>
        <Text
          bgGradient="linear(to-r, #743F9E, #BFA3DA)"
          bgClip="text"
          w="fit-content"
          position="relative"
        >
          worth up to $25,000.
          <Image
            src="/assets/bear-market-airdrop/Ellipse 101.png"
            position="absolute"
            top={-4}
            left={0}
            alt="scribble"
            display={{
              base: "none",
              xl: "block",
            }}
          />
        </Text>
      </Flex>
      <Flex
        fontSize="32px"
        position="relative"
        direction="column"
        fontWeight="bold"
        lineHeight="120%"
      >
        <Text color="white">
          Inside each lootbox is a random reward <br />
          provided by thirdweb and our partners to
        </Text>
        <Text
          bgGradient="linear(to-r, #C35AB1, #E9A8D9)"
          bgClip="text"
          w="fit-content"
        >
          support the builders of Web3 in 2023.
        </Text>
        <Image
          src="/assets/bear-market-airdrop/Ellipse 102.png"
          position="absolute"
          top={14}
          left={-6}
          alt="scribble"
          display={{
            base: "none",
            xl: "block",
          }}
        />
      </Flex>
    </Container>
  );
};

export default Why;
