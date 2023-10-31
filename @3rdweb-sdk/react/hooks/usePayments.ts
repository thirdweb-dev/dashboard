import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useApiAuthToken } from "./useApi";
import { useMutationWithInvalidate } from "./query/useQueryWithNetwork";
import { Abi } from "@thirdweb-dev/sdk";
import { THIRDWEB_PAYMENTS_API_HOST } from "constants/urls";
import { paymentsKeys } from "../cache-keys";
import { useAddress } from "@thirdweb-dev/react";
import invariant from "tiny-invariant";
import {
  Arbitrum,
  ArbitrumGoerli,
  Avalanche,
  AvalancheFuji,
  Base,
  BaseGoerli,
  Binance,
  BinanceTestnet,
  Ethereum,
  Goerli,
  Mumbai,
  Optimism,
  OptimismGoerli,
  Polygon,
  Sepolia,
} from "@thirdweb-dev/chains";
import { getEVMThirdwebSDK } from "lib/sdk";
import { RPC_ENV } from "constants/rpc";
import {
  ContractsByOwnerIdQueryVariables,
  useContractsByOwnerIdQuery,
} from "graphql/queries/__generated__/ContractsByOwnerId.generated";
import {
  ContractsByAddressAndChainQueryVariables,
  useContractsByAddressAndChainQuery,
} from "graphql/queries/__generated__/ContractsByAddressAndChain.generated";
import {
  DetailedAnalyticsQueryVariables,
  useDetailedAnalyticsQuery,
} from "graphql/queries/__generated__/DetailedAnalytics.generated";

// TODO: Get this from API
export const validPaymentsChainIds: number[] = [
  Ethereum.chainId,
  Goerli.chainId,
  Sepolia.chainId,
  Polygon.chainId,
  Mumbai.chainId,
  Avalanche.chainId,
  AvalancheFuji.chainId,
  Optimism.chainId,
  OptimismGoerli.chainId,
  Arbitrum.chainId,
  ArbitrumGoerli.chainId,
  Binance.chainId,
  BinanceTestnet.chainId,
  Base.chainId,
  BaseGoerli.chainId,
];

// type for validcheckoutchainids
export type PaymentChainId = (typeof validPaymentsChainIds)[number];

const ChainIdToPaperChain: Record<number, string> = {
  [Ethereum.chainId]: "Ethereum",
  [Goerli.chainId]: "Goerli",
  [Sepolia.chainId]: "Sepolia",
  [Polygon.chainId]: "Polygon",
  [Mumbai.chainId]: "Mumbai",
  [Avalanche.chainId]: "Avalanche",
  [AvalancheFuji.chainId]: "AvalancheFuji",
  [Optimism.chainId]: "Optimism",
  [OptimismGoerli.chainId]: "OptimismGoerli",
  [Arbitrum.chainId]: "ArbitrumOne",
  [ArbitrumGoerli.chainId]: "ArbitrumGoerli",
  [Binance.chainId]: "BSC",
  [BinanceTestnet.chainId]: "BSCTestnet",
  [Base.chainId]: "Base",
  [BaseGoerli.chainId]: "BaseGoerli",
};

export const PaperChainToChainId: Record<string, number> = {
  Ethereum: Ethereum.chainId,
  Goerli: Goerli.chainId,
  Sepolia: Sepolia.chainId,
  Polygon: Polygon.chainId,
  Mumbai: Mumbai.chainId,
  Avalanche: Avalanche.chainId,
  AvalancheFuji: AvalancheFuji.chainId,
  Optimism: Optimism.chainId,
  OptimismGoerli: OptimismGoerli.chainId,
  ArbitrumOne: Arbitrum.chainId,
  ArbitrumGoerli: ArbitrumGoerli.chainId,
  BSC: Binance.chainId,
  BSCTestnet: BinanceTestnet.chainId,
  Base: Base.chainId,
  BaseGoerli: BaseGoerli.chainId,
};

export type RegisterContractInput = {
  chain: string;
  contractAddress: string;
  contractType?: "CUSTOM_CONTRACT" | "THIRDWEB";
  contractDefinition?: Abi;
  displayName?: string;
};

function usePaymentsApi() {
  const { token } = useApiAuthToken();

  const fetchFromApi = async <T>(endpoint: string, body: T) => {
    const res = await fetch(
      `${THIRDWEB_PAYMENTS_API_HOST}/api/2022-08-12/${endpoint}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      },
    );
    const json = await res.json();

    if (json.error) {
      throw new Error(json.message);
    }

    return json.result;
  };

  return fetchFromApi;
}

export function usePaymentsRegisterContract() {
  const fetchFromPaymentsAPI = usePaymentsApi();
  const queryClient = useQueryClient();
  const address = useAddress();

  return useMutationWithInvalidate(
    async (input: RegisterContractInput) => {
      invariant(address, "No wallet address found");
      const sdk = getEVMThirdwebSDK(
        parseInt(input.chain),
        `https://${input.chain}.${RPC_ENV}.thirdweb.com`,
      );
      invariant(sdk, "No SDK found");

      const contract = await sdk.getContract(input.contractAddress);
      invariant(contract?.abi, "No contract ABI found");

      const body: RegisterContractInput = {
        ...input,
        contractDefinition: contract.abi,
        contractAddress: input.contractAddress.toLowerCase(),
        chain: ChainIdToPaperChain[parseInt(input.chain)],
        contractType: input.contractType || "THIRDWEB",
        displayName: input.displayName,
      };

      return fetchFromPaymentsAPI<RegisterContractInput>(
        "register-contract",
        body,
      );
    },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries(
          paymentsKeys.contracts(address as string),
        );
      },
    },
  );
}

export function usePaymentsEnabledContracts() {
  const address = useAddress();
  const { paymentsSellerId } = useApiAuthToken();
  const { data } = useContractsByOwnerIdQuery({
    variables: {
      ownerId: paymentsSellerId,
    } as ContractsByOwnerIdQueryVariables,
  });

  return useQuery(
    paymentsKeys.contracts(address as string),
    async () => {
      return data && (data?.contract || []) ? data.contract : [];
    },
    { enabled: !!paymentsSellerId && !!address },
  );
}

export function usePaymentsContractByAddressAndChain(
  contractAddress: string | undefined,
  chainId: number | undefined,
) {
  invariant(contractAddress, "contractAddress is required");
  invariant(chainId, "chainId is required");
  const address = useAddress();
  const { paymentsSellerId } = useApiAuthToken();
  const { data } = useContractsByAddressAndChainQuery({
    variables: {
      ownerId: paymentsSellerId,
      chain: ChainIdToPaperChain[chainId],
      contractAddress,
    } as ContractsByAddressAndChainQueryVariables,
  });

  return useQuery(
    paymentsKeys.contracts(address as string),
    async () => {
      return data && (data?.contract || []).length > 0
        ? data.contract[0]
        : undefined;
    },
    { enabled: !!paymentsSellerId && !!address },
  );
}

export function usePaymentsDetailedAnalytics(checkoutId: string | undefined) {
  invariant(checkoutId, "checkoutId is required");
  const address = useAddress();
  const { paymentsSellerId } = useApiAuthToken();
  const { data } = useDetailedAnalyticsQuery({
    variables: {
      ownerId: paymentsSellerId,
      checkoutId,
    } as DetailedAnalyticsQueryVariables,
  });

  return useQuery(
    paymentsKeys.detailedAnalytics(checkoutId),
    async () => {
      return {
        overview: data?.analytics_overview_2,
        detailed: data?.get_detailed_analytics,
      };
    },
    { enabled: !!paymentsSellerId && !!address },
  );
}
