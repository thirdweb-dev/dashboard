import {
  AspectRatio,
  Box,
  Center,
  DarkMode,
  Flex,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";
import { CommunityCard } from "components/community/Card";
import { HomepageFooter } from "components/footer/Footer";
import { NewsletterSection } from "components/homepage/sections/NewsletterSection";
import { ProductSection } from "components/product-pages/common/ProductSection";
import { HomepageTopNav } from "components/product-pages/common/Topnav";
import { useTrack } from "hooks/analytics/useTrack";
import { NextSeo } from "next-seo";
import { PageId } from "page-id";
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
    title: "Learn web3 development",
    description: (
      <>
        Whether you&apos;re interested in web3 or thirdweb, our mission is to
        cultivate a community of <br /> like-minded individuals who share our
        passion for the future of decentralized technology.
      </>
    ),

    cards: [
      {
        image: "https://dummyimage.com/600x400/000/fff",
        link: "/learn",
        title: "thirdweb learn",
      },
      // {
      //   image: "https://dummyimage.com/600x400/000/fff",
      //   link: "/learn",
      //   title: "Bootcamp",
      // },
      {
        image: "https://dummyimage.com/600x400/000/fff",
        link: "/events",
        title: "Events",
      },
      {
        image: "https://dummyimage.com/600x400/000/fff",
        link: "/events",
        title: "Office Hours",
      },
    ],
  },
  {
    title: "Build innovative projects!",
    description:
      "From hackathons to bounties, open source to community projects, there are so many ways to build no matter your level of contribution. ",
    cards: [
      {
        image: "https://dummyimage.com/600x400/000/fff",
        link: "/events",
        title: "Hackathons",
      },
      {
        image: "https://dummyimage.com/600x400/000/fff",
        link: "https://www.notion.so/thirdweb/Paid-Projects-e090e7cefdc14c0f8e8ad6aa47dbdb74?pvs=4",
        title: "Projects",
      },
      {
        image: "https://dummyimage.com/600x400/000/fff",
        link: "https://thirdweb.notion.site/thirdweb-Bug-Bounty-Program-f78d1db776ab4f0e974c9da176fcf706",
        title: "Bug Bounty",
      },
      {
        image: "https://dummyimage.com/600x400/000/fff",
        link: "/oss",
        title: "OSS Contributions",
      },
    ],
  },
  {
    title: "Join the community!",
    description:
      "Explore programs to educate, host events, and showcase your achievements - together, we can take the web3 community to new heights!",
    cards: [
      {
        image: "https://dummyimage.com/600x400/000/fff",
        link: "https://ambassador.thirdweb.com/",
        title: "Ambassadors",
      },
      {
        image: "https://dummyimage.com/600x400/000/fff",
        link: "https://www.notion.so/thirdweb/University-Program-Page-e090e7cefdc14c0f8e8ad6aa47dbdb74?pvs=4",
        title: "University Program",
      },
      {
        image: "https://dummyimage.com/600x400/000/fff",
        link: "https://www.notion.so/thirdweb/Regional-Champions-Page-cebe9db7b2534162b0fd87e60039280c?pvs=4",
        title: "Regional Champions",
      },
      {
        image: "https://dummyimage.com/600x400/000/fff",
        link: "/",
        title: "Showcase",
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
            bg="#030A19"
          >
            <Image
              src="https://dummyimage.com/600x400/000/fff"
              alt="Image"
              width="450px"
              height="450px"
              objectFit="cover"
              borderRadius="lg"
            />

            <Heading mt={8} textAlign="center" fontSize="48px">
              A decentralized internet begins with <br /> decentralized talent.
            </Heading>

            <Flex
              mt={8}
              justify="center"
              align="center"
              gap={4}
              flexDir={{ base: "column", md: "row" }}
            >
              <LinkButton
                href="/learn"
                size="lg"
                onClick={() =>
                  trackEvent({
                    category: TRACKING_CATEGORY,
                    action: "click",
                    title: "Apply to thirdweb learn",
                  })
                }
                background="white"
                _hover={{
                  background: "white",
                  color: "#000",
                }}
                color="#000"
                fontSize="18px"
              >
                Apply to thirdweb learn
              </LinkButton>
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
                isExternal
                variant="outline"
                borderWidth="2px"
                py="22px"
                fontSize="18px"
                fontWeight="bold"
                textAlign="center"
                borderRadius="md"
              >
                Join the community
              </LinkButton>
            </Flex>
          </Center>

          {CommunitySections.map(({ title, cards, description }) => (
            <ProductSection py={{ base: 12, md: 24 }} key={title}>
              <Heading as="h2" textAlign="left" fontSize="36px">
                {title}
              </Heading>

              <Text mt={2} textAlign="left" color="paragraph" fontSize="24px">
                {description}
              </Text>

              <SimpleGrid
                columns={{ base: 1, md: 4 }}
                gap={{ base: 12, md: 6 }}
                py={{ base: 12, md: 8 }}
              >
                {cards.map(({ image, title: cTitle, link }) => (
                  <CommunityCard
                    key={cTitle}
                    image={image}
                    title={cTitle}
                    link={link}
                  />
                ))}
              </SimpleGrid>
            </ProductSection>
          ))}

          <Box
            h="1px"
            bg="linear-gradient(93.96deg, rgba(25, 26, 27, 0.8) 17.14%, rgba(24, 67, 78, 0.8) 36.78%, rgba(108, 47, 115, 0.8) 61%, rgba(25, 26, 27, 0.8) 79.98%)"
            opacity="0.8"
          />
          <Box
            h="1px"
            bg="linear-gradient(93.96deg, rgba(25, 26, 27, 0.8) 17.14%, rgba(24, 67, 78, 0.8) 36.78%, rgba(108, 47, 115, 0.8) 61%, rgba(25, 26, 27, 0.8) 79.98%)"
            opacity="0.8"
          />
        </Box>

        <ProductSection py={{ base: 12, md: 24 }}>
          <Heading size="title.2xl" as="h2" fontSize="36px" textAlign="center">
            and most importantly... have fun!
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
        </ProductSection>

        <NewsletterSection />
        <HomepageFooter />
      </Flex>
    </DarkMode>
  );
};

Community.pageId = PageId.Community;

export default Community;
