import { blankDropNetworkMapping } from "components/blank-drop/allowedNetworks";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "edge",
};

interface ClaimBlankDropPayload {
  network: string;
  address: string;
}

const handler = async (req: NextRequest) => {
  try {
    if (req.method !== "POST") {
      return NextResponse.json({ error: "invalid method" }, { status: 400 });
    }

    const requestBody = (await req.json()) as ClaimBlankDropPayload;

    const { network, address } = requestBody;

    // Check if the user is a valid "paper" wallet
    try {
      const paperWalletResponse = await fetch(
        `https://withpaper.com/api/2022-08-12/embedded-wallet/user-details-by-wallet-address?walletAddress=${address}&clientId=9a2f6238-c441-4bf4-895f-d13c2faf2ddb`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            accept: "text/plain",
            Authorization: `Bearer ${process.env.PAPER_API_KEY}`,
          },
        },
      );

      const paperWalletData = await paperWalletResponse.json();

      // If the response is an empty array, the user is not valid
      if (paperWalletData?.results.length === 0) {
        return NextResponse.json(
          { error: "Not a valid paper wallet" },
          { status: 400 },
        );
      }
    } catch (err: unknown) {
      return NextResponse.json(
        {
          error: `Error checking paper wallet: ${
            err instanceof Error ? err.message : "Unknown Error"
          }`,
        },
        { status: 500 },
      );
    }

    const baseWeb3ApiUrl = "https://web3api-7dqe.zeet-nftlabs.zeet.app";

    const contractAddress =
      blankDropNetworkMapping[network as keyof typeof blankDropNetworkMapping]
        .contractAddress;

    // Check balance
    try {
      const balanceResponse = await fetch(
        `${baseWeb3ApiUrl}/contract/${network}/${contractAddress}/erc721/balanceOf?wallet_address=${address}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const balanceData = await balanceResponse.json();

      // If the balance is > 0, return an error
      if (parseInt(balanceData.result) > 0) {
        return NextResponse.json(
          { error: "You already minted an NFT on this network" },
          { status: 400 },
        );
      }
    } catch (err: unknown) {
      return NextResponse.json(
        {
          error: `Error checking balance: ${
            err instanceof Error ? err.message : "Unknown Error"
          }`,
        },
        { status: 500 },
      );
    }

    // Mint NFT
    try {
      const mintNFTResponse = await fetch(
        `${baseWeb3ApiUrl}/contract/${network}/${contractAddress}/erc721/claimTo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            receiver: address,
            quantity: "1",
          }),
        },
      );

      const mintNFTData = await mintNFTResponse.json();

      return NextResponse.json(
        { status: mintNFTResponse.statusText, data: mintNFTData },
        {
          status: mintNFTResponse.status,
        },
      );
    } catch (err: unknown) {
      return NextResponse.json(
        {
          error: `Error minting NFT: ${
            err instanceof Error ? err.message : "Unknown Error"
          }`,
        },
        { status: 500 },
      );
    }
  } catch (err: unknown) {
    return NextResponse.json(
      {
        error: `An unexpected error occurred: ${
          err instanceof Error ? err.message : "Unknown Error"
        }`,
      },
      { status: 500 },
    );
  }
};

export default handler;
