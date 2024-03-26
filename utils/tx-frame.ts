import { Base } from "@thirdweb-dev/chains";
import { SmartContract, ThirdwebSDK } from "@thirdweb-dev/sdk";
import { BaseContract } from "ethers";
import { getDashboardChainRpc } from "lib/rpc";
import { getThirdwebSDK } from "lib/sdk";

export const getContractForErc721OpenEdition = async () => {
  // Create a signer. Required to encode the contract data
  const signer = ThirdwebSDK.fromPrivateKey(
    process.env.RANDOM_PV_KEY as string,
    "base",
  ).getSigner();

  // Initalize sdk
  const sdk = getThirdwebSDK(
    Base.chainId,
    getDashboardChainRpc(Base),
    undefined,
    signer,
  );

  // Get contract
  const contract = await sdk.getContract(
    "0xB6606041437BCBD727373ffF037dDa0247771184",
  );

  // Return contract
  return contract;
};

export const getEncodedDataForTransaction = async (
  walletAddress: string,
  contract: SmartContract<BaseContract>,
) => {
  // Contract proof
  const proof = [
    ["0x0000000000000000000000000000000000000000000000000000000000000000"],
    "115792089237316195423570985008687907853269984665640564039457584007913129639935",
    "0",
    "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  ];

  const tx = contract.prepare("claim", [
    // reciever address
    walletAddress,
    // quantity
    "1",
    // native token address
    "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    // price
    "0",
    // proof
    proof,
    // data
    "0x",
  ]);

  const data = await tx.encode();

  await tx.simulate();

  return data;
};
