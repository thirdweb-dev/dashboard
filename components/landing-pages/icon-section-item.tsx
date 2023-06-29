import { Box, Flex } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { StaticImageData } from "next/image";
import React, { ReactNode } from "react";
import { Text } from "tw-components";

interface LandingIconSectionItemProps {
  icon: StaticImageData;
  title: string;
  description: ReactNode;
}

export const LandingIconSectionItem: React.FC<LandingIconSectionItemProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <Flex flexDir="column" gap={4}>
      <Flex
        bgGradient="linear(to-r, #3D3D3D, #4D4D4D)"
        p={3.5}
        borderRadius="lg"
        w={14}
      >
        <ChakraNextImage src={icon} width="32px" alt="Shopify" />
      </Flex>
      <Text size="body.xl" color="white">
        {title}
      </Text>
      <Text size="body.lg">{description}</Text>
    </Flex>
  );
};
