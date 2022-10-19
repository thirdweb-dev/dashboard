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
    const theme = searchParams.get("theme") || "dark";
    // Ignoring audited for now
    const audited = false;

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
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            flexDirection: "column",
          }}
        >
          <div>{shortenIfAddress(address)}</div>
          {audited ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "3px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill={`${theme === "dark" ? "#00FFB3" : "#0DAE4E"}`}
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm2.146 5.146a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647z"
                />
              </svg>
              <div style={{ marginLeft: "3px" }}>Audited</div>
            </div>
          ) : null}
        </div>
      </div>,
      {
        width: 200,
        height: audited ? 60 : 45,
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
