import { contractSlugMapping } from "./contractSlugMapping";
// Map the alias of the benchmark function to the operation it carries
// eg. "erc20_100" -> "Claim 100 ERC20 token"
export const functionNameMapping: Record<
  keyof typeof contractSlugMapping,
  Record<string, string>
> = {
  multiwrap: {
    unwrap: "",
    wrap: "",
  },
  signatureDrop: {
    claim_five_tokens: "Claim 5 tokens",
    lazyMint: "",
    lazyMint_for_delayed_reveal: "",
    reveal: "",
    setClaimConditions: "",
  },
  editionStake: {
    claimRewards: "",
    stake: "",
    withdraw: "",
  },
  nftStake: {
    claimRewards: "",
    stake_five_tokens: "",
    withdraw: "",
  },
  airdropERC20: {
    airdrop: "",
  },
  airdropERC721: {
    airdrop: "",
  },
  pack: {
    addPackContents: "",
    createPack: "",
    openPack: "",
  },
  tokenERC20: {
    mintTo: "",
    mintWithSignature_pay_with_ERC20: "",
    mintWithSignature_pay_with_native_token: "",
  },
  tokenERC721: {
    burn: "",
    mintTo: "",
    mintWithSignature_pay_with_ERC20: "",
    mintWithSignature_pay_with_native_token: "",
  },
  tokenERC1155: {
    burn: "",
    mintTo: "",
    mintWithSignature_pay_with_ERC20: "",
    mintWithSignature_pay_with_native_token: "",
  },
  tokenStake: {
    claimRewards: "",
    stake: "",
    withdraw: "",
  },
  airdropERC1155: {
    airdrop: "",
  },
  packvrf: {
    createPack: "",
    openPack: "",
    openPackAndClaimRewards: "",
  },
  dropERC1155: {
    claim: "",
    lazyMint: "",
    setClaimConditions_five_conditions: "",
  },
  dropERC20: {
    claim: "",
    setClaimConditions_five_conditions: "",
  },
  airdropClaim: {
    erc1155: "",
    erc20: "",
    erc721: "",
  },
  airdropPush: {
    erc1155ReceiverCompliant: "",
    erc1155_10: "",
    erc1155_100: "",
    erc1155_1000: "",
    erc20_10: "",
    erc20_100: "",
    erc20_1000: "",
    erc721ReceiverCompliant: "",
    erc721_10: "",
    erc721_100: "",
    erc721_1000: "",
  },
  airdropSignature: {
    erc115_10: "",
    erc115_100: "",
    erc115_1000: "",
    erc20_10: "",
    erc20_100: "",
    erc20_1000: "",
    erc721_10: "",
    erc721_100: "",
    erc721_1000: "",
  },
  dropERC721: {
    claim_five_tokens: "",
    lazyMint: "",
    lazyMint_for_delayed_reveal: "",
    reveal: "",
    setClaimConditions_five_conditions: "",
  },
};
