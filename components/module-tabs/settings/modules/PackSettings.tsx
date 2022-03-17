import { PackModule } from "@3rdweb/sdk";
import { ModuleSettings } from "../shared/ModuleSettings";
import { DepositLink } from "./pack/DepositLink";

interface IPackSettings {
  module?: PackModule;
}

export const PackSettings: React.FC<IPackSettings> = ({ module }) => {
  return (
    <ModuleSettings module={module}>
      <DepositLink module={module} />
    </ModuleSettings>
  );
};
