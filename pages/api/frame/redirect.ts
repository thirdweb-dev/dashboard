import { Warpcast } from "classes/Warpcast";
import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { z } from "zod";
import * as Sentry from "@sentry/nextjs";

interface RequestBody {
  trustedData: {
    messageBytes: string;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // eslint-disable-next-line new-cap
  await NextCors(req, res, {
    methods: ["POST"],
    origin: "*",
  });

  if (req.method !== "POST") {
    return res.status(400).json({ error: "invalid method" });
  }

  try {
    const body = req.body as RequestBody;
    const trustedMessageByte = z.string().parse(body.trustedData?.messageBytes);

    const frameUrl =
      await Warpcast.validateMessageWithReturnedFrameUrl(trustedMessageByte);

    Sentry.captureException(
      `Redirecting to ${frameUrl} when preview is ${process.env.NEXT_PUBLIC_VERCEL_URL}`,
    );

    res.status(302).redirect(frameUrl);
  } catch (error) {
    Sentry.captureException(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      `Error when redirecting.... Error: ${error.message}`,
    );
  }
}
