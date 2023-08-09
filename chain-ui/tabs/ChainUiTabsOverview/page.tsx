import { Divider } from "@chakra-ui/react";
import { Chain } from "@thirdweb-dev/chains";
import { CodeOverview } from "contract-ui/tabs/code/components/code-overview";
import { ExploreCategory } from "data/explore";
import { ChainUiTabsOverviewChainInfo } from "./sections/ChainUiTabsOverviewChainInfo";
import { ChainUiTabsOverviewChainReferences } from "./sections/ChainUiTabsOverviewChainReferences";
import { ChainUiTabsOverviewRecommendedThirdwebContracts } from "./sections/ChainUiTabsOverviewRecommendedThirdwebContracts";

export const ChainUiTabsOverview: React.FC<{
  chain: Chain;
  category: ExploreCategory;
}> = ({ chain, category }) => {
  return (
    <>
      <ChainUiTabsOverviewRecommendedThirdwebContracts
        chain={chain}
        category={category}
      />
      <ChainUiTabsOverviewChainInfo chain={chain} />
      <ChainUiTabsOverviewChainReferences chain={chain} />
      <Divider />
      <CodeOverview onlyInstall chain={chain} noSidebar />
    </>
  );
};
