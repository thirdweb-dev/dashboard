import { ModuleType } from "@3rdweb/sdk";

export function buildModuleUrl(
  network: string,
  moduleType: ModuleType,
  appAddress: string,
  moduleAddress: string,
) {
  const base = `${network}/${appAddress}`;
  switch (moduleType) {
    case ModuleType.CURRENCY:
      return `${base}/token/${moduleAddress}`;
    case ModuleType.NFT:
      return `${base}/nft-collection/${moduleAddress}`;
    case ModuleType.COLLECTION:
      return `${base}/bundle/${moduleAddress}`;
    case ModuleType.PACK:
      return `${base}/pack/${moduleAddress}`;
    case ModuleType.MARKET:
      return `${base}/market/${moduleAddress}`;
    case ModuleType.MARKETPLACE:
      return `${base}/marketplace/${moduleAddress}`;
    case ModuleType.DROP:
      return `${base}/drop/${moduleAddress}`;
    case ModuleType.DATASTORE:
      return `${base}/datastore/${moduleAddress}`;
    case ModuleType.DYNAMIC_NFT:
      return `${base}/dynamic-nft/${moduleAddress}`;
    case ModuleType.ACCESS_NFT:
      return `${base}/access-nft/${moduleAddress}`;
    case ModuleType.BUNDLE_DROP:
      return `${base}/bundle-drop/${moduleAddress}`;
    case ModuleType.BUNDLE_SIGNATURE:
      return `${base}/bundle-signature/${moduleAddress}`;
    case ModuleType.VOTE:
      return `${base}/vote/${moduleAddress}`;
    case ModuleType.SPLITS:
      return `${base}/splits/${moduleAddress}`;
    default:
      throw new Error(`Unknown module type: ${moduleType}`);
  }
}
