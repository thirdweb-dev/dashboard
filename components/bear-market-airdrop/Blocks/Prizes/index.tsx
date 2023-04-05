/* eslint-disable no-restricted-imports */
import Prize from "./Prize";
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { FC } from "react";

export const prizes = [
  {
    id: 1,
    name: "5 MATIC",
    rarity: "rare",
    src: "/assets/bear-market-airdrop/prizes/5-Matic.png",
    alt: "Prize: 5 MATIC",
    multiple: false,
  },
  {
    id: 2,
    name: "Lexica AI Art Pass",
    rarity: "rare",
    src: "/assets/bear-market-airdrop/prizes/lexica-ai-art-pass.png",
    alt: "Prize: Lexica AI Art Pass",
    multiple: false,
  },
];

const PrizesDisplay: FC = () => {
  return (
    <Container
      maxW={{
        base: "full",
        md: "container.page",
      }}
      // h="full"
      display="flex"
      flexDirection="column"
      gap={8}
      justifyContent="start"
    >
      <Flex
        fontSize={{
          base: "3rem",
          md: "3.5rem",
        }}
        gap={4}
        justifyContent={{
          base: "center",
          md: "center",
        }}
        mb={8}
      >
        <Heading
          fontSize={{
            base: "3rem",
            md: "3.5rem",
          }}
        >
          You could{" "}
        </Heading>
        <Heading
          display="inline-block"
          bgGradient="linear(to-r, #743F9E, #BFA3DA)"
          bgClip="text"
          w="min"
          fontSize={{
            base: "3rem",
            md: "3.5rem",
          }}
        >
          win...{" "}
        </Heading>
      </Flex>
      <Flex
        gap={24}
        justifyContent="center"
        alignItems="center"
        direction={{
          base: "column",
          md: "row",
        }}
      >
        {prizes.map((prize) => (
          <Prize key={prize.id} prize={prize} />
        ))}
      </Flex>
      <Heading
        fontSize={{
          base: "3rem",
          md: "3.5rem",
        }}
        mx="auto"
        mt={12}
      >
        All Prizes
      </Heading>
      <Flex
        gap={20}
        flexDirection={{
          base: "column",
          md: "row",
        }}
        justifyContent="center"
        mx="auto"
        mb={12}
      >
        {/* <Heading fontSize="40">All rewards</Heading> */}
        <Box>
          <Text fontWeight="bold" color="white" fontSize="x-large">
            Common
          </Text>
          <Text fontWeight="normal" fontSize="large">
            Bear Market Builder NFT
          </Text>
        </Box>

        <Box>
          <Text
            fontWeight="bold"
            bgGradient="linear(to-r, #4830A4, #9786DF)"
            bgClip="text"
            w="min-content"
            fontSize="x-large"
          >
            Rare
          </Text>
          <Text fontWeight="normal" fontSize="large">
            thirdweb pro early access NFT <br />
            1 MATIC <br />
            5 MATIC <br />
            0.1 ETH <br />
            1 ETH <br />
            1K AWS Credits
          </Text>
        </Box>

        <Box>
          <Text
            fontWeight="bold"
            bgGradient="linear(to-r, #C35AB1, #E9A8D9)"
            bgClip="text"
            w="min-content"
            fontSize="x-large"
          >
            Legendary
          </Text>
          <Text fontWeight="normal" fontSize="large">
            Lexica AI Art Pass <br />
            Club IRL NFT <br />
            Consensus 2023 Two-Day Pass <br />
            CPG Genesis NFT
          </Text>
        </Box>
      </Flex>
    </Container>
  );
};

export default PrizesDisplay;
