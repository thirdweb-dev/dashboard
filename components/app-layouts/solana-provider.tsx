import { useDashboardSOLNetworkId } from "@3rdweb-sdk/react";
import {
  ConnectionProvider,
  WalletProvider,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { ThirdwebSDKProvider } from "@thirdweb-dev/react/solana";
import { getSOLRPC } from "constants/rpc";
import { useMemo } from "react";
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

const TWSolanaProvider: ComponentWithChildren = ({ children }) => {
  const wallet = useWallet();

  const { connection } = useConnection();

  return (
    <ThirdwebSDKProvider wallet={wallet} connection={connection}>
      {children}
    </ThirdwebSDKProvider>
  );
};
