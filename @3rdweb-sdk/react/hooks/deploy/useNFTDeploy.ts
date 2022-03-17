import { moduleKeys } from "@3rdweb-sdk/react";
import { AnalyticsEvents } from "constants/analytics";
import posthog from "posthog-js";
import { NFTContractInput } from "schema/contracts";
import invariant from "ts-invariant";
import { useMutationWithInvalidate } from "../query/useQueryWithNetwork";
import { useAppModule } from "../useApp";

export function useNFTDeploy(appAddress?: string) {
  const appModule = useAppModule(appAddress);

  return useMutationWithInvalidate(
    async (metadata: NFTContractInput) => {
      invariant(
        appModule,
        "[NFTModule:deploy] - attempting to deploy NFT Collection module without an active app",
      );
      const module = await appModule.deployNftModule(metadata);
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
        posthog.capture(AnalyticsEvents.DeploymentEvents.NftModule, {
          contractAddress,
          appAddress: appModuleAdrress,
        });
        return invalidate([moduleKeys.list(appModuleAdrress)]);
      },
    },
  );
}
