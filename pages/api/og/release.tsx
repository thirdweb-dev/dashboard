/* eslint-disable react/forbid-dom-props */

/* eslint-disable @next/next/no-img-element */
import { Resvg, initWasm } from "@resvg/resvg-wasm";
import { ImageResponse } from "@vercel/og";
import { replaceIpfsUrl } from "components/app-layouts/providers";
import { OgBrandIcon } from "components/og/og-brand-icon";
import { correctAndUniqueLicenses } from "lib/licenses";
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

async function _renderSvg(svg: string) {
  try {
    await initWasm(
      fetch(
        new URL(
          "../../../node_modules/@resvg/resvg-wasm/index_bg.wasm",
          import.meta.url,
        ),
      ),
    );
    // eslint-disable-next-line no-empty
  } catch (e) {}

  const resvg = new Resvg(svg);

  const resolved = await Promise.all(
    resvg.imagesToResolve().map(async (url) => {
      const img = await fetch(url);
      const buffer = await img.arrayBuffer();
      return {
        url,
        buffer: Buffer.from(buffer),
      };
    }),
  );
  if (resolved.length > 0) {
    for (const result of resolved) {
      const { url, buffer } = result;
      resvg.resolveImage(url, buffer);
    }
  }

  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  return `data:image/png;base64,${_arrayBufferToBase64(pngBuffer)}`;
}

const hexagonData = fetch(
  new URL("../../../assets/images/hexagon.png", import.meta.url),
).then((res) => res.arrayBuffer());

const fonts = Promise.all([
  fetch(
    new URL("../../../assets/fonts/Inter-Regular.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer()),
  fetch(new URL("../../../assets/fonts/Inter-Bold.ttf", import.meta.url)).then(
    (res) => res.arrayBuffer(),
  ),
  fetch(
    new URL("../../../assets/fonts/IBMPlexMono-Regular.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer()),
]);

function _arrayBufferToBase64(buffer: ArrayBuffer) {
  return Buffer.from(buffer).toString("base64");
}

export default async function (req: NextRequest) {
  const [interRegular, interBold, ibmPlexMono] = await fonts;
  const { searchParams } = req.nextUrl;
  const name = searchParams.get("name");
  const description = searchParams.get("description");
  const releaser = searchParams.get("releaser");
  const releaserAvatar = searchParams.get("releaserAvatar");
  const extension = searchParams.getAll("extension");
  const license = searchParams.getAll("license");
  const releaseLogo = searchParams.get("releaseLogo");
  const version = searchParams.get("version");
  const releaseDate = searchParams.get("releaseDate");

  const img = releaserAvatar
    ? replaceIpfsUrl(releaserAvatar)
    : `https://source.boringavatars.com/marble/120/${releaser}?colors=264653,2a9d8f,e9c46a,f4a261,e76f51&square=true`;

  const hexagonB64 = await hexagonData.then(
    (aBuff) => `data:image/png;base64,${_arrayBufferToBase64(aBuff)}`,
  );
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" version="1.1">
  <mask id="myMask">
      <image href="${hexagonB64}" width="400px" height="400px" x="0" y="0"></image>
    </mask>
    <image mask="url(#myMask)" href="${img}" width="400px" height="400px" x="0" y="0"></image>
  </svg>`;
  const releaserLogo = releaserAvatar
    ? await _renderSvg(svg)
    : `https://source.boringavatars.com/marble/120/${releaser}?colors=264653,2a9d8f,e9c46a,f4a261,e76f51&square=true`;

  return new ImageResponse(
    (
      <div
        style={{
          fontFamily: "Inter",
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: "black",
          overflow: "hidden",
          color: "white",
          display: "flex",
        }}
      >
        <img
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            top: 0,
            width: "33%",
          }}
          alt=""
          height="100%"
          src="https://thirdweb.com/assets/og-image/purple-gradient.png"
        />
        <img
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            top: 0,
            width: "33%",
          }}
          alt=""
          height="100%"
          src="https://thirdweb.com/assets/og-image/blue-gradient.png"
        />
        <div
          style={{
            padding: "70px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "18px",
                flexGrow: 0,
                width: "890px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "14px",
                }}
              >
                {releaseLogo && (
                  <img
                    style={{ flexShrink: 0, width: "64px", height: "64px" }}
                    alt=""
                    height="64px"
                    width="64px"
                    src={replaceIpfsUrl(releaseLogo)}
                  />
                )}
                <h2
                  style={{
                    flexGrow: 1,
                    width: "100%",
                    fontSize: "64px",
                    fontWeight: 700,

                    margin: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {name}
                </h2>
              </div>
              {description && (
                <p
                  style={{
                    opacity: 0.75,
                    fontSize: 32,
                    lineHeight: 1.5,
                  }}
                >
                  {description}
                </p>
              )}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 0,
                flexShrink: 0,
                alignItems: "center",
              }}
            >
              <img src={releaserLogo} width={128} height={128} />
              <h2
                style={{
                  fontSize: 24,
                  lineHeight: 1.5,
                  fontWeight: 300,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                {releaser}
              </h2>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {extension && extension.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    height: 24,
                    marginBottom: 12,
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      height: 24,
                      width: 24,
                      marginRight: 12,
                    }}
                  >
                    <g clipPath="url(#clip0)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13.5002 1.5L15.0002 0H22.5002L24.0002 1.5V9L22.5002 10.5H15.0002L13.5002 9V1.5ZM15.0002 1.5V9H22.5002V1.5H15.0002ZM0.000244141 15V6L1.50024 4.5H9.00024L10.5002 6V13.5H18.0002L19.5002 15V22.5L18.0002 24H10.5002H9.00024H1.50024L0.000244141 22.5V15ZM9.00024 13.5V6H1.50024V13.5H9.00024ZM9.00024 15H1.50024V22.5H9.00024V15ZM10.5002 22.5H18.0002V15H10.5002V22.5Z"
                        fill="rgba(255, 255, 255, 0.5)"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0">
                        <rect
                          width="24"
                          height="24"
                          fill="white"
                          transform="translate(0.000244141)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <h4
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontWeight: 300,
                      color: "rgba(255,255,255,0.75)",
                      fontSize: 24,
                      lineHeight: 24,
                    }}
                  >
                    {Array.isArray(extension)
                      ? extension.join(", ")
                      : extension}
                  </h4>
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  height: 24,
                  marginBottom: 12,
                }}
              >
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    height: 24,
                    width: 24,
                    marginRight: 12,
                  }}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.5002 2H9.00024L8.65027 2.15002L8.00024 2.79004L7.35022 2.15002L7.00024 2H1.50024L1.00024 2.5V12.5L1.50024 13H6.79022L7.65027 13.85H8.35022L9.21027 13H14.5002L15.0002 12.5V2.5L14.5002 2ZM7.50024 12.3199L7.32025 12.15L7.00024 12H2.00024V3H6.79022L7.53027 3.73999L7.50024 12.3199ZM14.0002 12H9.00024L8.65027 12.15L8.51025 12.28V3.69995L9.21027 3H14.0002V12ZM6.00024 5H3.00024V6H6.00024V5ZM6.00024 9H3.00024V10H6.00024V9ZM3.00024 7H6.00024V8H3.00024V7ZM13.0002 5H10.0002V6H13.0002V5ZM10.0002 7H13.0002V8H10.0002V7ZM10.0002 9H13.0002V10H10.0002V9Z"
                    fill="rgba(255, 255, 255, 0.5)"
                  />
                </svg>
                <h4
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontWeight: 300,
                    color: "rgba(255,255,255,0.75)",
                    fontSize: 24,
                    lineHeight: 24,
                  }}
                >
                  {correctAndUniqueLicenses(
                    Array.isArray(license) ? license : license ? [license] : [],
                  ).join(", ")}
                </h4>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  height: 24,
                  marginBottom: 12,
                }}
              >
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    height: 24,
                    width: 24,
                    marginRight: 12,
                  }}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.00024 12.5L7.50024 13H14.5002L15.0002 12.5V3.5L14.5002 3H7.50024L7.00024 3.5L7.00024 12.5ZM9.00024 5L13.0002 5V11L9.00024 11L9.00024 5ZM5.00024 9V5H6.00024V4H4.50024L4.00024 4.5V9V9.5V11.5L4.50024 12H6.00024V11H5.00024V9.5V9ZM2.00024 8V6H3.00024V5H1.50024L1.00024 5.5V8V8.5V10.5L1.50024 11H3.00024V10H2.00024V8.5V8Z"
                    fill="rgba(255, 255, 255, 0.5)"
                  />
                </svg>
                <h4
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontWeight: 300,
                    color: "rgba(255,255,255,0.75)",
                    fontSize: 24,
                    lineHeight: 24,
                  }}
                >
                  {version}
                </h4>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  height: 24,
                }}
              >
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    height: 24,
                    width: 24,
                    marginRight: 12,
                  }}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.5002 2H13.0002V1H12.0002V2H4.00024V1H3.00024V2H1.50024L1.00024 2.5V14.5L1.50024 15H14.5002L15.0002 14.5V2.5L14.5002 2ZM14.0002 14H2.00024V5H14.0002V14ZM14.0002 4H2.00024V3H14.0002V4ZM4.00024 8H3.00024V9H4.00024V8ZM3.00024 10H4.00024V11H3.00024V10ZM4.00024 12H3.00024V13H4.00024V12ZM6.00024 8H7.00024V9H6.00024V8ZM7.00024 10H6.00024V11H7.00024V10ZM6.00024 12H7.00024V13H6.00024V12ZM7.00024 6H6.00024V7H7.00024V6ZM9.00024 8H10.0002V9H9.00024V8ZM10.0002 10H9.00024V11H10.0002V10ZM9.00024 12H10.0002V13H9.00024V12ZM10.0002 6H9.00024V7H10.0002V6ZM12.0002 8H13.0002V9H12.0002V8ZM13.0002 10H12.0002V11H13.0002V10ZM12.0002 6H13.0002V7H12.0002V6Z"
                    fill="rgba(255, 255, 255, 0.5)"
                  />
                </svg>
                <h4
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontWeight: 300,
                    color: "rgba(255,255,255,0.75)",
                    fontSize: 24,
                    lineHeight: 24,
                  }}
                >
                  {releaseDate}
                </h4>
              </div>
            </div>
            <OgBrandIcon />
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter",
          data: interRegular,
          weight: 400,
          style: "normal",
        },
        {
          name: "Inter",
          data: interBold,
          weight: 700,
          style: "normal",
        },
        {
          name: "IBM Plex Mono",
          data: ibmPlexMono,
          weight: 400,
          style: "normal",
        },
      ],
      // debug: true,
    },
  );
}
