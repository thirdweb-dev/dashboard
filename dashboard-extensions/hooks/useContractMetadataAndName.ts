import { useQuery } from "@tanstack/react-query";
import { ThirdwebContract } from "thirdweb";
import { getContractMetadata, name } from "thirdweb/extensions/common";

export function useContractMetadataAndName(contract: ThirdwebContract) {
  return useQuery(
    ["contractMetadataAndName", contract.chain.id, contract.address],
    async () => {
      const contractMetadataPromise = getContractMetadata({
        contract,
      });
      const contractNamePromise = name({
        contract,
      });
      
      const [contractMetadata, contractName] = await Promise.all([
        contractMetadataPromise,
        contractNamePromise,
      ]);

      return {
        ...contractMetadata,
        name: contractMetadata.name || contractName || undefined,
      };
    },
  );
}
