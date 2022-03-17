import { useIsAdmin } from "@3rdweb-sdk/react";
import { ModuleWithRoles, Role } from "@3rdweb/sdk";
import { Flex, Heading, Icon, Select, Stack, Text } from "@chakra-ui/react";
import { Card } from "components/layout/Card";
import { FiInfo } from "react-icons/fi";
import { PermissionEditor } from "./PermissionsEditor";

interface IModulePermission {
  role: Role;
  description: string;
  isEveryone?: boolean | undefined;
  changeIsEveryone?: () => void;
  module?: ModuleWithRoles;
  info?: JSX.Element;
}

export const ModulePermission: React.FC<IModulePermission> = ({
  role,
  description,
  isEveryone,
  changeIsEveryone,
  module,
  info,
}) => {
  const isAdmin = useIsAdmin(module);

  const value =
    isEveryone === undefined
      ? undefined
      : isEveryone
      ? "everyone"
      : "specified";

  return (
    <Card position="relative">
      <Flex direction="column" gap={3}>
        <Stack spacing={2} mb="12px">
          <Flex>
            <Stack spacing={1} flexGrow={1}>
              <Heading size="heading.sm" textTransform="capitalize">
                {role}
              </Heading>
              <Text>{description}</Text>
            </Stack>
            {isEveryone !== undefined && (
              <Select
                value={value}
                onChange={() => {
                  if (isAdmin && changeIsEveryone) {
                    changeIsEveryone();
                  }
                }}
                width="220px"
              >
                <option value="everyone">Everyone</option>
                <option value="specified">Only Specific Wallets</option>
              </Select>
            )}
          </Flex>
          {info && (
            <Stack
              direction="row"
              bg="blue.50"
              borderRadius="md"
              borderWidth="1px"
              borderColor="blue.100"
              align="center"
              padding="10px"
              spacing={3}
            >
              <Icon as={FiInfo} color="blue.400" boxSize={6} />
              <Text color="blue.800">{info}</Text>
            </Stack>
          )}
        </Stack>

        {!isEveryone && <PermissionEditor role={role} module={module} />}
      </Flex>
    </Card>
  );
};
