import { withSentry } from "@sentry/nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import nextCors from "nextjs-cors";

export interface IConsoleVersion {
  id: string;
  deprecated: boolean;
  latest: boolean;
  url: string;
}

const VERSIONS: IConsoleVersion[] = [
  {
    id: "v1",
    deprecated: false,
    latest: true,
    url: "https://thirdweb.com/dashboard",
  },
  {
    id: "v0",
    deprecated: true,
    latest: false,
    url: "https://console-v0.nftlabs.co/dashboard",
  },
];

export default withSentry(async (req: NextApiRequest, res: NextApiResponse) => {
  await nextCors(req, res, {
    // Options
    methods: ["GET", "HEAD"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  res.status(200).send(VERSIONS);
});
