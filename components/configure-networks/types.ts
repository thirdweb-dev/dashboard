export type NetworkInfo = {
  chainId: number;
  faucets: string[];
  infoURL: string;
  name: string;
  nativeCurrency: {
    decimals: 18;
    name: string;
    symbol: string;
  };
  networkId: number;
  rpc: string[];
  shortName: string;
};

export type ConfiguredNetworkInfo = {
  name: string;
  rpcUrl: string;
  chainId: number;
  currencySymbol: string;
};
