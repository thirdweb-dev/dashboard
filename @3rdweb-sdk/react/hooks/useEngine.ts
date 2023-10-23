import { useQuery, useQueryClient } from "@tanstack/react-query";
import { engineKeys } from "../cache-keys";
import { useMutationWithInvalidate } from "./query/useQueryWithNetwork";
import invariant from "tiny-invariant";

export type BackendWallet = {
  address: string;
  type: string;
  awsKmsKeyId?: string | null;
  awsKmsArn?: string | null;
  gcpKmsKeyId?: string | null;
  gcpKmsKeyRingId?: string | null;
  gcpKmsLocationId?: string | null;
  gcpKmsKeyVersionId?: string | null;
  gcpKmsResourcePath?: string | null;
};

export function useEngineBackendWallets(instance: string) {
  return useQuery(
    engineKeys.backendWallets(instance),
    async () => {
      const res = await fetch(
        `${instance}${instance.endsWith("/") ? "" : "/"}backend-wallet/get-all`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: process.env.NEXT_PUBLIC_TEMP_KEY as string,
          },
        },
      );

      const json = await res.json();

      return json.result as BackendWallet[];
    },
    { enabled: !!instance },
  );
}

export type Transaction = {
  queueId?: string | null;
  chainId?: string | null;
  fromAddress?: string | null;
  toAddress?: string | null;
  data?: string | null;
  extension?: string | null;
  value?: string | null;
  nonce?: number | null;
  gasLimit?: string | null;
  gasPrice?: string | null;
  maxFeePerGas?: string | null;
  maxPriorityFeePerGas?: string | null;
  transactionType?: number | null;
  transactionHash?: string | null;
  queuedAt?: string | null;
  processedAt?: string | null;
  sentAt?: string | null;
  minedAt?: string | null;
  cancelledAt?: string | null;
  deployedContractAddress?: string | null;
  deployedContractType?: string | null;
  errorMessage?: string | null;
  sentAtBlockNumber?: number | null;
  blockNumber?: number | null;
  status?: string | null;
  retryCount: number;
  retryGasValues?: boolean | null;
  retryMaxFeePerGas?: string | null;
  retryMaxPriorityFeePerGas?: string | null;
  signerAddress?: string | null;
  accountAddress?: string | null;
  target?: string | null;
  sender?: string | null;
  initCode?: string | null;
  callData?: string | null;
  callGasLimit?: string | null;
  verificationGasLimit?: string | null;
  preVerificationGas?: string | null;
  // eslint-disable-next-line inclusive-language/use-inclusive-words
  paymasterAndData?: string | null;
  userOpHash?: string | null;
  functionName?: string | null;
  functionArgs?: string | null;
};

export type TransactionResponse = {
  transactions: Transaction[];
  totalCount: number;
};

export function useEngineTransactions(instance: string) {
  return useQuery(
    engineKeys.transactions(instance),
    async () => {
      const res = await fetch(
        `${instance}${instance.endsWith("/") ? "" : "/"}transaction/get-all`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: process.env.NEXT_PUBLIC_TEMP_KEY as string,
          },
        },
      );

      const json = await res.json();

      return json.result as TransactionResponse;
    },
    { enabled: !!instance },
  );
}

export type WalletConfig =
  | {
      type: "local";
    }
  | {
      type: "aws-kms";
      awsAccessKeyId: string;
      awsSecretAccessKey: string;
      awsRegion: string;
    }
  | {
      type: "gcp-kms";
      gcpApplicationProjectId: string;
      gcpKmsLocationId: string;
      gcpKmsKeyRingId: string;
      gcpApplicationCredentialEmail: string;
      gcpApplicationCredentialPrivateKey: string;
    };

export function useEngineWalletConfig(instance: string) {
  return useQuery(
    engineKeys.walletConfig(instance),
    async () => {
      const res = await fetch(
        `${instance}${instance.endsWith("/") ? "" : "/"}configuration/wallets`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: process.env.NEXT_PUBLIC_TEMP_KEY as string,
          },
        },
      );

      const json = await res.json();

      return json.result as WalletConfig;
    },
    { enabled: !!instance },
  );
}

export type CurrencyValue = {
  name: string;
  symbol: string;
  decimals: number;
  value: string;
  displayValue: string;
};

export function useEngineBackendWalletBalance(
  instance: string,
  address: string,
  chainId: number,
) {
  return useQuery(
    engineKeys.backendWalletBalance(address, chainId),
    async () => {
      const res = await fetch(
        `${instance}${
          instance.endsWith("/") ? "" : "/"
        }backend-wallet/${chainId}/${address}/get-balance`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: process.env.NEXT_PUBLIC_TEMP_KEY as string,
          },
        },
      );

      const json = await res.json();

      return json.result as CurrencyValue;
    },
    { enabled: !!instance && !!address && !!chainId },
  );
}

export type SetWalletConfigInput =
  | {
      type: "local";
    }
  | {
      type: "aws-kms";
      awsAccessKeyId: string;
      awsSecretAccessKey: string;
      awsRegion: string;
    }
  | {
      type: "gcp-kms";
      gcpApplicationProjectId: string;
      gcpKmsLocationId: string;
      gcpKmsKeyRingId: string;
      gcpApplicationCredentialEmail: string;
      gcpApplicationCredentialPrivateKey: string;
    };

export function useEngineSetWalletConfig(instance: string) {
  const queryClient = useQueryClient();

  return useMutationWithInvalidate(
    async (input: SetWalletConfigInput) => {
      invariant(instance, "instance is required");

      const res = await fetch(
        `${instance}${instance.endsWith("/") ? "" : "/"}configuration/wallets`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: process.env.NEXT_PUBLIC_TEMP_KEY as string,
          },
          body: JSON.stringify(input),
        },
      );
      const json = await res.json();

      if (json.error) {
        throw new Error(json.message);
      }

      return json.data;
    },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries(engineKeys.walletConfig(instance));
      },
    },
  );
}

export function useEngineCreateBackendWallet(instance: string) {
  const queryClient = useQueryClient();

  return useMutationWithInvalidate(
    async () => {
      invariant(instance, "instance is required");

      const res = await fetch(
        `${instance}${instance.endsWith("/") ? "" : "/"}backend-wallet/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: process.env.NEXT_PUBLIC_TEMP_KEY as string,
          },
        },
      );
      const json = await res.json();

      if (json.error) {
        throw new Error(json.message);
      }

      return json.data;
    },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries(
          engineKeys.backendWallets(instance),
        );
      },
    },
  );
}

export type ImportBackendWalletInput =
  | {
      awsKmsKeyId: string;
      awsKmsArn: string;
    }
  | {
      gcpKmsKeyId: string;
      gcpKmsKeyVersionId: string;
    }
  | {
      privateKey?: string;
    }
  | {
      mnemonic?: string;
    }
  | {
      encryptedJson?: string;
      password?: string;
    };

export function useEngineImportBackendWallet(instance: string) {
  const queryClient = useQueryClient();

  return useMutationWithInvalidate(
    async (input: ImportBackendWalletInput) => {
      invariant(instance, "instance is required");

      const res = await fetch(
        `${instance}${instance.endsWith("/") ? "" : "/"}backend-wallet/import`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: process.env.NEXT_PUBLIC_TEMP_KEY as string,
          },
          body: JSON.stringify(input),
        },
      );
      const json = await res.json();

      if (json.error) {
        throw new Error(json.message);
      }

      return json.data;
    },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries(
          engineKeys.backendWallets(instance),
        );
      },
    },
  );
}
