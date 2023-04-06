import { Flex } from "@chakra-ui/react";
import { Text } from "tw-components";

interface SupplyProps {
  supply: number;
  initialSupply: number;
}

export const Supply: React.FC<SupplyProps> = ({ supply, initialSupply }) => {
  return (
    <Flex gap={2}>
      <Text
        bgGradient="linear(to-tr, #743F9E, #BFA3DA)"
        bgClip="text"
        display="inline-block"
        w="min"
        fontWeight="bold"
        fontSize="1.5rem"
      >
        {supply}
      </Text>
      <Text fontSize="1.5rem">/ {initialSupply} Remaining</Text>
    </Flex>
  );
};
