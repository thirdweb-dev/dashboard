import { Flex } from "@chakra-ui/react";
import { PrizesCarousel } from "components/bear-market-airdrop/PrizeCarousel";
import { Heading } from "tw-components";

export const PrizesDisplay: React.FC = () => {
  return (
    <Flex
      px={12}
      flexDirection="column"
      maxW={{
        base: "full",
        lg: "container.page",
      }}
      mt={24}
    >
      <Flex gap={4} display={{ base: "block", md: "flex" }}>
        <Heading size="display.md">You could </Heading>
        <Heading
          display="inline-block"
          bgGradient="linear(to-r, #743F9E, #BFA3DA)"
          bgClip="text"
          w="min"
          size="display.md"
        >
          win...
        </Heading>
      </Flex>
      <PrizesCarousel />
    </Flex>
  );
};
