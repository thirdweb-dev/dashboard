import { Flex } from "@chakra-ui/react";
import { useProgram } from "@thirdweb-dev/react/solana";
import { ProgramMetadata } from "program-ui/common/program-metadata";
import { NFTDropPanel } from "program-ui/nft/nft-drop-panel";
import { NFTCollectionPanel } from "program-ui/nft/nft-panel";
import { TokenPanel } from "program-ui/token/token-panel";

export type ProgramPageProps = {
  address: string;
};

export const ProgramPage: React.FC<ProgramPageProps> = ({ address }) => {
  const { data: program } = useProgram(address);
  return (
    <Flex gap={4} direction="column">
      <ProgramMetadata address={address} />
      {program?.accountType === "nft-collection" ? (
        <NFTCollectionPanel program={program} />
      ) : null}
      {program?.accountType === "nft-drop" ? (
        <NFTDropPanel program={program} />
      ) : null}
      {program?.accountType === "token" ? (
        <TokenPanel program={program} />
      ) : null}
    </Flex>
  );
};
