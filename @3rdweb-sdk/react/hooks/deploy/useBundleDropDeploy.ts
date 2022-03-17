import { moduleKeys } from "@3rdweb-sdk/react";
import { AnalyticsEvents } from "constants/analytics";
import posthog from "posthog-js";
import { BundleDropContractInput } from "schema/contracts";
import invariant from "ts-invariant";
import { useMutationWithInvalidate } from "../query/useQueryWithNetwork";
import { useAppModule } from "../useApp";

export function useBundleDropDeploy(appAddress?: string) {
  const appModule = useAppModule(appAddress);

  return useMutationWithInvalidate(
    async (metadata: BundleDropContractInput) => {
      invariant(
        appModule,
        "[BundleDropModule:deploy] - attempting to deploy BundleDrop module without an active app",
      );
      const module = await appModule.deployBundleDropModule({
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
        posthog.capture(AnalyticsEvents.DeploymentEvents.BundleDropModule, {
          contractAddress,
          appAddress: appModuleAdrress,
        });
        return invalidate([moduleKeys.list(appModuleAdrress)]);
      },
    },
  );
}
