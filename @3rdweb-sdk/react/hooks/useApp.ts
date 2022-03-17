import { useWeb3 } from "@3rdweb/hooks";
import { JSONValue, ModuleMetadata, ModuleType } from "@3rdweb/sdk";
import { usePrevious, useToast } from "@chakra-ui/react";
import { isAddress } from "@ethersproject/address";
import { AnalyticsEvents } from "constants/analytics";
import { CURRENCIES } from "constants/currencies";
import posthog from "posthog-js";
import { useCallback, useEffect, useMemo, useState } from "react";
import invariant from "ts-invariant";
import { parseErrorToMessage } from "utils/errorParser";
import { SupportedChainId } from "utils/network";
import { removeNull } from "utils/removeNull";
import { isAddressZero, OtherAddressZero } from "utils/zeroAddress";
import { appKeys, dashboardKeys, moduleKeys } from "../cache-keys";
import {
  useMutationWithInvalidate,
  useQueryWithNetwork,
} from "./query/useQueryWithNetwork";
import { useSDK } from "./useSDK";

export function useModuleMetadataList(
  appAddress?: string,
  filter?: ModuleType[],
) {
  const appModule = useAppModule(appAddress);
  return useQueryWithNetwork(
    moduleKeys.listWithFilters(appAddress, filter),
    () => appModule?.getAllModuleMetadata(filter),
    {
      enabled: !!appModule && !!appAddress,
    },
  );
}

export function useAppModule(appAddress?: string) {
  const sdk = useSDK();
  return useMemo(() => {
    if (!sdk || !appAddress) {
      return undefined;
    }
    return sdk.getAppModule(appAddress);
  }, [appAddress, sdk]);
}

export function useAppList() {
  const sdk = useSDK();
  const { address, chainId } = useWeb3();

  const query = useQueryWithNetwork(
    appKeys.list(removeNull(address)),
    async () => {
      try {
        const appListResult = (await sdk?.getApps())?.reverse();
        if (appListResult && appListResult[0] && !appListResult[0].metadata) {
          return undefined;
        }
        return appListResult;
      } catch (e) {
        console.debug("applist failed, probably expected?");
        return undefined;
      }
    },
    {
      enabled: !!address && !!sdk,
    },
  );

  const previousChainId = usePrevious(chainId);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (chainId && previousChainId && chainId !== previousChainId) {
      t = setTimeout(() => {
        query.remove();
        query.refetch();
      }, 500);
    }

    return () => {
      if (t) {
        clearTimeout(t);
      }
    };
  }, [chainId, previousChainId, query]);

  return query;
}

export function useApp(appAddress?: string) {
  const appModule = useAppModule(appAddress);

  return useQueryWithNetwork(
    appKeys.detail(appAddress),
    async () => appModule?.getMetadata(),
    {
      retry: true,
      enabled: !!appModule && !!appAddress && isAddress(appAddress),
    },
  );
}

export interface IAppTokenBalance {
  name: string;
  address: string;
  balance: string;
  symbol: string;
}

// TODO this should be a useQuery & useMutation - not a blocker but we should fix it
export function useAppBalanceAndWithdraw(
  appAddress?: string,
  chainId?: SupportedChainId,
  currencies?: ModuleMetadata[],
) {
  const toast = useToast();
  const { address } = useWeb3();
  const appModule = useAppModule(appAddress);
  const [loading, setLoading] = useState(true);
  const [withdrawLoading, setWithdrawLoading] = useState(false);
  const [balances, setBalances] = useState<IAppTokenBalance[]>([]);

  const getBalances = useCallback(async () => {
    if (chainId && currencies && appModule) {
      setLoading(true);
      const allCurrencies = [
        ...(currencies || []).map((currency) => ({
          name: currency.metadata?.name as string,
          address: currency.address,
          symbol: currency.metadata?.symbol as string,
        })),
        ...CURRENCIES[chainId],
      ];

      const allBalances = allCurrencies
        .filter((currency) => currency.address !== OtherAddressZero)
        .map(async (currency) => {
          const balance = (await appModule?.balanceOfToken(currency.address))
            ?.displayValue;

          return {
            ...currency,
            balance,
          };
        });

      const result = await Promise.all(allBalances);

      const nonZeroBalances = result.filter(
        (balance: IAppTokenBalance) =>
          parseFloat(balance.balance) > 0 || isAddressZero(balance.address),
      );

      setBalances(nonZeroBalances as unknown as IAppTokenBalance[]);
      setLoading(false);
    }
  }, [appModule, chainId, currencies]);

  useEffect(() => {
    if (chainId && currencies && appModule) {
      getBalances();
    }
  }, [chainId, currencies, appModule, getBalances]);

  const withdrawBalance = async (balance: IAppTokenBalance) => {
    if (address) {
      setWithdrawLoading(true);

      await appModule
        ?.withdrawFunds(address as string, balance.address)
        .then(() => {
          toast({
            title: `Success`,
            description: `Succesfully withdrew ${balance.symbol}`,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        })
        .catch((err) => {
          toast({
            title: `Error withdrawing ${balance.symbol}`,
            description: parseErrorToMessage(err),
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        });

      getBalances();
      setWithdrawLoading(false);
    }
  };

  return {
    loading,
    withdrawLoading,
    balances,
    withdrawBalance,
  };
}

export function useRoyaltyTreasury(appAddress?: string) {
  const appModule = useAppModule(appAddress);
  return useQueryWithNetwork(
    appKeys.royaltyTreasury(appAddress),
    async () => appModule?.getRoyaltyTreasury(appAddress),
    {
      retry: true,
      enabled: !!appModule && !!appAddress && isAddress(appAddress),
    },
  );
}

export function useShouldUpgradeToV2(appAddress?: string) {
  const appModule = useAppModule(appAddress);
  return useQueryWithNetwork(
    appKeys.shouldUpgradeToV2(appAddress),
    () => appModule?.shouldUpgradeToV2(),
    {
      enabled: !!appModule && !!appAddress && isAddress(appAddress),
    },
  );
}

export function useShouldUpgradeModuleList(appAddress?: string) {
  const appModule = useAppModule(appAddress);
  return useQueryWithNetwork(
    appKeys.shouldUpgradeModuleList(appAddress),
    () => appModule?.shouldUpgradeModuleList(),
    {
      enabled: !!appModule && !!appAddress && isAddress(appAddress),
    },
  );
}

export function useUpgradeToV2Mutation(appAddress?: string) {
  const appModule = useAppModule(appAddress);
  return useMutationWithInvalidate(
    async () => {
      invariant(appAddress, "app is required");
      return await appModule?.upgradeToV2();
    },
    {
      onSuccess: (_data, _variables, _options, invalidate) => {
        // for now just invalidate the entire app, should be safe to do
        return invalidate([appKeys.detail(appAddress)]);
      },
    },
  );
}

export function useUpgradeModuleListMutation(appAddress?: string) {
  const appModule = useAppModule(appAddress);
  return useMutationWithInvalidate(
    async (address: string) => {
      invariant(appAddress, "app is required");
      invariant(address, "address is required");
      return await appModule?.upgradeModuleList([address]);
    },
    {
      onSuccess: (_data, _variables, _options, invalidate) => {
        // for now just invalidate the entire app, should be safe to do
        return invalidate([
          appKeys.detail(appAddress),
          moduleKeys.list(appAddress),
        ]);
      },
    },
  );
}

export function useDeployApp() {
  const { address } = useWeb3();
  const sdk = useSDK();

  return useMutationWithInvalidate(
    async (metaData: Record<string, JSONValue>) => {
      invariant(sdk, "sdk is required");
      const receipt = await sdk.createApp(metaData);

      const event = receipt?.events?.find(
        (e: any) => e.event === "NewProtocolControl",
      );
      const controlAddress = event?.args?.controlAddress as string;
      return controlAddress;
    },
    {
      onSuccess: (_data, metaData, _context, invalidate) => {
        posthog.capture(AnalyticsEvents.AppCreated, {
          uri: metaData,
        });

        return invalidate([appKeys.all, dashboardKeys.list(address)]);
      },
    },
  );
}
