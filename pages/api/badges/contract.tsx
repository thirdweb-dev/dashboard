/* eslint-disable @next/next/no-img-element */

/* eslint-disable react/forbid-dom-props */
import { readFile } from "fs/promises";
import type { NextApiRequest, NextApiResponse } from "next";
import { resolve } from "path";
import satori from "satori";
import { shortenIfAddress } from "utils/usedapp-external";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(400).json({ error: "Please use POST method" });
  }

  const { address } = JSON.parse(req.body);

  try {
    const fontBuffer = await readFile(
      resolve("./public/assets/fonts", "Inter-medium.ttf"),
    );

    const svg = await satori(
      <div
        style={{
          backgroundColor: "#272727",
          color: "white",
          fontSize: "14px",
          padding: "10px 12px",
          borderRadius: "6px",
          display: "flex",
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
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          {shortenIfAddress(address)}
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

    return res.status(200).json({ svg });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default handler;
