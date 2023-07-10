import { useEffect, useState } from "react";
import { isBrowser } from "utils/isBrowser";

/**
 * Use this hook to fetch the IPFS gateway from the localStorage
 */

export type IpfsGatewayInfo = {
  label: string;
  url: string;
};

export function useGetCustomIpfsGateways() {
  const [ipfsGateways, setIpfsGateways] = useState<IpfsGatewayInfo[]>([]);

  useEffect(() => {
    if (!isBrowser()) return;
    const item = window.localStorage.getItem("tw-settings-ipfs-gateways");
    if (!item) return;
    let gateways = JSON.parse(item);
    if (!Array.isArray(gateways)) return;
    gateways = gateways.filter((item) => item.url && item.label);
    setIpfsGateways(gateways);
  }, []);

  return ipfsGateways;
}
