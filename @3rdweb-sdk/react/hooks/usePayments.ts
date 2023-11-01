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

export enum PaymentMethod {
  NATIVE_MINT = "NATIVE_MINT",
  BUY_WITH_CARD = "BUY_WITH_CARD",
  BUY_WITH_BANK = "BUY_WITH_BANK",
  BUY_WITH_CRYPTO = "BUY_WITH_CRYPTO",
  ENQUEUED_JOB = "ENQUEUED_JOB",
  FREE_CLAIM_AND_TRANSFER = "FREE_CLAIM_AND_TRANSFER",
  BUY_WITH_IDEAL = "BUY_WITH_IDEAL",
}

export const PaymentMethodToText: Record<PaymentMethod, string> = {
  [PaymentMethod.BUY_WITH_CARD]: "Card",
  [PaymentMethod.BUY_WITH_BANK]: "Bank Account",
  [PaymentMethod.BUY_WITH_CRYPTO]: "Other Crypto",
  [PaymentMethod.NATIVE_MINT]: "Native",
  [PaymentMethod.ENQUEUED_JOB]: "Free Claim",
  [PaymentMethod.FREE_CLAIM_AND_TRANSFER]: "Free claim",
  [PaymentMethod.BUY_WITH_IDEAL]: "iDEAL",
};

export enum FiatCurrency {
  USD = "USD",
  EUR = "EUR",
  JPY = "JPY",
  GBP = "GBP",
  AUD = "AUD",
  CAD = "CAD",
  CHF = "CHF",
  CNH = "CNH",
  HKD = "HKD",
  NZD = "NZD",
}

const WALLET_TYPE = "wallet_type";
const PAYMENT_METHOD = "payment_method";
export function parseAnalyticOverviewData(data: any[]): any[] {
  const result: { [checkout_id: string]: any } = {};

  for (const item of data) {
    const temp = result[item.checkout_id] || { revenue_cents: {} };

    temp.collection_title = item.collection_title || "";
    temp.collection_description = item.collection_description || "";
    temp.checkout_created_at = item.checkout_created_at || "";
    temp.checkout_deleted_at = item.checkout_deleted_at || "";
    temp.checkout_id = item.checkout_id || "";
    temp.image_url = item.image_url || "";

    temp.network_fees_cents =
      (temp.network_fees_cents || 0) + (item.network_fees_cents || 0);
    temp.number_sold = (temp.number_sold || 0) + (item.number_sold || 0);

    if (item.revenue_cents > 0) {
      temp.revenue_cents[
        (item.fiat_currency as FiatCurrency) || FiatCurrency.USD
      ] =
        (temp.revenue_cents[
          (item.fiat_currency as FiatCurrency) || FiatCurrency.USD
        ] || 0) + (item.revenue_cents || 0);
    }

    temp.paper_fees_cents =
      (temp.paper_fees_cents || 0) + item.paper_fees_cents;
    temp.num_transactions_made =
      (temp.num_transactions_made || 0) + (item.num_transactions_made || 0);

    if (item.wallet_type) {
      const walletTemp = temp[WALLET_TYPE] || {};
      walletTemp[item.wallet_type] =
        (walletTemp[item.wallet_type] || 0) + item.number_sold;
      temp[WALLET_TYPE] = walletTemp;
    }
    if (item.payment_method) {
      const paymentTemp = temp[PAYMENT_METHOD] || {};
      paymentTemp[PaymentMethodToText[item.payment_method as PaymentMethod]] =
        (paymentTemp[
          PaymentMethodToText[item.payment_method as PaymentMethod]
        ] || 0) + item.number_sold;
      temp[PAYMENT_METHOD] = paymentTemp;
    }

    result[item.checkout_id] = temp;
  }

  return [
    ...(Object.values(result)?.filter(
      (analytic) =>
        !analytic.checkout_deleted_at ||
        analytic.checkout_deleted_at === "infinity",
    ) ?? []),
  ];
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
        parsedOverview: parseAnalyticOverviewData(
          data?.analytics_overview_2 || [],
        )[0],
      };
    },
    { enabled: !!paymentsSellerId && !!address },
  );
}