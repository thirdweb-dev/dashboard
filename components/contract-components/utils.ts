import { ContractId } from "./types";
import { getErcs } from "@thirdweb-dev/react";
import { KNOWN_CONTRACTS_MAP, SmartContract } from "@thirdweb-dev/sdk";

export function isContractIdBuiltInContract(
  contractId: ContractId,
): contractId is keyof typeof KNOWN_CONTRACTS_MAP {
  return contractId in KNOWN_CONTRACTS_MAP;
}

export function detectFeature(contract: SmartContract | null, feature: string) {
  const { erc721, erc1155, erc20 } = getErcs(contract);

  if (!contract || (!erc721 && !erc1155 && !erc20)) {
    return false;
  }

  return (
    (erc721 && feature in erc721) ||
    (erc1155 && feature in erc1155) ||
    (erc20 && feature in erc20)
  );
}
