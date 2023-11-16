import { Box, DarkMode, Divider, Flex, Icon, ListItem } from "@chakra-ui/react";
import { ImMagicWand } from "@react-icons/all-files/im/ImMagicWand";
import { ChakraNextImage } from "components/Image";
import FAQ from "components/hackathon/FAQ";
import { HackathonFooter } from "components/hackathon/HackathonFooter";
import { Judges } from "components/hackathon/Judges";
import { PrizeSection } from "components/hackathon/PrizeSection";
import Reason from "components/hackathon/Reason";
import { ScheduleSection } from "components/hackathon/ScheduleSection";
import { Sponsors } from "components/hackathon/Sponsors";
import { Aurora } from "components/homepage/Aurora";
import { HomepageTopNav } from "components/product-pages/common/Topnav";
import { HomepageSection } from "components/product-pages/homepage/HomepageSection";
import { useTrack } from "hooks/analytics/useTrack";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import { PageId } from "page-id";
import { Heading, LinkButton, Text, TrackedLink } from "tw-components";

const List = dynamic(
  () => import("@chakra-ui/react").then((result) => result.List),
  {
    ssr: false,
  },
);

const Timer = dynamic(() => import("components/hackathon/Timer"), {
  ssr: false,
});

const TRACKING_CATEGORY = "hackathon";

const Hackathon = () => {
  const trackEvent = useTrack();
  return (
    <DarkMode>
      <NextSeo
        title="thirdweb Solanathon: October 19 - 26 | Build web3 apps, win $10,000"
        description="Join thirdweb's first-ever official hackathon! Solanathon is a 7-day event with $10,000 in prizes for inspiring web3 builders on Solana. Learn more."
        openGraph={{
          title:
            "thirdweb Solanathon: October 19 - 26 | Build web3 apps, win $10,000",
          url: "https://thirdweb.com/hackathon/solanathon",
          description:
            "Join thirdweb's first-ever official hackathon! Solanathon is a 7-day event with $10,000 in prizes for inspiring web3 builders on Solana. Learn more.",
          images: [
            {
              url: "https://thirdweb.com/assets/og-image/solanathon.jpg",
              width: 1200,
              height: 630,
              alt: "thirdweb Solanathon: October 19 - 26",
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
        <HomepageSection id="header">
          <Flex
            flexDir="column"
            align="center"
            gap={10}
            mt={{ base: 12, md: 24 }}
            zIndex={2}
            position="relative"
          >
            <ChakraNextImage
              src={require("public/assets/landingpage/block-left.png")}
              alt="hackathon-block-left"
              maxW="xl"
              position="absolute"
              left={-375}
              top={0}
              display={{ base: "none", lg: "flex" }}
            />

            <ChakraNextImage
              src={require("public/assets/landingpage/block-transparent.png")}
              alt="hackathon-block-left"
              maxW="230"
              position="absolute"
              right={200}
              top={-100}
              display={{ base: "none", lg: "flex" }}
            />

            {/* right */}
            <Aurora
              pos={{ left: "50%", top: "0" }}
              size={{ width: "100vw", height: "1000px" }}
              color="hsl(260deg 100% 55% / 30%)"
            />

            <ChakraNextImage
              src={require("public/assets/landingpage/base-tw-logo.svg")}
              alt="Hackathon"
              maxW={{ base: "full", md: "xl" }}
            />

            <ChakraNextImage
              src={require("public/assets/landingpage/consumer-crypto-logo.svg")}
              alt="Hackathon"
              maxW={{ base: "full", lg: "5xl" }}
            />
            <Heading
              size="title.sm"
              color="white"
              opacity={0.7}
              letterSpacing={5}
              textAlign="center"
            >
              DECEMBER 8 - 10
            </Heading>

            <Timer />

            <LinkButton
              href="https://docs.google.com/forms/d/1CT8LPG1DrcpTKAW38ScVzTcyBNwS6ANOk6xpfjpXLAs/edit"
              onClick={() =>
                trackEvent({
                  category: "hackathon",
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
          </Flex>
        </HomepageSection>
        <HomepageSection>
          <Sponsors />
        </HomepageSection>
        <Divider mt={16} />

        <Flex flexDir={"column"} gap={180}>
          <PrizeSection />
          <Reason />

          <HomepageSection>
            <ScheduleSection />
          </HomepageSection>

          <HomepageSection>
            <Flex flexDir="column" alignItems="center" gap={8}>
              <Heading size="title.2xl" textStyle="center">
                Guidelines
              </Heading>
              <Flex flexDir="column" gap={4} maxW={907}>
                <Text size="body.xl" color="white">
                  To be eligible to win the hackathon, submitted projects must
                  fulfill the following requirements:
                </Text>
                <Text size="body.xl">
                  <List color="white">
                    <ListItem>
                      - Built using thirdweb&apos;s products within any of the
                      following categories: Wallets, Smart Contracts, Payments,
                      Infrastructure (Engine)
                    </ListItem>
                    <ListItem>
                      - Must be deployed on Base testnet or mainnet
                    </ListItem>
                    <ListItem>- Code must be open-source</ListItem>
                    <ListItem>
                      - Project must be submitted through GitHub, with a
                      descriptive README file detailing the project (what it is,
                      what the goals are, and how you built it)
                    </ListItem>
                  </List>
                </Text>
                <Text size="body.xl" color="white">
                  Participants will be able to submit their project to the form
                  in the hackathon landing page before the deadline, on December
                  10th at 9:00am PST.
                  <TrackedLink
                    href="https://discord.gg/thirdweb"
                    category="solanathon"
                    label="discord"
                    textDecoration="underline"
                  >
                    discord
                  </TrackedLink>{" "}
                  if you have any questions.
                </Text>
              </Flex>
            </Flex>
          </HomepageSection>

          <HomepageSection>
            <Flex
              flexDir="column"
              alignItems="center"
              gap={8}
              position={"relative"}
            >
              <Box
                pointerEvents={"none"}
                width="100vw"
                height={{ base: "800px", md: "1000px" }}
                position="absolute"
                zIndex={-1}
                top="55%"
                left="50%"
                transform="translate(-50%, -50%)"
                backgroundImage={`radial-gradient(ellipse at center, hsl(300deg 90% 50% / 15%), transparent 60%)`}
              />
              <Heading size="title.2xl" textStyle="center">
                Judging Criteria
              </Heading>
              <Flex flexDir="column" gap={4}>
                <Text size="body.xl" color="white">
                  Our judges will grade submissions across 3 equally-weighted
                  categories:
                </Text>
                <Text size="body.xl" color="white">
                  <List>
                    <ListItem>
                      <b>1. Usability:</b> How useful or valuable is the
                      product? How feasible is the idea?
                    </ListItem>
                    <ListItem>
                      <b>2. Ecosystem Impact:</b> How impactful and useful is
                      this app in the Base ecosystem as a whole?
                    </ListItem>
                    <ListItem>
                      <b>3. Originality, Creativity, and Innovation:</b> How
                      novel is the project versus existing technologies?
                    </ListItem>
                  </List>
                </Text>
              </Flex>
            </Flex>
          </HomepageSection>

          <Judges />

          <FAQ TRACKING_CATEGORY={TRACKING_CATEGORY} />

          <HackathonFooter />
        </Flex>
      </Flex>
    </DarkMode>
  );
};

Hackathon.pageId = PageId.HackathonLanding;

export default Hackathon;
