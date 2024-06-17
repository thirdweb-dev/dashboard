import { useQuery } from "@tanstack/react-query";
import { getContract } from "thirdweb/contract";
import { thirdwebClient } from "@/constants/client";
import { getCurrencyMetadata } from "thirdweb/extensions/erc20";
import { defineChain, getChainMetadata } from "thirdweb/chains";

type GetTokenInfoOptions = {
  chainId: number;
  tokenAddress?: string;
};

type GetTokenInfoResult = {
  name: string;
  symbol: string;
  decimals: number;
};

/**
 * @internal
 */
export function useTokenInfo(options: GetTokenInfoOptions) {
  const { chainId, tokenAddress } = options;
  const client = thirdwebClient;

  return useQuery({
    queryKey: ["tokenInfo", chainId || -1, { tokenAddress }] as const,
    queryFn: async () => {
      const chain = defineChain(chainId);

      // erc20 case
      if (tokenAddress) {
        const result: GetTokenInfoResult = await getCurrencyMetadata({
          contract: getContract({
            client,
            chain,
            address: tokenAddress,
          }),
        });

        return result;
      }

      const chainMeta = await getChainMetadata(chain);

      const result: GetTokenInfoResult = {
        decimals: chainMeta.nativeCurrency.decimals,
        symbol: chainMeta.nativeCurrency.symbol,
        name: chainMeta.nativeCurrency.name,
      };

      return result;
    },
  });
}
