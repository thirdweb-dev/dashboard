import { Heading, Text } from "@chakra-ui/react";
import { ModulePermissions } from "components/module-tabs/permissions/ModulePermissions";
import useAddModuleContext from "contexts/AddModuleContext";

export const ModuleSettings: React.FC = () => {
  const { module } = useAddModuleContext();

  return (
    <>
      <Heading size="title.sm">Manage Permissions</Heading>
      <Text mb="24px" mt="4px">
        Manage who has access and control over your app.
      </Text>
      <ModulePermissions module={module} />
    </>
  );
};
