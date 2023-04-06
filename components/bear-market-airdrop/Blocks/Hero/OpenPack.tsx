import { Box, Flex } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { Button, Text } from "tw-components";

interface OpenPackProps {
  openPack: () => void;
  unboxing: boolean;
}

export const OpenPack: React.FC<OpenPackProps> = ({ openPack, unboxing }) => {
  return (
    <Flex
      direction={{
        base: "column",
        lg: "row",
      }}
      gap={4}
      justifyContent="center"
      alignItems="center"
    >
      <ChakraNextImage
        src="assets/bear-market-airdrop/bear-market-pack.png"
        alt="pack-img"
        w="400px"
      />
      <Flex direction="column" w="full" gap={8} alignSelf="end">
        <Button
          bg="white"
          color="black"
          w="min-content"
          px={6}
          py={3}
          _hover={{
            bg: "white",
          }}
          onClick={openPack}
          isLoading={unboxing}
        >
          Open Pack
        </Button>
        <Flex gap={2} alignItems="center" w="full">
          <Text fontWeight="bold" fontSize="19px" color="#3FE06C" mt={4}>
            You own 1 pack
          </Text>
          <ChakraNextImage
            alt="checkmark"
            alignSelf="end"
            src="/assets/bear-market-airdrop/checkmark.svg"
          />
        </Flex>
        <Flex mt={4} w="full">
          <Text
            bgGradient="linear(to-tr, #743F9E, #BFA3DA)"
            bgClip="text"
            w="full"
            display="inline-block"
            fontSize="14px"
          >
            Open your pack{" "}
            <Box as="span" color="white">
              to claim your lootbox rewards!
            </Box>
          </Text>
        </Flex>
        <Text fontSize="12px" as="i">
          You can open at a later date by revisiting this page and <br />
          connecting the wallet that owns this pack.
        </Text>
      </Flex>
    </Flex>
  );
};
