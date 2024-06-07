import { products } from "../components/server/products";
import {
  ChainMetadataWithServices,
  ChainSupportedService,
} from "../types/chain";

const chainPageTabs = products.map((p) => ({
  name: p.name,
  segment: p.id === "contracts" ? "" : p.id,
  serviceId: p.id,
  icon: p.icon,
})) satisfies Array<{
  name: string;
  segment: string;
  serviceId?: ChainSupportedService;
  icon: React.FC<{ className?: string }>;
}>;

export function getEnabledTabs(chain: ChainMetadataWithServices) {
  return chainPageTabs
    .map((tab) => {
      const isEnabled =
        chain.services.find((s) => s.service === tab.serviceId)?.enabled ??
        false;
      return {
        ...tab,
        isEnabled,
      };
    })
    .sort((a, b) => {
      if (a.isEnabled && !b.isEnabled) {
        return -1;
      }
      if (!a.isEnabled && b.isEnabled) {
        return 1;
      }
      return 0;
    });
}
