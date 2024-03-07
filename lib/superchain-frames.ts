import { FrameButtonMetadata, FrameMetadataType } from "@coinbase/onchainkit";
import { getAbsoluteUrl } from "./vercel-utils";

export const superchainFrameChains = {
  optimism: {
    name: "optimism",
    frameContentText: "OP Mainnet",
  },
  base: {
    name: "base",
    frameContentText: "Base",
  },
  zora: {
    name: "zora",
    frameContentText: "Zora",
  },
  other: {
    name: "other",
    frameContentText: "Other",
  },
};

export const growthPlanFrameMetaData = (
  chainName: string,
): FrameMetadataType => {
  return {
    buttons: [
      {
        label: "Yes",
        action: `post`,
      },
      {
        label: "No",
        action: `post`,
      },
      {
        label: "Sign up",
        action: `post_redirect`,
      },
    ],
    image: `${getAbsoluteUrl()}/assets/dashboard/growth-account.png`,
    post_url: `${getAbsoluteUrl()}/api/frame/superchain?action=growth&chain=${chainName}`,
  };
};

export const finalGrowthPlanFrameMetaData = (
  imgUrl: string,
  showGrowthTrial: boolean,
): FrameMetadataType => {
  return {
    buttons: [
      {
        label: "Claim credits",
        action: `post_redirect`,
      },
      ...(showGrowthTrial
        ? [
            {
              label: "Get a free thirdweb growth trial",
              action: `post_redirect`,
            } as FrameButtonMetadata,
          ]
        : []),
    ],
    image: imgUrl,
    post_url: `${getAbsoluteUrl()}/api/frame/superchain?action=final`,
  };
};
