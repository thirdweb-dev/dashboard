import { MetadataHeader } from "../../components/custom-contract/contract-header/metadata-header";
import { Box } from "@chakra-ui/react";
import { useProgram, useProgramMetadata } from "@thirdweb-dev/react/solana";
import {
  FeatureIconMap,
  PREBUILT_SOLANA_CONTRACTS_MAP,
} from "constants/mappings";
import { useMemo } from "react";

interface ProgramMetadataProps {
  address: string;
}

export const ProgramMetadata: React.FC<ProgramMetadataProps> = ({
  address,
}) => {
  const { data: account } = useProgram(address);
  const metadataQuery = useProgramMetadata(account);

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
