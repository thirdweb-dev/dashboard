import { configuredNetworkListCookieKey } from "./constants";
import { ConfiguredNetworkInfo } from "./types";
import { useEffect, useState } from "react";

// get Cookie
export function getCookie(keyName: string) {
  // server
  if (typeof document === "undefined") {
    return "";
  }
  return document.cookie.split("; ").reduce((total, currentCookie) => {
    const [key, value] = currentCookie.split("=");
    return keyName === key ? decodeURIComponent(value) : total;
  }, "");
}
export function getConfiguredNetworkListFromCookie(): ConfiguredNetworkInfo[] {
  const networkList = getCookie(configuredNetworkListCookieKey);
  return networkList ? JSON.parse(networkList) : [];
}

export function setConfiguredNetworkListCookie(
  networkList: ConfiguredNetworkInfo[],
) {
  // set expires to 3 months from now
  const expires = new Date(
    new Date().setMonth(new Date().getMonth() + 3),
  ).toUTCString();
  const value = JSON.stringify(networkList);

  document.cookie = `${configuredNetworkListCookieKey}=${value};expires=${expires}; path=/`;
}

// hook
export function useConfiguredNetworks() {
  const [configuredNetworks, setConfiguredNetworks] = useState(() =>
    getConfiguredNetworkListFromCookie(),
  );

  // update cookie when configuredNetworks changes
  useEffect(() => {
    setConfiguredNetworkListCookie(configuredNetworks);
  }, [configuredNetworks]);

  return [configuredNetworks, setConfiguredNetworks] as const;
}

export const networkNameToUrlFriendlyName = (networkName: string) =>
  networkName.toLowerCase().replace(/ /g, "-");
