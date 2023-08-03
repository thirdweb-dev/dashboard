import { ButtonGroup, Container } from "@chakra-ui/react";
import { Chain } from "@thirdweb-dev/chains";
import { ExploreCategory } from "data/explore";
import { useRouter } from "next/router";
import { Button } from "tw-components";
import { ChainUiTabs__Analytics } from "./ChainUiTabs__Analytics/page";
import { ChainUiTabs__Overview } from "./ChainUiTabs__Overview/page";

enum ChainUiTab {
  Overview = "overview",
  Analytics = "analytics",
}
export const ChainUiTabs__Page: React.FC<{
  chain: Chain;
  category: ExploreCategory;
}> = ({ chain, category }) => {
  const router = useRouter();
  const activeTab =
    typeof router.query.tab === "string"
      ? router.query.tab
      : ChainUiTab.Overview;

  const onTabChange =
    (tab: ChainUiTab): React.MouseEventHandler<HTMLButtonElement> =>
    () => {
      router.replace(
        {
          pathname: router.pathname,
          query: { ...router.query, tab },
        },
        undefined,
        { shallow: true },
      );
    };

  return (
    <>
      {/* Tabs navbar */}
      <Container
        maxW="100%"
        display="flex"
        py={2}
        as="nav"
        alignItems="center"
        overflowX={{ base: "auto", md: "hidden" }}
      >
        <ButtonGroup size="sm" variant="ghost" spacing={{ base: 0.5, md: 2 }}>
          <Button
            onClick={onTabChange(ChainUiTab.Overview)}
            isActive={activeTab === ChainUiTab.Overview}
            _active={{
              bg: "bgBlack",
              color: "bgWhite",
            }}
            rounded="lg"
          >
            Overview
          </Button>
          <Button
            onClick={onTabChange(ChainUiTab.Analytics)}
            isActive={activeTab === ChainUiTab.Analytics}
            _active={{
              bg: "bgBlack",
              color: "bgWhite",
            }}
            rounded="lg"
          >
            Chain Analytics
          </Button>
        </ButtonGroup>
      </Container>

      {/* Page to render */}
      {(() => {
        switch (activeTab) {
          case ChainUiTab.Overview:
            return <ChainUiTabs__Overview chain={chain} category={category} />;
          case ChainUiTab.Analytics:
            return <ChainUiTabs__Analytics chain={chain} category={category} />;
        }
      })()}
    </>
  );
};
