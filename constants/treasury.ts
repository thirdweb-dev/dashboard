import { SupportedChainId } from "utils/network";

export const THIRDWEB_TREASURY_ADDRESSES: Record<SupportedChainId, string> = {
  [SupportedChainId.Mainnet]: "0x09888aF38E0c153AB3D66CCC5f3FBb7aAB7Db115",
  [SupportedChainId.Polygon]: "0x4769df58427Cd840DF120E764fBB97a3fD968Caf",
  [SupportedChainId.Mumbai]: "0xE00994EBDB59f70350E2cdeb897796F732331562",
  [SupportedChainId.Avalanche]: "0xE00994EBDB59f70350E2cdeb897796F732331562",
  [SupportedChainId.Fantom]: "0x3CFd70C17013f2fC0069EdfF6A364ae835acE5dE",
};
