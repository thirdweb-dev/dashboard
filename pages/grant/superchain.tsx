import { Flex, DarkMode } from "@chakra-ui/react";
import HeroSection from "components/grant/superchain/HeroSection";
import { HomepageTopNav } from "components/product-pages/common/Topnav";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { NextSeo } from "next-seo";
import { PageId } from "page-id";

const TRACKING_CATEGORY = "grant-superchain";

const title =
  "Game Developers Hackathon: Web3 Gaming Innovation at GDC 2024 | Earn Alliance & Thirdweb";

const description =
  "Game developers, join the Pixel Pioneers Hackathon at GDC 2024, hosted by Earn Alliance & ThirdWeb. Dive into Web3 game development for a 400K+ gamer community and lead blockchain gaming innovation. Sign Up Here.";

const HackathonEarn = () => {
  return (
    <DarkMode>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          title,
          url: `${getAbsoluteUrl()}/hackathon/earn`,
          description,
          images: [
            {
              url: `${getAbsoluteUrl()}/assets/og-image/earn-hackathon.png`,
              width: 1200,
              height: 630,
              alt: "Earn Alliance & Thirdweb Hackathon",
            },
          ],
        }}
      />
      <Flex
        sx={{
          // overwrite the theme colors because the home page is *always* in "dark mode"
          "--chakra-colors-heading": "#F2F2F7",
          "--chakra-colors-paragraph": "#AEAEB2",
          "--chakra-colors-borderColor": "rgba(255,255,255,0.1)",
        }}
        justify="center"
        flexDir="column"
        as="main"
      >
        <HomepageTopNav />
        <HeroSection trackingCategory={TRACKING_CATEGORY} />
      </Flex>
    </DarkMode>
  );
};

HackathonEarn.pageId = PageId.HackathonGrantSuperchain;

export default HackathonEarn;
