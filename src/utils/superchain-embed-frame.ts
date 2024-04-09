import { FrameMetadataType } from "@coinbase/onchainkit";
import { getAbsoluteUrl } from "lib/vercel-utils";

export const getEmailMetaData = (chain: string): FrameMetadataType => {
  return {
    buttons: [
      {
        label: "Confirm",
        action: `post`,
      },
    ],
    input: {
      text: "Enter email address",
    },
    image: `${getAbsoluteUrl()}/assets/og-image/degen-enchine-frame.png`,
    post_url: `${getAbsoluteUrl()}/api/superchain/frame?type=email&chain=${chain}`,
  };
};

export const getWebsiteMetaData = (
  chain: string,
  email: string,
): FrameMetadataType => {
  return {
    buttons: [
      {
        label: "Confirm",
        action: `post`,
      },
    ],
    input: {
      text: "Enter app website",
    },
    image: `${getAbsoluteUrl()}/assets/og-image/degen-enchine-frame.png`,
    post_url: `${getAbsoluteUrl()}/api/superchain/frame?type=website&chain=${chain}&email=${encodeURIComponent(email)}`,
  };
};

export const getSuccessMetaData = (): FrameMetadataType => {
  return {
    buttons: [
      {
        label: "Finished!",
        action: `post`,
      },
    ],
    image: `${getAbsoluteUrl()}/assets/og-image/degen-enchine-frame.png`,
    post_url: `${getAbsoluteUrl()}/api/superchain/frame`,
  };
};
