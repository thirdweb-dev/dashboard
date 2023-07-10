import { Flex } from "@chakra-ui/react";
import { useUser } from "@thirdweb-dev/react";
import { AppLayout } from "components/app-layouts/app";
import {
  IpfsGatewayInfo,
  IpfsGatewayTable,
} from "components/settings/IpfsGatewayTable";
import { AddIpfsGatewayButton } from "components/settings/IpfsGatewayTable/AddIpfsGatewayButton";
import RequireAuth from "components/settings/RequireAuth";
import { SettingsSidebar } from "core-ui/sidebar/settings";
import { PageId } from "page-id";
import { useEffect, useState } from "react";
import { Heading, Link, Text } from "tw-components";
import { isBrowser } from "utils/isBrowser";
import { ThirdwebNextPage } from "utils/types";

const SettingsIpfsGatewaysPage: ThirdwebNextPage = () => {
  const { user, isLoading } = useUser();
  const [ipfsGateways, setIpfsGateways] = useState<IpfsGatewayInfo[]>([]);
  
  useEffect(() => {
    if (!isBrowser()) return;
    const item = window.localStorage.getItem('tw-settings-ipfs-gateways');
    if (!item) return;
    let gateways = JSON.parse(item);
    if (!Array.isArray(gateways)) return;
    gateways = gateways.filter(item => item.url);
    console.log({gateways})
    setIpfsGateways(gateways);
  }, []);

  if (isLoading) {
    return null;
  }

  if (!user?.address) return <RequireAuth />;

  return (
    <Flex flexDir="column" gap={8} mt={{ base: 2, md: 6 }}>
      <Flex direction="column" gap={2}>
        <Flex
          justifyContent="space-between"
          direction={{ base: "column", md: "row" }}
          gap={4}
        >
          <Heading size="title.lg" as="h1">
            IPFS Gateways
          </Heading>
          <AddIpfsGatewayButton />
        </Flex>
        <Text>
          Add your custom IPFS gateways to use it for the Dashboard. The keys
          are stored in localStorage and not collected by Thirdweb.
        </Text>
      </Flex>

      <IpfsGatewayTable
        gateways={ipfsGateways ? ipfsGateways : []}
        isLoading={false}
        isFetched={true}
      />    
    </Flex>
  );
};

SettingsIpfsGatewaysPage.getLayout = (page, props) => (
  <AppLayout {...props} hasSidebar={true}>
    <SettingsSidebar activePage="ipfsGateways" />

    {page}
  </AppLayout>
);

SettingsIpfsGatewaysPage.pageId = PageId.SettingsIpfsGateways;

export default SettingsIpfsGatewaysPage;
