import {
  useIsAdmin,
  useIsMinter,
} from "@3rdweb-sdk/react/hooks/useContractRoles";
import {
  useAccounts,
  useBatchesToReveal,
  useClaimConditions,
  useClaimedNFTSupply,
  useNFTs,
  useSharedMetadata,
  useTokenSupply,
} from "@thirdweb-dev/react";
import { SmartContract } from "@thirdweb-dev/sdk";
import { detectFeatures } from "components/contract-components/utils";
import { StepsCard } from "components/dashboard/StepsCard";
import { useTabHref } from "contract-ui/utils";
import { BigNumber } from "ethers";
import { defineDashboardChain, thirdwebClient } from "lib/thirdweb-client";
import { useMemo } from "react";
import { getContract } from "thirdweb";
import { getNFTs as getErc721NFTs, totalSupply as erc721TotalSupply } from "thirdweb/extensions/erc721";
import { totalSupply as erc20TotalSupply } from "thirdweb/extensions/erc20";
import { getNFTs as getErc1155NFTs } from "thirdweb/extensions/erc1155";
import { useReadContract } from "thirdweb/react";
import { Link, Text } from "tw-components";

interface ContractChecklistProps {
  oldContract: SmartContract;
  chainId: number;
  contractAddress: string;
}

type Step = {
  title: string;
  children: React.ReactNode;
  completed: boolean;
};

export const ContractChecklist: React.FC<ContractChecklistProps> = ({
  oldContract,
  chainId,
  contractAddress,
}) => {
  const nftHref = useTabHref("nfts");
  const tokenHref = useTabHref("tokens");
  const accountsHref = useTabHref("accounts");
  const claimConditionsHref = useTabHref("claim-conditions");

  const contract = useMemo(() => {
    return getContract({
      address: contractAddress,
      client: thirdwebClient,
      chain: defineDashboardChain(chainId),
    });
  }, [contractAddress, chainId]);

  const isErc1155 = detectFeatures(oldContract, ["ERC1155"]);

  /*   const nfts = useNFTs(oldContract, { count: 1 }); */
  const nfts = useReadContract(
    isErc1155 ? getErc1155NFTs : getErc721NFTs,
    {
      contract,
      count: 1,
    },
  );

  const erc721Claimed = useReadContract(erc721TotalSupply, {
    contract,
  });

  /*   const erc721Claimed = useClaimedNFTSupply(oldContract); */
  /* const erc20Supply = useTokenSupply(oldContract); */

  const erc20Supply = useReadContract(erc20TotalSupply, {
    contract,
  });

  console.log({ erc20Supply });

  const accounts = useAccounts(oldContract);
  const sharedMetadata = useSharedMetadata(oldContract);
  const claimConditions = useClaimConditions(oldContract);
  const batchesToReveal = useBatchesToReveal(oldContract);

  const steps: Step[] = [
    {
      title: "Contract deployed",
      children: null,
      completed: true,
    },
  ];

  const isAdmin = useIsAdmin(oldContract);
  const isMinter = useIsMinter(oldContract);

  if (!isAdmin) {
    return null;
  }

  const isLazyMintable = detectFeatures(oldContract, [
    "ERC721LazyMintable",
    "ERC1155LazyMintableV2",
    "ERC1155LazyMintableV1",
  ]);
  if (isLazyMintable && isMinter) {
    steps.push({
      title: "First NFT uploaded",
      children: (
        <Text size="body.sm">
          Head to the{" "}
          <Link href={nftHref} color="blue.500">
            NFTs tab
          </Link>{" "}
          to upload your NFT metadata.
        </Text>
      ),
      completed: (nfts.data?.length || 0) > 0,
    });
  }

  const isErc721SharedMetadadata = detectFeatures(oldContract, [
    "ERC721SharedMetadata",
  ]);
  if (isErc721SharedMetadadata) {
    steps.push({
      title: "Set NFT Metadata",
      children: (
        <Text size="label.sm">
          Head to the{" "}
          <Link href={nftHref} color="blue.500">
            NFTs tab
          </Link>{" "}
          to set your NFT metadata.
        </Text>
      ),
      completed: !!sharedMetadata?.data,
    });
  }

  const erc721hasClaimConditions = detectFeatures(oldContract, [
    "ERC721ClaimPhasesV1",
    "ERC721ClaimPhasesV2",
    "ERC721ClaimConditionsV1",
    "ERC721ClaimConditionsV2",
    "ERC721ClaimCustom",
  ]);
  const erc20HasClaimConditions = detectFeatures(oldContract, [
    "ERC20ClaimPhasesV1",
    "ERC20ClaimPhasesV2",
    "ERC20ClaimConditionsV1",
    "ERC20ClaimConditionsV2",
  ]);
  if (erc721hasClaimConditions || erc20HasClaimConditions) {
    steps.push({
      title: "Set Claim Conditions",
      children: (
        <Text size="label.sm">
          Head to the{" "}
          <Link href={claimConditionsHref} color="blue.500">
            Claim Conditions tab
          </Link>{" "}
          to set your claim conditions. Users will be able to claim your drop
          only if a claim phase is active.
        </Text>
      ),
      completed:
        (claimConditions.data?.length || 0) > 0 ||
        (erc721Claimed?.data || 0) > 0 ||
        (erc20Supply?.data || 0) > 0,
    });
  }
  if (erc721hasClaimConditions) {
    steps.push({
      title: "First NFT claimed",
      children: <Text size="label.sm">No NFTs have been claimed so far.</Text>,
      completed: (erc721Claimed?.data || 0) > 0,
    });
  }

  if (erc20HasClaimConditions) {
    steps.push({
      title: "First token claimed",
      children: (
        <Text size="label.sm">No tokens have been claimed so far.</Text>
      ),
      completed: (erc20Supply?.data || 0) > 0,
    });
  }

  const tokenIsMintable = detectFeatures(oldContract, ["ERC20Mintable"]);
  if (tokenIsMintable && isMinter) {
    steps.push({
      title: "First token minted",
      children: (
        <Text size="label.sm">
          Head to the{" "}
          <Link href={tokenHref} color="blue.500">
            token tab
          </Link>{" "}
          to mint your first token.
        </Text>
      ),
      completed: (erc20Supply?.data || 0) > 0,
    });
  }

  const nftIsMintable = detectFeatures(oldContract, [
    "ERC721Mintable",
    "ERC1155Mintable",
  ]);
  if (nftIsMintable && isMinter) {
    steps.push({
      title: "First NFT minted",
      children: (
        <Text size="label.sm">
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

  const isAccountFactory = detectFeatures(oldContract, ["AccountFactory"]);
  if (isAccountFactory) {
    steps.push({
      title: "First account created",
      children: (
        <Text size="label.sm">
          Head to the{" "}
          <Link href={accountsHref} color="blue.500">
            Accounts tab
          </Link>{" "}
          to create your first account.
        </Text>
      ),
      completed: (accounts.data?.length || 0) > 0,
    });
  }

  const isRevealable = detectFeatures(oldContract, [
    "ERC721Revealable",
    "ERC1155Revealable",
  ]);
  const needsReveal = batchesToReveal.data?.length || 0 > 0;
  if (isRevealable && needsReveal) {
    steps.push({
      title: "NFTs revealed",
      children: (
        <Text size="label.sm">
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

  if (steps.length === 1) {
    return null;
  }

  return <StepsCard title="Contract checklist" steps={steps} delay={1000} />;
};
