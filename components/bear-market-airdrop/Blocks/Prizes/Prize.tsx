/* eslint-disable no-restricted-imports */
import { Flex, Image, Text } from "@chakra-ui/react";
import { FC } from "react";

interface GradientMapping {
  [key: string]: string;
}

type PrizeProps = {
  prize: {
    id: number;
    name: string;
    rarity: string;
    src: string;
    multiple: boolean;
    alt: string;
  };
};

export const gradientMapping: GradientMapping = {
  legendary: "linear(to-r, #B74AA4, #E173C7)",
  rare: "linear(to-r, #4830A4, #9786DF)",
  common: "linear(to-r, #743F9E, #BFA3DA)",
};

const Prize: FC<PrizeProps> = (props) => {
  const { name, src, multiple, alt, rarity } = props.prize;
  return (
    <Flex
      direction="column"
      alignItems="center"
      maxW="325px"
      border="1px solid #FFFFFF50"
      pb={8}
      rounded="lg"
    >
      <Flex
        direction="column"
        alignItems="center"
        gap={4}
        p={4}
        w="full"
        h="full"
        roundedBottom="xl"
      >
        <Text
          textAlign="center"
          fontSize="32px"
          color="white"
          fontWeight="bold"
        >
          {name}
        </Text>
        <Text
          textTransform="uppercase"
          bgGradient={gradientMapping[rarity] || gradientMapping.rare}
          bgClip="text"
          fontSize="14px"
          fontWeight="bold"
        >
          {rarity} {multiple ? "prizes" : "prize"}
        </Text>
      </Flex>
      <Image src={src} alt={alt} w="full" px={12} mt={6} />
    </Flex>
  );
};

export default Prize;
