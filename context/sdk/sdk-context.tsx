import { IAppModule, JSONValue, NFTLabsSDK } from "@nftlabs/sdk";
import { ChainId, useEthers } from "@usedapp/core";
import { ChainIdExt } from "constants/networks";
import { ContractReceipt, Signer } from "ethers";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { invariant } from "ts-invariant";

interface ISDKContext {
  sdk?: NFTLabsSDK;
  _inProvider: boolean;
  getApps: () => Promise<IAppModule[] | undefined>;
  createApp: (
    data: string | Record<string, JSONValue>,
  ) => Promise<ContractReceipt | undefined>;
}

const SDKContext = createContext<ISDKContext>({
  _inProvider: false,
} as ISDKContext);

const aclhemyUrlKeyMap: Record<number, string> = {
  [ChainId.Rinkeby]:
    "https://eth-rinkeby.g.alchemy.com/v2/yKSE5Q7wga0glvg5NXxUzmfAAVUYeUPR",
  [ChainIdExt.Fantom]: "https://rpc.ftm.tools",
  [ChainIdExt.Avalanche]: "https://api.avax.network/ext/bc/C/rpc",
  [ChainId.Polygon]:
    "https://polygon-mainnet.g.alchemy.com/v2/yKSE5Q7wga0glvg5NXxUzmfAAVUYeUPR",
  [ChainId.Mumbai]:
    "https://polygon-mumbai.g.alchemy.com/v2/yKSE5Q7wga0glvg5NXxUzmfAAVUYeUPR",
};

export const SDKProvider: React.FC = ({ children }) => {
  const { library, chainId } = useEthers();

  const signer: Signer | undefined = useMemo(() => {
    if (!library) {
      return undefined;
    }
    const s = library.getSigner();
    return Signer.isSigner(s) ? s : undefined;
  }, [library]);

  const [sdk, setSDK] = useState<NFTLabsSDK | undefined>(undefined);

  useEffect(() => {
    if (!chainId) {
      return;
    }
    const _sdk = new NFTLabsSDK(aclhemyUrlKeyMap[chainId], {
      ipfsGatewayUrl: process.env.NEXT_PUBLIC_IPFS_GATEWAY_URL,
    });

    setSDK(_sdk);

    (window as any).__sdk = _sdk;
  }, [chainId]);

  useEffect(() => {
    if (sdk && signer) {
      sdk.setProviderOrSigner(signer);
    }
  }, [sdk, signer]);

  const getApps = useCallback(async () => {
    return await sdk?.getApps();
  }, [sdk]);

  const createApp = useCallback(
    async (data: string | Record<string, JSONValue>) => {
      return await sdk?.createApp(data);
    },
    [sdk],
  );

  return (
    <SDKContext.Provider value={{ _inProvider: true, sdk, getApps, createApp }}>
      {children}
    </SDKContext.Provider>
  );
};

export function useSDK(): NFTLabsSDK | undefined {
  const { _inProvider, sdk } = useContext(SDKContext);
  invariant(_inProvider, "Attempting to access sdk from outside provider");
  return sdk;
}

export function useAppModule(controlAddress?: string) {
  const sdk = useSDK();
  return useMemo(() => {
    if (!sdk || !controlAddress) {
      return undefined;
    }
    return sdk.getAppModule(controlAddress);
  }, [controlAddress, sdk]);
}

export function useNFTModule(address?: string) {
  const sdk = useSDK();
  return useMemo(() => {
    if (!sdk || !address) {
      return undefined;
    }

    return sdk.getNFTModule(address);
  }, [address, sdk]);
}

export function useCollectionModule(address?: string) {
  const sdk = useSDK();
  return useMemo(() => {
    if (!sdk || !address) {
      return undefined;
    }

    return sdk.getCollectionModule(address);
  }, [address, sdk]);
}
