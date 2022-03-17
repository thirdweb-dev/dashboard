import { useAppList } from "@3rdweb-sdk/react";
import { useWeb3 } from "@3rdweb/hooks";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function useConnectedWalletAndUserHasProjectAlreadyRedirectsPastOnboardingFlowToOverviewProjectPage() {
  const router = useRouter();
  const { isLoading, data } = useAppList();
  const { chainId } = useWeb3();

  useEffect(() => {
    if (!isLoading && data && data.length > 0 && chainId) {
      router.replace("/dashboard");
    }
  }, [isLoading, data, router, chainId]);
}
