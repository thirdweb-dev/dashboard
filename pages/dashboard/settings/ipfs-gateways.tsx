import { Flex } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { useUser } from "@thirdweb-dev/react";
import { AppLayout } from "components/app-layouts/app";
import { IpfsGatewayModal } from "components/settings/IpfsGatewayTable/GatewayModal";
import { IpfsGatewayTable } from "components/settings/IpfsGatewayTable/IpfsGatewayTable";
import RequireAuth from "components/settings/RequireAuth";
import { SettingsSidebar } from "core-ui/sidebar/settings";
import {
  CustomIpfsGateway,
  useCustomIpfsGateways,
} from "hooks/useCustomIpfsGateways";
import { PageId } from "page-id";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Button, Heading, Text } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const SettingsIpfsGatewaysPage: ThirdwebNextPage = () => {
  const { user, isLoading } = useUser();
  const [gatewayModalOpen, setEditModalOpen] = useState(false);
  const [activeGateway, setActiveGateway] = useState<CustomIpfsGateway>();
  const _gateways = useCustomIpfsGateways();
  const [gateways, setGateways] = useState<CustomIpfsGateway[]>(_gateways);

  useEffect(() => {
    setGateways(_gateways);
  }, [_gateways]);

  if (isLoading) {
    return null;
  }

  if (!user?.address) return <RequireAuth />;

  return (
    <>
      <IpfsGatewayModal
        gateway={activeGateway}
        setGateways={setGateways}
        open={gatewayModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setActiveGateway(undefined);
        }}
      />
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
            <Button
              onClick={() => setEditModalOpen(true)}
              colorScheme="blue"
              leftIcon={<Icon as={FiPlus} boxSize={4} />}
            >
              Add new gateway
            </Button>
          </Flex>
          <Text>
            Add your custom IPFS gateways to use it for the Dashboard. The keys
            are stored in your browser and not collected by Thirdweb.
          </Text>
        </Flex>
        <IpfsGatewayTable
          gateways={gateways}
          setGateways={setGateways}
          setEditModalOpen={setEditModalOpen}
          setActiveGateway={setActiveGateway}
        />
      </Flex>
    </>
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
