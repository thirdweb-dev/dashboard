import { ModuleMetadata } from "@nftlabs/sdk";
import { useAppContext } from "context/sdk/modules/app-context";
import { useAppModule } from "context/sdk/sdk-context";
import { useCallback, useEffect, useState } from "react";
import { wait } from "utils/promise";

export function useCollectionModulesForActiveApp(): [
  ModuleMetadata[] | undefined,
  {
    status: { isLoading: boolean; error: Error | null };
    actions: { refresh: () => Promise<void> };
  },
] {
  const activeAppAddress = useAppContext((c) => c.activeApp?.address);
  const appModule = useAppModule(activeAppAddress);
  const [collections, setCollections] = useState<ModuleMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh: (errBackOff?: number) => Promise<void> = useCallback(
    async (errBackOff = 500) => {
      if (!appModule) {
        return;
      }
      setIsLoading(true);
      try {
        const _collections = await appModule.getCollectionModules();
        if (_collections) {
          setCollections(_collections);
        }
        setError(null);
        setIsLoading(false);
      } catch (err) {
        setError(err as Error);
        await wait(errBackOff);
        return await refresh(Math.min(errBackOff + 500, 3000));
      }
    },
    [appModule, setCollections],
  );

  useEffect(() => {
    refresh();
  }, [refresh]);

  return [collections, { status: { isLoading, error }, actions: { refresh } }];
}
