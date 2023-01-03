import { Box, DarkMode, Divider, Flex, Icon, Image } from "@chakra-ui/react";
import { ImMagicWand } from "@react-icons/all-files/im/ImMagicWand";
import { ChakraNextImage } from "components/Image";
import { HomepageFooter } from "components/footer/Footer";
import { AvatarShowcase } from "components/hackathon/common/AvatarShowcase";
import { ScheduleSection } from "components/hackathon/common/ScheduleSection";
import { Sponsors } from "components/hackathon/common/Sponsors";
import { CTAFooter } from "components/hackathon/gaming/CTAFooter";
import { FaqSection } from "components/hackathon/gaming/FAQSection";
import { Resources } from "components/hackathon/gaming/Resources";
import { HomepageTopNav } from "components/product-pages/common/Topnav";
import { HomepageSection } from "components/product-pages/homepage/HomepageSection";
import { isAfter } from "date-fns";
import { useTrack } from "hooks/analytics/useTrack";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import { PageId } from "page-id";
import { Heading, LinkButton } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const Timer = dynamic(() => import("components/hackathon/gaming/Timer"), {
  ssr: false,
});

const metadata = {
  title:
    "Join the 'Ready Player 3' Hackathon and Transform the Gaming World with Web3 and Unity!",
  description:
    "Unleash your full potential as a game dev and build the future of gaming with thirdweb's 'Ready Player 3' Hackathon. Supported by Coinbase and more.",
};

const sponsors = [
  {
    name: "Polygon",
    logo: "/assets/investors/coinbase.svg",
    link: "https://www.coinbase.com/",
  },
  {
    name: "Optimism",
    logo: "/assets/hackathon/sponsors/scenario.png",
    link: "https://scenario.gg/",
  },
  {
    name: "Fractal",
    logo: "/assets/hackathon/sponsors/aws.svg",
    link: "https://aws.amazon.com/",
  },
];

const judges = [
  {
    name: "Antonio Garcia Martinez",
    twitter: "antoniogm",
    image: "/assets/landingpage/samina.jpeg",
    company: "Spindl",
  },
  {
    name: "Justin Kan",
    twitter: "justinkan",
    image: "/assets/landingpage/farza.jpeg",
    company: "Fractal",
  },
  {
    name: "Emmanuel de Maistre",
    twitter: "emmanuel_2m",
    image: "/assets/landingpage/noah.png",
    company: "Scenario",
  },
  {
    name: "Kevin DeGods",
    twitter: "kevindegods",
    image: "/assets/landingpage/chris.jpg",
    company: "Dust Labs",
  },
  {
    name: "Sam Frankel",
    twitter: "sfrankel9",
    image: "/assets/landingpage/chris.jpg",
    company: "Coinbase",
  },
];

const mentors = [
  {
    name: "Ishan Sharma",
    twitter: "Ishansharma7390",
    image: "/assets/landingpage/samina.jpeg",
    company: "MarkItUp",
  },
  {
    name: "Daniel Eugene Botha",
    twitter: "hashlipsnft",
    image: "/assets/landingpage/farza.jpeg",
    company: "Hashlips & Edenlans",
  },
  {
    name: "Joaquim Verges",
    twitter: "joenrv",
    image: "/assets/landingpage/noah.png",
    company: "thirdweb",
  },
  {
    name: "Hubert Thieblot",
    twitter: "hthieblot",
    image: "/assets/landingpage/chris.jpg",
    company: "Founders, Inc.",
  },
];

const scheduleItems = [
  {
    day: "16 Jan",
    items: [
      {
        title: "Hackathon Kickoff + Intro to GamingKit",
        link: "",
        time: "1:00 PM ET",
      },
    ],
  },
  {
    day: "17 Jan",
    items: [
      {
        title: "Getting started with thirdweb",
        link: "",
        time: "1:00 PM ET",
      },
    ],
  },
  {
    day: "19 Jan",
    items: [
      {
        title: "Code-along: build a game with GamingKit",
        link: "",
        time: "1:00 PM ET",
      },
    ],
  },
  {
    day: "18 Jan",
    items: [
      {
        title: "Create AI-Generated in-game NFT Assets with Scenario.gg ",
        link: "",
        time: "1:00 PM ET",
      },
    ],
  },
  {
    day: "20 Jan",
    items: [
      {
        title: "Workshop with Optimism",
        link: "",
        time: "1:00 PM ET",
      },
    ],
  },
  {
    day: "21 Jan",
    items: [
      {
        title: "Workshop with Coinbase",
        link: "",
        time: "1:00 PM ET",
      },
    ],
  },
  {
    day: "25 Jan",
    items: [
      {
        title: "Devpost + Q/A",
        link: "",
        time: "1:00 PM ET",
      },
    ],
  },
  {
    day: "6 Feb",
    items: [
      {
        title: "Hackathon Closing Ceremony",
        link: "",
        time: "1:00 PM ET",
      },
    ],
  },
];

const ReadyPlayer3Landing: ThirdwebNextPage = () => {
  const trackEvent = useTrack();

  return (
    <DarkMode>
      <NextSeo
        title={metadata.title}
        description={metadata.description}
        openGraph={{
          title: metadata.title,
          url: "https://thirdweb.com/hackathon/gaming",
          description: metadata.description,
          images: [
            {
              url: "/assets/og-image/readyplayer3.jpg",
              width: 1200,
              height: 630,
              alt: "thirdweb gaming hackathon: January 16 - 31",
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
        bg="#000"
      >
        <HomepageTopNav />

        <Box maxW="100vw" mt="-100px" pt="100px" overflowX="hidden">
          <HomepageSection id="header" topGradient>
            <Flex
              flexDir="column"
              align="center"
              gap={12}
              mt={{ base: 12, md: 24 }}
            >
              {/*               <ChakraNextImage
                src="/assets/hackathon/readyplayer3.png"
                alt="Ready Player 3"
                width={300}
                height={30}
                w={{ base: "300px", md: "600px" }}
                objectFit="contain"
              /> */}
              <Flex flexDir="column" gap={2}>
                <Heading size="title.xl" textAlign="center">
                  Build the future of gaming
                </Heading>
                <Heading
                  bgImage="linear-gradient(128deg, #9945FF -9.03%, #14EE92 98.25%)"
                  bgClip="text"
                  size="display.lg"
                  textAlign="center"
                >
                  $10,000 in prizes
                </Heading>
                <Heading size="title.xl" textAlign="center">
                  Jan 16th - Jan 31st
                </Heading>
              </Flex>

              {isAfter(new Date(), new Date("2021-01-16T00:00:00.000Z")) ? (
                <>
                  <Timer date="2023-01-16T22:00:00" showSec={false} />
                  <LinkButton
                    href="https://thirdweb.typeform.com/to/zfrq8Jx0"
                    onClick={() =>
                      trackEvent({
                        category: "readyplayer3",
                        action: "click",
                        label: "register-now",
                      })
                    }
                    h="68px"
                    w={{ base: "100%", md: 96 }}
                    fontSize="20px"
                    leftIcon={<Icon as={ImMagicWand} />}
                    color="black"
                    flexShrink={0}
                    background="rgba(255,255,255,1)"
                    _hover={{
                      background: "rgba(255,255,255,0.9)!important",
                    }}
                    isExternal
                    noIcon
                  >
                    Register now
                  </LinkButton>
                </>
              ) : (
                <LinkButton
                  href="https://thirdweb.typeform.com/to/jta0ye4M"
                  onClick={() =>
                    trackEvent({
                      category: "readyplayer3",
                      action: "click",
                      label: "register-now",
                    })
                  }
                  h="68px"
                  w={{ base: "100%", md: 96 }}
                  fontSize="20px"
                  leftIcon={<Icon as={ImMagicWand} />}
                  color="black"
                  flexShrink={0}
                  background="rgba(255,255,255,1)"
                  _hover={{
                    background: "rgba(255,255,255,0.9)!important",
                  }}
                  isExternal
                  noIcon
                  isDisabled
                >
                  Submit Your Project
                </LinkButton>
              )}
            </Flex>
          </HomepageSection>

          <HomepageSection>
            <Sponsors sponsors={sponsors} hackathonName="ready-player-3" />
          </HomepageSection>
          <Divider mt={16} />

          <HomepageSection mt={12}>
            <Flex flexDir="column">
              <Heading size="title.2xl" textAlign="center">
                Prizes
              </Heading>
              <Image
                src="/assets/hackathon/prizes.png"
                alt="prizes"
                mt={8}
                mx="auto"
                maxW="100%"
                h={{ base: "auto", md: "400px" }}
                w={{ base: "100%", md: "auto" }}
              />
            </Flex>
          </HomepageSection>

          <AvatarShowcase
            title="Judges"
            trackingCategory="readyplayer3"
            avatars={judges}
          />
          <AvatarShowcase
            title="Mentors"
            trackingCategory="readyplayer3"
            avatars={mentors}
          />
          <Box
            w="full"
            h={{ base: "200px", md: "250px" }}
            background="linear-gradient(90deg, rgba(137, 253, 20, 0.4) 0%, rgba(47, 53, 201, 0.4) 36.52%, rgba(189, 17, 190, 0.4) 72.51%, rgba(65, 0, 172, 0.4) 100%)"
            filter="blur(150px)"
            transform="matrix(-1, 0, 0, 1, 0, 0)"
            mt="-150px"
            zIndex={0}
          />

          <HomepageSection>
            <ScheduleSection scheduleItems={scheduleItems} />
          </HomepageSection>

          <HomepageSection mt={{ base: 12, md: 24 }}>
            <Resources />
          </HomepageSection>

          <Box
            w="full"
            h={{ base: "200px", md: "250px" }}
            background="linear-gradient(90deg, rgba(137, 253, 20, 0.4) 0%, rgba(47, 53, 201, 0.4) 36.52%, rgba(189, 17, 190, 0.4) 72.51%, rgba(65, 0, 172, 0.4) 100%)"
            filter="blur(150px)"
            transform="matrix(-1, 0, 0, 1, 0, 0)"
            mt="-150px"
            zIndex={0}
          />

          <HomepageSection>
            <FaqSection />
          </HomepageSection>

          <CTAFooter />
          <HomepageFooter />
        </Box>
      </Flex>
    </DarkMode>
  );
};

ReadyPlayer3Landing.pageId = PageId.ReadyPlayer3Landing;

export default ReadyPlayer3Landing;
