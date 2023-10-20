import { Flex } from "@chakra-ui/react";
import { EngineKmsConfig } from "./engine-kms-config";

interface EngineConfigurationProps {
  instance: string;
}

export const EngineConfiguration: React.FC<EngineConfigurationProps> = ({
  instance,
}) => {
  return (
    <Flex flexDir="column" gap={12}>
      <EngineKmsConfig instance={instance} />
    </Flex>
  );
};
