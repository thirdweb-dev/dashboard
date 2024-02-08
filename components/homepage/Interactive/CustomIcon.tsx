import { Box } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { StaticImageData } from "next/image";
import React from "react";
import { Text } from "tw-components";

interface CustomIconProps {
  title: string;
  description: string;
  isActive: boolean;
  subTextMaxWidth?: number | string;
  marginTopIcon?: string;
  image: StaticImageData;
  onClick: () => void;
}

const CustomIcon = ({
  title,
  description,
  isActive,
  onClick,
  subTextMaxWidth,
  marginTopIcon,
  image,
}: CustomIconProps) => {
  return (
    <Box
      background="#131418"
      border={isActive ? "1.62px solid #2A64F6" : "1.62px solid #333333"}
      padding="20px 26px"
      borderRadius="12px"
      cursor="pointer"
      transition="all 200ms ease"
      _hover={{
        border: "1.62px solid #2A64F6",
      }}
      onClick={onClick}
    >
      <ChakraNextImage
        userSelect="none"
        draggable={false}
        width="32px"
        height="32px"
        marginTop={marginTopIcon}
        alt=""
        src={image}
      />

      <Text
        fontWeight={600}
        fontSize="17px"
        userSelect="none"
        color="#fff"
        marginTop="11px"
      >
        {title}
      </Text>

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
