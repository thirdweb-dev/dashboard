import { Skeleton, Stack, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import { thirdwebClient } from "components/app-layouts/providers";
import { getContract, defineChain } from "thirdweb";
import { useReadContract } from "thirdweb/react";
import { Card } from "tw-components";
import { totalSupply } from "thirdweb/extensions/erc721";
import { useMemo } from "react";

interface SupplyCardsProps {
  contractAddress: string;
  chainId: number;
}

export const SupplyCards: React.FC<SupplyCardsProps> = ({
  contractAddress,
  chainId,
}) => {
  const contract = useMemo(
    () =>
      getContract({
        client: thirdwebClient,
        address: contractAddress,
        chain: defineChain(chainId),
      }),
    [contractAddress, chainId],
  );

  const totalSupplyQuery = useReadContract(totalSupply, {
    contract,
  });

  /*   const unclaimedSupplyQuery = useUnclaimedNFTSupply(contract); */

  return (
    <Stack spacing={{ base: 3, md: 6 }} direction="row">
      <Card as={Stat}>
        <StatLabel mb={{ base: 1, md: 0 }}>Total Supply</StatLabel>
        <Skeleton isLoaded={totalSupplyQuery.isSuccess}>
          <StatNumber>{totalSupplyQuery?.data?.toString()}</StatNumber>
        </Skeleton>
      </Card>
      {/*  <Card as={Stat}>
        <StatLabel mb={{ base: 1, md: 0 }}>Claimed Supply</StatLabel>
        <Skeleton isLoaded={claimedSupplyQuery.isSuccess}>
          <StatNumber>
            {BigNumber.from(claimedSupplyQuery?.data || 0).toString()}
          </StatNumber>
        </Skeleton>
      </Card>
      <Card as={Stat}>
        <StatLabel mb={{ base: 1, md: 0 }}>Unclaimed Supply</StatLabel>
        <Skeleton isLoaded={unclaimedSupplyQuery.isSuccess}>
          <StatNumber>
            {BigNumber.from(unclaimedSupplyQuery?.data || 0).toString()}
          </StatNumber>
        </Skeleton>
      </Card> */}
    </Stack>
  );
};
