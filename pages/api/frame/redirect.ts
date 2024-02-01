import { Warpcast, untrustedMetaData } from "classes/Warpcast";
import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { z } from "zod";
import * as Sentry from "@sentry/nextjs";

interface RequestBody {
  trustedData: {
    messageBytes: string;
  };
  untrustedData: {
    url: string;
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

    const metadata = untrustedMetaData.parse(req.body.untrustedData);

    const trustedMessageByte = z.string().parse(body.trustedData?.messageBytes);

    await Warpcast.validateMessageWithReturnedFrameUrl(trustedMessageByte);

    Sentry.captureException(
      `Redirecting to ${metadata.url} when preview is ${process.env.NEXT_PUBLIC_VERCEL_URL}`,
    );

    res.setHeader("Location", metadata.url);

    return res.status(200).send(metadata.url);
  } catch (error) {
    Sentry.captureException(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      `Error when redirecting.... Error: ${error.message}`,
    );
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return res.status(500).send({ error: "something went wrong" });
  }
}
