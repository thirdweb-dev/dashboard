import { Flex } from "@chakra-ui/react";
import { contractType, useContract } from "@thirdweb-dev/react";
import { useProgram } from "@thirdweb-dev/react/solana";
import {
  ExtensionDetectedState,
  extensionDetectedState,
} from "components/buttons/ExtensionDetectButton";
import { useEns } from "components/contract-components/hooks";
import dynamic from "next/dynamic";
import { ComponentType } from "react";
import { Card, Heading, Text } from "tw-components";

// solana
const LazyProgramOverviewTab = dynamic(() =>
  import("components/pages/program").then(
    ({ ProgramOverviewTab }) => ProgramOverviewTab,
  ),
);
const LazyPogramClaimConditionsTab = dynamic(() =>
  import("program-ui/common/program-claim-conditions").then(
    ({ ProgramClaimConditionsTab }) => ProgramClaimConditionsTab,
  ),
);
const LazyProgramCodeTab = dynamic(() =>
  import("program-ui/common/program-code").then(
    ({ ProgramCodeTab }) => ProgramCodeTab,
  ),
);
const LazyProgramSettingsTab = dynamic(() =>
  import("program-ui/common/program-settings").then(
    ({ ProgramSettingsTab }) => ProgramSettingsTab,
  ),
);
// end solana
// evm
const LazyCustomContractOverviewPage = dynamic(() =>
  import("../tabs/overview/page").then(
    ({ CustomContractOverviewPage }) => CustomContractOverviewPage,
  ),
);
const LazyContractExplorerPage = dynamic(() =>
  import("../tabs/explorer/page").then(
    ({ ContractExplorerPage }) => ContractExplorerPage,
  ),
);
const LazyContractEventsPage = dynamic(() =>
  import("../tabs/events/page").then(
    ({ ContractEventsPage }) => ContractEventsPage,
  ),
);
const LazyContractNFTPage = dynamic(() =>
  import("../tabs/nfts/page").then(({ ContractNFTPage }) => ContractNFTPage),
);
const LazyContractTokensPage = dynamic(() =>
  import("../tabs/tokens/page").then(
    ({ ContractTokensPage }) => ContractTokensPage,
  ),
);
const LazyContractDirectListingsPage = dynamic(() =>
  import("../tabs/direct-listings/page").then(
    ({ ContractDirectListingsPage }) => ContractDirectListingsPage,
  ),
);
const LazyContractEnglishAuctionsPage = dynamic(() =>
  import("../tabs/english-auctions/page").then(
    ({ ContractEnglishAuctionsPage }) => ContractEnglishAuctionsPage,
  ),
);
const LazyContractListingsPage = dynamic(() =>
  import("../tabs/listings/page").then(
    ({ ContractListingsPage }) => ContractListingsPage,
  ),
);
const LazyContractSplitPage = dynamic(() =>
  import("../tabs/split/page").then(
    ({ ContractSplitPage }) => ContractSplitPage,
  ),
);
const LazyContractProposalsPage = dynamic(() =>
  import("../tabs/proposals/page").then(
    ({ ContractProposalsPage }) => ContractProposalsPage,
  ),
);
const LazyContractClaimConditionsPage = dynamic(() =>
  import("../tabs/claim-conditions/page").then(
    ({ ContractClaimConditionsPage }) => ContractClaimConditionsPage,
  ),
);
const LazyContractPermissionsPage = dynamic(() =>
  import("../tabs/permissions/page").then(
    ({ ContractPermissionsPage }) => ContractPermissionsPage,
  ),
);
const LazyCustomContractEmbedPage = dynamic(() =>
  import("../tabs/embed/page").then(
    ({ CustomContractEmbedPage }) => CustomContractEmbedPage,
  ),
);
const LazyContractCodePage = dynamic(() =>
  import("../tabs/code/page").then(({ ContractCodePage }) => ContractCodePage),
);
const LazyCustomContractSettingsPage = dynamic(() =>
  import("../tabs/settings/page").then(
    ({ CustomContractSettingsPage }) => CustomContractSettingsPage,
  ),
);
const LazyCustomContractSourcesPage = dynamic(() =>
  import("../tabs/sources/page").then(
    ({ CustomContractSourcesPage }) => CustomContractSourcesPage,
  ),
);
// end evm

export type EnhancedRoute<T = any> = {
  title: string;
  path: string;
  isEnabled?: ExtensionDetectedState;
  component: ComponentType<T>;
};

export function useRouteConfig(ecosystem: "evm" | "solana", address: string) {
  if (ecosystem === "evm") {
    // we know what we're doing here, importantly ecosystem is NEVER allowed to change.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useContractRouteConfig(address);
  }

  // we know what we're doing here, importantly ecosystem is NEVER allowed to change.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useProgramRouteConfig(address);
}

export function useProgramRouteConfig(programAddress: string): EnhancedRoute[] {
  const { data: program, isLoading } = useProgram(programAddress);

  return [
    {
      title: "Overview",
      path: "overview",
      component: LazyProgramOverviewTab,
    },
    {
      title: "Claim Conditions",
      path: "claim-conditions",
      component: LazyPogramClaimConditionsTab,
      isEnabled: isLoading
        ? "loading"
        : program?.accountType === "nft-drop"
        ? "enabled"
        : "disabled",
    },
    {
      title: "Code",
      path: "code",
      component: LazyProgramCodeTab,
    },
    {
      title: "Settings",
      path: "settings",
      component:
        program?.accountType === "nft-collection"
          ? LazyProgramSettingsTab
          : () => (
              <>
                <Card>
                  <Flex direction="column" gap={4}>
                    <Heading size="label.lg">⚠️ Coming soon</Heading>
                    <Text>
                      Here you will be able to configure Metadata, Creators,
                      Royalties, etc for your program.
                    </Text>
                  </Flex>
                </Card>
              </>
            ),
    },
  ];
}

export function useContractRouteConfig(
  contractAddress: string,
): EnhancedRoute[] {
  const ensQuery = useEns(contractAddress);
  const contractQuery = useContract(ensQuery.data?.address);
  const contractTypeQuery = contractType.useQuery(contractAddress);

  const claimconditionExtensionDetection = extensionDetectedState({
    contractQuery,
    feature: [
      // erc 721
      "ERC721ClaimPhasesV1",
      "ERC721ClaimPhasesV2",
      "ERC721ClaimConditionsV1",
      "ERC721ClaimConditionsV2",

      // erc 20
      "ERC20ClaimConditionsV1",
      "ERC20ClaimConditionsV2",
      "ERC20ClaimPhasesV1",
      "ERC20ClaimPhasesV2",
    ],
  });
  return [
    {
      title: "Overview",
      path: "overview",
      component: LazyCustomContractOverviewPage,
    },
    {
      title: "Explorer",
      path: "explorer",
      component: LazyContractExplorerPage,
    },
    {
      title: "Events",
      path: "events",
      component: LazyContractEventsPage,
    },
    {
      title: "NFTs",
      path: "nfts",
      isEnabled: extensionDetectedState({
        contractQuery,
        feature: ["ERC1155", "ERC721"],
      }),
      component: LazyContractNFTPage,
    },
    {
      title: "Tokens",
      path: "tokens",
      isEnabled: extensionDetectedState({ contractQuery, feature: "ERC20" }),
      component: LazyContractTokensPage,
    },
    {
      title: "Direct Listings",
      path: "direct-listings",
      isEnabled: extensionDetectedState({
        contractQuery,
        feature: "DirectListings",
      }),
      component: LazyContractDirectListingsPage,
    },
    {
      title: "English Auctions",
      path: "english-auctions",
      isEnabled: extensionDetectedState({
        contractQuery,
        feature: "EnglishAuctions",
      }),
      component: LazyContractEnglishAuctionsPage,
    },
    {
      title: "Listings",
      path: "listings",
      isEnabled: contractTypeQuery.isLoading
        ? "loading"
        : contractTypeQuery.data === "marketplace"
        ? "enabled"
        : "disabled",
      component: LazyContractListingsPage,
    },
    {
      title: "Balances",
      path: "split",
      isEnabled: contractTypeQuery.isLoading
        ? "loading"
        : contractTypeQuery.data === "split"
        ? "enabled"
        : "disabled",
      component: LazyContractSplitPage,
    },
    {
      title: "Proposals",
      path: "proposals",
      isEnabled: contractTypeQuery.isLoading
        ? "loading"
        : contractTypeQuery.data === "vote"
        ? "enabled"
        : "disabled",
      component: LazyContractProposalsPage,
    },
    {
      title: "Claim Conditions",
      path: "claim-conditions",
      isEnabled: claimconditionExtensionDetection,
      component: LazyContractClaimConditionsPage,
    },
    {
      title: "Permissions",
      path: "permissions",
      isEnabled: extensionDetectedState({
        contractQuery,
        matchStrategy: "any",
        feature: ["Permissions", "PermissionsEnumerable"],
      }),
      component: LazyContractPermissionsPage,
    },
    {
      title: "Embed",
      path: "embed",
      component: LazyCustomContractEmbedPage,
      isEnabled: contractTypeQuery.isLoading
        ? "loading"
        : contractTypeQuery.data === "marketplace"
        ? "enabled"
        : extensionDetectedState({
            contractQuery,
            matchStrategy: "any",
            feature: [
              // erc 721
              "ERC721ClaimPhasesV1",
              "ERC721ClaimPhasesV2",
              "ERC721ClaimConditionsV1",
              "ERC721ClaimConditionsV2",

              // erc 1155
              "ERC1155ClaimPhasesV1",
              "ERC1155ClaimPhasesV2",
              "ERC1155ClaimConditionsV1",
              "ERC1155ClaimConditionsV2",

              // erc 20
              "ERC20ClaimConditionsV1",
              "ERC20ClaimConditionsV2",
              "ERC20ClaimPhasesV1",
              "ERC20ClaimPhasesV2",

              // marketplace v3
              "DirectListings",
              "EnglishAuctions",
            ],
          }),
    },
    {
      title: "Code",
      path: "code",
      component: LazyContractCodePage,
    },
    {
      title: "Settings",
      path: "settings",
      component: LazyCustomContractSettingsPage,
    },
    {
      title: "Sources",
      path: "sources",
      component: LazyCustomContractSourcesPage,
    },
  ];
}
