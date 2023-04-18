import { Flex } from "@chakra-ui/react";
import CountUp from "react-countup";
import { Text } from "tw-components";

interface SupplyProps {
  supply: number;
  previousSupply: number;
}

export const Supply: React.FC<SupplyProps> = ({ supply, previousSupply }) => {
  return (
    <Flex
      gap={2}
      mx={{
        base: "auto",
        lg: 0,
      }}
    >
      <Text
        bgGradient="linear(to-tr, #743F9E, #BFA3DA)"
        bgClip="text"
        display="inline-block"
        w="min"
        fontWeight="bold"
        size="body.2xl"
      >
        <CountUp start={previousSupply} end={supply} duration={1} useEasing />
      </Text>
      <Text size="body.2xl">packs remaining</Text>
    </Flex>
  );
};
