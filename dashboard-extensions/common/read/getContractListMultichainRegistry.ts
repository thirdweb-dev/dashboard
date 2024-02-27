import { isAddressZero } from "utils/zeroAddress";
import { getAllMultichainRegistry } from "./getAllMultichainRegistry";
import { getContractMetadata } from "thirdweb/extensions/common";
import { isAddress, getContract, defineChain } from "thirdweb";
import type { BaseTransactionOptions } from "thirdweb";
import { contractType } from "./contractType";

export type GetContractListMultichainRegistryParams = {
  address: string;
};

/**
 * Retrieves the contract addresses, chain ids, and metadata resolvers for the given wallet address.
 * @param options The transaction options with the wallet address.
 * @returns An array of contract addresses, chain ids, and metadata resolvers.
 * @extension
 */
export async function getContractListMultichainRegistry(
  options: BaseTransactionOptions<GetContractListMultichainRegistryParams>
) {
  const contracts = await getAllMultichainRegistry({
    ...options,
    address: options.address,
  });

  const contractsFiltered = [...contracts.filter(
    ({ deploymentAddress, chainId }) =>
      isAddress(deploymentAddress) && !isAddressZero(deploymentAddress.toLowerCase()) && chainId
  )].reverse();

  return contractsFiltered.map(contractFiltered => {
    const chainId = Number(contractFiltered.chainId);
    const contract = getContract({
      address: contractFiltered.deploymentAddress,
      chain: defineChain(chainId),
      client: options.contract.client,
    });

    return ({
      address: contractFiltered.deploymentAddress,
      chainId: chainId,
      metadata: () => getContractMetadata({ contract }).catch(() => null),
      contractType: () => contractType({ contract }).catch(() => null),
    });
  }
  );
}
