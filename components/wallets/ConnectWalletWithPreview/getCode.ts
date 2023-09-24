type WalletSetupOptions = {
  imports: string[];
  thirdwebProvider: {
    supportedWallets?: string;
    authConfig?: string;
  };
  smartWalletOptions?: {
    factoryAddress: string;
    gasless: boolean;
  };
  connectWallet: {
    theme?: string;
    btnTitle?: string;
    auth?: string;
    modalTitle?: string;
    switchToActiveChain?: string;
    modalSize?: string;
    modalTitleIconUrl?: string;
    welcomeScreen?: string;
  };
};

export function getCode(options: WalletSetupOptions) {
  let supportedWallets = options.thirdwebProvider.supportedWallets;

  if (options.smartWalletOptions && !supportedWallets) {
    supportedWallets = `[metamaskWallet(), coinbaseWallet(), walletConnect(), rainbowWallet(), trustWallet(), zerionWallet()]`;
  }

  if (options.smartWalletOptions) {
    options.thirdwebProvider.supportedWallets = `${supportedWallets}.map(wallet => smartWallet(wallet, { factoryAddress: "${options.smartWalletOptions.factoryAddress}", gasless: ${options.smartWalletOptions.gasless} }))`;
  }

  return `\
import {
  ThirdwebProvider,
  ConnectWallet
  ${options.imports.length > 0 ? `, ${options.imports.join(",")}` : ""}
} from "@thirdweb-dev/react";


export default function App() {
  return (
    <ThirdwebProvider activeChain="mumbai" clientId="YOUR_CLIENT_ID" ${renderProps(
      options.thirdwebProvider,
    )} >
      <ConnectWallet ${renderProps(options.connectWallet)}   />
    </ThirdwebProvider>
  );
}`;
}
function renderProps(obj: Record<string, string | undefined>) {
  return Object.entries(obj)
    .filter((x) => x[1] !== undefined)
    .map(([key, value]) => {
      return `${key}={${value}}`;
    })
    .join(" ");
}
