import { useQuery } from "@tanstack/react-query";
import { useContractType } from "@thirdweb-dev/react";
import { ContractType } from "@thirdweb-dev/sdk";
import { BuiltinContractMap } from "constants/mappings";

export function usePrebuiltSource(contractAddress: string | undefined) {
  const { data: contractType } = useContractType(contractAddress);
  const contract = BuiltinContractMap[contractType as ContractType];
  return useQuery(["prebuilt-source", contractType], async () => {
    const res = await fetch(
      `https://raw.githubusercontent.com/thirdweb-dev/contracts/main/contracts/drop/DropERC1155.sol`,
    );
    const code = await res.text();

    const source = { filename: "DropERC1155.sol", source: code };

    return source;
  });
}
