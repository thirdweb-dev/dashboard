import { useWeb3 } from "@3rdweb/hooks";
import { Currency, CurrencyValue, TokenModule } from "@3rdweb/sdk";
import { parseUnits } from "@ethersproject/units";
import { BigNumber } from "ethers";
import { isAddress } from "ethers/lib/utils";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { CurrencyTokenInput } from "schema/tokens";
import invariant from "ts-invariant";
import { removeNull } from "utils/removeNull";
import { isAddressZero } from "utils/zeroAddress";
import { tokenKeys } from "../cache-keys";
import { useMutationWithInvalidate } from "./query/useQueryWithNetwork";
import { useModuleMetadata } from "./useModule";
import { useSDK } from "./useSDK";

interface TokenWithSupplyAndContractBalance extends Partial<Currency> {
  totalSupply?: BigNumber;
  ownedBalance?: CurrencyValue | false;
}
export function useTokenModule(moduleAddress?: string) {
  const sdk = useSDK();
  return useMemo(() => {
    if (!sdk || !moduleAddress) {
      return undefined;
    }
    return sdk.getTokenModule(moduleAddress);
  }, [moduleAddress, sdk]);
}

export function useTokenModuleMetadata(moduleAddress?: string) {
  return useModuleMetadata(useTokenModule(moduleAddress));
}

export function useTokenData(moduleAddress?: string) {
  const { address } = useWeb3();
  const tokenModule = useTokenModule(moduleAddress);
  return useQuery<TokenWithSupplyAndContractBalance | undefined>(
    tokenKeys.detail(moduleAddress, removeNull(address)),
    async () => {
      const [currency, totalSupply, ownedBalance] = await Promise.all([
        tokenModule?.get(),
        tokenModule?.totalSupply(),
        address ? tokenModule?.balance() : Promise.resolve(false),
      ]);
      return {
        ...currency,
        totalSupply,
        ownedBalance: ownedBalance as CurrencyValue | undefined | false,
      };
    },
    {
      enabled:
        !!tokenModule &&
        !!moduleAddress &&
        !isAddressZero(moduleAddress) &&
        isAddress(moduleAddress),
    },
  );
}

export function useTokenDecimals(moduleAddress?: string) {
  const tokenModule = useTokenModule(moduleAddress);
  return useQuery(
    tokenKeys.decimals(moduleAddress),
    async () =>
      isAddressZero(moduleAddress || "")
        ? { decimals: 18 }
        : tokenModule?.get(),
    {
      enabled: !!tokenModule && !!moduleAddress && isAddress(moduleAddress),
      placeholderData: {
        name: "",
        symbol: "",
        decimals: 18,
      },
    },
  );
}

// ----------------------------------------------------------------
// Mutations
// ----------------------------------------------------------------

export function useTokenMintMutation(module?: TokenModule) {
  return useMutationWithInvalidate(
    async (data: CurrencyTokenInput) => {
      invariant(module, "module is required");
      const { decimals } = await module.get();
      invariant(decimals, "decimals is required");
      return await module.mint(parseUnits(data.amount, decimals));
    },
    {
      onSuccess: (_data, _options, _variables, invalidate) => {
        return invalidate([tokenKeys.detail(module?.address)]);
      },
    },
  );
}
