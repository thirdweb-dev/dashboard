"use client";

/* eslint-disable react/forbid-dom-props */
import { popularChains } from "../popularChains";
import { useTheme } from "next-themes";
import { ConnectButton } from "thirdweb/react";
import {
  useAddRecentlyUsedChainId,
  useRecentlyUsedChains,
} from "hooks/chains/recentlyUsedChains";
// import { useSetIsNetworkConfigModalOpen } from "hooks/networkConfigModal";
import { useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTrack } from "hooks/analytics/useTrack";
// import { CustomChainRenderer } from "components/selects/CustomChainRenderer";
// import { useFavouriteChains } from "app/(dashboard)/(chain)/components/client/star-button";
// import type { Chain } from "@thirdweb-dev/chains";
import { thirdwebClient } from "@/constants/client";
import { THIRDWEB_API_HOST } from "constants/urls";
import { useSupportedChains } from "@thirdweb-dev/react";
import { defineDashboardChain } from "../../../../lib/v5-adapter";
import { GLOBAL_AUTH_TOKEN_KEY } from "../../../../constants/app";
import { fetchAuthToken } from "../../hooks/useApi";

export interface ConnectWalletProps {
  shrinkMobile?: boolean;
  upsellTestnet?: boolean;
  onChainSelect?: (chainId: number) => void;
  noAuth?: boolean;
  disableChainConfig?: boolean;
  disableAddCustomNetwork?: boolean;
}

export const CustomConnectWallet: React.FC<ConnectWalletProps> = ({
  noAuth,
}) => {
  const { theme } = useTheme();
  const recentChainsv4 = useRecentlyUsedChains();
  const addRecentlyUsedChainId = useAddRecentlyUsedChainId();
  // const setIsNetworkConfigModalOpen = useSetIsNetworkConfigModalOpen();
  const t = theme === "light" ? "light" : "dark";
  const allv4Chains = useSupportedChains();
  // const favChainsQuery = useFavouriteChains();

  // const favChains = useMemo(() => {
  //   if (favChainsQuery.data) {
  //     const _chains: Chain[] = [];
  //     favChainsQuery.data.forEach((chainId) => {
  //       const chain = allChains.find((c) => String(c.chainId) === chainId);
  //       if (chain) {
  //         _chains.push(chain);
  //       }
  //     });

  //     return _chains;
  //   }
  // }, [favChainsQuery.data, allChains]);

  const allChains = useMemo(() => {
    return allv4Chains.map((c) => defineDashboardChain(c.chainId, c));
  }, [allv4Chains]);

  return (
    <ConnectButton
      auth={
        noAuth
          ? undefined
          : {
              getLoginPayload: async (params) => {
                const res = await fetch(
                  `${THIRDWEB_API_HOST}/v1/auth/payload`,
                  {
                    method: "POST",
                    body: JSON.stringify({
                      address: params.address,
                      chainId: params.chainId.toString(),
                    }),
                    headers: {
                      "Content-Type": "application/json",
                    },
                  },
                );
                if (!res.ok) {
                  throw new Error("Failed to fetch login payload");
                }
                return (await res.json()).payload;
              },
              doLogin: async (payload) => {
                const res = await fetch(`${THIRDWEB_API_HOST}/v1/auth/login`, {
                  method: "POST",
                  body: JSON.stringify({ payload }),
                  credentials: "include",
                  headers: {
                    "Content-Type": "application/json",
                  },
                });
                if (!res.ok) {
                  throw new Error("Failed to login");
                }
                const json = await res.json();

                if (json.token) {
                  (window as any)[GLOBAL_AUTH_TOKEN_KEY] = json.token;
                }
                return json;
              },
              doLogout: async () => {
                // reset the token ASAP
                (window as any)[GLOBAL_AUTH_TOKEN_KEY] = undefined;
                const res = await fetch(`${THIRDWEB_API_HOST}/v1/auth/logout`, {
                  method: "POST",
                  credentials: "include",
                  headers: {
                    "Content-Type": "application/json",
                  },
                });
                if (!res.ok) {
                  throw new Error("Failed to logout");
                }
                return res.json();
              },
              isLoggedIn: async (address) => {
                const res = await fetch(`${THIRDWEB_API_HOST}/v1/auth/user`, {
                  method: "GET",
                  credentials: "include",
                  headers: {
                    "Content-Type": "application/json",
                  },
                });
                if (!res.ok) {
                  throw new Error("Failed to fetch user");
                }
                const user = await res.json();

                const { jwt } = await fetchAuthToken(address);
                if (jwt) {
                  (window as any)[GLOBAL_AUTH_TOKEN_KEY] = jwt;
                }

                return user;
              },
            }
      }
      theme={t}
      client={thirdwebClient}
      connectModal={{
        privacyPolicyUrl: "/privacy",
        termsOfServiceUrl: "/tos",
        showThirdwebBranding: false,
        welcomeScreen: () => <ConnectWalletWelcomeScreen theme={t} />,
      }}
      appMetadata={{
        name: "thirdweb",
        logoUrl: "https://thirdweb.com/favicon.ico",
        url: "https://thirdweb.com",
      }}
      chains={allChains}
      detailsModal={{
        networkSelector: {
          popularChainIds: popularChains.map((c) => c.chainId),
          recentChainIds: recentChainsv4.map((c) => c.chainId),
          onSwitch(chain) {
            addRecentlyUsedChainId(chain.id);
          },
          // TODO: re-visit this
          // onCustomClick: disableAddCustomNetwork
          //   ? undefined
          //   : () => {
          //       setIsNetworkConfigModalOpen(true);
          //     },

          // TODO: re-visit this
          // renderChain(props) {
          //   return (
          //     <CustomChainRenderer
          //       {...props}
          //       disableChainConfig={disableChainConfig}
          //     />
          //   );
          // },
        },
      }}
    />
  );
};

export function ConnectWalletWelcomeScreen(props: {
  theme: "light" | "dark";
  subtitle?: string;
}) {
  const fontColor = props.theme === "light" ? "black" : "white";
  const subtitle = props.subtitle ?? "Connect your wallet to get started";

  return (
    <div
      // eslint-disable-next-line react/forbid-dom-props
      style={{
        backgroundColor: props.theme === "dark" ? "#18132f" : "#c7b5f1",
        backgroundImage: `url("/assets/connect-wallet/welcome-gradient-${props.theme}.png")`,
      }}
      className="flex flex-col p-6 h-full bg-cover bg-center bg-no-repeat"
    >
      <div className="flex flex-grow flex-col justify-center">
        <div>
          <div className="flex justify-center">
            <Image
              className="select-none"
              style={{
                mixBlendMode: props.theme === "dark" ? "soft-light" : "initial",
              }}
              draggable={false}
              width={200}
              height={150}
              alt=""
              src="/assets/connect-wallet/tw-welcome-icon.svg"
              loading="eager"
            />
          </div>

          <div className="h-10" />
          <h2
            className="text-xl text-center font-semibold"
            style={{
              color: fontColor,
            }}
          >
            Welcome to thirdweb
          </h2>

          <div className="h-4" />

          <p
            className="text-center opacity-80 font-semibold"
            style={{
              color: fontColor,
            }}
          >
            {subtitle}
          </p>
        </div>
      </div>

      <TrackedAnchorLink
        className="text-center font-semibold opacity-70 hover:opacity-100 hover:no-underline"
        target="_blank"
        category="custom-connect-wallet"
        label="new-to-wallets"
        href="https://blog.thirdweb.com/web3-wallet/"
        style={{
          color: fontColor,
        }}
      >
        New to Wallets?
      </TrackedAnchorLink>
    </div>
  );
}

/**
 * A link component extends the `Link` component and adds tracking.
 */
function TrackedAnchorLink(props: {
  category: string;
  label?: string;
  trackingProps?: Record<string, string>;
  href: string;
  target?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const trackEvent = useTrack();
  const { category, label, trackingProps } = props;

  const onClick = useCallback(() => {
    trackEvent({ category, action: "click", label, ...trackingProps });
  }, [trackEvent, category, label, trackingProps]);

  return (
    <Link
      onClick={onClick}
      target={props.target}
      href={props.href}
      className={props.className}
      style={props.style}
    >
      {props.children}
    </Link>
  );
}
