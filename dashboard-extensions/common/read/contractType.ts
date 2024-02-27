import type { BaseTransactionOptions } from "thirdweb";
import { readContract } from "thirdweb";

/**
 * Retrieves the contract type.
 * @param options - The transaction options.
 * @returns A promise that resolves to the contract type.
 * @example
 * ```ts
 * const type = await contractType({ contract });
 * ```
 */
export function contractType(
  options: BaseTransactionOptions,
) {
  return readContract({
    ...options,
    method: "function contractType() external pure returns (bytes32)",
  });
}
