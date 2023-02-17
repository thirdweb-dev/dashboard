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
