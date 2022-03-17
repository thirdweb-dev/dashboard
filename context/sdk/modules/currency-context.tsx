import {
  ContextSelector,
  createContext,
  useContextSelector,
} from "@fluentui/react-context-selector";
import {
  Currency,
  CurrencyModule,
  ModuleMetadata,
  ModuleType,
  NFTLabsSDK,
  uploadMetadata,
} from "@nftlabs/sdk";
import { Coin__factory } from "@nftlabs/sdk/contract-interfaces";
import { AnalyticsEvents } from "constants/analytics";
import { BigNumber, ethers } from "ethers";
import { useCachedState } from "hooks/useCachedState";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { useRouter } from "next/router";
import posthog from "posthog-js";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CoinContractInput } from "schema/contracts";
import invariant from "ts-invariant";
import { ISafeProviderContext } from "utils/context";
import { IControlContractWithActive } from "utils/ControlContract";
import { safeyfyMetadata } from "utils/ipfs";
import { wait } from "utils/promise";
import { useAppModule, useSDK } from "../sdk-context";
import { useAppContext } from "./app-context";

interface CurrencyWithSupply extends Currency {
  totalSupply: BigNumber;
}

interface ICurrencyContext extends ISafeProviderContext {
  currencies: IControlContractWithActive[];
  isLoading?: boolean;
  deploy: (metadata: CoinContractInput, noRedirect?: any) => Promise<string>;
  error?: Error | null;
}

const CurrencyContext = createContext<ICurrencyContext>({} as ICurrencyContext);

export const useCurrencyContext = <T,>(
  selector: ContextSelector<ICurrencyContext, T>,
) => {
  invariant(
    useContextSelector(CurrencyContext, (c) => c._inProvider),
    `called "useSelectCurrencyContext" from outside <CurrencyContextProvider>`,
  );
  return useContextSelector(CurrencyContext, selector);
};

export const CurrencyContextProvider: React.FC = ({ children }) => {
  const activeAppAddress = useAppContext((c) => c.activeApp?.address);
  const appModule = useAppModule(activeAppAddress);

  const sdk = useSDK();
  const router = useRouter();

  const _address = useSingleQueryParam("currency");

  const [__module, setModule] = useCachedState<ModuleMetadata[]>(
    `${activeAppAddress}_currency_modules`,
    [],
  );
  const currencies: IControlContractWithActive[] = useMemo(() => {
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
        const _module = await appModule.getCurrencyModules();
        if (!isMounted.current) {
          return;
        }
        setModule(_module);
        setError(null);
        setIsLoading(false);
        return _module;
      } catch (err) {
        console.error("useCurrencyModulesForActiveApp() error -", err);
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
    async (metadata: CoinContractInput, noRedirect = false) => {
      invariant(
        activeAppAddress,
        "[CurrencyModule:deploy] - attempting to deploy NFT module without an active app",
      );
      invariant(
        sdk,
        "[CurrencyModule:deploy] - attempting to deploy NFT module without SDK",
      );
      const signer = sdk.signer;
      invariant(
        signer,
        "[CurrencyModule:deploy] - attempting to deploy NFT module without signer",
      );
      invariant(
        appModule?.contract,
        "[CurrencyModule:deploy] - attempting to deploy NFT module without active appModule to add to",
      );
      const forwarderAddr = await sdk.getForwarderAddress();

      console.log("[CurrencyModule:deploy] - uploading metadata", metadata);
      const contractURI = await uploadMetadata(await safeyfyMetadata(metadata));
      const gasPrice = await sdk.getGasPrice();
      const txOpts = gasPrice
        ? { gasPrice: ethers.utils.parseUnits(gasPrice.toString(), "gwei") }
        : {};

      const name = metadata?.name || "";
      const symbol = metadata?.symbol || "";

      console.log(
        "[CurrencyModule:deploy] - starting contract deploy",
        metadata,
      );
      const tx = await new ethers.ContractFactory(
        Coin__factory.abi,
        Coin__factory.bytecode,
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

      console.log("[CurrencyModule:deploy] - deploying contract", tx);
      await tx.deployed();
      const contractAddress = tx.address;
      console.log("[CurrencyModule:deploy] - contract deployed", {
        contractAddress,
      });

      console.log("[CurrencyModule:deploy] - starting to add module to app", {
        contractAddress,
        activeAppAddress,
      });
      const addModuleTx = await appModule.contract.addModule(
        contractAddress,
        ModuleType.CURRENCY,
        txOpts,
      );
      console.log("[CurrencyModule:deploy] - adding module", addModuleTx);
      await addModuleTx.wait();
      console.log("[CurrencyModule:deploy] - module added", addModuleTx);
      console.log(
        "[CurrencyModule:deploy] - refreshing module list",
        addModuleTx,
      );
      const refreshedList = await refresh();
      if (refreshedList) {
        setModule(refreshedList);
      }
      console.log(
        "[CurrencyModule:deploy] - module list refreshed",
        refreshedList,
      );

      // if the user asked not to redirect, then don't
      if (noRedirect) {
        console.log("[CurrencyModule:deploy] - redirect disabled", {
          noRedirect,
        });
        return contractAddress;
      }
      const redirectUrl = `/dashboard/${activeAppAddress}/currency/${contractAddress}`;
      console.log("[CurrencyModule:deploy] - redirecting to module", {
        redirectUrl,
      });

      posthog.capture(AnalyticsEvents.DeploymentEvents.CurrencyModule, {
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
    <CurrencyContext.Provider
      value={{
        _inProvider: true,
        currencies,
        isLoading,
        deploy,
        error,
      }}
    >
      <ActiveCurrencyModuleContextProvider sdk={sdk} modules={currencies}>
        {children}
      </ActiveCurrencyModuleContextProvider>
    </CurrencyContext.Provider>
  );
};

interface IActiveCurrencyModuleContext extends ISafeProviderContext {
  address?: ModuleMetadata["address"];
  metadata?: ModuleMetadata["metadata"];
  module?: CurrencyModule;
  items: CurrencyWithSupply[];
  isLoading: boolean;
  refresh: () => Promise<void>;
}

const ActiveCurrencyModuleContext = createContext<IActiveCurrencyModuleContext>(
  {} as IActiveCurrencyModuleContext,
);

export const useActiveCurrencyModule = <T,>(
  selector: ContextSelector<IActiveCurrencyModuleContext, T>,
) => {
  invariant(
    useContextSelector(ActiveCurrencyModuleContext, (c) => c._inProvider),
    `called "useActiveCurrencyModule" from outside <ActiveCurrencyModuleContextProvider>`,
  );
  return useContextSelector(ActiveCurrencyModuleContext, selector);
};

interface IActiveCurrencyModuleContextProvider {
  sdk?: NFTLabsSDK;
  modules?: IControlContractWithActive[];
}

const ActiveCurrencyModuleContextProvider: React.FC<IActiveCurrencyModuleContextProvider> =
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
        return sdk.getCurrencyModule(address);
      }
      return undefined;
    }, [address, sdk]);

    const [_items, setItems] = useCachedState<CurrencyWithSupply[]>(
      address,
      [],
    );
    const [isLoading, setIsLoading] = useState(false);

    const items: CurrencyWithSupply[] = _items || [];

    // function to update items
    const refresh = useCallback(async () => {
      if (!module) {
        return;
      }
      setIsLoading(true);
      const __items = (await module.get()) as CurrencyWithSupply;
      __items.totalSupply = await module.totalSupply();
      setItems([__items]);
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
      <ActiveCurrencyModuleContext.Provider
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
      </ActiveCurrencyModuleContext.Provider>
    );
  };
