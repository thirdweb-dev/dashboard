import { ThirdwebProvider, WalletConfig, en, jp } from "@thirdweb-dev/react";
import React from "react";
import { THIRDWEB_DOMAIN, THIRDWEB_API_HOST } from "constants/urls";
import { DASHBOARD_THIRDWEB_CLIENT_ID, isProd } from "constants/rpc";
import { defaultChains } from "@thirdweb-dev/chains";
import { StorageSingleton } from "lib/sdk";

const localeIdToObj = {
  en: en(),
  jp: jp(),
};

export function PreviewThirdwebProvider(props: {
  authEnabled: boolean;
  supportedWallets: WalletConfig<any>[];
  children: React.ReactNode;
  locale?: "en" | "jp";
}) {
  return (
    <ThirdwebProvider
      locale={props.locale ? localeIdToObj[props.locale] : undefined}
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
      clientId={DASHBOARD_THIRDWEB_CLIENT_ID}
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
