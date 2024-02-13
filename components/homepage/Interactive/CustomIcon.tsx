import { Box, BoxProps, Flex } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { StaticImageData } from "next/image";
import React from "react";
import { Text } from "tw-components";

interface CustomIconProps {
  title: string;
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
      padding={{ base: "12px 16px", lg: "20px 26px" }}
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
      <Flex
        flexDir={{ base: "row", lg: "column" }}
        alignItems={{ base: "center", lg: "flex-start" }}
      >
        <ChakraNextImage
          userSelect="none"
          draggable={false}
          width={{ base: "26px", lg: "32px" }}
          height={{ base: "26px", lg: "32px" }}
          marginTop={marginTopIcon}
          alt=""
          src={image}
        />

        <Text
          fontWeight={600}
          fontSize="17px"
          userSelect="none"
          color="#fff"
          marginTop={{ base: "0", lg: "11px" }}
          marginLeft={{ base: "7px", lg: "0" }}
        >
          {title}
        </Text>
      </Flex>

      <Text
        fontWeight={400}
        marginTop="5px"
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
