import { Warpcast, untrustedMetaData } from "classes/Warpcast";
import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { z } from "zod";
import * as Sentry from "@sentry/nextjs";
import { NextResponse } from "next/server";

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
  return res
    .status(302)
    .redirect(`https://${process.env.NEXT_PUBLIC_VERCEL_URL}`);
}
