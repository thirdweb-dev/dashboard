import { NextApiRequest, NextApiResponse } from "next";
import { errorResponse } from "utils/api";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(404).end();
  

}
