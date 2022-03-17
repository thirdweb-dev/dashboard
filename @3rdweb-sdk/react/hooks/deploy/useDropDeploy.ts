import { moduleKeys } from "@3rdweb-sdk/react";
import { AnalyticsEvents } from "constants/analytics";
import posthog from "posthog-js";
import { DropContractInput } from "schema/contracts";
import invariant from "ts-invariant";
import { useMutationWithInvalidate } from "../query/useQueryWithNetwork";
import { useAppModule } from "../useApp";

export function useDropDeploy(appAddress?: string) {
  const appModule = useAppModule(appAddress);

  return useMutationWithInvalidate(
    async (metadata: DropContractInput) => {
      invariant(
        appModule,
        "[DropModule:deploy] - attempting to deploy Drop module without an active app",
      );
      const module = await appModule.deployDropModule({
        ...metadata,
        primarySaleRecipientAddress: metadata.primarySaleRecipientAddress || "",
      });
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
        posthog.capture(AnalyticsEvents.DeploymentEvents.DropModule, {
          contractAddress,
          appAddress: appModuleAdrress,
        });
        return invalidate([moduleKeys.list(appModuleAdrress)]);
      },
    },
  );
}
