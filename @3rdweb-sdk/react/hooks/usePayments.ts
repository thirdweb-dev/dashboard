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
  ArbitrumNova,
  ArbitrumSepolia,
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
  Zora,
  ZoraTestnet,
} from "@thirdweb-dev/chains";
import { getEVMThirdwebSDK } from "lib/sdk";
import { PROD_OR_DEV_URL } from "constants/rpc";
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
import { CURRENCIES, CurrencyMetadata } from "constants/currencies";

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
  Zora.chainId,
  ArbitrumNova.chainId,
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
  ZoraTestnet.chainId,
  ArbitrumSepolia.chainId,
];

export const validPaymentsChainIds: number[] = [
  ...validPaymentsChainIdsMainnets,
  ...validPaymentsChainIdsTestnets,
];

// type for validcheckoutchainids
export type PaymentChainId = (typeof validPaymentsChainIds)[number];

const ChainIdToPaperChain: Record<PaymentChainId, string> = {
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
  [ArbitrumNova.chainId]: "ArbitrumNova",
  [ArbitrumGoerli.chainId]: "ArbitrumGoerli",
  [ArbitrumSepolia.chainId]: "ArbitrumSepolia",
  [Binance.chainId]: "BSC",
  [BinanceTestnet.chainId]: "BSCTestnet",
  [Base.chainId]: "Base",
  [BaseGoerli.chainId]: "BaseGoerli",
  [Zora.chainId]: "Zora",
  [ZoraTestnet.chainId]: "ZoraTestnet",
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

export const ChainIdToSupportedCurrencies: Record<number, CurrencyMetadata[]> =
  {
    [Ethereum.chainId]: CURRENCIES[Ethereum.chainId]?.filter((currency) =>
      ["ETH", "USDC", "WETH", "MATIC"].includes(currency.symbol),
    ) as CurrencyMetadata[],
    [Goerli.chainId]: CURRENCIES[Goerli.chainId]?.filter((currency) =>
      ["ETH", "USDC", "WETH"].includes(currency.symbol),
    ) as CurrencyMetadata[],
    [Sepolia.chainId]: CURRENCIES[Sepolia.chainId]?.filter((currency) =>
      ["ETH"].includes(currency.symbol),
    ) as CurrencyMetadata[],
    [Polygon.chainId]: CURRENCIES[Polygon.chainId]?.filter((currency) =>
      ["MATIC", "WETH", "USDC", "USDC.e"].includes(currency.symbol),
    ) as CurrencyMetadata[],
    [Mumbai.chainId]: CURRENCIES[Mumbai.chainId]?.filter((currency) =>
      ["MATIC", "USDC", "USDC.e", "DERC20", "CDOL"].includes(currency.symbol),
    ) as CurrencyMetadata[],
    [Avalanche.chainId]: CURRENCIES[Avalanche.chainId]?.filter((currency) =>
      ["AVAX", "USDC", "USDC.e"].includes(currency.symbol),
    ) as CurrencyMetadata[],
    [AvalancheFuji.chainId]: CURRENCIES[AvalancheFuji.chainId]?.filter(
      (currency) => ["AVAX"].includes(currency.symbol),
    ) as CurrencyMetadata[],
    [Optimism.chainId]: CURRENCIES[Optimism.chainId]?.filter((currency) =>
      ["ETH", "USDC"].includes(currency.symbol),
    ) as CurrencyMetadata[],
    [OptimismGoerli.chainId]: CURRENCIES[OptimismGoerli.chainId]?.filter(
      (currency) => ["ETH"].includes(currency.symbol),
    ) as CurrencyMetadata[],
    [Arbitrum.chainId]: CURRENCIES[Arbitrum.chainId]?.filter((currency) =>
      ["ETH", "USDC"].includes(currency.symbol),
    ) as CurrencyMetadata[],
    [ArbitrumNova.chainId]: CURRENCIES[ArbitrumNova.chainId]?.filter(
      (currency) => ["ETH"].includes(currency.symbol),
    ) as CurrencyMetadata[],
    [ArbitrumGoerli.chainId]: CURRENCIES[ArbitrumGoerli.chainId]?.filter(
      (currency) => ["AGOR", "USDC"].includes(currency.symbol),
    ) as CurrencyMetadata[],
    [ArbitrumSepolia.chainId]: CURRENCIES[ArbitrumSepolia.chainId]?.filter(
      (currency) => ["ETH", "DERC20"].includes(currency.symbol),
    ) as CurrencyMetadata[],
    [Binance.chainId]: CURRENCIES[Binance.chainId]?.filter((currency) =>
      ["BNB", "USDC", "USDT"].includes(currency.symbol),
    ) as CurrencyMetadata[],
    [BinanceTestnet.chainId]: CURRENCIES[BinanceTestnet.chainId]?.filter(
      (currency) => ["TBNB", "USDT"].includes(currency.symbol),
    ) as CurrencyMetadata[],
    [Base.chainId]: CURRENCIES[Base.chainId]?.filter((currency) =>
      ["ETH"].includes(currency.symbol),
    ) as CurrencyMetadata[],
    [BaseGoerli.chainId]: CURRENCIES[BaseGoerli.chainId]?.filter((currency) =>
      ["ETH"].includes(currency.symbol),
    ) as CurrencyMetadata[],
    [Zora.chainId]: CURRENCIES[Zora.chainId]?.filter((currency) =>
      ["ETH"].includes(currency.symbol),
    ) as CurrencyMetadata[],
    [ZoraTestnet.chainId]: CURRENCIES[ZoraTestnet.chainId]?.filter((currency) =>
      ["ETH"].includes(currency.symbol),
    ) as CurrencyMetadata[],
  };

export type RegisterContractInput = {
  chain: string;
  contractAddress: string;
  contractType?: "CUSTOM_CONTRACT" | "THIRDWEB";
  contractDefinition?: Abi;
  displayName?: string;
};

const apiDate = "2022-08-12";

function usePaymentsApi() {
  const { token } = useApiAuthToken();

  const fetchFromApi = async <T>(
    method: string,
    endpoint: string,
    body?: T,
    options?: {
      isGenerateSignedUrl?: boolean;
      isCreateVerificationSession?: boolean;
      isSellerDocumentCount?: boolean;
      isSellerVerificationStatus?: boolean;
      isGetImageUploadLink?: boolean;
    },
  ) => {
    const res = await fetch(`${THIRDWEB_PAYMENTS_API_HOST}/api/${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      ...(body && { body: JSON.stringify(body) }),
    });
    const json = await res.json();

    if (json.error) {
      throw new Error(json.message);
    }

    if (options?.isGenerateSignedUrl) {
      return json.url;
    }

    if (options?.isCreateVerificationSession) {
      return json as { clientSecret: string; id: string };
    }

    if (options?.isSellerDocumentCount) {
      return json as { fileNames: string[]; count: number };
    }

    if (options?.isSellerVerificationStatus) {
      return json as { status: { type: string; message: string } };
    }

    if (options?.isGetImageUploadLink) {
      return json as {
        data: { imageId: string; uploadLink: string };
        success: boolean;
      };
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
        `https://${input.chain}.rpc.${PROD_OR_DEV_URL}`,
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
        `${apiDate}/register-contract`,
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
  mintMethod?: {
    name: string;
    args: { [key: string]: string };
    payment: {
      currency: string;
      value: string;
    };
  };
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
        `${apiDate}/shareable-checkout-link${
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
        `${apiDate}/shareable-checkout-link/${input.checkoutId}`,
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

export type UploadKybFileInput = {
  file: File;
};

export function usePaymentsUploadKybFiles() {
  const fetchFromPaymentsAPI = usePaymentsApi();
  const queryClient = useQueryClient();
  const address = useAddress();

  return useMutationWithInvalidate(
    async (input: { files: File[] }) => {
      invariant(address, "No wallet address found");
      invariant(input.files.length > 0, "No files found");

      for (const file of input.files) {
        const url = await fetchFromPaymentsAPI(
          "POST",
          "storage/generate-signed-url",
          { fileName: file.name, fileType: file.type },
          { isGenerateSignedUrl: true },
        );

        if (!url) {
          throw new Error("Unable to generate presigned URL");
        }

        const res = await fetch(url, {
          method: "PUT",
          headers: { "Content-Type": file.type },
          body: file,
        });

        if (res.status !== 200) {
          throw new Error(`Unexpected status ${res.status}`);
        }
      }
    },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries(
          paymentsKeys.kybStatus(address as string),
        );
      },
    },
  );
}

const getBlobFromBase64Image = async (strBase64: string): Promise<Blob> => {
  if (!strBase64.startsWith("data:image/")) {
    return Promise.reject("Invalid base64 image format");
  }

  const imageBase64Response = await fetch(strBase64);
  return imageBase64Response.blob();
};

interface UploadLinkResponse {
  uploadLink: string;
  imageId: string;
}

interface UploadImageResponse {
  result: {
    id: string;
    meta: { [field: string]: string };
    variants: string[];
  };
  success: boolean;
  errors: any;
  messages: any;
}

export function usePaymentsUploadToCloudflare() {
  const fetchFromPaymentsAPI = usePaymentsApi();
  const queryClient = useQueryClient();
  const address = useAddress();

  return useMutationWithInvalidate(
    async (dataBase64: string) => {
      invariant(address, "No wallet address found");
      invariant(dataBase64, "No file found");
      const file = await getBlobFromBase64Image(dataBase64);
      const res = await fetchFromPaymentsAPI(
        "GET",
        "storage/get-image-upload-link",
        undefined,
        { isGetImageUploadLink: true },
      );

      const { uploadLink, imageId } = res.data as UploadLinkResponse;
      if (!uploadLink || uploadLink === "") {
        throw new Error("Unable to get upload link.");
      }

      // Append the data to the form and upload to cloudflare.
      const uploadForm = new FormData();
      uploadForm.append("file", file, imageId);

      // Upload the image to cloudflare.
      const response = await fetch(uploadLink, {
        method: "POST",
        body: uploadForm,
      });

      if (response.status !== 200) {
        throw new Error("Failed to upload image.");
      }
      const responseData = (await response.json()) as UploadImageResponse;
      const imageUrl =
        responseData.result.variants[1] ||
        responseData.result.variants[0] ||
        "";
      if (imageUrl === "") {
        throw new Error("Unable to generate image URL.");
      }

      // Return the string URL.
      return imageUrl;
    },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries(
          paymentsKeys.kycStatus(address as string),
        );
      },
    },
  );
}

export type SellerValueInput = {
  twitter_handle: string;
  company_name: string;
  company_logo_url: string;
  support_email: string;
  is_sole_proprietor: boolean;
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
        return queryClient.invalidateQueries(paymentsKeys.settings(accountId));
      },
    },
  );
}

export function usePaymentsKybStatus() {
  const fetchFromPaymentsAPI = usePaymentsApi();
  const address = useAddress();

  return useQuery(
    paymentsKeys.kybStatus(address as string),
    async () => {
      invariant(address, "No wallet address found");
      return fetchFromPaymentsAPI(
        "GET",
        "seller-verification/seller-document-count",
        undefined,
        { isSellerDocumentCount: true },
      );
    },
    { enabled: !!address },
  );
}

export function usePaymentsGetVerificationSession(sellerId: string) {
  const fetchFromPaymentsAPI = usePaymentsApi();
  const address = useAddress();

  return useQuery(
    paymentsKeys.verificationSession(address as string),
    async () => {
      invariant(address, "No wallet address found");
      invariant(sellerId, "No sellerId found");
      return fetchFromPaymentsAPI(
        "POST",
        "seller-verification/create-verification-session",
        { sellerId },
        { isCreateVerificationSession: true },
      );
    },
    { enabled: !!address && !!sellerId },
  );
}

export function usePaymentsKycStatus(sessionId: string) {
  const fetchFromPaymentsAPI = usePaymentsApi();
  const address = useAddress();

  return useQuery(
    paymentsKeys.kycStatus(address as string),
    async () => {
      invariant(address, "No wallet address found");
      invariant(sessionId, "No sessionId found");
      return fetchFromPaymentsAPI(
        "POST",
        "seller-verification/status",
        {
          verificationSessionId: sessionId,
        },
        { isSellerVerificationStatus: true },
      );
    },
    { enabled: !!address },
  );
}

export function usePaymentsEnabledContracts() {
  const address = useAddress();
  const { paymentsSellerId } = useApiAuthToken();
  const [getContractsByOwnerId] = useContractsByOwnerIdLazyQuery();

  return useQuery(
    paymentsKeys.contracts(address as string),
    async () => {
      const { data, error } = await getContractsByOwnerId({
        variables: {
          ownerId: paymentsSellerId,
        } as ContractsByOwnerIdQueryVariables,
      });

      if (error) {
        console.error(error);
      }

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

      if (error) {
        console.error(error);
      }

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
    paymentsKeys.contractByAddressAndChain(contractAddress, chainId),
    async () => {
      const { data, error } = await getContractsByAddressAndChain({
        variables: {
          ownerId: paymentsSellerId,
          chain: ChainIdToPaperChain[chainId],
          contractAddress: contractAddress.toLowerCase(),
        } as ContractsByAddressAndChainQueryVariables,
      });

      if (error) {
        console.error(error);
      }

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
      const { data, error } = await getDetailedAnalytics({
        variables: {
          ownerId: paymentsSellerId,
          checkoutId,
        } as DetailedAnalyticsQueryVariables,
      });

      if (error) {
        console.error(error);
      }

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
    paymentsKeys.settings(accountId),
    async () => {
      const { data, error } = await getSellerByAccountId({
        variables: {
          thirdwebAccountId: accountId,
        } as GetSellerByThirdwebAccountIdQueryVariables,
      });

      if (error) {
        console.error(error);
      }

      return data && data?.seller.length > 0
        ? data.seller[0]
        : ({} as GetSellerByThirdwebAccountIdQuery["seller"][number]);
    },
    { enabled: !!paymentsSellerId && !!address },
  );
}
