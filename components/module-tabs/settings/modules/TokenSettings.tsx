import { TokenModule } from "@3rdweb/sdk";
import { ModuleSettings } from "../shared/ModuleSettings";

interface ITokenSettings {
  module?: TokenModule;
}

export const TokenSettings: React.FC<ITokenSettings> = ({ module }) => {
  return <ModuleSettings module={module}></ModuleSettings>;
};
