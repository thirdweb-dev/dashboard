import { Flex } from "@chakra-ui/react";
import { ProgramMetadata } from "program-ui/common/program-metadata";
import { useProgram } from "program-ui/hooks/program";
import { NFTDropPanel } from "program-ui/nft/nft-drop-panel";
import { NFTCollectionPanel } from "program-ui/nft/nft-panel";
import { TokenPanel } from "program-ui/token/token-panel";
import { DashboardSolanaNetwork } from "utils/network";

export type ProgramPageProps = {
  address: string;
  network: DashboardSolanaNetwork;
};

export const ProgramPage: React.FC<ProgramPageProps> = ({
  address,
  network,
}) => {
  const { data: account } = useProgram(address, network);
  return (
    <Flex gap={4} direction="column">
      <ProgramMetadata address={address} network={network} />
      {account?.accountType === "nft-collection" ? (
        <NFTCollectionPanel account={account} />
      ) : null}
      {account?.accountType === "nft-drop" ? (
        <NFTDropPanel account={account} />
      ) : null}
      {account?.accountType === "token" ? (
        <TokenPanel account={account} />
      ) : null}
    </Flex>
  );
};

// /// COMPONENTS ///

// /// HOOKS ///
