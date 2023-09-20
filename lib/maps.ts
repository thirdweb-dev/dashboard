export const apiKeyMap: Record<number, string> = {
  1: process.env.ETHERSCAN_KEY as string,
  5: process.env.ETHERSCAN_KEY as string,
  11155111: process.env.ETHERSCAN_KEY as string,
  137: process.env.POLYGONSCAN_KEY as string,
  80001: process.env.POLYGONSCAN_KEY as string,
  250: process.env.FANTOMSCAN_KEY as string,
  4002: process.env.FANTOMSCAN_KEY as string,
  43114: process.env.SNOWTRACE_KEY as string,
  43113: process.env.SNOWTRACE_KEY as string,
  42161: process.env.ARBITRUMSCAN_KEY as string,
  421613: process.env.ARBITRUMSCAN_KEY as string,
  10: process.env.OPTIMISMSCAN_KEY as string,
  420: process.env.OPTIMISMSCAN_KEY as string,
  56: process.env.BSCSCAN_KEY as string,
  97: process.env.BSCSCAN_KEY as string,
  8453: process.env.BASESCAN_KEY as string,
  // no api key needed for these
  84531: "" as string,
  1442: "" as string,
};

export const apiMap: Record<number, string> = {
  1: "https://api.etherscan.io/api",
  3: "https://api-ropsten.etherscan.io/api",
  5: "https://api-goerli.etherscan.io/api",
  10: "https://api-optimistic.etherscan.io/api",
  25: "https://api.cronoscan.com/api",
  42: "https://api-kovan.etherscan.io/api",
  56: "https://api.bscscan.com/api",
  97: "https://api-testnet.bscscan.com/api",
  128: "https://api.hecoinfo.com/api",
  137: "https://api.polygonscan.com/api",
  199: "https://api.bttcscan.com/api",
  250: "https://api.ftmscan.com/api",
  256: "https://api-testnet.hecoinfo.com/api",
  420: "https://api-goerli-optimistic.etherscan.io/api",
  1029: "https://api-testnet.bttcscan.com/api",
  1284: "https://api-moonbeam.moonscan.io/api",
  1285: "https://api-moonriver.moonscan.io/api",
  1287: "https://api-moonbase.moonscan.io/api",
  11155111: "https://api-sepolia.etherscan.io/api",
  4002: "https://api-testnet.ftmscan.com/api",
  42161: "https://api.arbiscan.io/api",
  43113: "https://api-testnet.snowtrace.io/api",
  43114: "https://api.snowtrace.io/api",
  421613: "https://api-goerli.arbiscan.io/api",
  80001: "https://api-testnet.polygonscan.com/api",
  1313161554: "https://api.aurorascan.dev/api",
  1313161555: "https://api-testnet.aurorascan.dev/api",
  84531: "https://api-goerli.basescan.org/api",
  8453: "https://api.basescan.org/api",
  1442: "https://api-testnet-zkevm.polygonscan.com/api",
};
