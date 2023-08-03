import { Divider } from "@chakra-ui/react";
import { Chain } from "@thirdweb-dev/chains";
import { CodeOverview } from "contract-ui/tabs/code/components/code-overview";
import { ExploreCategory } from "data/explore";

export const ChainUiTabs__Analytics: React.FC<{
  chain: Chain;
  category: ExploreCategory;
}> = ({ chain, category }) => {
  return (
    <>
      <CodeOverview onlyInstall chain={chain} noSidebar />
      <Divider />
    </>
  );
};
