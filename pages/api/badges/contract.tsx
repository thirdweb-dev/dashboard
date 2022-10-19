/* eslint-disable @next/next/no-img-element */

/* eslint-disable react/forbid-dom-props */
import { readFile } from "fs/promises";
import type { NextApiRequest, NextApiResponse } from "next";
import { resolve } from "path";
import satori from "satori";
import { shortenIfAddress } from "utils/usedapp-external";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(400).json({ error: "Please use GET method" });
  }

  try {
    console.log(req.url);
    const { searchParams } = new URL(
      req.url as string,
      `http://${req.headers.host}`,
    );

    const address = searchParams.get("address") || "0x...";
    const audited = Boolean(searchParams.get("audited"));
    const theme = searchParams.get("theme") || "dark";

    console.log({ address, audited, theme });
    const fontBuffer = await readFile(
      resolve("./public/assets/fonts", "Inter-medium.ttf"),
    );

    const svg = await satori(
      <div
        style={{
          backgroundColor: theme === "dark" ? "#272727" : "#F2F2F7",
          color: theme === "dark" ? "white" : "black",
          fontSize: "14px",
          padding: "10px 12px",
          borderRadius: "6px",
          display: "flex",
          borderWidth: "1px",
          borderColor: theme === "dark" ? "#414141" : "#F2F2F7",
        }}
      >
        <div
          style={{
            marginRight: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "18px",
            width: "28px",
          }}
        >
          <img
            src="https://thirdweb.com/brand/thirdweb-icon.png"
            alt=""
            width={28}
            height={18}
            style={{ objectFit: "contain" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {shortenIfAddress(address)}
          </div>
        </div>
      </div>,
      {
        width: 200,
        height: 50,
        fonts: [
          {
            name: "Inter",
            data: fontBuffer,
            weight: 400,
            style: "normal",
          },
        ],
      },
    );

    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");
    res.status(200).send(svg);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export default handler;
