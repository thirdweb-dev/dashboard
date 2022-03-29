import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(400).json({ error: "invalid method" });
  }

  const gasEndpoint = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${process.env.ETHERSCAN_KEY}`;
  const ethPriceEndpoint = `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${process.env.ETHERSCAN_KEY}`;

  const gasPrice = await fetch(gasEndpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const gasPriceRes = await gasPrice.json();

  const ethPrice = await fetch(ethPriceEndpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const ethPriceRes = await ethPrice.json();

  const fullResponse = {
    gasPrice: gasPriceRes.result.SafeGasPrice || "30",
    ethPrice: ethPriceRes.result.ethusd || "3000",
  };

  return res.status(200).json(fullResponse);
};
