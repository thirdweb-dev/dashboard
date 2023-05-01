import {
  AspectRatio,
  Box,
  Center,
  Container,
  DarkMode,
  Flex,
  Icon,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";
import { CommunityCard } from "components/community/Card";
import { HomepageFooter } from "components/footer/Footer";
import { HomepageTopNav } from "components/product-pages/common/Topnav";
import { useTrack } from "hooks/analytics/useTrack";
import { NextSeo } from "next-seo";
import { PageId } from "page-id";
import { FiZap } from "react-icons/fi";
import { Heading, LinkButton, Text } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const TRACKING_CATEGORY = "community";

const SEO = {
  title: "Learn Web3 Development | Web3 Course | thirdweb",
  description:
    "Learn everything you need to know about web3 development — whether you&apos;re a beginner or a full-stack developer. Get started with thirdweb.",
};

const CommunitySections = [
  {
    title1: "Learn",
    title2: "web3 development",
    description:
      "Whether you're interested in web3 or thirdweb, our mission is to cultivate a community of like-minded individuals who share our passion for the future of decentralized technology.",

    cards: [
      {
        image: "https://dummyimage.com/270x170/000/fff",
        link: "/learn",
        title: "thirdweb learn",
        description:
          "This is a short description about this section and what it offers.",
      },
      // {
      //   image: "https://dummyimage.com/270x170/000/fff",
      //   link: "/learn",
      //   title: "Bootcamp",
      // description: "This is a short description about this section and what it offers."
      // },
      {
        image: "https://dummyimage.com/270x170/000/fff",
        link: "/events",
        title: "Events",
        description:
          "This is a short description about this section and what it offers.",
      },
      {
        image: "https://dummyimage.com/270x170/000/fff",
        link: "/events",
        title: "Office Hours",
        description:
          "This is a short description about this section and what it offers.",
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
        image: "https://dummyimage.com/270x170/000/fff",
        link: "/events",
        title: "Hackathons",
        description:
          "This is a short description about this section and what it offers.",
      },
      {
        image: "https://dummyimage.com/270x170/000/fff",
        link: "https://www.notion.so/thirdweb/Paid-Projects-e090e7cefdc14c0f8e8ad6aa47dbdb74?pvs=4",
        title: "Projects",
        description:
          "This is a short description about this section and what it offers.",
      },
      {
        image: "https://dummyimage.com/270x170/000/fff",
        link: "https://thirdweb.notion.site/thirdweb-Bug-Bounty-Program-f78d1db776ab4f0e974c9da176fcf706",
        title: "Bug Bounty",
        description:
          "This is a short description about this section and what it offers.",
      },
      {
        image: "https://dummyimage.com/270x170/000/fff",
        link: "/oss",
        title: "OSS Contributions",
        description:
          "This is a short description about this section and what it offers.",
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
        image: "https://dummyimage.com/270x170/000/fff",
        link: "https://ambassador.thirdweb.com/",
        title: "Ambassadors",
        description:
          "This is a short description about this section and what it offers.",
      },
      {
        image: "https://dummyimage.com/270x170/000/fff",
        link: "https://www.notion.so/thirdweb/University-Program-Page-e090e7cefdc14c0f8e8ad6aa47dbdb74?pvs=4",
        title: "University Program",
        description:
          "This is a short description about this section and what it offers.",
      },
      {
        image: "https://dummyimage.com/270x170/000/fff",
        link: "https://www.notion.so/thirdweb/Regional-Champions-Page-cebe9db7b2534162b0fd87e60039280c?pvs=4",
        title: "Regional Champions",
        description:
          "This is a short description about this section and what it offers.",
      },
      {
        image: "https://dummyimage.com/270x170/000/fff",
        link: "/",
        title: "Showcase",
        description:
          "This is a short description about this section and what it offers.",
      },
    ],
  },
];

const galleryImages = [
  {
    src: "/assets/community/gallery/1.png",
    alt: "Image",
  },
  {
    src: "/assets/community/gallery/2.png",
    alt: "Image",
  },
  {
    src: "/assets/community/gallery/3.png",
    alt: "Image",
  },
  {
    src: "/assets/community/gallery/4.png",
    alt: "Image",
  },
  {
    src: "/assets/community/gallery/5.png",
    alt: "Image",
  },
  {
    src: "/assets/community/gallery/6.png",
    alt: "Image",
  },
  {
    src: "/assets/community/gallery/7.png",
    alt: "Image",
  },
  {
    src: "/assets/community/gallery/8.png",
    alt: "Image",
  },
  {
    src: "/assets/community/gallery/9.png",
    alt: "Image",
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
        {/* pull it up by as much as the topnav is tall */}
        <Box mt="-80px" overflowX="hidden">
          <Center
            py={{ base: 12, md: 24 }}
            px={{ base: 4, md: 8 }}
            flexDir="column"
          >
            <Heading mt={8} textAlign="center" fontSize="64px">
              A decentralized internet begins
              <br /> with{" "}
              <Text
                as="span"
                fontSize="48px"
                fontWeight="bold"
                background="linear-gradient(243.9deg, #BFA3DA 21.81%, #84309C 48.81%, #C735B0 86.61%), #ECECEC"
                backgroundClip="text"
                color="transparent"
              >
                decentralized talent.
              </Text>
            </Heading>

            <LinkButton
              href="https://discord.gg/thirdweb"
              size="lg"
              onClick={() =>
                trackEvent({
                  category: TRACKING_CATEGORY,
                  action: "click",
                  title: "Join the community",
                })
              }
              background="white"
              _hover={{
                background: "white",
                color: "#000",
              }}
              color="#000"
              fontSize="18px"
              leftIcon={<Icon as={FiZap} />}
              mt={8}
            >
              Join the community
            </LinkButton>
          </Center>

          {CommunitySections.map(
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
                    fontSize="48px"
                    color="#ECECEC"
                  >
                    {title1}{" "}
                    <Text
                      as="span"
                      fontSize="48px"
                      color="transparent"
                      fontWeight="bold"
                      background="linear-gradient(249.19deg, #BFA3DA 53.72%, #84309C 78.01%, #C735B0 112.02%), #ECECEC"
                      backgroundClip="text"
                    >
                      {title2}
                    </Text>
                  </Heading>

                  <Text
                    mt={2}
                    textAlign="left"
                    fontSize="20px"
                    color="white"
                    opacity={0.7}
                    maxW="container.md"
                  >
                    {description}
                  </Text>

                  <SimpleGrid
                    columns={{ base: 1, md: 4 }}
                    gap={{ base: 12, md: 6 }}
                    py={{ base: 12, md: 8 }}
                  >
                    {cards.map(
                      ({
                        image,
                        title: cTitle,
                        link,
                        description: cdescription,
                      }) => (
                        <CommunityCard
                          key={cTitle}
                          image={image}
                          title={cTitle}
                          link={link}
                          description={cdescription}
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
          <Heading size="title.2xl" as="h2" fontSize="48px" textAlign="center">
            and most importantly...{" "}
            <Text
              as="span"
              fontSize="48px"
              color="transparent"
              fontWeight="bold"
              background="linear-gradient(249.19deg, #BFA3DA 53.72%, #84309C 78.01%, #C735B0 112.02%), #ECECEC"
              backgroundClip="text"
            >
              have fun!
            </Text>
          </Heading>

          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            gap={{ base: 12, md: 6 }}
            py={{ base: 12, md: 8 }}
          >
            {galleryImages.slice(0, 9).map((image) => (
              <AspectRatio ratio={1} key={image.src} w="100%">
                <Image
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  w="100%"
                  objectFit="cover"
                />
              </AspectRatio>
            ))}
          </SimpleGrid>
        </Container>

        <Center px={{ base: 4, md: 8 }} flexDir="column" mb={10}>
          <Heading mt={8} textAlign="center" fontSize="64px">
            Start
            <Text
              as="span"
              fontSize="64px"
              fontWeight="bold"
              background="linear-gradient(248.71deg, #BFA3DA 53.44%, #84309C 72.94%, #C735B0 100.23%), #ECECEC"
              backgroundClip="text"
              color="transparent"
            >
              {" "}
              building{" "}
            </Text>
            today.
          </Heading>

          <LinkButton
            href="https://discord.gg/thirdweb"
            size="lg"
            onClick={() =>
              trackEvent({
                category: TRACKING_CATEGORY,
                action: "click",
                title: "Join the community",
              })
            }
            background="white"
            _hover={{
              background: "white",
              color: "#000",
            }}
            color="#000"
            fontSize="18px"
            leftIcon={<Icon as={FiZap} />}
            mt={4}
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
