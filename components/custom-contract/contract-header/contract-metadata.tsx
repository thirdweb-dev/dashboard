import { MetadataHeader } from "./metadata-header";
import { Chain } from "@thirdweb-dev/chains";
import { useContract, useContractMetadata } from "@thirdweb-dev/react";
import { usePublishedContractsFromDeploy } from "components/contract-components/hooks";
import { useEffect, useState } from "react";

interface ContractMetadataProps {
  contractAddress: string;
  chain: Chain | null;
}

export const ContractMetadata: React.FC<ContractMetadataProps> = ({
  chain,
  contractAddress,
}) => {
  const [wasError, setWasError] = useState(false);

  const contractQuery = useContract(contractAddress);
  const contractMetadataQuery = useContractMetadata(contractQuery.contract);

  const publishedContractsFromDeploy = usePublishedContractsFromDeploy(
    contractAddress,
    chain?.chainId,
  );
  const latestPublished = publishedContractsFromDeploy.data?.slice(-1)[0];

  useEffect(() => {
    if (contractMetadataQuery.isError) {
      setWasError(true);
    } else if (contractMetadataQuery.isSuccess) {
      setWasError(false);
    }
  }, [contractMetadataQuery.isError, contractMetadataQuery.isSuccess]);

  return (
    <MetadataHeader
      isError={contractMetadataQuery.isError || wasError}
      isLoaded={contractMetadataQuery.isSuccess}
      data={contractMetadataQuery.data}
      chain={chain || undefined}
      address={contractAddress}
      externalLinks={latestPublished?.externalLinks}
    />
  );
};
