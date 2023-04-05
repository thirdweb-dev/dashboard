/* eslint-disable no-restricted-imports */
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { FC } from "react";

interface OpenPackProps {
  openPack: () => void;
  unboxing: boolean;
}

const OpenPack: FC<OpenPackProps> = ({ openPack, unboxing }) => {
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
      <Image
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
          <Image
            alt="checkmark"
            alignSelf="end"
            src="/assets/bear-market-airdrop/checkmark.svg"
          />
        </Flex>
        <Flex mt={4} fontSize="14px" w="full">
          <Text
            bgGradient="linear(to-tr, #743F9E, #BFA3DA)"
            bgClip="text"
            w="full"
            display="inline-block"
          >
            Open your pack{" "}
            <span
              // eslint-disable-next-line react/forbid-dom-props
              style={{
                color: "white",
              }}
            >
              to claim your lootbox rewards!
            </span>
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

export default OpenPack;
