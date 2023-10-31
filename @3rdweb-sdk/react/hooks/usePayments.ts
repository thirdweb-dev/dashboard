import { useQueryClient } from "@tanstack/react-query";
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
