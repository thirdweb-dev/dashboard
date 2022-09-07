import { RequiredParam } from "@thirdweb-dev/react";
import {
  ContractType,
  EditionDrop,
  NFTDrop,
  SmartContract,
  ValidContractInstance,
} from "@thirdweb-dev/sdk";

export function isPrebuiltContract(
  contract: SmartContract | ValidContractInstance | null,
  contractType: RequiredParam<ContractType>,
): contract is ValidContractInstance {
  if (!contract || !contractType) {
    return false;
  }
  if (contractType === "custom") {
    return false;
  }
  return true;
}

export function isPaperSupportedContract(
  contract: SmartContract | ValidContractInstance | null,
  contractType: RequiredParam<ContractType>,
): contract is EditionDrop | NFTDrop {
  return (
    isPrebuiltContract(contract, contractType) &&
    (contractType === "edition-drop" || contractType === "nft-drop")
  );
}
