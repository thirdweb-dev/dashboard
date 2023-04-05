/* eslint-disable no-restricted-imports */
import { Flex, Text } from "@chakra-ui/react";
import { FC } from "react";

interface SupplyProps {
  supply: number;
  initialSupply: number;
}

const Supply: FC<SupplyProps> = ({ supply, initialSupply }) => {
  return (
    <Flex fontSize="1.5rem" gap={2}>
      <Text
        bgGradient="linear(to-tr, #743F9E, #BFA3DA)"
        bgClip="text"
        display="inline-block"
        w="min"
        fontWeight="bold"
      >
        {supply}
      </Text>
      <Text>/ {initialSupply} Remaining</Text>
    </Flex>
  );
};

export default Supply;
