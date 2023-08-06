import {
  WalletConfig,
  coinbaseWallet,
  localWallet,
  metamaskWallet,
  paperWallet,
  rainbowWallet,
  safeWallet,
  trustWallet,
  walletConnect,
  zerionWallet,
} from "@thirdweb-dev/react";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const METAMASK_WALLET = metamaskWallet();
const COINBASE_WALLET = coinbaseWallet();
const TRUST_WALLET = trustWallet();
const ZERION_WALLET = zerionWallet();
const RAINBOW_WALLET = rainbowWallet();

const WALLET_CONNECT = walletConnect({
  qrModalOptions: {
    themeVariables: {
      "--wcm-z-index": "10000",
    },
  },
});

const PAPER_WALLET = paperWallet({
  paperClientId: "9a2f6238-c441-4bf4-895f-d13c2faf2ddb",
  advancedOptions: {
    recoveryShareManagement: "AWS_MANAGED",
  },
});

const LOCAL_WALLET = localWallet();

const PERSONAL_EVM_WALLETS = [
  METAMASK_WALLET,
  COINBASE_WALLET,
  WALLET_CONNECT,
  PAPER_WALLET,
  LOCAL_WALLET,
];

const SAFE_WALLET = safeWallet({
  personalWallets: PERSONAL_EVM_WALLETS,
});

export const DEFAULT_EVM_WALLETS = [...PERSONAL_EVM_WALLETS, SAFE_WALLET];

type EvmWalletsContext = {
  supportedWallets: WalletConfig<any>[];
  additionalWalletOptions: AdditionalWalletOptions;
  setAdditionalWalletOptions: Dispatch<SetStateAction<AdditionalWalletOptions>>;
};

const DEFAULT_WALLET_OPTIONS = {
  trustWallet: false,
  zerionWallet: false,
  rainbowWallet: false,
};
const Context = createContext<EvmWalletsContext>({
  supportedWallets: DEFAULT_EVM_WALLETS,
  additionalWalletOptions: DEFAULT_WALLET_OPTIONS,
  setAdditionalWalletOptions: () => {},
});

const ADDITIONAL_WALLET_SLUGS = [
  "trustWallet",
  "zerionWallet",
  "rainbowWallet",
] as const;

export type AdditionalWalletSlug = (typeof ADDITIONAL_WALLET_SLUGS)[number];

type AdditionalWalletOptions = { [key in AdditionalWalletSlug]: boolean };

export const ADDITIONAL_WALLETS: {
  [key in AdditionalWalletSlug]: WalletConfig<any>;
} = {
  trustWallet: TRUST_WALLET,
  zerionWallet: ZERION_WALLET,
  rainbowWallet: RAINBOW_WALLET,
};

export const TW_EVM_WALLET_KEY = "tw-evm-wallet-toggle-options";

export default function EvmWalletProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [additionalWalletOptions, setAdditionalWalletOptions] =
    useState<AdditionalWalletOptions>(DEFAULT_WALLET_OPTIONS);

  const getAdditionalWallets = (): WalletConfig<any>[] => {
    const _wallets: WalletConfig<any>[] = [];
    ADDITIONAL_WALLET_SLUGS.forEach((slug) => {
      if (!additionalWalletOptions[slug]) return;
      _wallets.push(ADDITIONAL_WALLETS[slug]);
    });
    return [...DEFAULT_EVM_WALLETS, ..._wallets];
  };

  const supportedWallets: WalletConfig<any>[] = getAdditionalWallets();

  // Fetch config from localStorage
  useEffect(() => {
    try {
      const data = localStorage.getItem(TW_EVM_WALLET_KEY);
      const walletOptions = data
        ? (JSON.parse(data) as AdditionalWalletOptions)
        : null;
      if (
        !walletOptions ||
        Array.isArray(walletOptions) ||
        typeof walletOptions !== "object"
      ) {
        throw Error("Invalid data");
      }
      setAdditionalWalletOptions(walletOptions);
    } catch (e) {
      // if parsing error, clear dirty storage
      localStorage.removeItem(TW_EVM_WALLET_KEY);
    }
  }, []);

  return (
    <Context.Provider
      value={{
        supportedWallets,
        additionalWalletOptions,
        setAdditionalWalletOptions,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useEvmWallets = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useEvmWallets must be used inside EvmWalletProvider");
  }

  return context;
};
