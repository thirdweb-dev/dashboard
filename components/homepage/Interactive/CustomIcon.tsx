import { Box, BoxProps, Flex } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { StaticImageData } from "next/image";
import React from "react";
import { Text } from "tw-components";

interface CustomIconProps {
  title: string;
  category: string;
  description: string;
  isActive: boolean;
  subTextMaxWidth?: number | string;
  marginTopIcon?: BoxProps["marginTop"];
  image: StaticImageData;
  onClick: () => void;
  onMouseOver: () => void;
}

const CustomIcon = ({
  title,
  category,
  description,
  isActive,
  onClick,
  onMouseOver,
  subTextMaxWidth,
  marginTopIcon,
  image,
}: CustomIconProps) => {
  return (
    <Box
      background="#131418"
      border={isActive ? "1.62px solid #2A64F6" : "1.62px solid #333333"}
      padding={{ base: "12px 16px", lg: "16px" }}
      borderRadius="12px"
      cursor="pointer"
      onClick={onClick}
      onMouseOver={onMouseOver}
      bgColor="backgroundCardHighlight"
      borderWidth={1}
      borderColor="borderColor"
      transition="border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease"
      _hover={{
        borderColor: "blue.500",
        boxShadow: "0 0 16px hsl(215deg 100% 60% / 30%)",
        transform: "scale(1.01)",
      }}
      h="full"
      minHeight={{ base: "full", lg: 28 }}
    >
      <Flex alignItems="center">
        <ChakraNextImage
          userSelect="none"
          draggable={false}
          width={{ base: "26px", lg: "32px" }}
          height={{ base: "26px", lg: "32px" }}
          marginTop={marginTopIcon}
          alt=""
          src={image}
          mr="8px"
        />

        <Box>
          <Text fontWeight={600} fontSize="18px" userSelect="none" color="#fff">
            {title}
          </Text>

          <Text
            fontWeight={700}
            fontSize="12px"
            lineHeight="16px"
            userSelect="none"
            color="#fff"
            opacity={0.7}
          >
            {category}
          </Text>
        </Box>
      </Flex>

      <Text
        fontWeight={400}
        marginTop="12px"
        fontSize="11px"
        userSelect="none"
        maxW={subTextMaxWidth ?? "100%"}
        color="#fff"
        opacity={0.7}
      >
        {description}
      </Text>
    </Box>
  );
};

export default CustomIcon;
