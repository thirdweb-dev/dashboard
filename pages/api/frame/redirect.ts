import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

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

  res.status(302).redirect("https://thirdweb.com/thirdweb.eth/DropERC721");
}
