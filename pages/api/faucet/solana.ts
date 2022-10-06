import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { getSOLRPC } from "constants/rpc";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(400).json({ message: "Please use POST method" });
  }

  const { address } = req.body;
  const rpcUrl = getSOLRPC("devnet");

  try {
    const connection = new Connection(rpcUrl);
    const wallet = new PublicKey(address);

    const txHash = await connection.requestAirdrop(
      wallet,
      Number(LAMPORTS_PER_SOL),
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
