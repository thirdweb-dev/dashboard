import {
  DropContract,
  UseContractResult,
  getErcs,
} from "@thirdweb-dev/react/evm";
import type { ContractWrapper } from "@thirdweb-dev/sdk/dist/declarations/src/evm/core/classes/contract-wrapper";
import type { ValidContractInstance } from "@thirdweb-dev/sdk/evm";
import type { ExtensionDetectedState } from "components/buttons/ExtensionDetectButton";
import type { BaseContract } from "ethers";

type PossibleERC = "erc721" | "erc1155" | "erc20";

export function claimConditionExtensionDetection(
  contractQuery: Pick<
    UseContractResult<ValidContractInstance>,
    "contract" | "isLoading"
  >,
  ercs: PossibleERC[],
): ExtensionDetectedState {
  if (contractQuery.isLoading) {
    return "loading";
  }
  const { erc721, erc20, erc1155 } = getErcs(contractQuery.contract);
  let isDetected = false;
  if (ercs.includes("erc721")) {
    isDetected = isDetected || !!erc721?.claimConditions;
  }
  if (ercs.includes("erc1155")) {
    isDetected = isDetected || !!erc1155?.claimConditions;
  }
  if (ercs.includes("erc20")) {
    isDetected = isDetected || !!erc20?.claimConditions;
  }
  return isDetected ? "enabled" : "disabled";
}

export function hasMultiphaseClaimConditions(contract?: DropContract): boolean {
  const { erc721, erc20, erc1155 } = getErcs(contract);

  const contractWrapper = (contract as any)
    .contractWrapper as ContractWrapper<BaseContract>;

  try {
    if (erc721) {
      return (
        erc721.claimConditions.isNewMultiphaseDrop(contractWrapper) ||
        erc721.claimConditions.isLegacyMultiPhaseDrop(contractWrapper)
      );
    }
    if (erc1155) {
      return (
        erc1155.claimConditions.isNewMultiphaseDrop(contractWrapper) ||
        erc1155.claimConditions.isLegacyMultiPhaseDrop(contractWrapper)
      );
    }
    if (erc20) {
      return (
        erc20.claimConditions.isNewMultiphaseDrop(contractWrapper) ||
        erc20.claimConditions.isLegacyMultiPhaseDrop(contractWrapper)
      );
    }
  } catch (err) {
    console.warn("failed to detect multiphase drop", err);
  }
  return false;
}

export function hasSinglePhaseClaimConditions(
  contract?: DropContract,
): boolean {
  const { erc721, erc20, erc1155 } = getErcs(contract);

  const contractWrapper = (contract as any)
    .contractWrapper as ContractWrapper<BaseContract>;

  try {
    if (erc721) {
      return (
        erc721.claimConditions.isNewSinglePhaseDrop(contractWrapper) ||
        erc721.claimConditions.isLegacySinglePhaseDrop(contractWrapper)
      );
    }
    if (erc1155) {
      return (
        erc1155.claimConditions.isNewSinglePhaseDrop(contractWrapper) ||
        erc1155.claimConditions.isLegacySinglePhaseDrop(contractWrapper)
      );
    }
    if (erc20) {
      return (
        erc20.claimConditions.isNewSinglePhaseDrop(contractWrapper) ||
        erc20.claimConditions.isLegacySinglePhaseDrop(contractWrapper)
      );
    }
  } catch (err) {
    console.warn("failed to detect singlephase drop", err);
  }
  return false;
}

export function hasLegacyClaimConditions(contract?: DropContract): boolean {
  const { erc721, erc20, erc1155 } = getErcs(contract);

  const contractWrapper = (contract as any)
    .contractWrapper as ContractWrapper<BaseContract>;

  try {
    if (erc721) {
      return (
        erc721.claimConditions.isLegacySinglePhaseDrop(contractWrapper) ||
        erc721.claimConditions.isLegacyMultiPhaseDrop(contractWrapper)
      );
    }
    if (erc1155) {
      return (
        erc1155.claimConditions.isLegacySinglePhaseDrop(contractWrapper) ||
        erc1155.claimConditions.isLegacyMultiPhaseDrop(contractWrapper)
      );
    }
    if (erc20) {
      return (
        erc20.claimConditions.isLegacySinglePhaseDrop(contractWrapper) ||
        erc20.claimConditions.isLegacyMultiPhaseDrop(contractWrapper)
      );
    }
  } catch (err) {
    console.warn("failed to detect legacy drop", err);
  }
  return false;
}

export function hasNewClaimConditions(contract?: DropContract): boolean {
  const { erc721, erc20, erc1155 } = getErcs(contract);

  const contractWrapper = (contract as any)
    .contractWrapper as ContractWrapper<BaseContract>;

  try {
    if (erc721) {
      return (
        erc721.claimConditions.isNewSinglePhaseDrop(contractWrapper) ||
        erc721.claimConditions.isNewMultiphaseDrop(contractWrapper)
      );
    }
    if (erc1155) {
      return (
        erc1155.claimConditions.isNewSinglePhaseDrop(contractWrapper) ||
        erc1155.claimConditions.isNewMultiphaseDrop(contractWrapper)
      );
    }
    if (erc20) {
      return (
        erc20.claimConditions.isNewSinglePhaseDrop(contractWrapper) ||
        erc20.claimConditions.isNewMultiphaseDrop(contractWrapper)
      );
    }
  } catch (err) {
    console.warn("failed to detect new drop", err);
  }
  return false;
}
