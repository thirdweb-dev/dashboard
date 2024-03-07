import { FrameMetadataType, getFrameHtmlResponse } from "@coinbase/onchainkit";
import { superchainFrameChains } from "lib/superchain-frames";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { z } from "zod";

const validAction = z.union([
  z.literal("check"),
  z.literal("growth"),
  z.literal("final"),
]);

const validChains = z.union([
  z.literal(superchainFrameChains.optimism.name),
  z.literal(superchainFrameChains.base.name),
  z.literal(superchainFrameChains.zora.name),
]);

export class SuperChainFrame {
  public static validateAction = (action: string) => {
    return validAction.parse(action);
  };

  public static validateChain = (chain: string) => {
    return validChains.parse(chain);
  };

  public static validateButtonIndex = (buttonIndex: number, max: number) => {
    return z.number().min(1).max(max).parse(buttonIndex);
  };

  public static chainNameByButtonIndex = (buttonIndex: number) => {
    switch (buttonIndex) {
      case 1:
        return "optimism";

      case 2:
        return "base";

      case 3:
        return "zora";

      default:
        throw new Error("Invalid button index");
    }
  };

  public static avgTransactionImageByChain = (chainName: string) => {
    switch (chainName) {
      case "optimism":
        return `${getAbsoluteUrl()}/assets/dashboard/250k-transactions.png`;

      case "base":
        return `${getAbsoluteUrl()}/assets/dashboard/500k-transactions.png`;

      case "zora":
        return `${getAbsoluteUrl()}/assets/dashboard/500k-transactions.png`;

      default:
        throw new Error("Invalid chain name");
    }
  };

  public static htmlResponse = (frameMetaData: FrameMetadataType) => {
    return getFrameHtmlResponse(frameMetaData);
  };
}
