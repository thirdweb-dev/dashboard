/** @type {import('next').NextConfig['rewrites']} */

const FRAMER_SITE = "https://smooth-selfies-126433.framer.app";

// FIXME: When all landing pages moved to framer,
//        rewrite everything but dashboard routes instead

const FRAMER_PAGES = ["/smart-contracts"];

function rewrites() {
  const framerPages = FRAMER_PAGES.map((p) => ({
    source: p,
    destination: FRAMER_SITE,
  }));

  return {
    beforeFiles: [
      ...framerPages,
      {
        source: "/thirdweb.eth",
        destination: "/deployer.thirdweb.eth",
      },
      {
        source: "/thirdweb.eth/:path*",
        destination: "/deployer.thirdweb.eth/:path*",
      },
    ],
  };
}

module.exports = rewrites;
