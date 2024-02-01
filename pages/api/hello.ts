import { Warpcast, untrustedMetaData } from "classes/Warpcast";
import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
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

 

export default async function handler(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "invalid method" }, { status: 400 });
  }

  const requestBody = (await req.json()) as any;
  console.log(requestBody);
  return NextResponse.redirect("https://thirdweb.com", {
    status: 302,
  });
}
