import {
  ContextSelector,
  createContext,
  useContextSelector,
} from "@fluentui/react-context-selector";
import {
  MarketModule,
  ModuleMetadata,
  ModuleType,
  NFTLabsSDK,
  uploadMetadata,
} from "@nftlabs/sdk";
import { Market__factory } from "@nftlabs/sdk/contract-interfaces";
import { AnalyticsEvents } from "constants/analytics";
import { ethers } from "ethers";
import { useCachedState } from "hooks/useCachedState";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { useRouter } from "next/router";
import posthog from "posthog-js";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MarketContractInput } from "schema/contracts";
import invariant from "ts-invariant";
import { ISafeProviderContext } from "utils/context";
import { IControlContractWithActive } from "utils/ControlContract";
import { safeyfyMetadata } from "utils/ipfs";
import { wait } from "utils/promise";
import { useAppModule, useSDK } from "../sdk-context";
import { useAppContext } from "./app-context";

interface IMarketContext extends ISafeProviderContext {
  markets: IControlContractWithActive[];
  isLoading?: boolean;
  deploy: (metadata: MarketContractInput, noRedirect?: any) => Promise<string>;
  error?: Error | null;
}

const MarketContext = createContext<IMarketContext>({} as IMarketContext);

export const useMarketContext = <T,>(
  selector: ContextSelector<IMarketContext, T>,
) => {
  invariant(
    useContextSelector(MarketContext, (c) => c._inProvider),
    `called "useSelectmarketContext" from outside <marketContextProvider>`,
  );
  return useContextSelector(MarketContext, selector);
};

export const MarketContextProvider: React.FC = ({ children }) => {
  const activeAppAddress = useAppContext((c) => c.activeApp?.address);
  const appModule = useAppModule(activeAppAddress);
  const _address = useSingleQueryParam("market");
  const sdk = useSDK();

  const router = useRouter();

  const [__markets, setMarkets] = useCachedState<ModuleMetadata[]>(
    `${activeAppAddress}_market_modules`,
    [],
  );

  const markets: IControlContractWithActive[] = useMemo(() => {
    return (
      __markets?.map((n) => ({
        ...n,
        isActive: n.address === _address,
      })) || []
    );
  }, [__markets, _address]);

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
      if (isMounted.current) {
        setIsLoading(true);
      }

      try {
        const _markets = await appModule.getMarketModules();

        if (!isMounted.current) {
          return;
        }

        setMarkets(_markets);
        setError(null);
        setIsLoading(false);

        return _markets;
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
    [appModule, setMarkets],
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
    async (metadata: MarketContractInput, noRedirect = false) => {
      invariant(
        activeAppAddress,
        "[MarketModule:deploy] - attempting to deploy Market module without an active app",
      );
      invariant(
        sdk,
        "[MarketModule:deploy] - attempting to deploy Market module without SDK",
      );
      const signer = sdk.signer;
      invariant(
        signer,
        "[MarketModule:deploy] - attempting to deploy Market module without signer",
      );
      invariant(
        appModule?.contract,
        "[MarketModule:deploy] - attempting to deploy Market module without active appModule to add to",
      );
      const forwarderAddr = await sdk.getForwarderAddress();

      console.log("[MarketModule:deploy] - uploading metadata", metadata);
      const contractURI = await uploadMetadata(await safeyfyMetadata(metadata));
      const gasPrice = await sdk.getGasPrice();
      const txOpts = gasPrice
        ? { gasPrice: ethers.utils.parseUnits(gasPrice.toString(), "gwei") }
        : {};
      console.log("[MarketModule:deploy] - starting contract deploy", metadata);
      const tx = await new ethers.ContractFactory(
        Market__factory.abi,
        Market__factory.bytecode,
      )
        .connect(signer)
        .deploy(activeAppAddress, forwarderAddr, contractURI, txOpts);

      console.log("[MarketModule:deploy] - deploying contract", tx);
      await tx.deployed();
      const contractAddress = tx.address;
      console.log("[MarketModule:deploy] - contract deployed", {
        contractAddress,
      });

      console.log("[MarketModule:deploy] - starting to add module to app", {
        contractAddress,
        activeAppAddress,
      });
      const addModuleTx = await appModule.contract.addModule(
        contractAddress,
        ModuleType.MARKET,
        txOpts,
      );
      console.log("[MarketModule:deploy] - adding module", addModuleTx);
      await addModuleTx.wait();
      console.log("[MarketModule:deploy] - module added", addModuleTx);
      console.log(
        "[MarketModule:deploy] - refreshing module list",
        addModuleTx,
      );
      const refreshedList = await refresh();
      if (refreshedList) {
        setMarkets(refreshedList);
      }
      console.log(
        "[MarketModule:deploy] - module list refreshed",
        refreshedList,
      );

      // if the user asked not to redirect, then don't
      if (noRedirect) {
        console.log("[MarketModule:deploy] - redirect disabled", {
          noRedirect,
        });
        return contractAddress;
      }
      const redirectUrl = `/dashboard/${activeAppAddress}/market/${contractAddress}`;
      console.log("[MarketModule:deploy] - redirecting to module", {
        redirectUrl,
      });

      posthog.capture(AnalyticsEvents.DeploymentEvents.MarketModule, {
        contractAddress,
        appAddress: activeAppAddress,
        uri: contractURI,
      });

      router.push(redirectUrl);
      return contractAddress;
    },
    [activeAppAddress, sdk, appModule, refresh, router, setMarkets],
  );

  return (
    <MarketContext.Provider
      value={{
        _inProvider: true,
        markets,
        isLoading,
        deploy,
        error,
      }}
    >
      <ActiveMarketModuleContextProvider sdk={sdk} modules={markets}>
        {children}
      </ActiveMarketModuleContextProvider>
    </MarketContext.Provider>
  );
};

interface IActiveMarketModuleContext extends ISafeProviderContext {
  address?: ModuleMetadata["address"];
  metadata?: ModuleMetadata["metadata"];
  module?: MarketModule;
  items: unknown[];
  isLoading: boolean;
  refresh: () => Promise<void>;
}

const ActiveMarketModuleContext = createContext<IActiveMarketModuleContext>(
  {} as IActiveMarketModuleContext,
);

export const useActiveMarketModule = <T,>(
  selector: ContextSelector<IActiveMarketModuleContext, T>,
) => {
  invariant(
    useContextSelector(ActiveMarketModuleContext, (c) => c._inProvider),
    `called "useActiveMarketModule" from outside <ActiveMarketModuleContextProvider>`,
  );
  return useContextSelector(ActiveMarketModuleContext, selector);
};

interface IActiveMarketModuleContextProvider {
  sdk?: NFTLabsSDK;
  modules?: IControlContractWithActive[];
}

const ActiveMarketModuleContextProvider: React.FC<IActiveMarketModuleContextProvider> =
  ({ sdk, modules, children }) => {
    const _controlContract = useMemo(() => {
      if (!modules) {
        return undefined;
      }
      return modules.find((pack) => pack.isActive);
    }, [modules]);

    const metadata = _controlContract?.metadata;
    const address = _controlContract?.address;

    const module = useMemo(() => {
      if (address && sdk) {
        return sdk.getMarketModule(address);
      }
      return undefined;
    }, [address, sdk]);

    const [_items, setItems] = useCachedState<unknown[]>(address, []);
    const [isLoading, setIsLoading] = useState(false);

    const items = _items || [];

    // function to update items
    const refresh = useCallback(async () => {
      if (!module) {
        return;
      }
      setIsLoading(true);
      const __items = await module.getAllListings();
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
      <ActiveMarketModuleContext.Provider
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
      </ActiveMarketModuleContext.Provider>
    );
  };
