import { Flex } from "@chakra-ui/react";
import { EngineAdmins } from "./permissions-admin";
import { PermissionsAccessTokens } from "./permissions-access-tokens";

interface EnginePermissionsProps {
  instanceUrl: string;
}

export const EnginePermissions: React.FC<EnginePermissionsProps> = ({
  instanceUrl,
}) => {
  return (
    <Flex flexDir="column" gap={12}>
      <EngineAdmins instanceUrl={instanceUrl} />
      <PermissionsAccessTokens instanceUrl={instanceUrl} />
    </Flex>
  );
};
