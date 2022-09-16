import { useDashboardSOLNetworkId } from "@3rdweb-sdk/react";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { ThirdwebSDK } from "@thirdweb-dev/solana";
import { getSOLRPC } from "constants/rpc";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ComponentWithChildren } from "types/component-with-children";

const wallets = [new PhantomWalletAdapter()];

export const SolanaProvider: ComponentWithChildren = ({ children }) => {
  const dashboardNetwork = useDashboardSOLNetworkId();
  const endpoint = useMemo(
    () =>
      dashboardNetwork
        ? getSOLRPC(dashboardNetwork)
        : getSOLRPC("mainnet-beta"),
    [dashboardNetwork],
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <TWSolanaProvider>{children}</TWSolanaProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

interface TWSolanaProviderProps {}

const TWSolanaContext = createContext<ThirdwebSDK | null>(null);

export function useSOLSDK() {
  return useContext(TWSolanaContext);
}

const TWSolanaProvider: ComponentWithChildren<TWSolanaProviderProps> = ({
  children,
}) => {
  const wallet = useWallet();

  const [solanaSDK, setSolanaSDK] = useState<ThirdwebSDK | null>(null);

  const dashboardNetwork = useDashboardSOLNetworkId();
  const endpoint = useMemo(
    () => (dashboardNetwork ? getSOLRPC(dashboardNetwork) : undefined),
    [dashboardNetwork],
  );

  useEffect(() => {
    if (endpoint) {
      setSolanaSDK(ThirdwebSDK.fromNetwork(endpoint));
    }
  }, [endpoint]);

  useEffect(() => {
    if (solanaSDK) {
      if (wallet.publicKey) {
        solanaSDK.wallet.connect(wallet);
      } else {
        solanaSDK.wallet.disconnect();
      }
    }
  }, [solanaSDK, wallet]);

  return (
    <TWSolanaContext.Provider value={solanaSDK}>
      {children}
    </TWSolanaContext.Provider>
  );
};
