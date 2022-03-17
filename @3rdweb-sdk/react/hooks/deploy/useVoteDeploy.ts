import { moduleKeys, useAppModule } from "@3rdweb-sdk/react";
import { VoteModuleMetadata } from "@3rdweb/sdk";
import { AnalyticsEvents } from "constants/analytics";
import posthog from "posthog-js";
import { VoteContractInput } from "schema/contracts";
import invariant from "ts-invariant";
import { useMutationWithInvalidate } from "../query/useQueryWithNetwork";

export function useVoteDeploy(appAddress?: string) {
  const appModule = useAppModule(appAddress);

  return useMutationWithInvalidate(
    async (metadata: VoteContractInput) => {
      invariant(
        appModule,
        "[VoteModule:deploy] - attempting to deploy VoteDrop module without an active app",
      );

      const module = await appModule.deployVoteModule({
        ...metadata,
      } as VoteModuleMetadata);

      return {
        contractAddress: module.address,
        appModuleAdrress: appModule.address,
      };
    },
    {
      onSuccess: (
        { contractAddress, appModuleAdrress },
        _variables,
        _options,
        invalidate,
      ) => {
        posthog.capture(AnalyticsEvents.DeploymentEvents.VoteModule, {
          contractAddress,
          appAddress: appModuleAdrress,
        });

        return invalidate([moduleKeys.list(appModuleAdrress)]);
      },
    },
  );
}
