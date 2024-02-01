import { Warpcast, untrustedMetaData } from "classes/Warpcast";
import { z } from "zod";
import * as Sentry from "@sentry/nextjs";
import { NextRequest, NextResponse } from "next/server";

interface RequestBody {
  trustedData: {
    messageBytes: string;
  };
  untrustedData: {
    url: string;
  };
}

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "invalid method" }, { status: 400 });
  }

  try {
    const body = (await req.json()) as RequestBody;

    const metadata = untrustedMetaData.parse(body.untrustedData);

    const trustedMessageByte = z.string().parse(body.trustedData?.messageBytes);

    await Warpcast.validateMessageWithReturnedFrameUrl(trustedMessageByte);

    Sentry.captureException(
      `#1 Redirecting to ${metadata.url} when preview is ${process.env.NEXT_PUBLIC_VERCEL_URL}`,
    );

    return NextResponse.redirect(metadata.url, {
      status: 302,
    });
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
