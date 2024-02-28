import { useQuery } from "@tanstack/react-query";
import { ThirdwebContract } from "thirdweb";
import { getContractMetadata, name } from "thirdweb/extensions/common";
import { useReadContract } from "thirdweb/react";
import invariant from "tiny-invariant";

export function useContractMetadataAndName(contract: ThirdwebContract) {
  invariant(contract, "Contract is not provided");

  const contractMetadata = useReadContract(getContractMetadata, {
    contract,
  });

  const contractName = useReadContract(name, {
    contract,
  });

  return useQuery(["contractMetadataAndName", contract.chain.id, contract.address], async () => {
    return {
      ...contractMetadata.data,
      name: contractMetadata.data.name || contractName.data || undefined,
    };
  });
}
