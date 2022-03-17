import pinata from "@pinata/sdk";
import { withSentry } from "@sentry/nextjs";
import { Form } from "multiparty";
import type { NextApiRequest, NextApiResponse } from "next";

const pinataApiKey = process.env.PINATA_API_KEY as string;
const pinataApiSecret = process.env.PINATA_API_SECRET as string;

const _pinata = pinata(pinataApiKey, pinataApiSecret);
// https://nftlabs.mypinata.cloud/ipfs
const GATEWAY_URL = process.env.NEXT_PUBLIC_IPFS_GATEWAY_URL as string;

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  console.log("/api/upload", req.method);
  if (req.method === "POST") {
    return new Promise<void>((resolve) => {
      const form = new Form();

      form.on("error", (err: Error) => {
        res.status(500).json(err);
        resolve();
      });

      form.on("part", function (part: any) {
        part.on("error", (err: Error) => {
          res.status(500).json(err);
          resolve();
        });

        _pinata
          .pinFileToIPFS(part, { pinataOptions: { cidVersion: 1 } })
          .then((result: any) => {
            const IpfsUri = `ipfs://${result.IpfsHash}`;
            const IpfsGatewayUrl = `${GATEWAY_URL}/${result.IpfsHash}`;
            res.status(200).json({ ...result, IpfsUri, IpfsGatewayUrl });
            resolve();
          })
          .catch((err: Error) => {
            res.status(500).json(err);
            resolve();
          });
      });

      form.parse(req);
    });
  }

  res.status(405).end();
};

export default withSentry(handler);
