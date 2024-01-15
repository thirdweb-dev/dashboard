import { ChainId } from "@thirdweb-dev/sdk";

import { NextApiRequest, NextApiResponse } from "next";

interface VerifyPayload {
  contractAddress: string;
  chainId: ChainId;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(400).json({ error: "invalid method" });
  }

  const { contractAddress, chainId } = req.body as VerifyPayload;

  return await fetch("https://contract.thirdweb.com/verify/contract", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contractAddress, chainId }),
  });
};

export default handler;
