import { Flex, FlexProps } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { StaticImageData } from "next/image";
import React from "react";
import { Text } from "tw-components";

interface LandingImageSectionItemProps {
  src: StaticImageData;
  title: string;
  description: string;
}

const LandingImageSectionItem = ({
  src,
  title,
  description,
}: LandingImageSectionItemProps) => {
  return (
    <Flex flexDir="column" gap={6}>
      <Flex
        alignItems="center"
        justifyContent="center"
        padding={{ base: "26px", md: "17px" }}
        borderRadius="12px"
        border="1px solid #26282F"
        background="#131418"
        minH={{ base: "auto", md: "333px" }}
      >
        <ChakraNextImage src={src} alt="" maxH="260px" />
      </Flex>
      <Flex flexDir="column" gap={4}>
        <Text size="body.xl" color="white" fontWeight="bold">
          {title}
        </Text>

        {description && <Text size="body.lg">{description}</Text>}
      </Flex>
    </Flex>
  );
};

export default LandingImageSectionItem;
