import { ContractType } from "@thirdweb-dev/sdk";

export class AnalyticsEvents {
  static ContractDeployed = "App-ContractDeployed";

  static DeploymentEvents: Record<ContractType, string> = {
    token: "App-TokenContractDeployed",
    "nft-collection": "App-NFTCollectionContractDeployed",
    edition: "App-EditionContractDeployed",
    marketplace: "App-MarketplaceContractDeployed",
    pack: "App-PackContractDeployed",
    "nft-drop": "App-NFTDropContractDeployed",
    "edition-drop": "App-EditionDropContractDeployed",
    split: "App-SplitContractDeployed",
    vote: "App-VoteContractDeployed",
  };
}
