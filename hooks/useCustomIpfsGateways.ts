import { useEffect, useState } from "react";
import { isBrowser } from "utils/isBrowser";

export function useCustomIpfsGateways() {
  const [ipfsGateways, setIpfsGateways] = useState<CustomIpfsGateway[]>([]);

  useEffect(() => {
    if (!isBrowser()) return;
    const item = window.localStorage.getItem(CUSTOM_IPFS_GATEWAYS);
    if (!item) return;
    const gateways = customIpfsStorage.get();
    setIpfsGateways(gateways);
  }, []);

  return ipfsGateways;
}

const CUSTOM_IPFS_GATEWAYS = "tw-settings-ipfs-gateways";

export type CustomIpfsGateway = {
  url: string;
  label: string;
};

export const customIpfsStorage = {
  get(): CustomIpfsGateway[] {
    try {
      const customIpfsGateways = localStorage.getItem(CUSTOM_IPFS_GATEWAYS);
      return customIpfsGateways ? JSON.parse(customIpfsGateways) : [];
    } catch (e) {
      // if parsing error, clear dirty storage
      localStorage.removeItem(CUSTOM_IPFS_GATEWAYS);
    }

    return [];
  },

  set(customIpfsGateways: CustomIpfsGateway[]) {
    const value = JSON.stringify(customIpfsGateways);
    try {
      localStorage.setItem(CUSTOM_IPFS_GATEWAYS, value);
    } catch (e) {
      // if storage limit exceed
      // clear entire local storage and then try again
      localStorage.clear();
      localStorage.setItem(CUSTOM_IPFS_GATEWAYS, value);
    }
  },
};
