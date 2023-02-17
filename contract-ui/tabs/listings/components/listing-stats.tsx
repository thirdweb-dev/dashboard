import {
  SimpleGrid,
  Skeleton,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import {
  useActiveListings,
  useDirectListingsCount,
  useEnglishAuctionsCount,
  useListingsCount,
} from "@thirdweb-dev/react";
import { Marketplace } from "@thirdweb-dev/sdk";
import { MarketplaceV3 } from "@thirdweb-dev/sdk/evm";
import { BigNumber } from "ethers";
import { useMemo } from "react";
import { Card } from "tw-components";

interface ListingStatsProps {
  contract?: Marketplace;
}

export const ListingStats: React.FC<ListingStatsProps> = ({ contract }) => {
  const listingsQuery = useListingsCount(contract);

  return (
    <SimpleGrid columns={3} spacing={{ base: 3, md: 6 }}>
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

interface ListingStatsV3Props {
  contract?: MarketplaceV3;
}

export const ListingStatsV3: React.FC<ListingStatsV3Props> = ({ contract }) => {
  const directListingsQuery = useDirectListingsCount(contract);
  const englishAuctionsQuery = useEnglishAuctionsCount(contract);

  const totalListings = useMemo(
    () =>
      BigNumber.from(directListingsQuery?.data || 0).add(
        BigNumber.from(englishAuctionsQuery?.data || 0),
      ),
    [directListingsQuery?.data, englishAuctionsQuery?.data],
  );

  return (
    <Stack spacing={{ base: 3, md: 6 }} direction="row">
      <Card as={Stat}>
        <StatLabel mb={{ base: 1, md: 0 }}>Total Listings</StatLabel>
        <Skeleton
          isLoaded={
            !contract ||
            (directListingsQuery.isSuccess && englishAuctionsQuery.isSuccess)
          }
        >
          <StatNumber>
            {BigNumber.from(totalListings || 0).toString()}
          </StatNumber>
        </Skeleton>
      </Card>
      <Card as={Stat}>
        <StatLabel mb={{ base: 1, md: 0 }}>Total Listings</StatLabel>
        <Skeleton isLoaded={!contract || directListingsQuery.isSuccess}>
          <StatNumber>
            {BigNumber.from(directListingsQuery?.data || 0).toString()}
          </StatNumber>
        </Skeleton>
      </Card>
      <Card as={Stat}>
        <StatLabel mb={{ base: 1, md: 0 }}>English Auctions</StatLabel>
        <Skeleton isLoaded={!contract || englishAuctionsQuery.isSuccess}>
          <StatNumber>
            {BigNumber.from(englishAuctionsQuery?.data || 0).toString()}
          </StatNumber>
        </Skeleton>
      </Card>
    </Stack>
  );
};
