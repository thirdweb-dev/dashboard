import { SettingsMetadata } from "./components/metadata";
import { OnDashboard } from "./components/on-dashboard";
import { PaperCheckoutSetting } from "./components/paper-xyz";
import { SettingsPlatformFees } from "./components/platform-fees";
import { SettingsPrimarySale } from "./components/primary-sale";
import { SettingsRoyalties } from "./components/royalties";
import { Flex, GridItem, SimpleGrid } from "@chakra-ui/react";
import { useContract } from "@thirdweb-dev/react";
import { extensionDetectedState } from "components/buttons/ExtensionDetectButton";
import { isPaperSupportedContract } from "contract-ui/utils";

interface CustomContractOverviewPageProps {
  contractAddress?: string;
}

export const CustomContractSettingsTab: React.FC<
  CustomContractOverviewPageProps
> = ({ contractAddress }) => {
  const contract = useContract(contractAddress);

  const detectedMetadata = extensionDetectedState({
    contract,
    feature: "ContractMetadata",
  });
  const detectedPrimarySale = extensionDetectedState({
    contract,
    feature: "PrimarySale",
  });
  const detectedRoyalties = extensionDetectedState({
    contract,
    feature: "Royalty",
  });
  const detectedPlatformFees = extensionDetectedState({
    contract,
    feature: "PlatformFee",
  });

  if (contract.isLoading) {
    // TODO build a skeleton for this
    return <div>Loading...</div>;
  }

  return (
    <Flex direction="column" gap={4}>
      <Flex gap={8} w="100%">
        <SimpleGrid columns={1} w="100%" gap={8}>
          <GridItem order={detectedMetadata === "enabled" ? 0 : 100}>
            <SettingsMetadata
              contract={contract.contract}
              detectedState={detectedMetadata}
            />
          </GridItem>

          <GridItem order={detectedPrimarySale === "enabled" ? 1 : 101}>
            <SettingsPrimarySale
              contract={contract.contract}
              detectedState={detectedPrimarySale}
            />
          </GridItem>

          <GridItem order={detectedRoyalties === "enabled" ? 2 : 102}>
            <SettingsRoyalties
              contract={contract.contract}
              detectedState={detectedRoyalties}
            />
          </GridItem>

          <GridItem order={detectedPlatformFees === "enabled" ? 3 : 103}>
            <SettingsPlatformFees
              contract={contract.contract}
              detectedState={detectedPlatformFees}
            />
          </GridItem>
          {/* paper.xyz settings */}
          {isPaperSupportedContract(
            contract.contract,
            contract.data?.contractType,
          ) && (
            <GridItem order={4}>
              <PaperCheckoutSetting contract={contract.contract} />
            </GridItem>
          )}

          {/* end paper.xyz settings */}
          <GridItem order={50}>
            <OnDashboard contract={contract.contract} />
          </GridItem>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
};
