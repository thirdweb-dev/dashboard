import {
  ContextSelector,
  createContext,
  useContextSelector,
} from "@fluentui/react-context-selector";
import {
  CollectionMetadata,
  CollectionModule,
  ModuleMetadata,
  ModuleType,
  NFTLabsSDK,
  uploadMetadata,
} from "@nftlabs/sdk";
import { NFTCollection__factory } from "@nftlabs/sdk/contract-interfaces";
import { AnalyticsEvents } from "constants/analytics";
import { ethers } from "ethers";
import { useCachedState } from "hooks/useCachedState";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { useRouter } from "next/router";
import posthog from "posthog-js";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { NFTCollectionContractInput } from "schema/contracts";
import invariant from "ts-invariant";
import { ISafeProviderContext } from "utils/context";
import { IControlContractWithActive } from "utils/ControlContract";
import { safeyfyMetadata } from "utils/ipfs";
import { wait } from "utils/promise";
import { useAppModule, useSDK } from "../sdk-context";
import { useAppContext } from "./app-context";

interface ICollectionContext extends ISafeProviderContext {
  collections: IControlContractWithActive[];
  isLoading?: boolean;
  deploy: (
    metadata: NFTCollectionContractInput,
    noRedirect?: any,
  ) => Promise<string>;
  error?: Error | null;
}

const CollectionContext = createContext<ICollectionContext>(
  {} as ICollectionContext,
);

export const useCollectionContext = <T,>(
  selector: ContextSelector<ICollectionContext, T>,
) => {
  invariant(
    useContextSelector(CollectionContext, (c) => c._inProvider),
    `called "useSelectCollectionContext" from outside <CollectionContextProvider>`,
  );
  return useContextSelector(CollectionContext, selector);
};

export const CollectionContextProvider: React.FC = ({ children }) => {
  const activeAppAddress = useAppContext((c) => c.activeApp?.address);
  const appModule = useAppModule(activeAppAddress);

  const sdk = useSDK();
  const router = useRouter();

  const _address = useSingleQueryParam("collection");

  const [__module, setModule] = useCachedState<ModuleMetadata[]>(
    `${activeAppAddress}_collection_modules`,
    [],
  );
  const collections: IControlContractWithActive[] = useMemo(() => {
    return (
      __module?.map((n) => ({
        ...n,
        isActive: n.address === _address,
      })) || []
    );
  }, [__module, _address]);

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
        const _module = await appModule.getCollectionModules();
        if (!isMounted.current) {
          return;
        }
        setModule(_module);
        setError(null);
        setIsLoading(false);
        return _module;
      } catch (err) {
        console.error("useCollectionModulesForActiveApp() error -", err);
        if (!isMounted.current) {
          return;
        }
        setError(err as Error);
        await wait(errBackOff);
        return await refresh(Math.min(errBackOff + 500, 3000));
      }
    },
    [appModule, setModule],
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
    async (metadata: NFTCollectionContractInput, noRedirect = false) => {
      invariant(
        activeAppAddress,
        "[CollectionModule:deploy] - attempting to deploy NFT module without an active app",
      );
      invariant(
        sdk,
        "[CollectionModule:deploy] - attempting to deploy NFT module without SDK",
      );
      const signer = sdk.signer;
      invariant(
        signer,
        "[CollectionModule:deploy] - attempting to deploy NFT module without signer",
      );
      invariant(
        appModule?.contract,
        "[CollectionModule:deploy] - attempting to deploy NFT module without active appModule to add to",
      );
      const forwarderAddr = await sdk.getForwarderAddress();

      console.log("[CollectionModule:deploy] - uploading metadata", metadata);
      const contractURI = await uploadMetadata(await safeyfyMetadata(metadata));
      const gasPrice = await sdk.getGasPrice();
      const txOpts = gasPrice
        ? { gasPrice: ethers.utils.parseUnits(gasPrice.toString(), "gwei") }
        : {};

      console.log(
        "[CollectionModule:deploy] - starting contract deploy",
        metadata,
      );
      const tx = await new ethers.ContractFactory(
        NFTCollection__factory.abi,
        NFTCollection__factory.bytecode,
      )
        .connect(signer)
        .deploy(activeAppAddress, forwarderAddr, contractURI, txOpts);

      console.log("[CollectionModule:deploy] - deploying contract", tx);
      await tx.deployed();
      const contractAddress = tx.address;
      console.log("[CollectionModule:deploy] - contract deployed", {
        contractAddress,
      });

      console.log("[CollectionModule:deploy] - starting to add module to app", {
        contractAddress,
        activeAppAddress,
      });
      const addModuleTx = await appModule.contract.addModule(
        contractAddress,
        ModuleType.COLLECTION,
        txOpts,
      );
      console.log("[CollectionModule:deploy] - adding module", addModuleTx);
      await addModuleTx.wait();
      console.log("[CollectionModule:deploy] - module added", addModuleTx);
      console.log(
        "[CollectionModule:deploy] - refreshing module list",
        addModuleTx,
      );
      const refreshedList = await refresh();
      if (refreshedList) {
        setModule(refreshedList);
      }
      console.log(
        "[CollectionModule:deploy] - module list refreshed",
        refreshedList,
      );

      // if the user asked not to redirect, then don't
      if (noRedirect) {
        console.log("[CollectionModule:deploy] - redirect disabled", {
          noRedirect,
        });
        return contractAddress;
      }
      const redirectUrl = `/dashboard/${activeAppAddress}/collection/${contractAddress}`;
      console.log("[CollectionModule:deploy] - redirecting to module", {
        redirectUrl,
      });

      posthog.capture(AnalyticsEvents.DeploymentEvents.NftCollectionModule, {
        contractAddress,
        appAddress: activeAppAddress,
        uri: contractURI,
      });

      router.push(redirectUrl);
      return contractAddress;
    },
    [activeAppAddress, sdk, appModule, refresh, router, setModule],
  );
  return (
    <CollectionContext.Provider
      value={{
        _inProvider: true,
        collections,
        isLoading,
        deploy,
        error,
      }}
    >
      <ActiveCollectionModuleContextProvider sdk={sdk} modules={collections}>
        {children}
      </ActiveCollectionModuleContextProvider>
    </CollectionContext.Provider>
  );
};

interface IActiveCollectionModuleContext extends ISafeProviderContext {
  address?: ModuleMetadata["address"];
  metadata?: ModuleMetadata["metadata"];
  module?: CollectionModule;
  items: CollectionMetadata[];
  isLoading: boolean;
  refresh: () => Promise<void>;
}

const ActiveCollectionModuleContext =
  createContext<IActiveCollectionModuleContext>(
    {} as IActiveCollectionModuleContext,
  );

export const useActiveCollectionModule = <T,>(
  selector: ContextSelector<IActiveCollectionModuleContext, T>,
) => {
  invariant(
    useContextSelector(ActiveCollectionModuleContext, (c) => c._inProvider),
    `called "useActiveCollectionModule" from outside <ActiveCollectionModuleContextProvider>`,
  );
  return useContextSelector(ActiveCollectionModuleContext, selector);
};

interface IActiveCollectionModuleContextProvider {
  sdk?: NFTLabsSDK;
  modules?: IControlContractWithActive[];
}

const ActiveCollectionModuleContextProvider: React.FC<IActiveCollectionModuleContextProvider> =
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
        return sdk.getCollectionModule(address);
      }
      return undefined;
    }, [address, sdk]);

    const [_items, setItems] = useCachedState<CollectionMetadata[]>(
      address,
      [],
    );
    const [isLoading, setIsLoading] = useState(false);

    const items = _items || [];

    // function to update items
    const refresh = useCallback(async () => {
      if (!module) {
        return;
      }
      setIsLoading(true);
      const __items = await module.getAll();
      setItems(__items);
      setIsLoading(false);
    }, [module, setItems]);

    const hasLoaded = useRef(false);
    useEffect(() => {
      if (!hasLoaded.current && module) {
        hasLoaded.current = true;
        refresh();
      }
    }, [module, refresh]);

    return (
      <ActiveCollectionModuleContext.Provider
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
      </ActiveCollectionModuleContext.Provider>
    );
  };
