import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { Signer } from "ethers";
import { useSingleQueryParam } from "hooks/useQueryParam";
import posthog from "posthog-js";
import { createContext, useEffect, useMemo, useState } from "react";
import {
  getChainIdFromNetwork,
  SupportedChainId,
  SupportedNetwork,
} from "utils/network";

interface ISDKContext {
  sdk?: ThirdwebSDK;
  activeChainId?: SupportedChainId;
  _inProvider: boolean;
}

export const ThirdwebSDKContext = createContext<ISDKContext>({
  activeChainId: undefined,
  _inProvider: false,
});

export const alchemyUrlMap: Record<SupportedChainId, string> = {
  [SupportedChainId.Mainnet]: `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
  [SupportedChainId.Rinkeby]: `https://eth-rinkeby.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
  [SupportedChainId.Fantom]: "https://rpc.ftm.tools",
  [SupportedChainId.Avalanche]: "https://api.avax.network/ext/bc/C/rpc",
  [SupportedChainId.Polygon]: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
  [SupportedChainId.Mumbai]: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
};

export const ThirdwebSDKProvider: React.FC = ({ children }) => {
  const { provider, chainId, address } = useWeb3();
  const networkFromUrl = useSingleQueryParam<SupportedNetwork>("network");
  const [activeChainId, setActiveChainId] = useState<
    SupportedChainId | undefined
  >(getChainIdFromNetwork(networkFromUrl));

  // temprarily here, to identify user on every page
  useEffect(() => {
    if (address && posthog.get_distinct_id() !== address) {
      posthog.identify(address, {
        chainId,
        name: address,
      });
    }
  }, [address, chainId]);

  useEffect(() => {
    const cId = getChainIdFromNetwork(networkFromUrl);
    if (cId || chainId) {
      setActiveChainId(cId || chainId);
    } else {
      setActiveChainId(undefined);
    }
  }, [networkFromUrl, chainId]);
  const signer: Signer | undefined = useMemo(() => {
    if (!provider) {
      return undefined;
    }
    const s = provider.getSigner();
    return Signer.isSigner(s) ? s : undefined;
  }, [provider]);

  const [sdk, setSDK] = useState<ThirdwebSDK | undefined>(undefined);

  useEffect(() => {
    if (activeChainId) {
      const _sdk = new ThirdwebSDK(alchemyUrlMap[activeChainId], {
        maxGasPriceInGwei: 650,
        ipfsGatewayUrl: process.env.NEXT_PUBLIC_IPFS_GATEWAY_URL,
        readOnlyRpcUrl: alchemyUrlMap[activeChainId],
      });
      // TODO maybe this should be available on the SDK itself
      (_sdk as any)._chainId = activeChainId;
      setSDK(_sdk);
    } else {
      setSDK(undefined);
    }
  }, [activeChainId]);

  useEffect(() => {
    const networkMismatch =
      chainId && activeChainId && chainId !== activeChainId;
    if (sdk && signer && !networkMismatch) {
      sdk.setProviderOrSigner(signer);
    } else if (activeChainId && sdk) {
      sdk?.setProviderOrSigner(alchemyUrlMap[activeChainId]);
    } else {
      sdk?.setProviderOrSigner(undefined as any);
    }
  }, [activeChainId, chainId, sdk, signer]);
  return (
    <ThirdwebSDKContext.Provider
      value={{ _inProvider: true, sdk, activeChainId }}
    >
      {children}
    </ThirdwebSDKContext.Provider>
  );
};
