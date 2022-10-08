import { Flex, Stack } from "@chakra-ui/react";
import { useClaimConditions, useProgram } from "@thirdweb-dev/react/solana";
import { useState } from "react";
import { Button, Text } from "tw-components";

interface DropNotReadyProps {
  address: string;
}

export const DropNotReady: React.FC<DropNotReadyProps> = ({ address }) => {
  const { data: program } = useProgram(address, "nft-drop");
  const [dismissed, setDismissed] = useState(false);
  const isClaimable = program?.accountType === "nft-drop";

  const claimConditions = useClaimConditions(program);

  const dropNotReady =
    claimConditions.data?.lazyMintedSupply !==
    claimConditions.data?.totalAvailableSupply;

  if (dismissed || !isClaimable || !dropNotReady || !program) {
    return null;
  }

  return (
    <Flex
      padding="20px"
      borderRadius="xl"
      bg="orange.500"
      opacity={0.8}
      direction="column"
      mb={8}
    >
      <Text color="white">
        The supply you&apos;ve set for your drop is{" "}
        {claimConditions.data?.totalAvailableSupply}{" "}
        {claimConditions.data?.lazyMintedSupply === 0
          ? "and you have not lazy minted any yet."
          : ` but you have only lazy
        minted ${claimConditions.data?.lazyMintedSupply} NFTs.`}{" "}
        You need to lazy mint all of your NFTs and set your claim conditions in
        order for users to start claiming them.
      </Text>
      <Stack direction="row" mt="8px">
        <Button
          size="sm"
          bg="white"
          color="orange.800"
          onClick={() => setDismissed(true)}
        >
          Dismiss
        </Button>
      </Stack>
    </Flex>
  );
};
