import { Module } from "@3rdweb/sdk";
import { Stack } from "@chakra-ui/react";
import { ModuleMetadata } from "./ModuleMetadata";

interface IModuleSettings {
  module?: Module;
}

export const ModuleSettings: React.FC<IModuleSettings> = ({
  module,
  children,
}) => {
  return (
    <Stack spacing={4}>
      <ModuleMetadata module={module} />
      {children}
    </Stack>
  );
};
