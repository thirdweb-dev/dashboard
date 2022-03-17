import { useActiveNetwork } from "@3rdweb-sdk/react";
import { appRoutes } from "../utils/routes";

export function useNetworkUrl(): string {
  const network = useActiveNetwork();
  if (!network) {
    return "/start";
  }
  return appRoutes.dashboard({ network });
}

export function useProjectUrl(projectAddress: string): string {
  const network = useActiveNetwork();
  if (!network) {
    return "/start";
  }
  return appRoutes.project({ network, projectAddress });
}
