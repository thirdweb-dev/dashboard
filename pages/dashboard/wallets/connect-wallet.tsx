import { Flex } from "@chakra-ui/react";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { AppLayout } from "components/app-layouts/app";
import { dashboardSupportedWallets } from "components/app-layouts/providers";
import { ConnectWalletWithPreview } from "components/wallets/ConnectWalletWithPreview";
import { WalletsSidebar } from "core-ui/sidebar/wallets";
import { PageId } from "page-id";
import { ThirdwebNextPage } from "utils/types";
import { Heading, Text, Link } from "tw-components";

const DashboardWalletsConnectWallet: ThirdwebNextPage = () => {
  return (
    <Flex flexDir="column" gap={16} mt={{ base: 2, md: 6 }}>
      <ThirdwebProvider
        activeChain="goerli"
        supportedWallets={dashboardSupportedWallets}
      >
        <Flex flexDir="column" gap={4}>
          <Heading size="title.lg" as="h1">
            ConnectWallet component
          </Heading>
          <Text>
            One line of code to add a{" "}
            <Link
              href="https://portal.thirdweb.com/react/react.connectwallet"
              color="blue.400"
              isExternal
            >
              Connect Wallet UI component
            </Link>{" "}
            to React, React Native and Unity apps.
          </Text>
          <ConnectWalletWithPreview />
        </Flex>
      </ThirdwebProvider>
    </Flex>
  );
};

DashboardWalletsConnectWallet.getLayout = (page, props) => (
  <AppLayout {...props} hasSidebar={true}>
    <WalletsSidebar activePage="connect-wallet" />
    {page}
  </AppLayout>
);

DashboardWalletsConnectWallet.pageId = PageId.DashboardWalletsConnectWallet;

export default DashboardWalletsConnectWallet;
