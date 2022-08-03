export enum PageId {
  // unknown page id (default)
  Unknown = "unknown",

  // thirdweb.com
  Homepage = "homepage",

  // thirdweb.com/dashboard
  Dashboard = "dashboard",

  // thirdweb.com/gas
  GasEstimator = "gas-estimator",

  // thirdweb.com/authentication
  Authentication = "auth-landing",

  // thridweb.com/contracts
  Contracts = "contracts",

  // thirdweb.com/contracts/release
  ReleaseMultiple = "release-multiple-contracts",

  // thirdweb.com/contracts/release/:id
  ReleaseSingle = "release-single-contract",

  // thirdweb.com/contracts/new
  NewContract = "new-contract",

  // thirdweb.com/contracts/custom
  NewCustomContract = "new-custom-contract",

  // thirdweb.com/contracts/new/pre-built
  PreBuiltContract = "new-pre-built-contract",

  // thirdweb.com/contracts/new/pre-built/:contractCategory
  // example: thirdweb.com/contracts/new/pre-built/drop/
  PreBuiltContractCategory = "new-pre-built-contract-category",

  // thirdweb.com/contracts/new/pre-built/:contractCategory/:contractType
  // example: thirdweb.com/contracts/new/pre-built/drop/nft-drop
  PreBuiltContractType = "new-pre-built-contract-type",

  // thirdweb.com/contracts/deploy
  DeployMultiple = "deploy-multiple-contracts",

  // thirdweb.com/contracts/deploy/:id
  DeploySingle = "deploy-single-contract",

  // thirdweb.com/:wallet
  // example: thirdweb.com/jns.eth
  Profile = "profile",

  // thirdweb.com/:wallet/:contractId
  // example: thirdweb.com/jns.eth/PermissionedERC721A
  ReleasedContract = "released-contract",

  // thirdweb.com/:network/:contractAddress
  // example: thirdweb.com/goerli/0x2eaDAa60dBB74Ead3E20b23E4C5A0Dd789932846
  DeployedContract = "deployed-contract",

  // -- pre built contracts -- // (will bedeprecated in favor of the new "deplouyed-contract" page)
  EditionContract = "edition-contract",
  EditionDropContract = "edition-drop-contract",
  MarketlaceContract = "marketlace-contract",
  NftCollectionContract = "nft-collection-contract",
  NftDropContract = "nft-drop-contract",
  PackContract = "pack-contract",
  SignatureDropContract = "signature-drop-contract",
  SplitContract = "split-contract",
  TokenContract = "token-contract",
  TokenDropContract = "token-drop-contract",
  VoteContract = "vote-contract",
}
