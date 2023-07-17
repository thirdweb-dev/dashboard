export enum DrawerSection {
  General,
  Services,
}

export interface ApiKeyFormServiceValues {
  name: string;
  targetAddresses: string;
  enabled?: boolean;
  actions: string[];
}

export interface ApiKeyFormValues {
  name: string;
  domains: string;
  bundleIds: string;
  walletAddresses?: string;
  services?: ApiKeyFormServiceValues[];
}

// FIXME: Remove
export const HIDDEN_SERVICES = ["relayer"];
