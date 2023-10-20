import { ThirdwebProvider, WalletConfig } from "@thirdweb-dev/react";
import React from "react";
import { THIRDWEB_DOMAIN, THIRDWEB_API_HOST } from "constants/urls";
import { isProd } from "constants/rpc";
import { defaultChains } from "@thirdweb-dev/chains";
import { StorageSingleton } from "lib/sdk";

export function PreviewThirdwebProvider(props: {
  authEnabled: boolean;
  supportedWallets: WalletConfig<any>[];
  children: React.ReactNode;
}) {
  return (
    <ThirdwebProvider
      activeChain="goerli"
      supportedWallets={
        props.supportedWallets.length > 0 ? props.supportedWallets : undefined
      }
      supportedChains={
        isProd
          ? defaultChains
          : defaultChains.map((chain) => {
              return {
                ...chain,
                rpc: chain.rpc.map((rpc) =>
                  rpc.replace("rpc.thirdweb.com", "rpc-staging.thirdweb.com"),
                ),
              };
            })
      }
      // USER_MANAGED testing throwaway clientId
      clientId={"b85c4c5221889bf3dbd1b3a387c6f4c3"}
      storageInterface={StorageSingleton}
      authConfig={
        props.authEnabled
          ? {
              domain: THIRDWEB_DOMAIN,
              authUrl: `${THIRDWEB_API_HOST}/v1/auth`,
            }
          : undefined
      }
    >
      {props.children}
    </ThirdwebProvider>
  );
}
