import { useMutationWithInvalidate } from "./query/useQueryWithNetwork";
import { contractKeys, networkKeys } from "@3rdweb-sdk/react";
import { useQueryClient } from "@tanstack/react-query";
import { useAddress, useSDK, useSigner } from "@thirdweb-dev/react";
import {
  DeploySchemaForPrebuiltContractType,
  PrebuiltContractType,
} from "@thirdweb-dev/sdk/evm";
import { addContractToMultiChainRegistry } from "components/contract-components/utils";
import { AnalyticsEvents } from "constants/analytics";
import posthog from "posthog-js";
import invariant from "tiny-invariant";
import { z } from "zod";

export function useDeploy<TContractType extends PrebuiltContractType>(
  chainId?: number,
  contractType?: TContractType,
  contractVersion = "latest",
) {
  const sdk = useSDK();
  const signer = useSigner();
  const queryClient = useQueryClient();
  const walletAddress = useAddress();

  return useMutationWithInvalidate(
    async (
      metadata: z.input<DeploySchemaForPrebuiltContractType<TContractType>>,
    ) => {
      invariant(
        sdk,
        `[Contract:deploy] - attempting to deploy ${contractType} contract without an active sdk`,
      );
      invariant(contractType, "[Contract:deploy] - contractType is required");

      // deploy contract
      const contractAddress = await sdk.deployer.deployBuiltInContract(
        contractType,
        metadata,
        contractVersion ? contractVersion : "latest",
      );

      // add to new multi-chain registry
      invariant(chainId, `[Contract:add-to-registry] - chainId is required`);
      await addContractToMultiChainRegistry(
        {
          address: contractAddress,
          chainId,
        },
        signer,
      );

      return { contractAddress };
    },
    {
      onSuccess: ({ contractAddress }, _variables, _options, invalidate) => {
        console.info("contract deployed with information", {
          contractAddress,
          contractType,
        });
        if (contractType) {
          posthog.capture(AnalyticsEvents.DeploymentEvents[contractType], {
            contractAddress,
          });
        }

        return Promise.all([
          invalidate([contractKeys.list()]),
          queryClient.invalidateQueries([
            networkKeys.multiChainRegistry,
            walletAddress || "",
          ]),
        ]);
      },
    },
  );
}
