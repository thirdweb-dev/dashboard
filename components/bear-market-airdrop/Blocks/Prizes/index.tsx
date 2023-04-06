import { Box, Flex } from "@chakra-ui/react";
import { PrizesCarousel } from "components/bear-market-airdrop/PrizeCarousel";
import { Heading, Text } from "tw-components";

export const PrizesDisplay: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      maxW={{
        base: "full",
        lg: "container.page",
      }}
      mt={24}
      mx="10"
    >
      <Flex
        fontSize={{
          base: "3rem",
          lg: "3.5rem",
        }}
        gap={4}
        alignSelf={{
          base: "center",
          lg: "flex-start",
        }}
      >
        <Heading
          fontSize={{
            base: "3rem",
            lg: "3.5rem",
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
            lg: "3.5rem",
          }}
        >
          win...{" "}
        </Heading>
      </Flex>
      <PrizesCarousel />
      <Heading
        fontSize={{
          base: "3rem",
          lg: "3.5rem",
        }}
        mx="auto"
        mb={12}
      >
        All Prizes
      </Heading>
      <Flex
        gap={20}
        flexDirection={{
          base: "column",
          lg: "row",
        }}
        justifyContent="center"
        mx="auto"
        mb={12}
      >
        {/* <Heading fontSize="40">All rewards</Heading> */}
        <Box>
          <Text fontWeight="bold" fontSize="x-large">
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
    </Box>
  );
};
