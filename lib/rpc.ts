import { Chain, getChainRPC } from "@thirdweb-dev/chains";

export const DASHBOARD_THIRDWEB_API_KEY =
  "ed043a51ae23b0db3873f5a38b77ab28175fa496f15d3c53cf70401be89b622a";

const rpcKeys = {
  // fine to be hard-coded for now
  thirdwebApiKey: DASHBOARD_THIRDWEB_API_KEY,
};

export function getDashboardChainRpc(chain: Chain) {
  try {
    return getChainRPC(chain, rpcKeys);
  } catch (e) {
    // if this fails we already know there's no possible rpc url available so we should just return an empty string
    return "";
  }
}
