import { defaultChains } from "@thirdweb-dev/chains";
import {
  ThirdwebProvider,
  WalletConfig,
  Chain,
  SDKOptions,
  ThirdwebSDKProvider,
} from "@thirdweb-dev/react";
import {
  DASHBOARD_THIRDWEB_CLIENT_ID,
  DASHBOARD_THIRDWEB_SECRET_KEY,
} from "constants/rpc";
import { THIRDWEB_API_HOST, THIRDWEB_DOMAIN } from "constants/urls";
import { useSupportedChain } from "hooks/chains/configureChains";
import { getDashboardChainRpc } from "lib/rpc";
import { StorageSingleton } from "lib/sdk";
import { ComponentWithChildren } from "types/component-with-children";

export const PreviewThirdwebSdkProvider: ComponentWithChildren<{
  desiredChainId?: number;
  options?: SDKOptions;
}> = ({ desiredChainId, options, children }) => {
  return (
    <ThirdwebSDKProvider
      activeChain={desiredChainId}
      supportedChains={defaultChains}
      clientId={DASHBOARD_THIRDWEB_CLIENT_ID}
      secretKey={DASHBOARD_THIRDWEB_SECRET_KEY}
      storageInterface={StorageSingleton}
    >
      {children}
    </ThirdwebSDKProvider>
  );
};
