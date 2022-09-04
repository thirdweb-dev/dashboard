import { withSentry } from "@sentry/nextjs";
import { BASE_URL } from "lib/constants";
import screenshot from "lib/screenshot";
import { NextApiRequest, NextApiResponse } from "next";
import { OGReleaseMetadataSchema } from "pages/_og/release";
import { getSingleQueryValue } from "utils/router";
import { ZodError } from "zod";

const parserMap = {
  release: OGReleaseMetadataSchema,
} as const;

function isValidType(type?: string): type is keyof typeof parserMap {
  return Object.keys(parserMap).includes(type || "");
}

function createZodifiedUrl(
  baseUrl: string,
  params: NextApiRequest["query"],
): string {
  const url = new URL(baseUrl);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      if (Array.isArray(value)) {
        value.forEach((item) => url.searchParams.append(key, item));
      } else {
        url.searchParams.append(key, value);
      }
    }
  });

  url.searchParams.sort();

  return url.toString();
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(400).json({ error: "invalid method" });
  }

  const type = getSingleQueryValue(req.query, "type");

  if (!isValidType(type)) {
    return res.status(400).json({ error: "invalid type" });
  }

  let url;
  try {
    url = createZodifiedUrl(
      `${BASE_URL}/_og/${type}`,
      parserMap[type].parse(req.query),
    );
  } catch (err) {
    return res.status(400).json({
      error: `invalid params for type: ${type}`,
      parserError: err as ZodError,
    });
  }

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
