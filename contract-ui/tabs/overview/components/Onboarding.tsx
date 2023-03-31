/* eslint-disable react-hooks/rules-of-hooks */
import { GetStarted } from "../../../../components/dashboard/GetStarted";
import { useTabHref } from "../../../utils";
import {
  useAddress,
  useAppURI,
  useClaimConditions,
  useClaimedNFTSupply,
  useNFTs,
  useTokenBalance,
  useTokenSupply,
} from "@thirdweb-dev/react";
import { SmartContract } from "@thirdweb-dev/sdk";
import { BigNumber } from "ethers";
import { Link } from "tw-components";

interface OnboardingProps {
  features: string[];
  contract: SmartContract;
}

const Onboarding: React.FC<OnboardingProps> = ({ features, contract }) => {
  const address = useAddress();

  const nftHref = useTabHref("nfts");
  const tokenHref = useTabHref("tokens");
  const appHref = useTabHref("app");

  const steps = [
    {
      title: "Contract deployed",
      children: <></>,
      completed: true,
    },
  ];

  const claimConditionsHref = useTabHref("claim-conditions");

  if (
    [
      "ERC721LazyMintable",
      "ERC1155LazyMintableV2",
      "ERC1155LazyMintableV1",
    ].some((f) => features.includes(f))
  ) {
    const nfts = useNFTs(contract);

    steps.push({
      title: "First NFT uploaded",
      children: (
        <>
          Head to the{" "}
          <Link href={tokenHref} color="blue.500">
            NFT tab
          </Link>{" "}
          to upload your NFT metadata.
        </>
      ),
      completed: (nfts.data?.length || 0) > 0,
    });
  }

  if (
    [
      "ERC20ClaimConditionsV1",
      "ERC20ClaimConditionsV2",
      "ERC20ClaimPhasesV1",
      "ERC20ClaimPhasesV2",
      "ERC721ClaimConditionsV1",
      "ERC721ClaimConditionsV2",
      "ERC721ClaimPhasesV1",
      "ERC721ClaimPhasesV2",
      "ERC1155ClaimConditionsV1",
      "ERC1155ClaimConditionsV2",
      "ERC1155ClaimPhasesV1",
      "ERC1155ClaimPhasesV2",
    ].some((f) => features.includes(f))
  ) {
    const claimConditionsQuery = useClaimConditions(contract);

    steps.push({
      title: "Set claim conditions",
      children: (
        <>
          Head to the{" "}
          <Link href={claimConditionsHref} color="blue.500">
            claim conditions tab
          </Link>{" "}
          to set your claim conditions. Users will be able to claim your drop
          only if a claim phase is active
        </>
      ),
      completed: (claimConditionsQuery.data?.length || 0) > 0,
    });
  }

  if (
    [
      "ERC721ClaimConditionsV1",
      "ERC721ClaimConditionsV2",
      "ERC721ClaimPhasesV1",
      "ERC721ClaimPhasesV2",
      "ERC721ClaimCustom",
      "ERC1155ClaimConditionsV1",
      "ERC1155ClaimConditionsV2",
      "ERC1155ClaimPhasesV1",
      "ERC1155ClaimPhasesV2",
    ].some((f) => features.includes(f))
  ) {
    const nftsClaimedQuery = useClaimedNFTSupply(contract);

    steps.push({
      title: "First NFT claimed",
      children: <>No NFTs have been claimed so far</>,
      completed: BigNumber.from(nftsClaimedQuery?.data || 0).gt(0),
    });
  }

  if (
    [
      "ERC20ClaimConditionsV1",
      "ERC20ClaimConditionsV2",
      "ERC20ClaimPhasesV1",
      "ERC20ClaimPhasesV2",
    ].some((f) => features.includes(f))
  ) {
    const tokensClaimedQuery = useTokenBalance(contract, address);

    steps.push({
      title: "First token claimed",
      children: <>No tokens have been claimed so far</>,
      completed: BigNumber.from(tokensClaimedQuery?.data || 0).gt(0),
    });
  }

  if (
    ["ERC20BatchMintable", "ERC20Mintable"].some((f) => features.includes(f))
  ) {
    const tokensMintedQuery = useTokenSupply(contract);

    steps.push({
      title: "First token minted",
      children: (
        <>
          Head to the{" "}
          <Link href={tokenHref} color="blue.500">
            token tab
          </Link>{" "}
          to mint your first token.
        </>
      ),
      completed: BigNumber.from(tokensMintedQuery?.data || 0).gt(0),
    });
  }

  // if (
  //   [
  //     "ERC721BatchMintable",
  //     "ERC721Mintable",
  //     "ERC1155BatchMintable",
  //     "ERC1155Mintable",
  //   ].some((f) => features.includes(f))
  // ) {
  //   steps.push({
  //     title: "First NFT minted",
  //     children: (
  //       <>
  //         Head to the{" "}
  //         <Link href={nftHref} color="blue.500">
  //           NFT tab
  //         </Link>{" "}
  //         to mint your first token.
  //       </>
  //     ),
  //     // completed: BigNumber.from(nftsMintedQuery?.data || 0).gt(0),
  //   });
  // }

  // if (
  //   ["ERC721Revealable", "ERC1155Revealable"].some((f) => features.includes(f))
  // ) {
  //
  //   steps.push({
  //     title: "First NFT revealed",
  //     children: (
  //       <>
  //         NFTs haven&apos;t been revealed yet. Head to the{" "}
  //         <Link href={nftHref} color="blue.500">
  //           NFT tab
  //         </Link>{" "}
  //         to reveal them.
  //       </>
  //     ),
  //     completed: BigNumber.from(nftsRevealedQuery?.data || 0).eq(0),
  //   });
  // }

  if (features.includes("AppURI")) {
    const appURIQuery = useAppURI(contract);

    steps.push({
      title: "App linked",
      children: (
        <>
          Head to the{" "}
          <Link href={appHref} color="blue.500">
            app tab
          </Link>{" "}
          to link it to your contract
        </>
      ),
      completed: appURIQuery?.data !== undefined,
    });
  }

  // if (
  //   [
  //     "StakingERC721",
  //     "StakingERC1155",
  //     "StakingERC20",
  //     "AirdropERC721",
  //     "AirdropERC1155",
  //     "AirdropERC20",
  //   ].some((f) => features.includes(f))
  // ) {
  //   // add approved contracts step
  // }

  // if (
  //   ["StakingERC721", "StakingERC1155", "StakingERC20"].some((f) =>
  //     features.includes(f),
  //   )
  // ) {
  //   // add staking step
  // }

  // if (
  //   ["AirdropERC721", "AirdropERC1155", "AirdropERC20"].some((f) =>
  //     features.includes(f),
  //   )
  // ) {
  //   // add airdrop step
  // }

  return <GetStarted title="Contract Checklist" steps={steps} />;
};

export default Onboarding;
