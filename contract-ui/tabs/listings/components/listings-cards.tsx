import {
  SimpleGrid,
  Skeleton,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { useListingsCount } from "@thirdweb-dev/react";
import { Marketplace } from "@thirdweb-dev/sdk";
import { BigNumber } from "ethers";
import { Card } from "tw-components";

interface ListingCardsProps {
  contract?: Marketplace;
}

export const ListingCards: React.FC<ListingCardsProps> = ({ contract }) => {
  const listingsQuery = useListingsCount(contract);

  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 3, md: 6 }}>
      <Card as={Stat}>
        <StatLabel mb={{ base: 1, md: 0 }}>Total Listings</StatLabel>
        <Skeleton isLoaded={!contract || listingsQuery.isSuccess}>
          <StatNumber>
            {BigNumber.from(listingsQuery?.data || 0).toString()}
          </StatNumber>
        </Skeleton>
      </Card>
    </SimpleGrid>
  );
};
