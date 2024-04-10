import {
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  embeddedWallet,
  trustWallet,
  zerionWallet,
  phantomWallet,
  bloctoWallet,
  frameWallet,
  rainbowWallet,
  WalletConfig,
} from "@thirdweb-dev/react";
import type { WalletId as AnyWalletId } from "thirdweb/wallets";

const metamaskWalletConfig = metamaskWallet();
const walletConnectConfig = walletConnect();
const coinbaseWalletConfig = coinbaseWallet();
const bloctoWalletConfig = bloctoWallet();
const frameWalletConfig = frameWallet();
const trustWalletConfig = trustWallet();
const rainbowWalletConfig = rainbowWallet();

const zerionWalletConfig = zerionWallet();
const phantomConfig = phantomWallet();

export const hideUIForWalletIds = new Set([
  metamaskWalletConfig.id,
  coinbaseWalletConfig.id,
  bloctoWalletConfig.id,
  frameWalletConfig.id,
  phantomConfig.id,
]);

export const hideUIForWalletIdsMobile = new Set([
  zerionWalletConfig.id,
  rainbowWalletConfig.id,
  trustWalletConfig.id,
]);

type WalletInfo = {
  code: string;
  component: WalletConfig<any>;
  import: string;
  type?: "social" | "eoa" | "guest";
  id?: AnyWalletId;
};

export type WalletId =
  | "MetaMask"
  | "Coinbase"
  | "WalletConnect"
  | "Email Wallet"
  | "Trust"
  | "Zerion"
  | "Rainbow"
  | "Phantom";

type WalletInfoRecord = Record<WalletId, WalletInfo>;

export const walletInfoRecord: WalletInfoRecord = {
  MetaMask: {
    code: `createWallet("io.metamask")`,
    component: metamaskWalletConfig,
    import: "createWallet",
    type: "eoa",
    id: "io.metamask",
  },
  Coinbase: {
    code: `createWallet("com.coinbase.wallet")`,
    component: coinbaseWalletConfig,
    import: "createWallet",
    type: "eoa",
    id: "com.coinbase.wallet",
  },
  WalletConnect: {
    code: `walletConnect()`,
    component: walletConnectConfig,
    import: "walletConnect",
    type: "eoa",
  },
  Trust: {
    code: `createWallet("com.trustwallet.app")`,
    component: trustWalletConfig,
    import: "createWallet",
    type: "eoa",
    id: "com.trustwallet.app",
  },
  Rainbow: {
    code: `createWallet("me.rainbow")`,
    component: rainbowWalletConfig,
    import: "createWallet",
    type: "eoa",
    id: "me.rainbow",
  },
  Zerion: {
    code: `createWallet("io.zerion.wallet")`,
    component: zerionWalletConfig,
    import: "createWallet",
    type: "eoa",
    id: "io.zerion.wallet",
  },
  Phantom: {
    code: `createWallet("app.phantom")`,
    component: phantomConfig,
    import: "createWallet",
    type: "eoa",
    id: "app.phantom",
  },
  "Email Wallet": {
    code: `inAppWallet()`,
    component: embeddedWallet(),
    import: "inAppWallet",
    type: "social",
  },
};
