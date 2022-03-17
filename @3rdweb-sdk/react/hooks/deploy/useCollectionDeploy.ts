import { moduleKeys } from "@3rdweb-sdk/react";
import { AnalyticsEvents } from "constants/analytics";
import posthog from "posthog-js";
import { NFTCollectionContractInput } from "schema/contracts";
import invariant from "ts-invariant";
import { useMutationWithInvalidate } from "../query/useQueryWithNetwork";
import { useAppModule } from "../useApp";

export function useCollectionDeploy(appAddress?: string) {
  const appModule = useAppModule(appAddress);

  return useMutationWithInvalidate(
    async (metadata: NFTCollectionContractInput) => {
      invariant(
        appModule,
        "[CollectionModule:deploy] - attempting to deploy Bundle module without an appModule",
      );
      const module = await appModule.deployBundleModule(metadata);
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
        posthog.capture(AnalyticsEvents.DeploymentEvents.NftCollectionModule, {
          contractAddress,
          appAddress: appModuleAdrress,
        });
        return invalidate([moduleKeys.list(appModuleAdrress)]);
      },
    },
  );
}
