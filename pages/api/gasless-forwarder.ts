/* eslint-disable no-console */
import { utils } from "ethers";
import { CAPTCHA_ENABLED_CHAINS } from "lib/captcha-enabled-chains";
import { NextApiRequest, NextApiResponse } from "next";

function extractData(payload: string) {
  // 132 skip to the data of ForwarderChainlessDomain's ForwardRequest
  const transactionData = utils.hexDataSlice(payload, 132);
  const functionSignature = utils
    .hexDataSlice(transactionData, 0, 4)
    .toString();
  // 0x26c5b516 = add(address,address,uint256,string)
  if (functionSignature === "0x26c5b516") {
    // skip over 4 bytes of function signature
    const [deployer, deployment, chainId, metadataUri] =
      utils.defaultAbiCoder.decode(
        ["address", "address", "uint256", "string"],
        utils.hexDataSlice(transactionData, 4),
      );
    return { deployer, deployment, chainId, metadataUri };
  }

  throw new Error(`invalid function signature: ${functionSignature}`);
}
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(400).json({ error: "invalid method" });
  }

  const { captchaToken } = req.query;

  let reqData: any;
  try {
    reqData = JSON.parse(req.body).request.data;
  } catch {
    reqData = req.body.request.data;
  }

  if (!reqData) {
    return res
      .status(400)
      .json({ error: "invalid request, missing request data" });
  }

  try {
    const { chainId, deployer, metadataUri } = extractData(reqData);
    const parsedChainId = chainId.toNumber();

    // eslint-disable-next-line no-console
    console.log(
      deployer,
      "deploying to chain",
      parsedChainId,
      "with metadata",
      metadataUri,
    );

    if (CAPTCHA_ENABLED_CHAINS.includes(parsedChainId)) {
      console.log("requires captcha");
      const url = new URL("https://www.google.com/recaptcha/api/siteverify");

      // add the secret key
      url.searchParams.set(
        "secret",
        process.env.RECAPTCHA_SECRET_KEY as string,
      );
      // add the token
      url.searchParams.set("response", captchaToken as string);

      const verifyResponse = await fetch(url);
      const data = await verifyResponse.json();
      if (!data.success) {
        console.error("invalid captcha", data);
        return res.status(400).json({ error: "invalid captcha" });
      }
      console.log("captcha verified");
    } else {
      console.log("no captcha required");
    }
    // redirect the request to the OpenZeppelin Defender relayer
    const response = await fetch(
      "https://api.defender.openzeppelin.com/autotasks/dad61716-3624-46c9-874f-0e73f15f04d5/runs/webhook/7d6a1834-dd33-4b7b-8af4-b6b4719a0b97/FdHMqyF3p6MGHw6K2nkLsv",
      {
        method: "POST",
        body: JSON.stringify(req.body),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (err) {
    console.error("failed to extract data", err);
    return res.status(400).json({ error: "failed to extract data" });
  }
};

export default handler;
