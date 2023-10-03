/** @type {import('next').NextConfig['rewrites']} */

const FRAMER_SITE = "https://smooth-selfies-126433.framer.app";
const FRAMER_PAGES = ["/smart-contracts", "/solutions*"];

function rewrites() {
  // FIXME: When all landing pages moved to framer,
  //        rewrite everything but dashboard routes instead
  const framerPages = FRAMER_PAGES.map((p) => {
    if (p.endsWith("*")) {
      const path = p.slice(0, -1);

      return {
        source: `${path}/:path*`,
        destination: `${FRAMER_SITE}${path}/:path*`,
      };
    }

    return {
      source: p,
      destination: `${FRAMER_SITE}${p}`,
    };
  });

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
