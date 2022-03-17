import { moduleKeys } from "@3rdweb-sdk/react";
import SplitsModuleMetadata from "@3rdweb/sdk/dist/types/module-deployments/SplitsModuleMetadata";
import { AnalyticsEvents } from "constants/analytics";
import posthog from "posthog-js";
import { SplitsContractInput } from "schema/contracts";
import invariant from "ts-invariant";
import { useMutationWithInvalidate } from "../query/useQueryWithNetwork";
import { useAppModule } from "../useApp";

export function useSplitsDeploy(appAddress?: string) {
  const appModule = useAppModule(appAddress);

  return useMutationWithInvalidate(
    async (metadata: SplitsContractInput) => {
      invariant(
        appModule,
        "[SplitModule:deploy] - attempting to deploy SplitDrop module without an active app",
      );

      const module = await appModule.deploySplitsModule({
        ...metadata,
      } as SplitsModuleMetadata);

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
        posthog.capture(AnalyticsEvents.DeploymentEvents.SplitsModule, {
          contractAddress,
          appAddress: appModuleAdrress,
        });

        return invalidate([moduleKeys.list(appModuleAdrress)]);
      },
    },
  );
}
