import { TabList, Tabs, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { ApiKey } from "@3rdweb-sdk/react/hooks/useApi";
import { AccountFactories } from "./AccountFactories";

interface SmartWalletsProps {
  apiKey: ApiKey;
  trackingCategory: string;
}

export const SmartWallets: React.FC<SmartWalletsProps> = ({
  apiKey,
  trackingCategory,
}) => {
  return (
    <Tabs>
      <TabList px={0} borderBottomColor="borderColor" borderBottomWidth="1px">
        <Tab>Account Factories</Tab>
        <Tab>Sponsorship Policies</Tab>
      </TabList>

      <TabPanels pt={6}>
        <TabPanel px={0}>
          <AccountFactories trackingCategory={trackingCategory} />
        </TabPanel>
        <TabPanel px={0}>Hello {apiKey.id}</TabPanel>
      </TabPanels>
    </Tabs>
  );
};
