import { useWeb3 } from "@3rdweb/hooks";
import { ChainlinkVrf, IPackCreateArgs, PackModule } from "@3rdweb/sdk";
import { BigNumber, ethers } from "ethers";
import { useMemo } from "react";
import { PackTokenInput } from "schema/tokens";
import { invariant } from "ts-invariant";
import { SupportedChainId, SupportedChainIdToNetworkMap } from "utils/network";
import { linkBalanceKeys, packKeys } from "../cache-keys";
import {
  useMutationWithInvalidate,
  useQueryWithNetwork,
} from "./query/useQueryWithNetwork";
import { useActiveChainId } from "./useActiveChainId";
import { useModuleMetadata } from "./useModule";
import { useSDK } from "./useSDK";

export function usePackModule(moduleAddress?: string) {
  const sdk = useSDK();
  return useMemo(() => {
    if (!sdk || !moduleAddress) {
      return undefined;
    }
    return sdk.getPackModule(moduleAddress);
  }, [moduleAddress, sdk]);
}

export function usePackModuleMetadata(moduleAddress?: string) {
  return useModuleMetadata(usePackModule(moduleAddress));
}

export function usePackList(moduleAddress?: string) {
  const packModule = usePackModule(moduleAddress);
  return useQueryWithNetwork(
    packKeys.list(moduleAddress),
    async () => packModule?.getAll(),
    {
      enabled: !!packModule && !!moduleAddress,
    },
  );
}

export function usePackBalance(moduleAddress?: string, tokenId?: string) {
  const { address } = useWeb3();
  const packModule = usePackModule(moduleAddress);

  return useQueryWithNetwork(
    packKeys.balanceOf(moduleAddress, address, tokenId),
    async () => {
      return await packModule?.balanceOf(address || "", tokenId || "");
    },
    {
      enabled:
        !!packModule && !!moduleAddress && !!address && tokenId !== undefined,
    },
  );
}

export function usePackRewards(moduleAddress?: string, tokenId?: string) {
  const packModule = usePackModule(moduleAddress);
  return useQueryWithNetwork(
    packKeys.rewards(moduleAddress, tokenId),
    () => packModule?.getNFTs(tokenId || ""),
    {
      enabled: !!packModule && !!moduleAddress && !!tokenId,
    },
  );
}

export function useLinkBalance() {
  const { address } = useWeb3();
  const activeChainId = useActiveChainId();

  return useQueryWithNetwork(
    linkBalanceKeys.detail(address),
    async () => {
      const chainName =
        SupportedChainIdToNetworkMap[activeChainId as SupportedChainId];
      const res = await fetch("/api/tokens", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        } as HeadersInit,
        body: JSON.stringify({ address, chainName }),
      });

      const tokens = await res.json();
      const linkAddress =
        ChainlinkVrf[activeChainId as SupportedChainId].linkTokenAddress;
      const linkToken = tokens?.find(
        (token: any) =>
          token.token_address.toLowerCase() === linkAddress.toLowerCase(),
      );

      if (linkToken) {
        return ethers.utils.formatUnits(linkToken.balance, linkToken.decimals);
      } else {
        return "0";
      }
    },
    {
      enabled: !!address,
    },
  );
}

export function usePackLink(moduleAddress?: string) {
  const packModule = usePackModule(moduleAddress);

  return useQueryWithNetwork(
    packKeys.linkBalance(moduleAddress),
    async () => packModule?.getLinkBalance(),
    {
      enabled: !!packModule && !!moduleAddress,
    },
  );
}

export function usePackDepositLink(moduleAddress?: string) {
  const { address } = useWeb3();
  const packModule = usePackModule(moduleAddress);

  return useMutationWithInvalidate(
    async (amount: string) => {
      invariant(packModule, "module is required");
      invariant(address, "wallet must be connected");

      return await packModule.depositLink(ethers.utils.parseEther(amount));
    },
    {
      onSuccess: (_data, _variables, _options, invalidate) => {
        return invalidate([
          packKeys.linkBalance(packModule?.address),
          linkBalanceKeys.detail(address),
        ]);
      },
    },
  );
}

export function usePackWithdrawLink(moduleAddress?: string) {
  const { address } = useWeb3();
  const packModule = usePackModule(moduleAddress);

  return useMutationWithInvalidate(
    async (amount: string) => {
      invariant(packModule, "module is required");
      invariant(address, "wallet must be connected");
      return await packModule.withdrawLink(
        address,
        ethers.utils.parseEther(amount),
      );
    },
    {
      onSuccess: (_data, _variables, _options, invalidate) => {
        return invalidate([
          packKeys.linkBalance(packModule?.address),
          linkBalanceKeys.detail(address),
        ]);
      },
    },
  );
}

export function usePackOpenMutation(moduleAddress?: string) {
  const packModule = usePackModule(moduleAddress);

  return useMutationWithInvalidate(
    async (tokenId: string) => {
      invariant(packModule, "module is required");
      return packModule?.open(tokenId);
    },
    {
      onSuccess: (_data, _variables, _options, invalidate) => {
        return invalidate([packKeys.list(moduleAddress)]);
      },
    },
  );
}

export function usePackCreateMutation(module?: PackModule) {
  return useMutationWithInvalidate(
    async (data: PackTokenInput) => {
      invariant(module, "module is required");

      const {
        assets: rewardAssets,
        rewardsPerOpen: perOpen,
        ...packData
      } = data;
      const assets = rewardAssets.map((asset) => ({
        tokenId: BigNumber.from(asset.tokenId),
        amount: BigNumber.from(asset.amount),
      }));

      const rewardsPerOpen = BigNumber.from(perOpen || 1);

      try {
        return await module.create({
          ...packData,
          rewardsPerOpen,
          assets,
        } as unknown as IPackCreateArgs);
      } catch (error: any) {
        if (!error.message.includes("NOT_FOUND")) {
          throw error;
        }
      }
    },
    {
      onSuccess: (_data, _variables, _options, invalidate) => {
        return invalidate([packKeys.list(module?.address)]);
      },
    },
  );
}
