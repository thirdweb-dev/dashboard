import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useApiAuthToken } from "./useApi";
import { useMutationWithInvalidate } from "./query/useQueryWithNetwork";
import { Abi, FeatureName, SmartContract } from "@thirdweb-dev/sdk";
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
  useContractsByOwnerIdLazyQuery,
} from "graphql/queries/__generated__/ContractsByOwnerId.generated";
import {
  ContractsByAddressAndChainQuery,
  ContractsByAddressAndChainQueryVariables,
  useContractsByAddressAndChainLazyQuery,
} from "graphql/queries/__generated__/ContractsByAddressAndChain.generated";
import {
  DetailedAnalyticsQueryVariables,
  useDetailedAnalyticsLazyQuery,
} from "graphql/queries/__generated__/DetailedAnalytics.generated";
import {
  CheckoutByContractAddressQueryVariables,
  useCheckoutByContractAddressLazyQuery,
} from "graphql/queries/__generated__/CheckoutByContractAddress.generated";
import { BaseContract } from "ethers";
import { detectFeatures } from "components/contract-components/utils";
import {
  GetSellerByThirdwebAccountIdDocument,
  GetSellerByThirdwebAccountIdQuery,
  GetSellerByThirdwebAccountIdQueryVariables,
  useGetSellerByThirdwebAccountIdLazyQuery,
} from "graphql/mutations/__generated__/GetSellerByThirdwebAccountId.generated";
import { useUpdateSellerByThirdwebAccountIdMutation } from "graphql/mutations/__generated__/UpdateSellerByThirdwebAccountId.generated";

export const paymentsExtensions: FeatureName[] = [
  "ERC721SharedMetadata",
  "ERC721ClaimPhasesV2",
  "ERC721ClaimConditionsV2",
  "ERC1155ClaimPhasesV1",
  "ERC1155ClaimPhasesV2",
];

export const isPaymentsSupported = (
  contract: SmartContract<BaseContract> | undefined,
) => {
  return detectFeatures(contract, paymentsExtensions);
};

// TODO: Get this from API
export const validPaymentsChainIdsMainnets: number[] = [
  Ethereum.chainId,
  Polygon.chainId,
  Avalanche.chainId,
  Optimism.chainId,
  Arbitrum.chainId,
  Binance.chainId,
  Base.chainId,
];

export const validPaymentsChainIdsTestnets: number[] = [
  Goerli.chainId,
  Sepolia.chainId,
  Mumbai.chainId,
  AvalancheFuji.chainId,
  OptimismGoerli.chainId,
  ArbitrumGoerli.chainId,
  BinanceTestnet.chainId,
  BaseGoerli.chainId,
];

export const validPaymentsChainIds: number[] = [
  ...validPaymentsChainIdsMainnets,
  ...validPaymentsChainIdsTestnets,
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

  const fetchFromApi = async <T>(
    method: string,
    endpoint: string,
    body?: T,
  ) => {
    const res = await fetch(
      `${THIRDWEB_PAYMENTS_API_HOST}/api/2022-08-12/${endpoint}`,
      {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        ...(body && { body: JSON.stringify(body) }),
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
        "POST",
        "register-contract",
        body,
      );
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          paymentsKeys.contracts(address as string),
        );
      },
    },
  );
}

export type CreateUpdateCheckoutInput = {
  contractId: string;
  title: string;
  description?: string;
  imageUrl?: string;
  limitPerTransaction?: number;
  twitterHandleOverride?: string;
  successCallbackUrl?: string;
  redirectAfterPayment?: boolean;
  cancelCallbackUrl?: string;
  mintMethod?: string;
  eligibilityMethod?: {
    name: string;
    args: string[];
  };
  tokenId?: string;
  listingId?: string;
  contractArgs?: string;
  hideNativeMint?: boolean;
  hidePaperWallet?: boolean;
  hideExternalWallet?: boolean;
  hidePayWithCard?: boolean;
  hidePayWithCrypto?: boolean;
  hidePayWithIdeal?: boolean;
  sendEmailOnTransferSucceeded?: boolean;
  brandDarkMode?: boolean;
  brandButtonShape?: "full" | "lg" | "none";
  brandColorScheme?:
    | "gray"
    | "red"
    | "orange"
    | "yellow"
    | "green"
    | "teal"
    | "blue"
    | "cyan"
    | "purple"
    | "pink";
  thirdwebClientId: string;
  checkoutId?: string;
};

export function usePaymentsCreateUpdateCheckout(contractAddress: string) {
  const fetchFromPaymentsAPI = usePaymentsApi();
  const queryClient = useQueryClient();
  const address = useAddress();

  return useMutationWithInvalidate(
    async (input: CreateUpdateCheckoutInput) => {
      invariant(address, "No wallet address found");

      return fetchFromPaymentsAPI<CreateUpdateCheckoutInput>(
        "POST",
        `shareable-checkout-link${
          input?.checkoutId ? `/${input.checkoutId} ` : ""
        }`,
        input,
      );
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          paymentsKeys.checkouts(contractAddress, address as string),
        );
      },
    },
  );
}

export type RemoveCheckoutInput = {
  checkoutId: string;
};

export function usePaymentsRemoveCheckout(contractAddress: string) {
  const fetchFromPaymentsAPI = usePaymentsApi();
  const queryClient = useQueryClient();
  const address = useAddress();

  return useMutationWithInvalidate(
    async (input: RemoveCheckoutInput) => {
      invariant(address, "No wallet address found");
      invariant(input.checkoutId, "No checkoutId found");

      return fetchFromPaymentsAPI<RemoveCheckoutInput>(
        "DELETE",
        `shareable-checkout-link/${input.checkoutId}`,
      );
    },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries(
          paymentsKeys.checkouts(contractAddress, address as string),
        );
      },
    },
  );
}

export type SellerValueInput = {
  twitter_handle: string;
  discord_username: string;
  company_name: string;
  company_logo_url: string;
  support_email: string;
  estimated_launch_date: Date;
};

export type UpdateSellerByAccountIdInput = {
  thirdwebAccountId: string;
  sellerValue: SellerValueInput;
};

export function usePaymentsUpdateSellerByAccountId(accountId: string) {
  const queryClient = useQueryClient();
  const address = useAddress();

  const [updateSellerByThirdwebAccountId] =
    useUpdateSellerByThirdwebAccountIdMutation({
      refetchQueries: [GetSellerByThirdwebAccountIdDocument],
    });

  return useMutationWithInvalidate(
    async (input: UpdateSellerByAccountIdInput) => {
      invariant(address, "No wallet address found");
      invariant(accountId, "No accountId found");

      return updateSellerByThirdwebAccountId({
        variables: {
          thirdwebAccountId: input.thirdwebAccountId,
          sellerValue: input.sellerValue,
        } as UpdateSellerByAccountIdInput,
      });
    },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries(
          paymentsKeys.checkouts(accountId, address as string),
        );
      },
    },
  );
}

export function usePaymentsEnabledContracts() {
  const address = useAddress();
  const { paymentsSellerId } = useApiAuthToken();
  const [getContractsByOwnerId] = useContractsByOwnerIdLazyQuery();

  return useQuery(
    paymentsKeys.contracts(address as string),
    async () => {
      const { data } = await getContractsByOwnerId({
        variables: {
          ownerId: paymentsSellerId,
        } as ContractsByOwnerIdQueryVariables,
      });
      return data && data?.contract.length > 0 ? data.contract : [];
    },
    { enabled: !!paymentsSellerId && !!address },
  );
}

export function usePaymentsCheckoutsByContract(contractAddress: string) {
  const address = useAddress();
  const { paymentsSellerId } = useApiAuthToken();
  const [getCheckoutsByContractAddress] =
    useCheckoutByContractAddressLazyQuery();

  return useQuery(
    paymentsKeys.checkouts(contractAddress, address as string),
    async () => {
      const { data, error } = await getCheckoutsByContractAddress({
        variables: {
          ownerId: paymentsSellerId,
          contractAddress,
        } as CheckoutByContractAddressQueryVariables,
      });

      // TODO: Handle error

      const checkouts = data?.checkout || [];
      return (
        checkouts.filter(
          (checkout) => !checkout.generated_by_registered_contract,
        ) ?? []
      );
    },
    {
      enabled: !!paymentsSellerId && !!address && !!contractAddress,
    },
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
  const [getContractsByAddressAndChain] =
    useContractsByAddressAndChainLazyQuery();

  return useQuery(
    paymentsKeys.contractsByChainId(address as string, chainId),
    async () => {
      const { data } = await getContractsByAddressAndChain({
        variables: {
          ownerId: paymentsSellerId,
          chain: ChainIdToPaperChain[chainId],
          contractAddress,
        } as ContractsByAddressAndChainQueryVariables,
      });

      return data && (data?.contract || []).length > 0
        ? data.contract[0]
        : ({} as ContractsByAddressAndChainQuery["contract"][number]);
    },
    {
      enabled:
        !!paymentsSellerId && !!address && !!contractAddress && !!chainId,
    },
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
  const [getDetailedAnalytics] = useDetailedAnalyticsLazyQuery();

  return useQuery(
    paymentsKeys.detailedAnalytics(checkoutId),
    async () => {
      const { data } = await getDetailedAnalytics({
        variables: {
          ownerId: paymentsSellerId,
          checkoutId,
        } as DetailedAnalyticsQueryVariables,
      });

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

export function usePaymentsSellerByAccountId(accountId: string) {
  invariant(accountId, "accountId is required");
  const address = useAddress();
  const { paymentsSellerId } = useApiAuthToken();
  const [getSellerByAccountId] = useGetSellerByThirdwebAccountIdLazyQuery();

  return useQuery(
    paymentsKeys.detailedAnalytics(accountId),
    async () => {
      const { data } = await getSellerByAccountId({
        variables: {
          thirdwebAccountId: accountId,
        } as GetSellerByThirdwebAccountIdQueryVariables,
      });

      return data && data?.seller.length > 0
        ? data.seller[0]
        : ({} as GetSellerByThirdwebAccountIdQuery["seller"][number]);
    },
    { enabled: !!paymentsSellerId && !!address },
  );
}
