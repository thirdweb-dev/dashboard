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
    </Box>
  );
};
