import { Box } from "@chakra-ui/react";
import React from "react";
import { Text } from "tw-components";

interface CustomIconProps {
  title: string;
  isActive: boolean;
  onClick: () => void;
}

const CustomIcon = ({ title, isActive, onClick }: CustomIconProps) => {
  return (
    <Box
      background="#131418"
      border={isActive ? "1px solid #2A64F6" : "1px solid #333333"}
      padding="25px"
      borderRadius="12px"
      cursor="pointer"
      transition="all 200ms ease"
      _hover={{
        border: "1px solid #2A64F6",
      }}
      onClick={onClick}
    >
      <Text fontWeight={600} fontSize="18px" userSelect="none">
        {title}
      </Text>
    </Box>
  );
};

export default CustomIcon;
