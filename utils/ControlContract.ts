import type { ModuleMetadata } from "@nftlabs/sdk";

export interface IControlContractWithActive extends ModuleMetadata {
  isActive: boolean;
}
