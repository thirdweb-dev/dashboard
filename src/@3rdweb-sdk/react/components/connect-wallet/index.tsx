"use client";

/* eslint-disable react/forbid-dom-props */
import { popularChains } from "../popularChains";
import { useTheme } from "next-themes";
import { ConnectWallet, useSupportedChains } from "@thirdweb-dev/react";
import {
  useAddRecentlyUsedChainId,
  useRecentlyUsedChains,
} from "hooks/chains/recentlyUsedChains";
import { useSetIsNetworkConfigModalOpen } from "hooks/networkConfigModal";
import { ComponentProps, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTrack } from "../../../../hooks/analytics/useTrack";
import { CustomChainRenderer } from "../../../../components/selects/CustomChainRenderer";
import { useFavouriteChains } from "../../../../app/(dashboard)/(chain)/components/client/star-button";
import type { Chain } from "@thirdweb-dev/chains";

export interface ConnectWalletProps {
  shrinkMobile?: boolean;
  upsellTestnet?: boolean;
  onChainSelect?: (chainId: number) => void;
  auth?: ComponentProps<typeof ConnectWallet>["auth"];
  disableChainConfig?: boolean;
  disableAddCustomNetwork?: boolean;
}

export const CustomConnectWallet: React.FC<ConnectWalletProps> = ({
  auth,
  disableChainConfig,
  disableAddCustomNetwork,
}) => {
  const { theme } = useTheme();
  const recentChains = useRecentlyUsedChains();
  const addRecentlyUsedChainId = useAddRecentlyUsedChainId();
  const setIsNetworkConfigModalOpen = useSetIsNetworkConfigModalOpen();
  const t = theme === "light" ? "light" : "dark";
  const allChains = useSupportedChains();
  const favChainsQuery = useFavouriteChains();

  const favChains = useMemo(() => {
    if (favChainsQuery.data) {
      const _chains: Chain[] = [];
      favChainsQuery.data.forEach((chainId) => {
        const chain = allChains.find((c) => String(c.chainId) === chainId);
        if (chain) {
          _chains.push(chain);
        }
      });

      return _chains;
    }
  }, [favChainsQuery.data, allChains]);

  return (
    <ConnectWallet
      auth={auth}
      theme={t}
      welcomeScreen={() => {
        return <ConnectWalletWelcomeScreen theme={t} />;
      }}
      termsOfServiceUrl="/tos"
      privacyPolicyUrl="/privacy"
      hideTestnetFaucet={false}
      networkSelector={{
        popularChains: favChains ?? popularChains,
        recentChains,
        onSwitch(chain) {
          addRecentlyUsedChainId(chain.chainId);
        },
        onCustomClick: disableAddCustomNetwork
          ? undefined
          : () => {
              setIsNetworkConfigModalOpen(true);
            },

        renderChain(props) {
          return (
            <CustomChainRenderer
              {...props}
              disableChainConfig={disableChainConfig}
            />
          );
        },
      }}
      showThirdwebBranding={false}
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
