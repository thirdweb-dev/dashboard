import { isAddress } from "@ethersproject/address";
import { AddressZero } from "@ethersproject/constants";

export function isAddressZero(address: string): boolean {
  return isAddress(address) && address === AddressZero;
}
