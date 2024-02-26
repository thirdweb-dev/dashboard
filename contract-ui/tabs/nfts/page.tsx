import { useRouter } from "next/router";
import { useContract } from "@thirdweb-dev/react";
import { ThirdwebContract } from "thirdweb";
import { NftPageWrapped } from "./components/nft-page-wrapped";

interface NftOverviewPageProps {
  contractAddress?: string;
  contract?: ThirdwebContract | null;
}

export const ContractNFTPage: React.FC<NftOverviewPageProps> = ({
  contractAddress,
  contract,
}) => {
  const contractQuery = useContract(contractAddress);

  const router = useRouter();
  const tokenId = router.query?.paths?.[2];

  if (contractQuery.isLoading) {
    // TODO build a skeleton for this
    return <div>Loading...</div>;
  }

  console.log({ contractQuery, contract });

  if (!contractQuery?.contract || !contract) {
    return null;
  }

  return (
    <NftPageWrapped
      contractQuery={contractQuery}
      contract={contract}
      tokenId={tokenId || "-1"}
    />
  );
};
