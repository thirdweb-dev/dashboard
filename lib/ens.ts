import { resolveAddress, resolveEns as resolveEnsSdk } from "@thirdweb-dev/sdk";
import { utils } from "ethers";
import invariant from "tiny-invariant";

export interface ENSResolveResult {
  ensName: string | null;
  address: string | null;
}

export function isEnsName(name: string): boolean {
  return name?.endsWith(".eth");
}

export async function resolveAddressToEnsName(
  address: string,
): Promise<ENSResolveResult> {
  invariant(utils.isAddress(address), "address must be a valid address");

  try {
    const ensName = await resolveAddress(address);

    return {
      ensName,
      address,
    };
  } catch (e) {
    // if the name is not registered, resolveName throws an error
    // we can ignore this error and return the address

    return {
      ensName: null,
      address,
    };
  }
}

export async function resolveEnsNameToAddress(
  ensName: string,
): Promise<ENSResolveResult> {
  invariant(isEnsName(ensName), "ensName must be a valid ens name");

  try {
    const address = await resolveEnsSdk(ensName);

    return {
      ensName,
      address,
    };
  } catch (e) {
    // if the name is not registered, resolveName throws an error
    // we can ignore this error and return the ensName

    return {
      ensName,
      address: null,
    };
  }
}

export async function resolveEns(
  ensNameOrAddress: string,
): Promise<ENSResolveResult> {
  if (utils.isAddress(ensNameOrAddress)) {
    return resolveAddressToEnsName(ensNameOrAddress);
  }

  return resolveEnsNameToAddress(ensNameOrAddress);
}
