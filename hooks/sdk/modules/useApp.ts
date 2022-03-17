import { IAppModule } from "@nftlabs/sdk";
import { AnalyticsEvents } from "constants/analytics";
import { useSDK } from "context/sdk/sdk-context";
import { ContractReceipt } from "ethers";
import posthog from "posthog-js";
import { useCallback, useEffect, useState } from "react";
import { wait } from "utils/promise";

export function useApp(): [
  IAppModule[] | undefined,
  {
    status: { isLoading: boolean; error: Error | null; isDeploying: boolean };
    actions: {
      refresh: () => Promise<IAppModule[] | undefined>;
      deploy: (uri: string) => Promise<ContractReceipt | undefined>;
    };
  },
] {
  const sdk = useSDK();

  const [apps, setApps] = useState<IAppModule[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isDeploying, setIsDeploying] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refresh: (errBackOff?: number) => Promise<IAppModule[] | undefined> =
    useCallback(
      async (errBackOff = 500) => {
        setIsLoading(true);
        try {
          const _apps = (await sdk?.getApps())?.reverse();
          if (_apps) {
            setApps(_apps);
          }
          setError(null);
          setIsLoading(false);
          return _apps;
        } catch (err) {
          console.error("useApps() error -", err);
          setError(err as Error);
          await wait(errBackOff);
          return await refresh(Math.min(errBackOff + 500, 3000));
        }
      },
      [sdk],
    );

  const deploy = useCallback(
    async (uri: string) => {
      if (!sdk) {
        return;
      }
      setIsDeploying(true);
      try {
        const receipt = await sdk.createApp(uri);
        await refresh();

        posthog.capture(AnalyticsEvents.AppCreated, {
          uri,
        });

        return receipt;
      } finally {
        setIsDeploying(false);
      }
    },
    [refresh, sdk],
  );

  useEffect(() => {
    refresh();
  }, [refresh]);

  return [
    apps,
    { status: { isLoading, error, isDeploying }, actions: { refresh, deploy } },
  ];
}
