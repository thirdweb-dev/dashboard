import * as web3 from "@solana/web3.js";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(400).json({ message: "Please use POST method" });
  }

  const { address } = req.body;

  try {
    const connection = new web3.Connection("https://api.devnet.solana.com");
    const wallet = new web3.PublicKey(address);

    const txHash = await connection.requestAirdrop(
      wallet,
      web3.LAMPORTS_PER_SOL * Number("1"),
    );

    return res.status(200).json({
      message: "Sent funds successfully",
      txHash,
    });
  } catch (err) {
    return res.status(500).json({ message: (err as Error).message });
  }
};

export default handler;
