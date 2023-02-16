import { TokenSupply } from "../../tokens/components/supply";
import {
  AspectRatio,
  Flex,
  GridItem,
  SimpleGrid,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import { useContract } from "@thirdweb-dev/react";
import { NFT } from "@thirdweb-dev/sdk";
import { useTabHref } from "contract-ui/utils";
import {
  Card,
  Heading,
  Text,
  TrackedLink,
  TrackedLinkProps,
} from "tw-components";
import { NFTMediaWithEmptyState } from "tw-components/nft-media";

interface TokenDetailsProps {
  contractAddress: string;
}

export const TokenDetails: React.FC<TokenDetailsProps> = ({
  contractAddress,
}) => {
  const contractQuery = useContract(contractAddress);

  return (
    <Flex direction="column" gap={6}>
      <Flex align="center" justify="space-between" w="full">
        <Heading size="title.sm">Token Details</Heading>
      </Flex>
      <TokenSupply contractQuery={contractQuery} />
    </Flex>
  );
};

const dummyMetadata: (idx: number) => NFT = (idx) => ({
  metadata: {
    name: "Loading...",
    description: "lorem ipsum loading sit amet",
    id: `${idx}`,
    uri: "",
  },
  owner: `0x_fake_${idx}`,
  type: "ERC721",
  supply: 1,
});

interface ContractOverviewNFTGetAllProps {
  nfts: NFT[];
  isLoading: boolean;
}
const NFTCards: React.FC<ContractOverviewNFTGetAllProps> = ({
  nfts,
  isLoading,
}) => {
  nfts = isLoading
    ? Array.from({ length: 3 }).map((_, idx) => dummyMetadata(idx))
    : nfts;
  return (
    <SimpleGrid gap={6} columns={{ base: 1, md: 3 }}>
      {nfts.map((token) => (
        <GridItem
          as={Card}
          key={`${token.metadata.id}-${token.metadata.name}`}
          p={0}
        >
          <AspectRatio w="100%" ratio={1} overflow="hidden" rounded="xl">
            <Skeleton isLoaded={!isLoading}>
              <NFTMediaWithEmptyState
                metadata={token.metadata}
                requireInteraction
              />
            </Skeleton>
          </AspectRatio>
          <Flex p={4} pb={3} gap={3} direction="column">
            <Skeleton w={!isLoading ? "100%" : "50%"} isLoaded={!isLoading}>
              <Heading size="label.md">{token.metadata.name}</Heading>
            </Skeleton>
            <SkeletonText isLoaded={!isLoading}>
              <Text noOfLines={3}>
                {token.metadata.description ? (
                  token.metadata.description
                ) : (
                  <i>No description</i>
                )}
              </Text>
            </SkeletonText>
          </Flex>
        </GridItem>
      ))}
    </SimpleGrid>
  );
};
