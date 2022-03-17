import { AppShell } from "components/layout/app-shell";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { useRouter } from "next/router";
import React from "react";
import { isSupportedNetwork } from "utils/network";

export const AppLayout: React.FC = ({ children }) => {
  const network = useSingleQueryParam("network");

  const { asPath, replace } = useRouter();

  const isFTUX = asPath.startsWith("/start");

  const isUnsupported = !!(network && !isSupportedNetwork(network));
  // hack to prevent flashing of content from SSR
  if (asPath.indexOf("[") > -1) {
    return null;
  }

  // ftux is a special case (we want the app contexts but not the appshell)
  if (isFTUX) {
    return <>{children}</>;
  }

  // if we're on an unsupported network, render the wallet connection fallback
  if (isUnsupported) {
    replace("/dashboard");
    return null;
  }

  return <AppShell>{children}</AppShell>;
};
