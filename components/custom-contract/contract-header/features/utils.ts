import { FeatureWithEnabled } from "@thirdweb-dev/sdk/dist/src/constants/contract-features";

export function convertFeaturesMapToarray(
  features?: Record<string, FeatureWithEnabled> | Array<FeatureWithEnabled>,
) {
  if (!features) {
    return [];
  }
  if (Array.isArray(features)) {
    return features;
  }
  return Object.entries(features).map(([, f]) => f);
}
