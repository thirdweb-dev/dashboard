import { Flex } from "@chakra-ui/react";
import { EngineWalletConfig } from "./engine-wallet-config";
import { EngineCorsConfig } from "./cors";

interface EngineConfigurationProps {
  instanceUrl: string;
}

export const EngineConfiguration: React.FC<EngineConfigurationProps> = ({
  instanceUrl,
}) => {
  return (
    <Flex flexDir="column" gap={12}>
      <EngineWalletConfig instance={instanceUrl} />
      <EngineCorsConfig instanceUrl={instanceUrl} />
    </Flex>
  );
};
