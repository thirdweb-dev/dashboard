import { Flex } from "@chakra-ui/react";
import { AppLayout } from "components/app-layouts/app";
import { WalletsSidebar } from "core-ui/sidebar/wallets";
import { PageId } from "page-id";
import { ThirdwebNextPage } from "utils/types";
import { Heading, Text } from "tw-components";

const DashboardWallets: ThirdwebNextPage = () => {
  return (
    <Flex flexDir="column" gap={16} mt={{ base: 2, md: 6 }}>
      <Flex flexDir="column" gap={4}>
        <Heading size="title.lg" as="h1">
          Overview
        </Heading>
        <Text>Hello</Text>
      </Flex>
    </Flex>
  );
};

DashboardWallets.getLayout = (page, props) => (
  <AppLayout {...props} hasSidebar={true}>
    <WalletsSidebar activePage="smart-wallet" />
    {page}
  </AppLayout>
);

DashboardWallets.pageId = PageId.DashboardWallets;

export default DashboardWallets;
