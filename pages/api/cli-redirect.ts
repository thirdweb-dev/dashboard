import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const secretKey = req.headers["x-secret-key"];

  res.writeHead(302, {
    Location: `http://localhost:8976/secretKey/callback?id=${secretKey}`,
  });

  res.end();
};

export default handler;
