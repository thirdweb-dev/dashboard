import { Divider, GridItem, SimpleGrid } from "@chakra-ui/react";
import { Chain } from "@thirdweb-dev/chains";
import { ChainUiComponents__SectionElement } from "chain-ui/components/ChainUiComponents__SectionElement";
import { ContractCard } from "components/explore/contract-card";
import { ExploreCategory } from "data/explore";
import { CHAIN_CATEGORY } from "pages/chain/[chainSlug]";
import { TrackedLink } from "tw-components";

const LineaTestnetPopularContracts = [
  "thirdweb.eth/DropERC721",
  "thirdweb.eth/Marketplace",
  "thirdweb.eth/TokenERC721",
  "thirdweb.eth/DropERC1155",
  "thirdweb.eth/DropERC20",
  "thirdweb.eth/TokenERC1155",
];

export const ChainUiTabsOverview__RecommendedThirdwebContracts: React.FC<{
  chain: Chain;
  category: ExploreCategory;
}> = ({ chain, category }) => {
  const isLineaTestnet = chain?.chainId === 59140;
  return (
    <>
      <ChainUiComponents__SectionElement
        colSpan={12}
        label="Popular Contracts"
        moreElem={
          <TrackedLink
            category={CHAIN_CATEGORY}
            href="/explore"
            color="blue.500"
            label="explore_more"
          >
            Explore more {"->"}
          </TrackedLink>
        }
      >
        <SimpleGrid columns={{ base: 6, md: 12 }} gap={6} mt={2}>
          {(isLineaTestnet
            ? LineaTestnetPopularContracts
            : category.contracts
          ).map((publishedContractId, idx) => {
            const [publisher, contractId] = publishedContractId.split("/");
            return (
              <GridItem
                key={contractId}
                colSpan={{ base: 6, md: 4 }}
                display="grid"
              >
                <ContractCard
                  key={publishedContractId}
                  publisher={publisher}
                  contractId={contractId}
                  tracking={{
                    source: `chain_${chain.slug}`,
                    itemIndex: `${idx}`,
                  }}
                />
              </GridItem>
            );
          })}
        </SimpleGrid>
      </ChainUiComponents__SectionElement>
      <Divider />
    </>
  );
};
