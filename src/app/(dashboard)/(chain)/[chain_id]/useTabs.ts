import { useSelectedLayoutSegment } from "next/navigation";
import { ChainMetadataWithServices } from "../types/chain";

export function useTabs(chainSlug: string, chain: ChainMetadataWithServices) {
  const layoutSegment = useSelectedLayoutSegment() || "";

  const allTabs: Array<{
    name: string;
    href: string;
    enabled: boolean;
    isActive: boolean;
  }> = [
    {
      name: "Overview",
      href: `/${chainSlug}`,
      enabled: true,
      isActive: layoutSegment === "",
    },
    {
      name: "Contracts",
      href: `/${chainSlug}/contracts`,
      enabled:
        chain.services.find((s) => s.service === "contracts")?.enabled || false,
      isActive: layoutSegment === "contracts",
    },
    {
      name: "Connect SDK",
      href: `/${chainSlug}/connect`,
      enabled:
        chain.services.find((s) => s.service === "connect-sdk")?.enabled ||
        false,
      isActive: layoutSegment === "connect-sdk",
    },
    {
      name: "Engine",
      href: `/${chainSlug}/engine`,
      enabled:
        chain.services.find((s) => s.service === "engine")?.enabled || false,
      isActive: layoutSegment === "engine",
    },
    {
      name: "Account Abstraction",
      href: `/${chainSlug}/aa`,
      enabled:
        chain.services.find((s) => s.service === "account-abstraction")
          ?.enabled || false,
      isActive: layoutSegment === "account-abstraction",
    },
    {
      name: "Pay",
      href: `/${chainSlug}/pay`,
      enabled:
        chain.services.find((s) => s.service === "pay")?.enabled || false,
      isActive: layoutSegment === "pay",
    },
    {
      name: "RPC Edge",
      href: `/${chainSlug}/rpc`,
      enabled:
        chain.services.find((s) => s.service === "rpc-edge")?.enabled || false,
      isActive: layoutSegment === "rpc-edge",
    },
  ];

  const enabledTabs = allTabs.filter((tab) => tab.enabled);

  return enabledTabs;
}
