import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(400).json({ error: "invalid method" });
  }

  res.status(302).redirect("https://thirdweb.com/thirdweb.eth/DropERC721");
}
