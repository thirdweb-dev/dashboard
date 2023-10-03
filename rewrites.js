/** @type {import('next').NextConfig['rewrites']} */

const FRAMER_SITE = "https://smooth-selfies-126433.framer.app";

function rewrites() {
  return [
    {
      source: "/",
      destination: FRAMER_SITE,
    },
    {
      source: "/thirdweb.eth",
      destination: "/deployer.thirdweb.eth",
    },
    {
      source: "/thirdweb.eth/:path*",
      destination: "/deployer.thirdweb.eth/:path*",
    },
  ];
}

module.exports = rewrites;
