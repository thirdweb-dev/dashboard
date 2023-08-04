import { Divider } from "@chakra-ui/react";
import { Chain } from "@thirdweb-dev/chains";
import { CodeOverview } from "contract-ui/tabs/code/components/code-overview";

export const ChainUiTabs__Overview: React.FC<{ chain: Chain }> = ({
  chain,
}) => {
  return (
    <>
      <Divider />
      <CodeOverview onlyInstall chain={chain} noSidebar />
    </>
  );
};
