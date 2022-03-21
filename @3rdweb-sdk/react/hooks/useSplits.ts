import { useActiveChainId, useContractMetadata } from ".";
import { splitsKeys } from "..";
import { useQueryWithNetwork } from "./query/useQueryWithNetwork";
import { useWeb3 } from "@3rdweb-sdk/react";
import { useToast } from "@chakra-ui/react";
import { AddressZero } from "@ethersproject/constants";
import { useSplit, useToken } from "@thirdweb-dev/react";
import { CURRENCIES } from "constants/currencies";
import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { parseErrorToMessage } from "utils/errorParser";
import { SUPPORTED_CHAIN_ID } from "utils/network";
import { isAddressZero } from "utils/zeroAddress";

export function useSplitsContractMetadata(contractAddres?: string) {
  return useContractMetadata(useToken(contractAddres));
}

export function useSplitsData(contractAddress?: string) {
  const splitsContract = useSplit(contractAddress);

  return useQueryWithNetwork(
    splitsKeys.list(contractAddress),
    async () => splitsContract?.getAllRecipients(),
    {
      enabled: !!splitsContract && !!contractAddress,
    },
  );
}

export interface IBalance {
  address: string;
  name: string;
  symbol: string;
  balance: string;
}

export function useSplitsBalanceAndDistribute(contractAddress?: string) {
  const { address } = useWeb3();
  const toast = useToast();
  const chainId = useActiveChainId();
  const splitsContract = useSplit(contractAddress);
  const [loading, setLoading] = useState(true);
  const [distributeLoading, setDistributeLoading] = useState(false);
  const [noBalance, setNoBalance] = useState(true);
  const [balances, setBalances] = useState<IBalance[]>([]);
  const [nonZeroBalances, setNonZeroBalances] = useState<IBalance[]>([]);

  const getBalances = useCallback(async () => {
    setLoading(true);

    const res = await fetch("/api/moralis/balances", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chain: `0x${chainId?.toString(16)}` as any,
        address: contractAddress,
      }),
    });

    const data = await res.json();

    const currencies = data.map((token: any) => {
      if (isAddressZero(token.token_address)) {
        const native = CURRENCIES[chainId as SUPPORTED_CHAIN_ID].find((c) =>
          isAddressZero(c.address),
        );

        return {
          token_address: AddressZero,
          name: native?.name,
          symbol: native?.symbol,
        };
      } else {
        return token;
      }
    });

    const formatted = await Promise.all(
      currencies.map(async (currency: any) => {
        const balance = isAddressZero(currency.token_address)
          ? ethers.utils.formatEther(
              (
                await splitsContract?.balanceOf(address as string)
              )?.toString() || "0",
            )
          : ethers.utils.formatUnits(
              (
                await splitsContract?.balanceOfToken(
                  address as string,
                  currency.token_address,
                )
              )?.value.toString() || "0",
              currency.decimals,
            );

        return {
          ...currency,
          balance: balance as string,
        };
      }),
    );

    setBalances(formatted);
    setLoading(false);
  }, [chainId, contractAddress, address, splitsContract]);

  useEffect(() => {
    if (address) {
      getBalances();
    }
  }, [address, getBalances]);

  const distributeFunds = async () => {
    setDistributeLoading(true);
    const distributions = nonZeroBalances?.map(async (balance: IBalance) => {
      if (balance.address === AddressZero) {
        await splitsContract
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
          .catch((err: unknown) => {
            toast({
              title: `Error distributing ${balance.name}`,
              description: parseErrorToMessage(err),
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          });
      } else {
        await splitsContract
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
          .catch((err: unknown) => {
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
