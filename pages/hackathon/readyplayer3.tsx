import {
  Box,
  DarkMode,
  Divider,
  Flex,
  Icon,
  Image,
  List,
  ListItem,
} from "@chakra-ui/react";
import { ImMagicWand } from "@react-icons/all-files/im/ImMagicWand";
import { ClientOnly } from "components/ClientOnly/ClientOnly";
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
import { Heading, LinkButton, Text } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const Timer = dynamic(() => import("components/hackathon/common/Timer"), {
  ssr: false,
});

const metadata = {
  title:
    "Join the 'Ready Player 3' Hackathon and Transform the Gaming World with Web3 and Unity!",
  description:
    "Unleash your full potential as a game dev and build the future of gaming with thirdweb's 'Ready Player 3' Hackathon. Supported by Coinbase Cloud and more.",
};

const sponsors = [
  {
    name: "Coinbase",
    logo: "/assets/investors/coinbase.svg",
    link: "https://www.coinbase.com/",
  },
  {
    name: "AWS activate",
    logo: "/assets/hackathon/sponsors/aws.svg",
    link: "https://aws.amazon.com/",
  },
  {
    name: "Scenario",
    logo: "/assets/hackathon/sponsors/scenario.png",
    link: "https://scenario.gg/",
  },
  {
    name: "Consensus",
    logo: "/assets/hackathon/sponsors/consensus.png",
    link: "https://www.coindesk.com/consensus/",
  },
  {
    name: "Spindl",
    logo: "/assets/hackathon/sponsors/spindl.png",
    link: "https://www.spindl.xyz/",
  },
  {
    name: "Optimism",
    logo: "/assets/hackathon/sponsors/optimism.png",
    link: "https://www.optimism.io/",
  },
  {
    name: "Fractal",
    logo: "/assets/hackathon/sponsors/fractal.png",
    link: "https://www.fractal.is/",
  },
];

const judges = [
  {
    name: "Antonio Garcia Martinez",
    twitter: "antoniogm",
    image: "/assets/landingpage/antonio-garcia.jpg",
    company: "Spindl",
  },
  {
    name: "Justin Kan",
    twitter: "justinkan",
    image: "/assets/landingpage/justin-kan.jpg",
    company: "Fractal",
  },
  {
    name: "Emmanuel de Maistre",
    twitter: "emmanuel_2m",
    image: "/assets/landingpage/emmanuel.jpg",
    company: "Scenario",
  },
  {
    name: "Kevin DeGods",
    twitter: "kevindegods",
    image: "/assets/landingpage/kevin-degods.png",
    company: "Dust Labs",
  },
  {
    name: "Sam Frankel",
    twitter: "sfrankel9",
    image: "/assets/landingpage/sam-frankel.jpg",
    company: "Coinbase",
  },
];

const mentors = [
  {
    name: "Drew Falkman",
    twitter: "drewfalkman",
    image: "/assets/landingpage/drew-falkman2.jpg",
    company: "frens",
  },
  {
    name: "Daniel Eugene Botha",
    twitter: "hashlipsnft",
    image: "/assets/landingpage/hashlips.jpg",
    company: "Hashlips & Edenlans",
  },
  {
    name: "Joaquim Verges",
    twitter: "joenrv",
    image: "/assets/landingpage/joaquim-verges.png",
    company: "thirdweb",
  },
  {
    name: "Hubert Thieblot",
    twitter: "hthieblot",
    image: "/assets/landingpage/hubert-thieblot.jpg",
    company: "Founders, Inc.",
  },
];

const scheduleItems = [
  {
    day: 16,
    month: "jan",
    title: "Hackathon Kickoff + Intro to GamingKit",
    href: "https://lu.ma/rp3kickoff",
  },
  {
    day: 17,
    month: "jan",
    title: "Getting started with thirdweb",
    href: "https://lu.ma/rp3gettingstarted",
  },
  {
    day: 18,
    month: "jan",
    title: "Create AI-Generated in-game NFT Assets with Scenario.gg",
    href: "https://lu.ma/rp3scenario",
  },
  {
    day: 19,
    month: "jan",
    title: "thirdweb & Coinbase Cloud Code-Along: Build With GamingKit",
    href: "https://lu.ma/rp3gamecodealong",
  },
  {
    day: 23,
    month: "jan",
    title: "Workshop with Spindl",
    href: "https://lu.ma/rp3spindl",
  },
  {
    day: 24,
    month: "jan",
    title: "Fireside Chat with Fractal",
    href: "https://lu.ma/rp3fractal",
  },

  {
    day: 25,
    month: "jan",
    title: "How To Create Your Hackathon Submission on DevPost + Q&A",
    href: "https://lu.ma/rp3submissions",
  },
  {
    day: 6,
    month: "feb",
    title: "Hackathon Closing Ceremony + Winners Announcement",
    href: "https://lu.ma/rp3closing",
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
              url: "https://thirdweb.com/assets/og-image/readyplayer3.png",
              width: 1440,
              height: 880,
              alt: "thirdweb gaming hackathon: January 16 - 31",
            },
          ],
        }}
      />

      <Flex
        overflow={"hidden"}
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
        position="relative"
      >
        <Box
          data-testid="homepage"
          pointerEvents={"none"}
          width="2400px"
          height="2400px"
          position="absolute"
          zIndex={1}
          top="200px"
          left="50%"
          transform="translate(-50%, -50%)"
          backgroundImage={`radial-gradient(ellipse at center, #ff00a745, transparent 60%)`}
        ></Box>

        <HomepageTopNav />

        <Box maxW="100vw" overflowX="hidden">
          <HomepageSection id="header">
            <Flex
              flexDir="column"
              align="center"
              gap={12}
              mt={{ base: 12, md: 24 }}
            >
              <Box
                filter="hue-rotate(100deg) brightness(2.6) contrast(0.8)"
                mb={8}
              >
                <ChakraNextImage
                  src="/assets/hackathon/readyplayer3.png"
                  alt="Ready Player 3"
                  width={200}
                  height={50}
                />
              </Box>

              <Flex flexDir="column" gap={2}>
                <Heading
                  fontSize={{ base: "32px", md: "84px" }}
                  letterSpacing="-0.05em"
                  // bg="linear-gradient(0deg, #ff9ef8 -9.03%, #ffffff 98.25%)"
                  // bgClip={"text"}
                  textAlign="center"
                >
                  Build the future of gaming
                </Heading>
                <Text
                  // bgImage="linear-gradient(0deg, #b7fb63 -9.03%, #ffffff 98.25%)"
                  // bgClip="text"
                  fontSize={{ base: "32px", md: "48px" }}
                  textAlign="center"
                  letterSpacing="-0.03em"
                  color="#f014a5"
                  mb={8}
                  fontWeight={700}
                >
                  $100,000 in prizes
                </Text>
                <Text
                  fontSize="24px"
                  textAlign="center"
                  fontWeight={700}
                  color="white"
                >
                  Jan 16th - Jan 31st
                </Text>
              </Flex>

              <ClientOnly ssr={null}>
                <Flex alignItems={"center"} flexDirection="column">
                  {isAfter(new Date(), new Date("2021-01-16T00:00:00.000Z")) ? (
                    <>
                      <Timer date="2023-01-16T22:00:00" />
                      <LinkButton
                        href="https://readyplayer3.devpost.com/"
                        onClick={() =>
                          trackEvent({
                            category: "readyplayer3",
                            action: "click",
                            label: "register-now",
                          })
                        }
                        px={14}
                        py={8}
                        fontSize="24px"
                        leftIcon={<Icon as={ImMagicWand} />}
                        color="black"
                        flexShrink={0}
                        background="white"
                        _hover={{
                          background: "white !important",
                          boxShadow: "0 0 40px rgb(251 26 164 / 44%)",
                        }}
                        boxShadow="0 0 40px rgb(251 26 164 / 34%)"
                        isExternal
                        noIcon
                        mt={12}
                        gap={2}
                      >
                        Register now
                      </LinkButton>
                    </>
                  ) : (
                    <LinkButton
                      href=""
                      onClick={() =>
                        trackEvent({
                          category: "readyplayer3",
                          action: "click",
                          label: "submit-project",
                        })
                      }
                      h="68px"
                      w={{ base: "100%", md: 96 }}
                      fontSize="20px"
                      leftIcon={<Icon as={ImMagicWand} />}
                      color="black"
                      flexShrink={0}
                      background="white"
                      _hover={{
                        background: "white !important",
                      }}
                      isExternal
                      noIcon
                      isDisabled
                    >
                      Submit Your Project
                    </LinkButton>
                  )}
                </Flex>
              </ClientOnly>
            </Flex>
          </HomepageSection>

          <HomepageSection pt={32}>
            <Sponsors sponsors={sponsors} hackathonName="ready-player-3" />
          </HomepageSection>
          <Divider mt={16} />

          <HomepageSection mt={12}>
            <Flex flexDir="column">
              <Heading size="title.2xl" textAlign="center">
                Prizes & Perks
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
              <Flex flexDir="column" gap={4} mb={{ base: 8, md: 24 }}>
                <Text size="body.lg">
                  In addition to these prizes, participating teams also have an
                  opportunity to receive:
                </Text>
                <Box fontSize="body.lg">
                  <List>
                    <ListItem>
                      - Top 3 teams of &apos;Main Build Track&apos; will receive
                      Pro Tickets ($1,700 value each) to Consensus 2023
                      Presented by CoinDesk
                    </ListItem>
                    <ListItem>
                      - Top 3 teams receive a complimentary 1-Year Subscription
                      to Scenario.gg
                    </ListItem>
                    <ListItem>
                      - All participating teams with a submitted project are
                      eligible for up to $5,000 in AWS credits (as long as
                      they&apos;ve not previously been an AWS credit recipient)
                    </ListItem>
                    <ListItem>
                      - All participating teams with a project submitted will
                      receive 1-month free of Scenario.gg
                    </ListItem>
                  </List>
                </Box>
              </Flex>
            </Flex>
          </HomepageSection>

          <HomepageSection>
            <AvatarShowcase
              title="Judges"
              trackingCategory="readyplayer3"
              avatars={judges}
            />

            <Box
              data-testid="homepage"
              pointerEvents={"none"}
              width="2400px"
              height="2400px"
              position="absolute"
              zIndex={-1}
              top="20%"
              left="50%"
              transform="translate(-50%, -50%)"
              backgroundImage={`radial-gradient(ellipse at center, #ff00a745, transparent 60%)`}
            ></Box>
          </HomepageSection>

          <AvatarShowcase
            title="Mentors"
            trackingCategory="readyplayer3"
            avatars={mentors}
          />

          {/* <Box
            w="full"
            h={{ base: "200px", md: "250px" }}
            background="linear-gradient(90deg, rgba(137, 253, 20, 0.4) 0%, rgba(47, 53, 201, 0.4) 36.52%, rgba(189, 17, 190, 0.4) 72.51%, rgba(65, 0, 172, 0.4) 100%)"
            filter="blur(150px)"
            transform="matrix(-1, 0, 0, 1, 0, 0)"
            mt="-150px"
            zIndex={0}
          /> */}

          <HomepageSection>
            <ScheduleSection scheduleItems={scheduleItems} />
          </HomepageSection>

          <HomepageSection mt={{ base: 12, md: 24 }}>
            <Resources />
          </HomepageSection>

          {/* <Box
            w="full"
            h={{ base: "200px", md: "250px" }}
            background="linear-gradient(90deg, rgba(137, 253, 20, 0.4) 0%, rgba(47, 53, 201, 0.4) 36.52%, rgba(189, 17, 190, 0.4) 72.51%, rgba(65, 0, 172, 0.4) 100%)"
            filter="blur(150px)"
            transform="matrix(-1, 0, 0, 1, 0, 0)"
            mt="-150px"
            zIndex={0}
          /> */}

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
