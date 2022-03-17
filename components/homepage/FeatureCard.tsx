import { ModuleType } from "@3rdweb/sdk";
import { Flex, Heading, ResponsiveValue, Stack } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import * as CSS from "csstype";
import AirdropsGradient from "public/assets/gradient-airdrops.png";
import CurrencyGradient from "public/assets/gradient-currency.png";
import DropsGradient from "public/assets/gradient-drops.png";
import PacksGradient from "public/assets/gradient-packs.png";
import SplitsGradient from "public/assets/gradient-splits.png";
import React from "react";
import { FeatureIconMap } from "utils/feature-icons";

export type FeatureCardType =
  | "pack"
  | "drop"
  | "split"
  | "market"
  | "nft"
  | "currency";

interface IFeatureCardDetails {
  title: string;
  description: string;
  icon: StaticImageData;
  bg: string;
  gradientBg?: {
    url: StaticImageData;
    position?: string;
    blendMode: ResponsiveValue<CSS.Property.MixBlendMode>;
  };
}

const featureCardMap: Record<FeatureCardType, IFeatureCardDetails> = {
  nft: {
    title: "NFTs",
    description:
      "Collections or one-of-a-kind tokens with fully customizable properties",
    icon: FeatureIconMap[ModuleType.NFT],
    bg: "linear-gradient(130.03deg, #00304B 27.17%, #4B0012 85.87%)",
    gradientBg: {
      url: AirdropsGradient,
      position: "top left",
      blendMode: "normal",
    },
  },
  market: {
    title: "Marketplaces",
    description: "Your own marketplaces to let users buy and sell any tokens",
    icon: FeatureIconMap[ModuleType.MARKET],
    bg: "linear-gradient(180deg, #01044C 0%, #571B1B 72.43%)",
  },
  currency: {
    title: "Tokens",
    description:
      "Custom social tokens, governance tokens, and currencies that you control",
    icon: FeatureIconMap[ModuleType.CURRENCY],
    bg: "linear-gradient(180deg, #271571 0%, #2C142A 100%)",
    gradientBg: {
      url: CurrencyGradient,
      position: "bottom right",
      blendMode: "normal",
    },
  },
  pack: {
    title: "Packs",
    description: `Loot boxes full of NFTs with rarity-based unboxing mechanics`,
    icon: FeatureIconMap[ModuleType.PACK],
    bg: "#25004B",
    gradientBg: {
      url: PacksGradient,
      position: "bottom right",
      blendMode: "normal",
    },
  },
  drop: {
    title: "Drops",
    description: "Timed drops for users to easily claim NFTs and other tokens",
    icon: FeatureIconMap[ModuleType.DROP],
    bg: "#400B31",
    gradientBg: {
      url: DropsGradient,
      position: "bottom right",
      blendMode: "overlay",
    },
  },
  split: {
    title: "Splits",
    description: "Custom royalty splits to easily manage your revenue",
    icon: FeatureIconMap[ModuleType.SPLITS],
    bg: "#2E1328",
    gradientBg: {
      url: SplitsGradient,
      position: "bottom right",
      blendMode: "screen",
    },
  },
};

interface IFeatureCardProps {
  type: FeatureCardType;
}

export const HomepageFeatureCard: React.FC<IFeatureCardProps> = ({ type }) => {
  const { bg, title, icon, description, gradientBg } = featureCardMap[type];
  return (
    <Flex
      position="relative"
      borderRadius={6}
      p={8}
      flexDir="column"
      bg={bg}
      overflow="hidden"
    >
      <Stack
        mb={6}
        spacing={4}
        direction={{ base: "row", lg: "column" }}
        align={{ base: "center", lg: "flex-start" }}
      >
        <ChakraNextImage w={{ base: 12, lg: 16 }} src={icon} alt={title} />

        <Heading as="h4" variant="light" size="title.lg">
          {title}
        </Heading>
      </Stack>
      <Heading as="p" size="subtitle.md" variant="light">
        {description}
      </Heading>

      {gradientBg && (
        <ChakraNextImage
          alt=""
          borderRadius={6}
          overflow="hidden"
          mixBlendMode={gradientBg.blendMode}
          pointerEvents="none"
          position="absolute"
          placeholder="empty"
          zIndex={0}
          top={0}
          left={0}
          bottom={0}
          right={0}
          src={gradientBg.url}
          objectFit="cover"
          objectPosition={gradientBg.position}
          layout="fill"
        />
      )}
    </Flex>
  );
};
