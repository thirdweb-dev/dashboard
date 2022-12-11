/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@vercel/og";

// Make sure the font exists in the specified path:
export const config = {
  runtime: "experimental-edge",
};

const bgImgUrl = new URL("./assets/background.png", import.meta.url).toString();
const hexImgUrl = new URL("./assets/hexagon.png", import.meta.url).toString();

const inter400_ = fetch(
  new URL("../fonts/inter/400.ttf", import.meta.url),
).then((res) => res.arrayBuffer());
const inter500_ = fetch(
  new URL("../fonts/inter/500.ttf", import.meta.url),
).then((res) => res.arrayBuffer());
const inter700_ = fetch(
  new URL("../fonts/inter/700.ttf", import.meta.url),
).then((res) => res.arrayBuffer());

const ibmPlexMono400_ = fetch(
  new URL("../fonts/ibm-plex-mono/400.ttf", import.meta.url),
).then((res) => res.arrayBuffer());
const ibmPlexMono500_ = fetch(
  new URL("../fonts/ibm-plex-mono/500.ttf", import.meta.url),
).then((res) => res.arrayBuffer());
const ibmPlexMono700_ = fetch(
  new URL("../fonts/ibm-plex-mono/700.ttf", import.meta.url),
).then((res) => res.arrayBuffer());

export const OgBrandIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="59"
    height="36"
    viewBox="0 0 59 36"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.157801 3.02898C-0.425237 1.57299 0.661334 0 2.25144 0H12.1233C13.0509 0 13.8725 0.545996 14.217 1.39099L22.0747 20.7869C22.2868 21.3068 22.2868 21.8918 22.0747 22.4248L17.1322 34.6058C16.3769 36.4647 13.7002 36.4647 12.9449 34.6058L0.157801 3.02898ZM19.227 2.96398C18.697 1.52099 19.7835 0 21.3471 0H29.9469C30.901 0 31.7491 0.584996 32.0671 1.45599L39.2093 20.8519C39.3816 21.3328 39.3816 21.8658 39.2093 22.3598L34.916 34.0208C34.2005 35.9707 31.3913 35.9707 30.6757 34.0208L19.227 2.96398ZM38.5336 0C36.9435 0 35.8569 1.57299 36.4399 3.02898L49.227 34.6058C49.9823 36.4647 52.659 36.4647 53.4143 34.6058L58.3569 22.4248C58.5689 21.8918 58.5689 21.3068 58.3569 20.7869L50.4991 1.39099C50.1546 0.545996 49.333 0 48.4055 0H38.5336Z"
      fill="white"
      fillOpacity="0.5"
    />
  </svg>
);

const MAX_LENGTH = 190;

function descriptionShortener(description: string) {
  let words = [];
  let currentLength = 0;
  for (const word of description.split(" ")) {
    // +1 for the space
    if (currentLength + word.length + 1 > MAX_LENGTH) {
      break;
    }
    words.push(word);
    currentLength += word.length + 1;
  }
  if (words[words.length - 1].length < 4) {
    words = words.slice(0, -1);
  }
  if (words[words.length - 1].endsWith(".")) {
    return words.join(" ");
  }
  return `${words.join(" ")} ...`;
}

const desc = `A decentralized profile for every wallet. It's like your
about.me page back in the day. A decentralized profile for every wallet. It's like your
about.me page back in the day. A decentralized profile for every wallet. It's like your
about.me page back in the day. A decentralized profile for every wallet. It's like your
about.me page back in the day.`;

export default async function handler() {
  const inter400 = await inter400_;
  const inter500 = await inter500_;
  const inter700 = await inter700_;
  const ibmPlexMono400 = await ibmPlexMono400_;
  const ibmPlexMono500 = await ibmPlexMono500_;
  const ibmPlexMono700 = await ibmPlexMono700_;
  return new ImageResponse(
    (
      <div
        tw="w-full h-full flex justify-center py-20 px-16"
        // eslint-disable-next-line react/forbid-dom-props
        style={{
          background: "#0D0D12",
          fontFamily: "Inter",
          backgroundImage: `url(${bgImgUrl})`,
          backgroundSize: "cover",
        }}
      >
        {/* the actual component starts here */}

        <div tw="w-full h-full flex flex-col justify-between">
          {/* title descritpion and profile image */}
          <div tw="flex justify-between items-start w-full">
            <div tw="flex flex-col flex-shrink">
              <div tw="flex items-center">
                <img alt="" src={hexImgUrl} tw="w-14 h-14 mr-4 rounded-xl" />
                <h1 tw="text-6xl font-bold text-white">eth.bio</h1>
              </div>
              <p tw="text-3xl font-medium text-gray-400 max-w-4xl">
                {descriptionShortener(desc)}
              </p>
            </div>
            <div tw="flex flex-col shrink-0 items-center">
              <img
                alt=""
                tw="w-32 h-32 rounded-full"
                src={`https://source.boringavatars.com/marble/120/jns.eth?colors=264653,2a9d8f,e9c46a,f4a261,e76f51&square=true`}
              />
              <h2 tw="text-2xl text-white font-medium max-w-full">jns.eth</h2>
            </div>
          </div>
          <div tw="flex justify-between w-full items-end">
            <ul
              tw="list-none flex-col text-white font-medium text-2xl"
              // eslint-disable-next-line react/forbid-dom-props
              style={{ fontFamily: "IBM Plex Mono" }}
            >
              <li tw="">ERC-721, ERC-221</li>
              <li tw="">MIT License</li>
              <li tw="">
                <span>Oct 9, 1990</span>
              </li>
              <li tw="">Version 1.0.1</li>
            </ul>
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
          data: inter400,
          name: "Inter",
          weight: 400,
        },
        {
          data: inter500,
          name: "Inter",
          weight: 500,
        },
        {
          data: inter700,
          name: "Inter",
          weight: 700,
        },
        {
          data: ibmPlexMono400,
          name: "IBM Plex Mono",
          weight: 400,
        },
        {
          data: ibmPlexMono500,
          name: "IBM Plex Mono",
          weight: 500,
        },
        {
          data: ibmPlexMono700,
          name: "IBM Plex Mono",
          weight: 700,
        },
      ],
    },
  );
}
