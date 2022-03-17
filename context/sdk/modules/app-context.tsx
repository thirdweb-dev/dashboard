import {
  ContextSelector,
  createContext,
  useContextSelector,
} from "@fluentui/react-context-selector";
import { IAppModule } from "@nftlabs/sdk";
import { ContractReceipt } from "ethers";
import { useApp } from "hooks/sdk/modules/useApp";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { useMemo } from "react";
import invariant from "ts-invariant";
import { ISafeProviderContext } from "utils/context";
import { useSDK } from "../sdk-context";

interface IAppContext extends ISafeProviderContext {
  apps?: IAppModule[];
  activeApp?: IAppModule;
  isLoading?: boolean;
  isDeploying?: boolean;
  refresh: () => Promise<IAppModule[] | undefined>;
  deploy: (uri: string) => Promise<ContractReceipt | undefined>;
}

const AppContext = createContext<IAppContext>({} as IAppContext);

export const useAppContext = <T,>(
  selector: ContextSelector<IAppContext, T>,
) => {
  invariant(
    useContextSelector(AppContext, (c) => c._inProvider),
    `called "useSelectAppContext" from outside <AppContextProvider>`,
  );
  return useContextSelector(AppContext, selector);
};

export const AppContextProvider: React.FC = ({ children }) => {
  const sdk = useSDK();
  const activeAppAddress = useSingleQueryParam("app");
  const [
    apps,
    {
      status: { isLoading, isDeploying },
      actions: { refresh, deploy },
    },
  ] = useApp();

  const activeApp = useMemo(() => {
    if (!activeAppAddress || !apps) {
      return;
    }
    return apps.find((app) => app.address === activeAppAddress);
  }, [activeAppAddress, apps]);

  return (
    <AppContext.Provider
      value={{
        _inProvider: true,
        apps,
        activeApp,
        isLoading,
        isDeploying,
        refresh,
        deploy,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
