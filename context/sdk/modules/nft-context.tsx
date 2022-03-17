import {
  ContextSelector,
  createContext,
  useContextSelector,
} from "@fluentui/react-context-selector";
import {
  ModuleMetadata,
  ModuleType,
  NFTLabsSDK,
  NFTMetadataOwner,
  NFTModule,
  uploadMetadata,
} from "@nftlabs/sdk";
import { NFT__factory } from "@nftlabs/sdk/contract-interfaces";
import { AnalyticsEvents } from "constants/analytics";
import { ethers } from "ethers";
import { useCachedState } from "hooks/useCachedState";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { useRouter } from "next/router";
import posthog from "posthog-js";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { NFTContractInput } from "schema/contracts";
import invariant from "ts-invariant";
import { ISafeProviderContext } from "utils/context";
import { IControlContractWithActive } from "utils/ControlContract";
import { safeyfyMetadata } from "utils/ipfs";
import { wait } from "utils/promise";
import { useAppModule, useSDK } from "../sdk-context";
import { useAppContext } from "./app-context";

interface INFTContext extends ISafeProviderContext {
  nfts: IControlContractWithActive[];
  isLoading?: boolean;
  deploy: (metadata: NFTContractInput, noRedirect?: any) => Promise<string>;
  error?: Error | null;
}

const NFTContext = createContext<INFTContext>({} as INFTContext);

export const useNFTContext = <T,>(
  selector: ContextSelector<INFTContext, T>,
) => {
  invariant(
    useContextSelector(NFTContext, (c) => c._inProvider),
    `called "useSelectNFTContext" from outside <NFTContextProvider>`,
  );
  return useContextSelector(NFTContext, selector);
};

export const NFTContextProvider: React.FC = ({ children }) => {
  const activeAppAddress = useAppContext((c) => c.activeApp?.address);
  const appModule = useAppModule(activeAppAddress);

  const sdk = useSDK();
  const router = useRouter();

  const _address = useSingleQueryParam("nft");

  const [__nfts, setNFTs] = useCachedState<ModuleMetadata[]>(
    `${activeAppAddress}_nft_modules`,
    [],
  );
  const nfts: IControlContractWithActive[] = useMemo(() => {
    return (
      __nfts?.map((n) => ({
        ...n,
        isActive: n.address === _address,
      })) || []
    );
  }, [__nfts, _address]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const isMounted = useRef(true);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const refresh: (
    errBackOff?: number,
  ) => Promise<ModuleMetadata[] | undefined> = useCallback(
    async (errBackOff = 500) => {
      if (!appModule) {
        return;
      }
      if (!isMounted.current) {
        return;
      }
      setIsLoading(true);
      try {
        const _nfts = await appModule.getNFTModules();
        if (!isMounted.current) {
          return;
        }
        setNFTs(_nfts);
        setError(null);
        setIsLoading(false);

        return _nfts;
      } catch (err) {
        console.error("useNFTModulesForActiveApp() error -", err);
        if (!isMounted.current) {
          return;
        }
        setError(err as Error);
        await wait(errBackOff);
        return await refresh(Math.min(errBackOff + 500, 3000));
      }
    },
    [appModule, setNFTs],
  );

  // load initially
  const hasLoaded = useRef(false);
  useEffect(() => {
    if (appModule && !isLoading && !hasLoaded.current) {
      hasLoaded.current = true;
      refresh();
    }
  }, [appModule, isLoading, refresh]);

  useEffect(() => {
    if (activeAppAddress) {
      refresh();
    }
  }, [activeAppAddress, refresh]);

  const deploy = useCallback(
    async (metadata: NFTContractInput, noRedirect = false) => {
      invariant(
        activeAppAddress,
        "[NFTModule:deploy] - attempting to deploy NFT module without an active app",
      );
      invariant(
        sdk,
        "[NFTModule:deploy] - attempting to deploy NFT module without SDK",
      );
      const signer = sdk.signer;
      invariant(
        signer,
        "[NFTModule:deploy] - attempting to deploy NFT module without signer",
      );
      invariant(
        appModule?.contract,
        "[NFTModule:deploy] - attempting to deploy NFT module without active appModule to add to",
      );
      const forwarderAddr = await sdk.getForwarderAddress();

      console.log("[NFTModule:deploy] - uploading metadata", metadata);
      const contractURI = await uploadMetadata(await safeyfyMetadata(metadata));
      const gasPrice = await sdk.getGasPrice();
      const txOpts = gasPrice
        ? { gasPrice: ethers.utils.parseUnits(gasPrice.toString(), "gwei") }
        : {};

      const name = metadata?.name || "";
      const symbol = metadata?.symbol || "";

      console.log("[NFTModule:deploy] - starting contract deploy", metadata);
      const tx = await new ethers.ContractFactory(
        NFT__factory.abi,
        NFT__factory.bytecode,
      )
        .connect(signer)
        .deploy(
          activeAppAddress,
          name,
          symbol,
          forwarderAddr,
          contractURI,
          txOpts,
        );

      console.log("[NFTModule:deploy] - deploying contract", tx);
      await tx.deployed();
      const contractAddress = tx.address;
      console.log("[NFTModule:deploy] - contract deployed", {
        contractAddress,
      });

      console.log("[NFTModule:deploy] - starting to add module to app", {
        contractAddress,
        activeAppAddress,
      });
      const addModuleTx = await appModule.contract.addModule(
        contractAddress,
        ModuleType.NFT,
        txOpts,
      );
      console.log("[NFTModule:deploy] - adding module", addModuleTx);
      await addModuleTx.wait();
      console.log("[NFTModule:deploy] - module added", addModuleTx);
      console.log("[NFTModule:deploy] - refreshing module list", addModuleTx);
      const refreshedList = await refresh();
      if (refreshedList) {
        setNFTs(refreshedList);
      }
      console.log("[NFTModule:deploy] - module list refreshed", refreshedList);

      // if the user asked not to redirect, then don't
      if (noRedirect) {
        console.log("[NFTModule:deploy] - redirect disabled", { noRedirect });
        return contractAddress;
      }
      const redirectUrl = `/dashboard/${activeAppAddress}/nft/${contractAddress}`;
      console.log("[NFTModule:deploy] - redirecting to module", {
        redirectUrl,
      });

      posthog.capture(AnalyticsEvents.DeploymentEvents.NftModule, {
        contractAddress,
        appAddress: activeAppAddress,
        uri: contractURI,
      });

      router.push(redirectUrl);
      return contractAddress;
    },
    [activeAppAddress, sdk, appModule, refresh, router, setNFTs],
  );
  return (
    <NFTContext.Provider
      value={{
        _inProvider: true,
        nfts,
        isLoading,
        deploy,
        error,
      }}
    >
      <ActiveNFTModuleContextProvider sdk={sdk} modules={nfts}>
        {children}
      </ActiveNFTModuleContextProvider>
    </NFTContext.Provider>
  );
};

interface IActiveNFTModuleContext extends ISafeProviderContext {
  address?: ModuleMetadata["address"];
  metadata?: ModuleMetadata["metadata"];
  module?: NFTModule;
  items: NFTMetadataOwner[];
  isLoading: boolean;
  refresh: () => Promise<void>;
}

const ActiveNFTModuleContext = createContext<IActiveNFTModuleContext>(
  {} as IActiveNFTModuleContext,
);

export const useActiveNFTModule = <T,>(
  selector: ContextSelector<IActiveNFTModuleContext, T>,
) => {
  invariant(
    useContextSelector(ActiveNFTModuleContext, (c) => c._inProvider),
    `called "useActiveNFTModule" from outside <ActiveNFTModuleContextProvider>`,
  );
  return useContextSelector(ActiveNFTModuleContext, selector);
};

interface IActiveNFTModuleContextProvider {
  sdk?: NFTLabsSDK;
  modules?: IControlContractWithActive[];
}

const ActiveNFTModuleContextProvider: React.FC<IActiveNFTModuleContextProvider> =
  ({ sdk, modules, children }) => {
    const _controlContract = useMemo(() => {
      if (!modules) {
        return undefined;
      }
      return modules.find((nft) => nft.isActive);
    }, [modules]);

    const metadata = _controlContract?.metadata;
    const address = _controlContract?.address;

    const module = useMemo(() => {
      if (address && sdk) {
        return sdk.getNFTModule(address);
      }
      return undefined;
    }, [address, sdk]);

    const [_items, setItems] = useCachedState<NFTMetadataOwner[]>(address, []);
    const [isLoading, setIsLoading] = useState(false);

    const items = _items || [];

    // function to update items
    const refresh = useCallback(async () => {
      if (!module) {
        return;
      }
      setIsLoading(true);
      try {
        const __items = await module.getAllWithOwner();
        setItems(__items);
        setIsLoading(false);
      } catch (err) {
        console.error("nft.getAll failed, err =", err);
      }
    }, [module, setItems]);

    const hasLoaded = useRef(false);
    useEffect(() => {
      if (!hasLoaded.current && module) {
        hasLoaded.current = true;
        refresh();
      }
    }, [module, refresh]);

    return (
      <ActiveNFTModuleContext.Provider
        value={{
          address,
          metadata,
          module,
          items,
          isLoading,
          refresh,
          _inProvider: true,
        }}
      >
        {children}
      </ActiveNFTModuleContext.Provider>
    );
  };
