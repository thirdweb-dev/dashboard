import { VoteModule } from "@3rdweb/sdk";
import { ModuleSettings } from "../shared/ModuleSettings";
import { VoteConfiguration } from "./vote/VoteConfiguration";

interface IVoteSettings {
  module?: VoteModule;
}

export const VoteSettings: React.FC<IVoteSettings> = ({ module }) => {
  return (
    <ModuleSettings module={module}>
      <VoteConfiguration module={module} />
    </ModuleSettings>
  );
};
