import { withSentry } from "@sentry/nextjs";
import { BASE_URL, isValidOGType } from "lib/constants";
import screenshot from "lib/screenshot";
import { NextApiRequest, NextApiResponse } from "next";
import { getSingleQueryValue } from "utils/router";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(400).json({ error: "invalid method" });
  }

  const type = getSingleQueryValue(req.query, "type");

  if (!isValidOGType(type)) {
    return res.status(400).json({ error: "invalid type" });
  }

  const url = new URL(`${BASE_URL}/_og/${type}`);

  const file = await screenshot(url.toString());
  res.setHeader("Content-Type", `image/png`);
  res.setHeader(
    "Cache-Control",
    `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`,
  );
  res.statusCode = 200;
  res.end(file);
};

export default withSentry(handler);
