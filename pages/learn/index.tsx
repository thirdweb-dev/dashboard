import {
  Box,
  Center,
  DarkMode,
  Flex,
  Icon,
  LightMode,
  SimpleGrid,
} from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { HomepageFooter } from "components/footer/Footer";
import { NewsletterSection } from "components/homepage/sections/NewsletterSection";
import { Hero } from "components/product-pages/common/Hero";
import { ProductCard } from "components/product-pages/common/ProductCard";
import { ProductSection } from "components/product-pages/common/ProductSection";
import { HomepageTopNav } from "components/product-pages/common/Topnav";
import { HomepageSection } from "components/product-pages/homepage/HomepageSection";
import { useTrack } from "hooks/analytics/useTrack";
import { NextSeo } from "next-seo";
import { PageId } from "page-id";
import WhiteLogo from "public/assets/landingpage/white-logo.png";
import HeroImage from "public/assets/landingpage/hero.png";
import { BsLightningCharge } from "react-icons/bs";
import {
  Heading,
  LinkButton,
  Text,
} from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const TRACKING_CATEGORY = "learn";

const SEO = {
  title: "Learn | web3",
  description: "Learn web3 foundations and the thirdweb sdk",
};

const Learn: ThirdwebNextPage = () => {
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
          <Hero
            name="web3 and thirdweb sdk"
            title="Learn. Build. Grow."
            description={
              <>
                Accelerate your journey to become a web3 developer with our expert-led program.<br />
                Create powerful experiences using thirdweb.
              </>
            }
            trackingCategory={TRACKING_CATEGORY}
            buttonText="Join waitlist"
            type="Learn"
            buttonLink="https://forms.gle/7WfLNoFJ7dp67HeKA"
            gradient="linear-gradient(145.96deg, rgb(142 14 255) 5.07%, #16bdf0 100%)"
            image={HeroImage}
          >
          </Hero>
          <ProductSection py={{ base: 12, md: 24 }}>
            <Heading size="title.2xl" mb={12} as="h2" textAlign="center">
              Learn web3 Foundations and Beyond
            </Heading>

            <Text fontSize="large" mb={12}>
              thirdweb's mission is to accelerate web3 development by empowering individuals and organizations
              to get to market faster. By participating in our education program, you'll gain the skills, knowledge,
              and confidence to navigate teh rapidly-evolving web3 landscape.
              <br />
              <br />
              You'll be at the forefront of innovation, equipped with the expertise to build transformative solutions
              and drive the adoption of next-generation technologies.
              <br />
              <br />
              The program will incorporate a combination of lecture, exercises, and hands-on projects modeled off of
              real-world use cases, covering fundamental web3 concepts, distributed applications, and the thirdweb SDK.
            </Text>
          </ProductSection>
          <ProductSection>
            <SimpleGrid
              columns={{ base: 1, md: 3 }}
              gap={{ base: 12, md: 6 }}
              py={{ base: 12, md: 24 }}
            >
              {/* TODO: Browse / update icons */}
              <ProductCard
                title="Comprehensive curriculum"
                icon={require("/public/assets/product-pages/extensions/hero-icon-1.png")}
              >
                Learn essential web3 concepts and gain in-depth knowledge of the thirdweb SDK that empowers you to build secure, cutting-edge decentralized applications and get to market faster.
              </ProductCard>
              <ProductCard
                title="Expert-Led Training"
                icon={require("/public/assets/product-pages/extensions/hero-icon-3.png")}
              >
                Learn from industry-leading web3 developers who bring real-world experience and insights into the classroom, providing personalized guidance and support throughout the program.
              </ProductCard>
              <ProductCard
                title="Flexible Program Formats"
                icon={require("/public/assets/product-pages/extensions/hero-icon-2.png")}
              >
                Choose from a range of program formats, including self-paced courses, virtual workshops, or live bootcamps, to suit your learning style, schedule, and goals.
              </ProductCard>
            </SimpleGrid>
          </ProductSection>

          <ProductSection py={{ base: 12, md: 24 }}>
            <Heading size="title.2xl" as="h2" textAlign="center">
              Pick a Path
            </Heading>

            <SimpleGrid
              columns={{ base: 1, md: 3 }}
              gap={{ base: 12, md: 6 }}
              py={{ base: 12, md: 24 }}
            >
              <ProductCard
                title="NFT and Digital Asset Expert"
                icon={require("/public/assets/product-pages/dashboard/hero-icon-1.png")}
              >
                Learn how to create, manage, and integrate NFTs and other digital assets into dApps and platforms using thirdweb technologies.
              </ProductCard>
              <ProductCard
                title="dApp Developer"
                icon={require("/public/assets/product-pages/dashboard/hero-icon-1.png")}
              >
                Learn how to build secure and scalable dApps using the Thirdweb SDK and relevant programming languages.
              </ProductCard>
              <ProductCard
                title="Smart Contract Engineer"
                icon={require("/public/assets/product-pages/dashboard/hero-icon-1.png")}
              >
                Gain expertise in writing, testing, and deploying smart contracts on various blockchain platforms, integrating with the thirdweb SDK.
              </ProductCard>
            </SimpleGrid>
          </ProductSection>
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
        <HomepageSection id="get-started" bottomPattern>
          <Flex
            flexDir="column"
            pt={{ base: 12, lg: 24 }}
            pb={{ base: 24, lg: 0 }}
            align="center"
            gap={{ base: 6, md: 8 }}
          >
            <Center mb={6} pt={{ base: 8, lg: 24 }}>
              <Center p={2} position="relative" mb={6}>
                <Box
                  position="absolute"
                  bgGradient="linear(to-r, #F213A4, #040BBF)"
                  top={0}
                  left={0}
                  bottom={0}
                  right={0}
                  borderRadius="3xl"
                  overflow="visible"
                  filter="blur(15px)"
                />

                <ChakraNextImage
                  alt=""
                  boxSize={{ base: 24, md: 32 }}
                  placeholder="empty"
                  src={WhiteLogo}
                />
              </Center>
            </Center>
            <Heading as="h2" size="display.md" textAlign="center">
              Ready to learn more?
            </Heading>
            <LightMode>
              <LinkButton
                role="group"
                leftIcon={
                  <Icon
                    as={BsLightningCharge}
                    color="#1D64EF"
                    transitionDuration="slow"
                    transitionTimingFunction="easeOut"
                    _groupHover={{ color: "#E0507A" }}
                  />
                }
                color="black"
                px={20}
                py={{ base: 5, md: 7 }}
                onClick={() =>
                  trackEvent({
                    category: "cta-button",
                    action: "click",
                    label: "start",
                    title: "Join the waitlist",
                  })
                }
                textAlign="center"
                variant="gradient"
                fromcolor="#1D64EF"
                tocolor="#E0507A"
                size="lg"
                borderRadius="md"
                href="https://forms.gle/7WfLNoFJ7dp67HeKA"
              >
                <Box as="span" py={0.5}>
                  Join waitlist
                </Box>
              </LinkButton>
            </LightMode>
          </Flex>
        </HomepageSection>
        <NewsletterSection />
        <HomepageFooter />
      </Flex>
    </DarkMode>
  );
};

Learn.pageId = PageId.Learn;

export default Learn;
