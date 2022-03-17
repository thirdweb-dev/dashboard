import { useWeb3 } from "@3rdweb/hooks";
import { ModuleType } from "@3rdweb/sdk";
import { useToast } from "@chakra-ui/react";
import { AddressZero } from "@ethersproject/constants";
import { CURRENCIES } from "constants/currencies";
import { formatUnits } from "ethers/lib/utils";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { useCallback, useEffect, useMemo, useState } from "react";
import { parseErrorToMessage } from "utils/errorParser";
import { SupportedChainId } from "utils/network";
import { isAddressZero, OtherAddressZero } from "utils/zeroAddress";
import {
  useActiveChainId,
  useModuleMetadata,
  useModuleMetadataList,
  useTokenModule,
} from ".";
import { splitsKeys } from "..";
import { useQueryWithNetwork } from "./query/useQueryWithNetwork";
import { useSDK } from "./useSDK";

export function useSplitsModule(moduleAddress?: string) {
  const sdk = useSDK();
  return useMemo(() => {
    if (!sdk || !moduleAddress) {
      return undefined;
    }
    return sdk.getSplitsModule(moduleAddress);
  }, [moduleAddress, sdk]);
}

export function useSplitsModuleMetadata(moduleAddres?: string) {
  return useModuleMetadata(useTokenModule(moduleAddres));
}

export function useSplitsData(moduleAddress?: string) {
  const splitsModule = useSplitsModule(moduleAddress);
  return useQueryWithNetwork(
    splitsKeys.list(moduleAddress),
    async () => splitsModule?.getAllRecipients(),
    {
      enabled: !!splitsModule && !!moduleAddress,
    },
  );
}

export interface IBalance {
  address: string;
  name: string;
  symbol: string;
  balance: string;
}

export function useSplitsBalanceAndDistribute(moduleAddress?: string) {
  const { address } = useWeb3();
  const toast = useToast();
  const chainId = useActiveChainId();
  const appAddress = useSingleQueryParam("app");
  const splitsModule = useSplitsModule(moduleAddress);
  const [loading, setLoading] = useState(true);
  const [distributeLoading, setDistributeLoading] = useState(false);
  const [noBalance, setNoBalance] = useState(true);
  const [balances, setBalances] = useState<IBalance[]>([]);
  const [nonZeroBalances, setNonZeroBalances] = useState<IBalance[]>([]);

  const { data: currencies } = useModuleMetadataList(appAddress, [
    ModuleType.CURRENCY,
  ]);

  const getBalances = useCallback(async () => {
    setLoading(true);
    const customCurrencyBalances = currencies?.map(async (currency) => {
      const fullBalance = await splitsModule?.balanceOfToken(
        address as string,
        currency.address,
      );

      const balance = formatUnits(
        fullBalance?.value as string,
        fullBalance?.decimals,
      );

      return {
        address: currency.address,
        name: currency.metadata?.name as string,
        symbol: currency.metadata?.symbol as string,
        balance: balance as string,
      };
    });

    const currencyBalances = CURRENCIES[chainId as SupportedChainId]
      ?.filter((currency) => currency.address !== OtherAddressZero)
      .map(async (currency) => {
        const balance =
          currency.address === AddressZero
            ? formatUnits(
                (
                  await splitsModule?.balanceOf(address as string)
                )?.toString() as string,
                18,
              )
            : formatUnits(
                (
                  await splitsModule?.balanceOfToken(
                    address as string,
                    currency.address,
                  )
                )?.value as string,
                (
                  await splitsModule?.balanceOfToken(
                    address as string,
                    currency.address,
                  )
                )?.decimals,
              );

        return {
          address: currency.address,
          name: currency.name,
          symbol: currency.symbol,
          balance: balance as string,
        };
      });

    const allBalances = await Promise.all([
      ...(customCurrencyBalances || []),
      ...currencyBalances,
    ]);

    const nonZeBalances = allBalances.filter((balance: IBalance) => {
      return parseFloat(balance.balance) > 0;
    });

    const displayBalances = allBalances.filter((balance: IBalance) => {
      return (
        parseFloat(balance.balance) > 0 ||
        isAddressZero(balance.address) ||
        balance.symbol === "USDC" ||
        balance.symbol === "USDT"
      );
    });

    setNoBalance(nonZeBalances.length === 0);
    setNonZeroBalances(nonZeBalances);
    setBalances(displayBalances as unknown as IBalance[]);
    setLoading(false);
  }, [address, chainId, currencies, splitsModule]);

  useEffect(() => {
    if (address && currencies) {
      getBalances();
    }
  }, [currencies, address, getBalances]);

  const distributeFunds = async () => {
    setDistributeLoading(true);
    const distributions = nonZeroBalances?.map(async (balance: IBalance) => {
      if (balance.address === AddressZero) {
        await splitsModule
          ?.distribute()
          .then(() => {
            toast({
              title: `Success`,
              description: `Succesfully distributed ${balance.name}`,
              status: "success",
              duration: 5000,
              isClosable: true,
            });
          })
          .catch((err) => {
            toast({
              title: `Error distributing ${balance.name}`,
              description: parseErrorToMessage(err),
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          });
      } else {
        await splitsModule
          ?.distributeToken(balance.address)
          .then(() => {
            toast({
              title: `Success`,
              description: `Succesfully distributed ${balance.name}`,
              status: "success",
              duration: 5000,
              isClosable: true,
            });
          })
          .catch((err) => {
            toast({
              title: `Error distributing ${balance.name}`,
              description: parseErrorToMessage(err),
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          });
      }
    });

    await Promise.all(distributions);
    getBalances();
    setDistributeLoading(false);
  };

  return {
    loading,
    distributeLoading,
    noBalance,
    nonZeroBalances,
    balances,
    distributeFunds,
  };
}
