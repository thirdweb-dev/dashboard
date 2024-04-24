import { getFrameHtmlResponse } from "@coinbase/onchainkit";
import { connectFrames } from "lib/connect-frames";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { z } from "zod";

const validSteps = z.union([
  z.literal("1"),
  z.literal("2"),
  z.literal("3"),
  z.literal("4"),
  z.literal("5"),
  z.literal("6"),
  z.literal("7"),
]);

export type Step = z.infer<typeof validSteps>;

export class ConnectFrame {
  static getParsedStep = (step: any) => {
    return validSteps.parse(step);
  };

  static getShouldGoNext = (step: Step, buttonIndex: number) => {
    const buttonIdx = z.number().min(1).max(3).parse(buttonIndex);

    if (step === "1") {
      return buttonIdx === 1;
    }

    return buttonIdx === 3;
  };

  static getShouldGoBack = (step: Step, buttonIndex: number) => {
    const buttonIdx = z.number().min(1).max(3).parse(buttonIndex);
    return step !== "1" && buttonIdx === 1;
  };

  static getFrameHtmlResponse = (step: Step, direction: "next" | "back") => {
    const readyStepNum =
      direction === "next" ? Number(step) + 1 : Number(step) - 1;
    const frameImg = connectFrames[readyStepNum]?.imageUrl;

    if (!frameImg) {
      throw new Error(`Image frame not found for step: ${step}`);
    }

    return getFrameHtmlResponse(
      readyStepNum === 1
        ? {
            buttons: [
              {
                label: "Features ->",
                action: `post`,
              },
              {
                label: "Start building",
                action: `post_redirect`,
              },
            ],
            image: frameImg,
            // hardcode to "2"
            post_url: `${getAbsoluteUrl()}/api/frame/connect?step=1`,
          }
        : {
            buttons: [
              {
                label: "<- Back",
                action: `post`,
              },
              {
                label: "Start building",
                action: `post_redirect`,
              },
              {
                label: "Next ->",
                action: `post`,
              },
            ],
            image: frameImg,
            post_url: `${getAbsoluteUrl()}/api/frame/connect?step=${readyStepNum}`,
          },
    );
  };
}
