import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const secretKey = req.headers["x-secret-key"];
  const { redirectUrl } = req.query;

  res.writeHead(302, {
    Location: `${redirectUrl as string}?id=${secretKey}`,
  });

  res.end();
};

export default handler;
