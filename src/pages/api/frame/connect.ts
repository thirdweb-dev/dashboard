import { NextRequest } from "next/server";
import { FrameRequest } from "@coinbase/onchainkit";
import { CoinbaseKit } from "classes/CoinbaseKit";
import {
  errorResponse,
  redirectResponse,
  successHtmlResponse,
} from "utils/api";
import { SuperChainFrame } from "classes/SuperChainFrame";
import {
  finalGrowthPlanFrameMetaData,
  growthPlanFrameMetaData,
} from "lib/superchain-frames";
import { ConnectFrame } from "classes/ConnectFrame";
import { getAbsoluteUrl } from "lib/vercel-utils";

export const config = {
  runtime: "edge",
};

const connectLandingPageUrl = `${getAbsoluteUrl()}/connect`;

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

  const queryStep = searchParams.get("step");
  console.log({ queryStep });

  const step = ConnectFrame.getParsedStep(queryStep);
  const shouldGoNext = ConnectFrame.getShouldGoNext(step, message.button);
  const shouldGoBack = ConnectFrame.getShouldGoBack(step, message.button);

  const shouldContinue = shouldGoNext || shouldGoBack;
  console.log({ shouldGoBack, shouldGoNext });

  if (shouldContinue) {
    const frameHtmlResponse = ConnectFrame.getFrameHtmlResponse(
      step,
      shouldGoNext ? "next" : "back",
    );
    return successHtmlResponse(frameHtmlResponse, 200);
  }

  return redirectResponse(connectLandingPageUrl, 302);
}
