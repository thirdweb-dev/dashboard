import { ModuleMetadata } from "@nftlabs/sdk";
import { useAppContext } from "context/sdk/modules/app-context";
import { useAppModule } from "context/sdk/sdk-context";
import { useCallback, useEffect, useState } from "react";
import { wait } from "utils/promise";

export function useCurrencyModulesForActiveApp(): [
  ModuleMetadata[] | undefined,
  {
    status: { isLoading: boolean; error: Error | null };
    actions: { refresh: () => Promise<void> };
  },
] {
  const activeAppAddress = useAppContext((c) => c.activeApp?.address);
  const appModule = useAppModule(activeAppAddress);
  const [currencies, setCurrencies] = useState<ModuleMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh: (errBackOff?: number) => Promise<void> = useCallback(
    async (errBackOff = 500) => {
      if (!appModule) {
        return;
      }
      setIsLoading(true);
      try {
        const _currencies = await appModule.getCurrencyModules();
        if (_currencies) {
          setCurrencies(_currencies);
        }
        setError(null);
        setIsLoading(false);
      } catch (err) {
        setError(err as Error);
        await wait(errBackOff);
        return await refresh(Math.min(errBackOff + 500, 3000));
      }
    },
    [appModule, setCurrencies],
  );

  useEffect(() => {
    refresh();
  }, [refresh]);

  return [currencies, { status: { isLoading, error }, actions: { refresh } }];
}
