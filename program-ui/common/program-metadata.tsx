import { MetadataHeader } from "../../components/custom-contract/contract-header/metadata-header";
import { Box } from "@chakra-ui/react";
import {
  FeatureIconMap,
  PREBUILT_SOLANA_CONTRACTS_MAP,
} from "constants/mappings";
import { useAccount, useAccountMetadata } from "program-ui/hooks/program";
import { useMemo } from "react";
import { DashboardSolanaNetwork } from "utils/network";

interface ProgramMetadataProps {
  address: string;
  network: DashboardSolanaNetwork;
}

export const ProgramMetadata: React.FC<ProgramMetadataProps> = ({
  address,
  network,
}) => {
  const { data: account } = useAccount(address, network);
  const metadataQuery = useAccountMetadata(account);

  const contractTypeImage = useMemo(() => {
    return account
      ? PREBUILT_SOLANA_CONTRACTS_MAP[account.accountType].icon
      : FeatureIconMap["custom"];
  }, [account]);

  if (metadataQuery.isError) {
    return <Box>Failed to load contract metadata</Box>;
  }
  return (
    <MetadataHeader
      isLoaded={metadataQuery.isSuccess}
      data={metadataQuery.data}
      address={address}
      contractTypeImage={contractTypeImage}
    />
  );
};
