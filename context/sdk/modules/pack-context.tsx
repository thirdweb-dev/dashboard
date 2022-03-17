import {
  ContextSelector,
  createContext,
  useContextSelector,
} from "@fluentui/react-context-selector";
import {
  ChainlinkVrf,
  ModuleMetadata,
  ModuleType,
  NFTLabsSDK,
  PackMetadata,
  PackModule,
  uploadMetadata,
} from "@nftlabs/sdk";
import { Pack__factory } from "@nftlabs/sdk/contract-interfaces";
import { useEthers } from "@usedapp/core";
import { AnalyticsEvents } from "constants/analytics";
import { ethers } from "ethers";
import { useCachedState } from "hooks/useCachedState";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { useRouter } from "next/router";
import posthog from "posthog-js";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PackContractInput } from "schema/contracts";
import invariant from "ts-invariant";
import { ISafeProviderContext } from "utils/context";
import { IControlContractWithActive } from "utils/ControlContract";
import { safeyfyMetadata } from "utils/ipfs";
import { wait } from "utils/promise";
import { useAppModule, useSDK } from "../sdk-context";
import { useAppContext } from "./app-context";

interface IPackContext extends ISafeProviderContext {
  packs: IControlContractWithActive[];
  isLoading?: boolean;
  deploy: (metadata: PackContractInput, noRedirect?: any) => Promise<string>;
  error?: Error | null;
}

const PackContext = createContext<IPackContext>({} as IPackContext);

export const usePackContext = <T,>(
  selector: ContextSelector<IPackContext, T>,
) => {
  invariant(
    useContextSelector(PackContext, (c) => c._inProvider),
    `called "useSelectPackContext" from outside <PackContextProvider>`,
  );
  return useContextSelector(PackContext, selector);
};

export const PackContextProvider: React.FC = ({ children }) => {
  const activeAppAddress = useAppContext((c) => c.activeApp?.address);
  const appModule = useAppModule(activeAppAddress);
  const _address = useSingleQueryParam("pack");
  const sdk = useSDK();
  const router = useRouter();
  const { chainId } = useEthers();

  const [__packs, setPacks] = useCachedState<ModuleMetadata[]>(
    `${activeAppAddress}_pack_modules`,
    [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const packs: IControlContractWithActive[] = useMemo(() => {
    return (
      __packs?.map((n) => ({
        ...n,
        isActive: n.address === _address,
      })) || []
    );
  }, [__packs, _address]);

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
        const _packs = await appModule.getPackModules();
        if (!isMounted.current) {
          return;
        }
        setPacks(_packs);
        setError(null);
        setIsLoading(false);

        return _packs;
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
    [appModule, setPacks],
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
    async (metadata: PackContractInput, noRedirect = false) => {
      invariant(
        activeAppAddress,
        "[PackModule:deploy] - attempting to deploy Pack module without an active app",
      );
      invariant(
        sdk,
        "[PackModule:deploy] - attempting to deploy Pack module without SDK",
      );
      const signer = sdk.signer;
      invariant(
        signer,
        "[PackModule:deploy] - attempting to deploy Pack module without signer",
      );
      invariant(
        appModule?.contract,
        "[PackModule:deploy] - attempting to deploy Pack module without active appModule to add to",
      );
      const forwarderAddr = await sdk.getForwarderAddress();

      console.log("[PackModule:deploy] - uploading metadata", metadata);
      const contractURI = await uploadMetadata(await safeyfyMetadata(metadata));
      const gasPrice = await sdk.getGasPrice();
      const txOpts = gasPrice
        ? { gasPrice: ethers.utils.parseUnits(gasPrice.toString(), "gwei") }
        : {};
      const { vrfCoordinator, linkTokenAddress, keyHash, fees } =
        ChainlinkVrf[chainId as keyof typeof ChainlinkVrf];

      console.log("[PackModule:deploy] - starting contract deploy", metadata);
      const tx = await new ethers.ContractFactory(
        Pack__factory.abi,
        Pack__factory.bytecode,
      )
        .connect(signer)
        .deploy(
          activeAppAddress,
          contractURI,
          vrfCoordinator,
          linkTokenAddress,
          keyHash,
          fees,
          forwarderAddr,
          txOpts,
        );

      console.log("[PackModule:deploy] - deploying contract", tx);
      await tx.deployed();
      const contractAddress = tx.address;
      console.log("[PackModule:deploy] - contract deployed", {
        contractAddress,
      });

      console.log("[PackModule:deploy] - starting to add module to app", {
        contractAddress,
        activeAppAddress,
      });
      const addModuleTx = await appModule.contract.addModule(
        contractAddress,
        ModuleType.PACK,
        txOpts,
      );
      console.log("[PackModule:deploy] - adding module", addModuleTx);
      await addModuleTx.wait();
      console.log("[PackModule:deploy] - module added", addModuleTx);
      console.log("[PackModule:deploy] - refreshing module list", addModuleTx);
      const refreshedList = await refresh();
      if (refreshedList) {
        setPacks(refreshedList);
      }
      console.log("[PackModule:deploy] - module list refreshed", refreshedList);

      // if the user asked not to redirect, then don't
      if (noRedirect) {
        console.log("[PackModule:deploy] - redirect disabled", { noRedirect });
        return contractAddress;
      }
      const redirectUrl = `/dashboard/${activeAppAddress}/pack/${contractAddress}`;
      console.log("[PackModule:deploy] - redirecting to module", {
        redirectUrl,
      });

      posthog.capture(AnalyticsEvents.DeploymentEvents.PackModule, {
        contractAddress,
        appAddress: activeAppAddress,
        uri: contractURI,
      });

      router.push(redirectUrl);
      return contractAddress;
    },
    [activeAppAddress, sdk, appModule, chainId, refresh, router, setPacks],
  );

  return (
    <PackContext.Provider
      value={{
        _inProvider: true,
        packs,
        isLoading,
        deploy,
        error,
      }}
    >
      <ActivePackModuleContextProvider sdk={sdk} modules={packs}>
        {children}
      </ActivePackModuleContextProvider>
    </PackContext.Provider>
  );
};

interface IActivePackModuleContext extends ISafeProviderContext {
  address?: ModuleMetadata["address"];
  metadata?: ModuleMetadata["metadata"];
  module?: PackModule;
  items: PackMetadata[];
  isLoading: boolean;
  refresh: () => Promise<void>;
}

const ActivePackModuleContext = createContext<IActivePackModuleContext>(
  {} as IActivePackModuleContext,
);

export const useActivePackModule = <T,>(
  selector: ContextSelector<IActivePackModuleContext, T>,
) => {
  invariant(
    useContextSelector(ActivePackModuleContext, (c) => c._inProvider),
    `called "useActivePackModule" from outside <ActivePackModuleContextProvider>`,
  );
  return useContextSelector(ActivePackModuleContext, selector);
};

interface IActivePackModuleContextProvider {
  sdk?: NFTLabsSDK;
  modules?: IControlContractWithActive[];
}

const ActivePackModuleContextProvider: React.FC<IActivePackModuleContextProvider> =
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
        return sdk.getPackModule(address);
      }
      return undefined;
    }, [address, sdk]);

    const [_items, setItems] = useCachedState<PackMetadata[]>(address, []);
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
      <ActivePackModuleContext.Provider
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
      </ActivePackModuleContext.Provider>
    );
  };
