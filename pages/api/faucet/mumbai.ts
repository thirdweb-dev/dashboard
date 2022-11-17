import { ChainId } from "@thirdweb-dev/react";
import { EVM_RPC_URL_MAP } from "constants/rpc";
import { ethers } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(400).json({ message: "Please use POST request" });
  }

  const { address } = JSON.parse(req.body);

  const wallet = new ethers.Wallet(
    process.env.PRIVATE_KEY as string,
    new ethers.providers.JsonRpcProvider(EVM_RPC_URL_MAP[ChainId.Mumbai]),
  );

  const data = JSON.stringify({
    jsonrpc: "2.0",
    id: 0,
    method: "alchemy_getAssetTransfers",
    params: [
      {
        fromBlock: "0x0",
        fromAddress: "0xdf62A3fb98B160D98b406F055EdE42FB26C7327B",
        toAddress: address,
        category: ["external"],
      },
    ],
  });

  const baseURL = EVM_RPC_URL_MAP[ChainId.Mumbai];
  const fetchURL = `${baseURL}`;

  const response = await fetch(fetchURL, {
    method: "POST",
    body: data,
  });

  const resData = await response.json();

  if (resData.result.transfers.length > 0) {
    const timestamp =
      (
        await wallet.provider.getBlock(
          resData.result?.transfers[resData.result.transfers.length - 1]
            ?.blockNum,
        )
      ).timestamp || 0;
    const diff = (Date.now() - timestamp * 1000) / 60000;

    if (diff < 15) {
      return res.status(400).json({
        error: "Please wait 15 minutes before making next transaction.",
      });
    }
  }

  const balance = await wallet.provider.getBalance(address);

  if (ethers.utils.formatEther(balance) > "0.5") {
    return res.status(417).json({
      error:
        "This faucet is only for funds to use for gas fees. It looks like you have enough funds for that. The faucet will not send any funds.",
    });
  }

  try {
    const txn = await wallet.sendTransaction({
      to: address,
      value: ethers.utils.parseEther("0.1"),
    });

    return res.json({ message: "Transaction initiated successfully!", txn });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default handler;
