import { Flex } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { StaticImageData } from "next/image";
import React, { ReactNode } from "react";
import { Heading, Text } from "tw-components";

interface AnimatedHoveredCard {
  title: string;
  description: string;
  initalImage: StaticImageData;
  image: StaticImageData;
  content: ReactNode;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isHidden: boolean;
}

const AnimatedHoveredCard = ({
  title,
  description,
  initalImage,
  isActive,
  image,
  content,
  isHidden,
  onMouseEnter,
  onMouseLeave,
}: AnimatedHoveredCard) => {
  return isHidden ? null : (
    <Flex
      borderWidth={1}
      borderColor={isActive ? "transparent" : "borderColor"}
      borderRadius={7}
      flexDir="column"
      transition="150ms ease"
      maxW={isActive ? "100%" : "380px"}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      bg={!isActive ? "backgroundCardHighlight" : "#3888FF"}
      w={"full"}
    >
      <Heading size="title.xl" m={0} fontWeight={500} mt={10} ml={10} mr={10}>
        {title}
      </Heading>

      {isActive && description && (
        <Text
          size="label.lg"
          fontWeight={500}
          color="white"
          opacity={0.7}
          mt={3}
        >
          {description}
        </Text>
      )}

      <Flex
        alignItems="flex-start"
        justifyContent="space-between"
        marginTop={12}
        ml="auto"
        mt="auto"
      >
        {isActive && content}

        {!isActive ? (
          <ChakraNextImage src={initalImage} alt="inital-animated-img" />
        ) : (
          <ChakraNextImage src={image} alt="inital-img" ml="auto" />
        )}
      </Flex>
    </Flex>
  );
};

export default AnimatedHoveredCard;
