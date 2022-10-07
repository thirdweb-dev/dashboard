import { AdminOnly } from "@3rdweb-sdk/react";
import { Flex, Stack } from "@chakra-ui/react";
import { useClaimConditions, useProgram } from "@thirdweb-dev/react/solana";
import { detectFeatures } from "components/contract-components/utils";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { useState } from "react";
import { Button, LinkButton, Text } from "tw-components";

interface DropNotReadyProps {
  address: string;
}

export const DropNotReady: React.FC<DropNotReadyProps> = ({ address }) => {
  const { data: program } = useProgram(address, "nft-drop");
  const [dismissed, setDismissed] = useState(false);
  const isClaimable = program?.accountType === "nft-drop";

  const claimConditions = useClaimConditions(program);

  const dropNotReady = true;

  console.log(claimConditions.data);

  const chainName = useSingleQueryParam("networkOrAddress");

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
        The supply you set for your drop is{" "}
        {claimConditions.data?.totalAvailableSupply} but you have only lazy
        minted {claimConditions.data?.lazyMintedSupply} NFTs. You need to lazy
        mint the rest of your NFTs in order for users to claim them.
      </Text>
      <Stack direction="row" mt="8px">
        <LinkButton
          size="sm"
          bg="white"
          color="orange.800"
          href={`/${chainName}/${program?.publicKey}/nfts`}
          onClick={() => setDismissed(false)}
        >
          Go to my NFTs
        </LinkButton>
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
