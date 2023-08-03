import { Divider } from "@chakra-ui/react";
import { Chain } from "@thirdweb-dev/chains";
import { CodeOverview } from "contract-ui/tabs/code/components/code-overview";
import { ExploreCategory } from "data/explore";
import { ChainUiTabsOverview__ChainInfo } from "./sections/ChainUiTabsOverview__ChainInfo";
import { ChainUiTabsOverview__ChainReferences } from "./sections/ChainUiTabsOverview__ChainReferences";
import { ChainUiTabsOverview__RecommendedThirdwebContracts } from "./sections/ChainUiTabsOverview__RecommendedThirdwebContracts";

export const ChainUiTabs__Overview: React.FC<{
  chain: Chain;
  category: ExploreCategory;
}> = ({ chain, category }) => {
  return (
    <>
      <ChainUiTabsOverview__RecommendedThirdwebContracts
        chain={chain}
        category={category}
      />
      <ChainUiTabsOverview__ChainInfo chain={chain} />
      <ChainUiTabsOverview__ChainReferences chain={chain} />
      <Divider />
      <CodeOverview onlyInstall chain={chain} noSidebar />
    </>
  );
};
