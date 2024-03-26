import { NextRequest, NextResponse } from "next/server";
import { FrameRequest } from "@coinbase/onchainkit";
import { CoinbaseKit } from "classes/CoinbaseKit";
import { errorResponse } from "utils/api";

import { abi } from "./abi";

import {
  getContractForErc721OpenEdition,
  getEncodedDataForTransaction,
} from "utils/tx-frame";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  if (req.method !== "POST") {
    return errorResponse("Invalid method", 400);
  }

  const body = (await req.json()) as FrameRequest;

  const { isValid, message } = await CoinbaseKit.validateMessage(body);

  if (!isValid || !message) {
    return errorResponse("Invalid message", 400);
  }

  const walletAddress = message.interactor.custody_address;

  const contract = await getContractForErc721OpenEdition();

  const data = await getEncodedDataForTransaction(walletAddress, contract);

  return NextResponse.json(
    {
      chainId: "eip155:8456",
      method: "eth_sendTransaction",
      params: {
        abi,
        to: "0xB6606041437BCBD727373ffF037dDa0247771184",
        data,
        value: "0",
      },
    },
    { status: 200 },
  );
}
