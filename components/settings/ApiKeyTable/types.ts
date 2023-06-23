export enum DrawerSection {
  General,
  Services,
}

export interface ApiKeyFormServiceValues {
  name: string;
  contractAddresses: string;
}

export interface ApiKeyFormValues {
  name: string;
  domains: string;
  walletAddresses: string;
  services?: ApiKeyFormServiceValues[];
}

// FIXME: Extract these into lib
// add more | 'ipfs' | 'etc'
export type ThirdwebServiceName = "bundler";

export interface ThirdwebServiceAction {
  name: string;
  title: string;
  description?: string;
}

export interface ThirdwebService {
  name: ThirdwebServiceName;
  title: string;
  description?: string;
  actions?: ThirdwebServiceAction[];
}
