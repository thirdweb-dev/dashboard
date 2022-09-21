import { useMutationWithInvalidate } from "@3rdweb-sdk/react/hooks/query/useQueryWithNetwork";
import { useQuery } from "@tanstack/react-query";
import { MintNFTParams, RequiredParam } from "@thirdweb-dev/react";
import { NFTCollection } from "@thirdweb-dev/solana";
import { NFTDrop } from "@thirdweb-dev/solana/dist/declarations/src/contracts/nft-drop";
import { Token } from "@thirdweb-dev/solana/dist/declarations/src/contracts/token";
import { NFTMetadataInput } from "@thirdweb-dev/solana/dist/declarations/src/types/nft";
import { useSOLSDK } from "components/app-layouts/solana-provider";
import invariant from "tiny-invariant";
import { DashboardSolanaNetwork } from "utils/network";

/** ****** QUERIES ********/

// TODO this could be typed better
export function useProgram(address?: string, network?: DashboardSolanaNetwork) {
  const sdk = useSOLSDK();
  return useQuery(
    [network, address, "program", "contract-instance"],
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

export function useProgramMetadata(
  program: ReturnType<typeof useProgram>["data"],
) {
  return useQuery(
    [program?.publicKey.toBase58(), "program-metadata"],
    async () => {
      invariant(program, "Program is required");
      return await program.getMetadata();
    },
    {
      enabled: !!program,
    },
  );
}

export function useSolNFTs(program: NFTCollection | NFTDrop) {
  return useQuery(
    [program?.publicKey.toBase58(), "program-nfts"],
    async () => {
      invariant(program, "Program is required");
      return await program.getAll();
    },
    {
      enabled: !!program,
    },
  );
}

export function useSolOwnedTokenSupply(
  program: Token,
  walletAddress: string | undefined,
) {
  return useQuery(
    [program?.publicKey.toBase58(), walletAddress, "program-token-supply"],
    async () => {
      invariant(program, "Program is required");
      invariant(walletAddress, "Address is required");
      return await program.balanceOf(walletAddress);
    },
    {
      enabled: !!program && !!walletAddress,
    },
  );
}

/** ****** MUTATIONS ********/

export function useSolMintNFT(program: RequiredParam<NFTCollection>) {
  return useMutationWithInvalidate(
    async (data: MintNFTParams) => {
      invariant(program, "program not provided");
      invariant(typeof data.metadata === "object");
      // TODO consolidate NFT types between EVM/SOL
      return await program.mintTo(data.to, data.metadata as NFTMetadataInput);
    },
    {
      onSuccess: (_data, _variables, _options, invalidate) => {
        // eslint-disable-next-line line-comment-position
        return invalidate([]); // TODO (SOL) invalidation
      },
    },
  );
}

export function useSolLazyMintNFT(program: RequiredParam<NFTDrop>) {
  return useMutationWithInvalidate(
    async (data: { metadatas: NFTMetadataInput[] }) => {
      console.log({
        account: program,
        data,
      });
      invariant(program, "program not provided");
      invariant(data.metadatas.length > 0, "No NFTs to lazy mint");
      // TODO (SOL) consolidate NFT types between EVM/SOL
      return await program.lazyMint(data.metadatas);
    },
    {
      onSuccess: (_data, _variables, _options, invalidate) => {
        // eslint-disable-next-line line-comment-position
        return invalidate([]); // TODO (SOL) invalidation
      },
    },
  );
}
