import { useQuery } from "@tanstack/react-query";
import { useSOLSDK } from "components/app-layouts/solana-provider";
import { ProgramMetadata } from "components/custom-contract/contract-header/program-metadata";
import invariant from "tiny-invariant";
import { DashboardSolanaNetwork } from "utils/network";

export type ProgramPageProps = {
  address: string;
  network: DashboardSolanaNetwork;
};

export const ProgramPage: React.FC<ProgramPageProps> = ({
  address,
  network,
}) => {
  const { data: account } = useAccount(address, network);
  return (
    <>
      <ProgramMetadata address={address} network={network} />
      <h2>{account?.publicKey.toBase58()}</h2>
    </>
  );
};

// TODO move this somewhere else
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
