import { Grid, Stack } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import AvalanchePng from "public/assets/chain-icons/avalanche.png";
import EthereumPng from "public/assets/chain-icons/ethereum.png";
import FantomPng from "public/assets/chain-icons/fantom.png";
import FlowPng from "public/assets/chain-icons/flow.png";
import PolygonPng from "public/assets/chain-icons/polygon.png";
import SolanaPng from "public/assets/chain-icons/solana.png";
import React from "react";
import { Heading } from "tw-components";

const supportedChainMap = {
  ethereum: {
    title: "Ethereum",
    icon: EthereumPng,
  },
  polygon: {
    title: "Polygon",
    icon: PolygonPng,
  },
  avalanche: {
    title: "Avalanche",
    icon: AvalanchePng,
  },
  fantom: {
    title: "Fantom",
    icon: FantomPng,
  },
  solana: {
    title: "Solana",
    icon: SolanaPng,
  },
  flow: {
    title: "Flow",
    icon: FlowPng,
  },
} as const;

type SupportedChain = keyof typeof supportedChainMap;

export const SupportedChain: React.FC<{ type: SupportedChain }> = ({
  type,
}) => {
  const { title, icon } = supportedChainMap[type];
  return (
    <Stack
      spacing={6}
      align="center"
      border=".5px solid"
      borderColor="#ffffff26"
      py={8}
      px={10}
      borderRadius="lg"
      backgroundColor="#0000004d"
    >
      <Grid
        bg="black"
        boxSize={{ base: "6rem", md: "6rem" }}
        placeItems="center"
        borderRadius="full"
      >
        <ChakraNextImage
          alt=""
          boxSize="55%"
          layout="fill"
          objectFit="contain"
          objectPosition="center"
          src={icon}
        />
      </Grid>
      <Stack spacing={3} align="center">
        <Heading as="h4" size="title.sm" fontWeight="600" color="gray.50">
          {title}
        </Heading>
      </Stack>
    </Stack>
  );
};
