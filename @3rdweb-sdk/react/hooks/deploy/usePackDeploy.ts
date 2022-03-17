import { moduleKeys } from "@3rdweb-sdk/react";
import { AnalyticsEvents } from "constants/analytics";
import posthog from "posthog-js";
import { PackContractInput } from "schema/contracts";
import invariant from "ts-invariant";
import { useMutationWithInvalidate } from "../query/useQueryWithNetwork";
import { useAppModule } from "../useApp";

export function usePackDeploy(appAddress?: string) {
  const appModule = useAppModule(appAddress);

  return useMutationWithInvalidate(
    async (metadata: PackContractInput) => {
      invariant(
        appModule,
        "[PackModule:deploy] - attempting to deploy Pack module without an active app",
      );
      const module = await appModule.deployPackModule(metadata);
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
        posthog.capture(AnalyticsEvents.DeploymentEvents.PackModule, {
          contractAddress,
          appAddress: appModuleAdrress,
        });
        return invalidate([moduleKeys.list(appModuleAdrress)]);
      },
    },
  );
}
