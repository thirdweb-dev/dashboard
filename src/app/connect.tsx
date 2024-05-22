"use client";

import { ConnectButton } from "thirdweb/react";
import { thirdwebClient } from "../lib/thirdweb-client";
import { useTheme } from "next-themes";

export function CustomConnectButton() {
  const { theme } = useTheme();

  return (
    <ConnectButton
      client={thirdwebClient}
      theme={theme === "dark" ? "dark" : theme === "light" ? "light" : "dark"}
    />
  );
}
