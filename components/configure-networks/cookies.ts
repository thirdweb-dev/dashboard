import { ConfiguredNetworkInfo } from "./types";

// this is the key used to store the network list in the cookie
export const configuredNetworkListCookieKey = "configured-network-list";

// get Cookie
export function getCookieStr(keyName: string) {
  const split = document.cookie.split("; ");
  for (const cookieStr of split) {
    const [key, value] = cookieStr.split("=");
    if (keyName === key) {
      return decodeURIComponent(value);
    }
  }

  return "";
}

export function getConfiguredNetworkListFromCookie(): ConfiguredNetworkInfo[] {
  try {
    const networkListStr = getCookieStr(configuredNetworkListCookieKey);
    return networkListStr ? JSON.parse(networkListStr) : [];
  } catch (e) {
    // could not parse cookie, fix cookie
    setConfiguredNetworkListCookie([]);
  }

  return [];
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
