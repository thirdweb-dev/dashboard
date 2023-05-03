import {
  Box,
  Center,
  Container,
  DarkMode,
  Flex,
  Icon,
  SimpleGrid,
} from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { CommunityCard } from "components/community/Card";
import { HomepageFooter } from "components/footer/Footer";
import { Aurora } from "components/homepage/Aurora";
import { HomepageTopNav } from "components/product-pages/common/Topnav";
import { useTrack } from "hooks/analytics/useTrack";
import { NextSeo } from "next-seo";
import { PageId } from "page-id";
import { BsLightningCharge } from "react-icons/bs";
import { Heading, LinkButton, Text } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const TRACKING_CATEGORY = "community";

const SEO = {
  title: "Join the Best Web3 Community | Learn, Build, Grow",
  description:
    "Join the thirdweb community and share your web3 journey alongside 35,000+ other builders. Learn, build, & grow with thirdweb.",
};

const communitySections = [
  {
    title1: "Learn",
    title2: "web3 development",
    description:
      "Whether you're interested in web3 or thirdweb, our mission is to cultivate a community of like-minded individuals who share our passion for the future of decentralized technology.",

    cards: [
      {
        image: "",
        link: "/learn",
        title: "thirdweb learn",
        description: "",
      },
      {
        image: "",
        link: "/events",
        title: "Events",
        description: "",
      },
      {
        image: "",
        link: "https://lu.ma/0js9ms13",
        title: "Office Hours",
        description: "",
      },
    ],
  },
  {
    title1: "Build",
    title2: "innovative projects",
    description:
      "From hackathons to bounties, open source to community projects, there are so many ways to build no matter your level of contribution. ",
    cards: [
      {
        image: "",
        link: "/events",
        title: "Hackathons",
        description: "",
      },
      {
        image: "",
        link: "https://www.notion.so/thirdweb/Paid-Projects-e090e7cefdc14c0f8e8ad6aa47dbdb74?pvs=4",
        title: "Projects",
        description: "",
      },
      {
        image: "",
        link: "https://thirdweb.notion.site/thirdweb-Bug-Bounty-Program-f78d1db776ab4f0e974c9da176fcf706",
        title: "Bug Bounty",
        description: "",
      },
      {
        image: "",
        link: "/open-source",
        title: "OSS Contributions",
        description: "",
      },
    ],
  },
  {
    title1: "Join",
    title2: "the community",
    description:
      "Explore programs to educate, host events, and showcase your achievements - together, we can take the web3 community to new heights!",
    cards: [
      {
        image: "",
        link: "https://ambassador.thirdweb.com/",
        title: "Ambassadors",
        description: "",
      },
      {
        image: "",
        link: "https://www.notion.so/thirdweb/University-Program-Page-e090e7cefdc14c0f8e8ad6aa47dbdb74?pvs=4",
        title: "University Program",
        description: "",
      },
    ],
  },
];

const Community: ThirdwebNextPage = () => {
  const trackEvent = useTrack();

  return (
    <DarkMode>
      <NextSeo {...SEO} />
      <Flex
        sx={{
          // overwrite the theme colors because the home page is *always* in "dark mode"
          "--chakra-colors-heading": "#F2F2F7",
          "--chakra-colors-paragraph": "#AEAEB2",
          "--chakra-colors-borderColor": "rgba(255,255,255,0.1)",
          "--product-accent-color": "rgba(24, 67, 78, 0.8)",
        }}
        justify="center"
        flexDir="column"
        as="main"
        bg="#000"
      >
        <HomepageTopNav />
        <Box maxW="100vw" mt="-100px" py="100px" overflowX="hidden">
          <Container zIndex={1} position="relative" maxW="container.page">
            <Aurora
              pos={{ left: "50%", top: "50%" }}
              size={{ width: "2000px", height: "2000px" }}
              color="hsl(280deg 78% 30% / 30%)"
            />

            <Center
              py={{ base: 12, md: 24 }}
              px={{ base: 4, md: 8 }}
              flexDir="column"
            >
              <Heading mt={8} textAlign="center" size="title.2xl">
                A decentralized internet begins
                <br /> with{" "}
                <Heading
                  as="span"
                  size="title.2xl"
                  background="linear-gradient(243.9deg, #BFA3DA 21.81%, #84309C 48.81%, #C735B0 86.61%), #ECECEC"
                  backgroundClip="text"
                  color="transparent"
                >
                  decentralized talent.
                </Heading>
              </Heading>

              <LinkButton
                href="https://discord.gg/thirdweb"
                size="lg"
                onClick={() =>
                  trackEvent({
                    category: TRACKING_CATEGORY,
                    action: "click",
                    title: "join-the-community",
                  })
                }
                background="white"
                _hover={{
                  background: "white",
                  color: "#000",
                }}
                color="#000"
                fontSize="larger"
                leftIcon={<Icon as={BsLightningCharge} />}
                mt={8}
                isExternal
                rightIcon={<></>}
              >
                Join the community
              </LinkButton>
            </Center>
          </Container>

          {communitySections.map(
            ({ title1, title2, cards, description }, i) => (
              <Box
                w="100%"
                as="section"
                zIndex={2}
                position="relative"
                key={title1}
              >
                <Box
                  h="1px"
                  bg="#3F3F3F"
                  opacity="0.8"
                  maxW="container.page"
                  display={i === 0 ? "none" : "block"}
                  mx="auto"
                />

                <Container
                  maxW="container.page"
                  position="relative"
                  py={{ base: 12, md: 24 }}
                >
                  <Heading
                    as="h2"
                    textAlign="left"
                    size="title.2xl"
                    color="#ECECEC"
                  >
                    {title1}{" "}
                    <Heading
                      as="span"
                      size="title.2xl"
                      color="transparent"
                      background="linear-gradient(249.19deg, #BFA3DA 53.72%, #84309C 78.01%, #C735B0 112.02%), #ECECEC"
                      backgroundClip="text"
                    >
                      {title2}
                    </Heading>
                  </Heading>

                  <Text
                    mt={2}
                    textAlign="left"
                    size="body.xl"
                    color="white"
                    opacity={0.7}
                    maxW="container.md"
                  >
                    {description}
                  </Text>

                  <SimpleGrid
                    columns={{ base: 2, sm: 3, md: 4 }}
                    gap={{ base: 12, md: 6 }}
                    py={{ base: 12, md: 8 }}
                  >
                    {cards.map(
                      ({
                        image,
                        title: cardTitle,
                        link,
                        description: cardDescription,
                      }) => (
                        <CommunityCard
                          key={cardTitle}
                          image={image}
                          title={cardTitle}
                          link={link}
                          description={cardDescription}
                        />
                      ),
                    )}
                  </SimpleGrid>
                </Container>
              </Box>
            ),
          )}

          <Box
            h="1px"
            bg="#3F3F3F"
            opacity="0.8"
            maxW="container.page"
            mx="auto"
          />
        </Box>

        <Container maxW="container.page" position="relative" py={12}>
          <Heading as="h2" size="title.2xl" textAlign="center">
            and most importantly...{" "}
            <Heading
              as="span"
              size="title.2xl"
              color="transparent"
              background="linear-gradient(249.19deg, #BFA3DA 53.72%, #84309C 78.01%, #C735B0 112.02%), #ECECEC"
              backgroundClip="text"
            >
              have fun!
            </Heading>
          </Heading>

          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            gap={{ base: 12, md: 6 }}
            py={{ base: 12, md: 8 }}
          >
            {Array.from({ length: 9 }).map((_, i) => (
              <ChakraNextImage
                key={i}
                src={`/assets/community/gallery/${i + 1}.png`}
                alt="thirdweb gallery image"
                width="350"
                height="350"
                objectFit="cover"
              />
            ))}
          </SimpleGrid>
        </Container>

        <Center px={{ base: 4, md: 8 }} flexDir="column" mb={10}>
          <Heading mt={8} size="display.md">
            Start
            <Heading
              as="span"
              size="display.md"
              background="linear-gradient(248.71deg, #BFA3DA 53.44%, #84309C 72.94%, #C735B0 100.23%), #ECECEC"
              backgroundClip="text"
              color="transparent"
            >
              {" "}
              building{" "}
            </Heading>
            today.
          </Heading>

          <LinkButton
            href="https://discord.gg/thirdweb"
            size="lg"
            onClick={() =>
              trackEvent({
                category: TRACKING_CATEGORY,
                action: "click",
                title: "join-the-community",
              })
            }
            background="white"
            _hover={{
              background: "white",
              color: "#000",
            }}
            color="#000"
            fontSize="larger"
            leftIcon={<Icon as={BsLightningCharge} />}
            mt={4}
            isExternal
            rightIcon={<></>}
          >
            Join the community
          </LinkButton>
        </Center>

        <HomepageFooter />
      </Flex>
    </DarkMode>
  );
};

Community.pageId = PageId.Community;

export default Community;
