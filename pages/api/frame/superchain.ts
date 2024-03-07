import { NextRequest, NextResponse } from "next/server";
import { FrameRequest } from "@coinbase/onchainkit";
import { CoinbaseKit } from "classes/CoinbaseKit";
import { errorResponse, redirectResponse } from "utils/api";
import { SuperChainFrame } from "classes/SuperChainFrame";
import {
  finalGrowthPlanFrameMetaData,
  growthPlanFrameMetaData,
} from "lib/superchain-frames";
import { getAbsoluteUrl } from "lib/vercel-utils";

export const config = {
  runtime: "edge",
};

const blogUrl = "https://blog.thirdweb.com/rollup-as-a-service";

const dashboardUrl = `${getAbsoluteUrl()}/dashboard`;

const growthTrialUrl = `${getAbsoluteUrl()}/growth`;

export default async function handler(req: NextRequest) {
  if (req.method !== "POST") {
    return errorResponse("Invalid method", 400);
  }

  const body = (await req.json()) as FrameRequest;

  const { isValid, message } = await CoinbaseKit.validateMessage(body);

  if (!isValid || !message) {
    return errorResponse("Invalid message", 400);
  }

  const { searchParams } = new URL(req.url);

  const queryAction = searchParams.get("action");

  const action = SuperChainFrame.validateAction(queryAction as string);

  if (action === "check") {
    const buttonIndex = SuperChainFrame.validateButtonIndex(message.button, 4);

    if (buttonIndex === 4) {
      return redirectResponse(blogUrl, 302);
    }

    const chainName = SuperChainFrame.chainNameByButtonIndex(buttonIndex);

    return SuperChainFrame.htmlResponse(growthPlanFrameMetaData(chainName));
  }

  if (action === "growth") {
    const buttonIndex = SuperChainFrame.validateButtonIndex(message.button, 3);

    if (buttonIndex === 3) {
      return redirectResponse(dashboardUrl, 302);
    }

    const queryChain = searchParams.get("chain");

    const chain = SuperChainFrame.validateChain(queryChain as string);

    const avgTransactionImage =
      SuperChainFrame.avgTransactionImageByChain(chain);

    return SuperChainFrame.htmlResponse(
      finalGrowthPlanFrameMetaData(avgTransactionImage, buttonIndex === 2),
    );
  }

  if (action === "final") {
    const buttonIndex = SuperChainFrame.validateButtonIndex(message.button, 2);

    if (buttonIndex === 2) {
      return redirectResponse(growthTrialUrl, 302);
    }

    return redirectResponse(dashboardUrl, 302);
  }
}
