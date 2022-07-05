import { apiKeyMap, apiMap } from "./verify";
import { ChainId } from "@thirdweb-dev/sdk";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(400).json({ error: "invalid method" });
  }

  const guid = req.query["guid"];
  const chainId = Number(req.query["chainId"]) as ChainId;
  console.log("guid", guid);

  const endpoint = `${apiMap[chainId]}?module=contract&action=checkverifystatus&guid=${guid}&apikey=${apiKeyMap[chainId]}"`;

  try {
    const result = await fetch(endpoint, {
      method: "GET",
    });

    const data = await result.json();
    console.log("DEBUG - data", data);
    if (data.status === "1") {
      return res.status(200).json({ result: data.result });
    } else {
      return res.status(200).json({ result: data.result });
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: e });
  }
};
