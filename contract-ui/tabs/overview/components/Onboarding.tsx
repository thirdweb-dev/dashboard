import {
  useBatchesToReveal,
  useClaimConditions,
  useNFTs,
  useTokenSupply,
} from "@thirdweb-dev/react";
import { SmartContract } from "@thirdweb-dev/sdk";
import { detectFeatures } from "components/contract-components/utils";
import { StepsCard } from "components/dashboard/StepsCard";
import { useTabHref } from "contract-ui/utils";
import { BigNumber } from "ethers";
import { Link, Text } from "tw-components";

interface OnboardingProps {
  contract: SmartContract;
}

type Step = {
  title: string;
  children: React.ReactNode;
  completed: boolean;
};

const Onboarding: React.FC<OnboardingProps> = ({ contract }) => {
  const nftHref = useTabHref("nfts");
  const tokenHref = useTabHref("tokens");
  const claimConditionsHref = useTabHref("claim-conditions");

  const steps: Step[] = [
    {
      title: "Contract deployed",
      children: <></>,
      completed: true,
    },
  ];

  const nfts = useNFTs(contract, { count: 1 });
  const claimConditions = useClaimConditions(contract);
  const tokenSupply = useTokenSupply(contract);
  const batchesToReveal = useBatchesToReveal(contract);

  const isLazyMintable = detectFeatures(contract, [
    "ERC721LazyMintable",
    "ERC1155LazyMintableV2",
    "ERC1155LazyMintableV1",
  ]);
  if (isLazyMintable) {
    steps.push({
      title: "First NFT uploaded",
      children: (
        <Text size="body.sm">
          Head to the{" "}
          <Link href={tokenHref} color="blue.500">
            NFTs tab
          </Link>{" "}
          to upload your NFT metadata.
        </Text>
      ),
      completed: (nfts.data?.length || 0) > 0,
    });
  }

  const nftHasClaimConditions = detectFeatures(contract, [
    "ERC721ClaimPhasesV1",
    "ERC721ClaimPhasesV2",
    "ERC721ClaimConditionsV1",
    "ERC721ClaimConditionsV2",
    "ERC721ClaimCustom",
    "ERC1155ClaimPhasesV1",
    "ERC1155ClaimPhasesV2",
    "ERC1155ClaimConditionsV1",
    "ERC1155ClaimConditionsV2",
    "ERC1155ClaimCustom",
  ]);
  if (nftHasClaimConditions) {
    steps.push({
      title: "Set Claim Conditions",
      children: (
        <Text size="label.sm">
          Head to the{" "}
          <Link href={claimConditionsHref} color="blue.500">
            Claim Conditions tab
          </Link>{" "}
          to set your claim conditions. Users will be able to claim your drop
          only if a claim phase is active
        </Text>
      ),
      completed:
        (claimConditions.data?.length || 0) > 0 ||
        BigNumber.from(nfts?.data?.length || 0).gt(0),
    });
  }
  if (nftHasClaimConditions) {
    steps.push({
      title: "First NFT claimed",
      children: <>No NFTs have been claimed so far</>,
      completed: BigNumber.from(nfts?.data?.length || 0).gt(0),
    });
  }

  const tokenHasClaimConditions = detectFeatures(contract, [
    "ERC20ClaimPhasesV1",
    "ERC20ClaimPhasesV2",
    "ERC20ClaimConditionsV1",
    "ERC20ClaimConditionsV2",
  ]);
  if (tokenHasClaimConditions) {
    steps.push({
      title: "First token claimed",
      children: <>No tokens have been claimed so far</>,
      completed: BigNumber.from(tokenSupply?.data?.value || 0).gt(0),
    });
  }

  const tokenIsMintable = detectFeatures(contract, ["ERC20Mintable"]);
  if (tokenIsMintable) {
    steps.push({
      title: "First token minted",
      children: (
        <Text>
          Head to the{" "}
          <Link href={tokenHref} color="blue.500">
            token tab
          </Link>{" "}
          to mint your first token.
        </Text>
      ),
      completed: BigNumber.from(tokenSupply.data?.value || 0).gt(0),
    });
  }

  const nftIsMintable = detectFeatures(contract, [
    "ERC721Mintable",
    "ERC1155Mintable",
  ]);

  if (nftIsMintable) {
    steps.push({
      title: "First NFT minted",
      children: (
        <Text>
          Head to the{" "}
          <Link href={nftHref} color="blue.500">
            NFTs tab
          </Link>{" "}
          to mint your first token.
        </Text>
      ),
      completed: (nfts.data?.length || 0) > 0,
    });
  }

  const isRevealable = detectFeatures(contract, [
    "ERC721Revealable",
    "ERC1155Revealable",
  ]);
  const needsReveal = batchesToReveal.data?.length || 0 > 0;

  if (isRevealable && needsReveal) {
    steps.push({
      title: "Need to reveal NFTs",
      children: (
        <Text>
          Head to the{" "}
          <Link href={nftHref} color="blue.500">
            NFTs tab
          </Link>{" "}
          to reveal your NFTs.
        </Text>
      ),
      // This is always false because if there are batches to reveal, the step doesn't show.
      completed: false,
    });
  }

  return <StepsCard title="Contract checklist" steps={steps} />;
};

export default Onboarding;
