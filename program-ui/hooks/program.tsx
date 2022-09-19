import { useMutationWithInvalidate } from "@3rdweb-sdk/react/hooks/query/useQueryWithNetwork";
import { useQuery } from "@tanstack/react-query";
import { MintNFTParams, RequiredParam } from "@thirdweb-dev/react";
import { NFTCollection } from "@thirdweb-dev/solana";
import { NFTDrop } from "@thirdweb-dev/solana/dist/declarations/src/contracts/nft-drop";
import { Token } from "@thirdweb-dev/solana/dist/declarations/src/contracts/token";
import { CurrencyValue } from "@thirdweb-dev/solana/dist/declarations/src/types/common";
import { NFTMetadataInput } from "@thirdweb-dev/solana/dist/declarations/src/types/nft";
import { useSOLSDK } from "components/app-layouts/solana-provider";
import invariant from "tiny-invariant";
import { DashboardSolanaNetwork } from "utils/network";

/** ****** QUERIES ********/

// TODO this could be typed better
export function useAccount(address?: string, network?: DashboardSolanaNetwork) {
  const sdk = useSOLSDK();
  return useQuery(
    [network, address, "account", "contract-instance"],
    async () => {
      invariant(sdk, "sdk is required");
      invariant(address, "Address is required");
      const type = await sdk?.registry.getAccountType(address);
      switch (type) {
        case "nft-collection":
          return await sdk?.getNFTCollection(address);
        case "nft-drop":
          return await sdk?.getNFTDrop(address);
        case "token":
          return await sdk?.getToken(address);
        default:
          throw new Error("Unknown account type");
      }
    },
    {
      enabled: !!network && !!address && !!sdk,
    },
  );
}

export function useAccountMetadata(
  account: ReturnType<typeof useAccount>["data"],
) {
  return useQuery(
    [account?.publicKey.toBase58(), "account-metadata"],
    async () => {
      invariant(account, "Account is required");
      return await account.getMetadata();
    },
    {
      enabled: !!account,
    },
  );
}

export function useSolNFTs(account: NFTCollection | NFTDrop) {
  return useQuery(
    [account?.publicKey.toBase58(), "account-nfts"],
    async () => {
      invariant(account, "Account is required");
      return await account.getAll();
    },
    {
      enabled: !!account,
    },
  );
}

export function useSolOwnedTokenSupply(
  account: Token,
  walletAddress: string | undefined,
) {
  return useQuery(
    [account?.publicKey.toBase58(), walletAddress, "account-token-supply"],
    async () => {
      invariant(account, "Account is required");
      invariant(walletAddress, "Address is required");
      return await account.balanceOf(walletAddress);
    },
    {
      enabled: !!account && !!walletAddress,
    },
  );
}

/** ****** MUTATIONS ********/

export function useSolMintNFT(account: RequiredParam<NFTCollection>) {
  return useMutationWithInvalidate(
    async (data: MintNFTParams) => {
      invariant(account, "account not provided");
      invariant(typeof data.metadata === "object");
      // TODO consolidate NFT types between EVM/SOL
      return await account.mintTo(data.to, data.metadata as NFTMetadataInput);
    },
    {
      onSuccess: (_data, _variables, _options, invalidate) => {
        // eslint-disable-next-line line-comment-position
        return invalidate([]); // TODO (SOL) invalidation
      },
    },
  );
}

export function useSolLazyMintNFT(account: RequiredParam<NFTDrop>) {
  return useMutationWithInvalidate(
    async (data: { metadatas: NFTMetadataInput[] }) => {
      console.log({
        account,
        data,
      });
      invariant(account, "account not provided");
      invariant(data.metadatas.length > 0, "No NFTs to lazy mint");
      // TODO (SOL) consolidate NFT types between EVM/SOL
      return await account.lazyMint(data.metadatas);
    },
    {
      onSuccess: (_data, _variables, _options, invalidate) => {
        // eslint-disable-next-line line-comment-position
        return invalidate([]); // TODO (SOL) invalidation
      },
    },
  );
}
