import {
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  safeWallet,
  localWallet,
  embeddedWallet,
  trustWallet,
  zerionWallet,
  magicLink,
  phantomWallet,
  bloctoWallet,
  frameWallet,
  rainbowWallet,
  WalletConfig,
} from "@thirdweb-dev/react";

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
  walletConnectConfig.id,
  bloctoWalletConfig.id,
  frameWalletConfig.id,
  phantomConfig.id,
]);

export const hideUIForWalletIdsMobile = new Set([
  zerionWalletConfig.id,
  rainbowWalletConfig.id,
  trustWalletConfig.id,
]);

export type WalletInfo = {
  code: string;
  component: WalletConfig<any>;
  import: string;
  type?: "social" | "eoa" | "guest";
};

export type WalletId =
  | "MetaMask"
  | "Coinbase"
  | "WalletConnect"
  | "Safe"
  | "Guest Mode"
  | "Email Wallet"
  | "Trust"
  | "Zerion"
  | "Magic Link"
  | "Blocto"
  | "Frame"
  | "Rainbow"
  | "Phantom";

type WalletInfoRecord = Record<WalletId, WalletInfo>;

export const walletInfoRecord: WalletInfoRecord = {
  MetaMask: {
    code: "metamaskWallet()",
    component: metamaskWalletConfig,
    import: "metamaskWallet",
    type: "eoa",
  },
  Coinbase: {
    code: "coinbaseWallet()",
    component: coinbaseWalletConfig,
    import: "coinbaseWallet",
    type: "eoa",
  },
  WalletConnect: {
    code: "walletConnect()",
    component: walletConnectConfig,
    import: "walletConnect",
    type: "eoa",
  },
  Trust: {
    code: `trustWallet()`,
    component: trustWalletConfig,
    import: "trustWallet",
    type: "eoa",
  },
  Rainbow: {
    code: `rainbowWallet()`,
    component: rainbowWalletConfig,
    import: "rainbowWallet",
    type: "eoa",
  },
  Zerion: {
    code: "zerionWallet()",
    component: zerionWalletConfig,
    import: "zerionWallet",
    type: "eoa",
  },
  Phantom: {
    code: "phantomWallet()",
    component: phantomConfig,
    import: "phantomWallet",
    type: "eoa",
  },
  "Guest Mode": {
    code: `localWallet()`,
    component: localWallet(),
    import: "localWallet",
    type: "guest",
  },
  "Email Wallet": {
    code: `embeddedWallet()`,
    component: embeddedWallet(),
    import: "embeddedWallet",
    type: "social",
  },
  Safe: {
    code: `safeWallet({ personalWallets: [ metamaskWallet(), coinbaseWallet(), walletConnect() ] })`,
    component: safeWallet({
      personalWallets: [metamaskWallet(), coinbaseWallet(), walletConnect()],
    }),
    import: "safeWallet",
    type: "eoa",
  },
  "Magic Link": {
    code: `magicLink({ apiKey: "YOUR_MAGIC_API_KEY", oauthOptions: { providers: ["google", "facebook", "twitter", "apple"] }})`,
    component: magicLink({
      apiKey: "pk_live_3EFC32B01A29985C",
      oauthOptions: {
        providers: ["google", "facebook", "twitter", "apple"],
      },
    }),
    import: "magicLink",
    type: "social",
  },
  Blocto: {
    code: "bloctoWallet()",
    component: bloctoWalletConfig,
    import: "bloctoWallet",
    type: "eoa",
  },
  Frame: {
    code: "frameWallet()",
    component: frameWalletConfig,
    import: "frameWallet",
    type: "eoa",
  },
};
