/* eslint-disable jsx-a11y/alt-text */

/* eslint-disable @next/next/no-img-element */

/* eslint-disable react/forbid-dom-props */
import { ImageResponse } from "@vercel/og";
import chroma from "chroma-js";
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

function generateGradient(colors: string[]) {
  const scale = chroma
    .scale(colors)
    .mode("lab")
    .correctLightness()
    .colors(7, "hex");

  return `linear-gradient(30deg, ${scale.join(", ")})`;
}

export default function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    let colors = searchParams.getAll("color");
    if (colors.length === 0) {
      colors = ["F213A4"];
    }
    colors = colors.slice(0, 3);
    colors = ["5204bf", ...colors];
    colors = [...new Set(colors)];
    const gradient = generateGradient(colors);

    const logo = searchParams.get("logo");

    return new ImageResponse(
      (
        <div
          style={{
            backgroundImage: gradient,

            height: "100%",
            width: "100%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            padding: 40,
          }}
        >
          <div
            style={{
              display: "flex",
              height: "100%",
              width: "100%",
              backgroundColor: "black",
              borderRadius: 40,
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
              padding: 80,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{ height: 330, width: 330 }}
              viewBox="0 0 1617 1617"
              fill="none"
            >
              <g clip-path="url(#clip0_305_71)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.4734 395.727C-3.46176 355.543 26.2356 312.13 69.6952 312.13H339.507C364.858 312.13 387.312 327.199 396.729 350.52L611.491 885.826C617.286 900.178 617.286 916.323 611.491 931.033L476.405 1267.21C455.761 1318.52 382.604 1318.52 361.961 1267.21L12.4734 395.727ZM533.645 393.933C519.158 354.108 548.856 312.13 591.591 312.13H826.635C852.71 312.13 875.889 328.276 884.581 352.314L1079.79 887.62C1084.49 900.895 1084.49 915.605 1079.79 929.239L962.446 1251.07C942.889 1304.89 866.11 1304.89 846.554 1251.07L533.645 393.933ZM1061.32 312.13C1017.86 312.13 988.161 355.543 1004.1 395.727L1353.58 1267.21C1374.23 1318.52 1447.38 1318.52 1468.03 1267.21L1603.11 931.033C1608.91 916.323 1608.91 900.178 1603.11 885.826L1388.35 350.52C1378.94 327.199 1356.48 312.13 1331.13 312.13H1061.32Z"
                  fill="url(#paint0_linear_305_71)"
                />
              </g>
              <defs>
                <linearGradient
                  id="paint0_linear_305_71"
                  x1="808.874"
                  y1="77.539"
                  x2="1912.85"
                  y2="1564.29"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#F213A4" />
                  <stop offset="1" stop-color="#5204BF" />
                </linearGradient>
                <clipPath id="clip0_305_71">
                  <rect
                    width="1600"
                    height="993.743"
                    fill="white"
                    transform="translate(8 312)"
                  />
                </clipPath>
              </defs>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              style={{ height: 64, width: 64, margin: "0 128px" }}
              viewBox="0 0 460.775 460.775"
            >
              <path
                fill="rgba(255,255,255,0.9)"
                d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55  c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55  c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505  c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55  l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719  c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"
              />
            </svg>
            {logo && (
              <img
                src={logo}
                style={{ height: 256, width: 256, objectFit: "contain" }}
              />
            )}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
