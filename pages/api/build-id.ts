import { NextApiRequest, NextApiResponse } from "next";

const handler = (_req: NextApiRequest, res: NextApiResponse): void => {
  res.status(200).json({
    buildId: process.env.BUILD_ID,
  });
};

export default handler;