import { PublicKey } from "@solana/web3.js";

export function isPossibleSolanaAddress(address: string) {
  try {
    return new PublicKey(address).toBase58() === address;
  } catch (err) {
    return false;
  }
}
