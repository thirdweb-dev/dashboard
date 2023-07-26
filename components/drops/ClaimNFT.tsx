import {
  Web3Button,
  useAddress,
  useContract,
  useNFTBalance,
} from "@thirdweb-dev/react";
import { NFTShowcase } from "./NFTShowcase";
import { BigNumber } from "ethers";

export const ClaimNFT = () => {
  const address = useAddress();
  const nftContractAddress = "0x324a4E553F47193155232766eB40d8ED1F86B90B";
  const { contract } = useContract(nftContractAddress);
  const nftBalance = useNFTBalance(contract, address);
  const hasMinted = BigNumber.from(nftBalance.data || 0).gt(0);

  if (hasMinted) {
    return <NFTShowcase />;
  }

  return (
    <Web3Button
      contractAddress={nftContractAddress}
      action={(cntr) => cntr.erc721.claim(1)}
    >
      Mint
    </Web3Button>
  );
};
