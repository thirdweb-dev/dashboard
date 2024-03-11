import { Flex, DarkMode, Container, Box } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { HomepageFooter } from "components/footer/Footer";
import HeroSection from "components/grant/superchain/HeroSection";
import { LandingGridSection } from "components/landing-pages/grid-section";
import { LandingIconSectionItem } from "components/landing-pages/icon-section-item";
import { HomepageTopNav } from "components/product-pages/common/Topnav";
import { HomepageSection } from "components/product-pages/homepage/HomepageSection";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { NextSeo } from "next-seo";
import { PageId } from "page-id";
import {
  Card,
  Heading,
  Text,
  TrackedLink,
  TrackedLinkButton,
} from "tw-components";

const TRACKING_CATEGORY = "grant-superchain";

const title = "Apply for a Grant | Superchain App Accelerator";

const description =
  "The Superchain App Accelerator is a $3M fund for developers to build seamless onchain apps — powered by Optimism and thirdweb. Apply for a grant.";

const superchains = [
  {
    id: "optimism",
    name: "Optimism",
    link: "https://thirdweb.com/optimism",
    src: require("public/assets/grant/superchain/icon-op.png"),
    left: "2%",
  },
  {
    id: "fraxtal",
    name: "Fraxtal",
    link: "https://thirdweb.com/fraxtal",
    src: require("public/assets/grant/superchain/icon-fraxtal.png"),
    left: "17%",
  },
  {
    id: "base",
    name: "Base",
    link: "https://thirdweb.com/base",
    src: require("public/assets/grant/superchain/icon-base.png"),
    left: "31.5%",
  },
  {
    id: "lisk",
    name: "Lisk",
    link: "https://thirdweb.com/lisk-sepolia-testnet",
    src: require("public/assets/grant/superchain/icon-lisk.png"),
    left: "46.5%",
  },
  {
    id: "zora",
    name: "Zora",
    link: "https://thirdweb.com/zora",
    src: require("public/assets/grant/superchain/icon-zora.png"),
    left: "61.5%",
  },
  {
    id: "mode",
    name: "Mode",
    link: "https://thirdweb.com/mode",
    src: require("public/assets/grant/superchain/icon-mode.png"),
    left: "76.5%",
  },
  {
    id: "redstone",
    name: "Redstone",
    link: "https://thirdweb.com/redstone-holesky-testnet",
    src: require("public/assets/grant/superchain/icon-redstone.png"),
    left: "91.2%",
  },
];

const GrantSuperChain = () => {
  return (
    <DarkMode>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          title,
          url: `${getAbsoluteUrl()}/grant/superchain`,
          description,
          images: [
            {
              url: `${getAbsoluteUrl()}/assets/og-image/superchain.png`,
              width: 1200,
              height: 630,
              alt: title,
            },
          ],
        }}
      />
      <Flex
        justify="center"
        flexDir="column"
        as="main"
        sx={{
          // overwrite the theme colors because the home page is *always* in "dark mode"
          "--chakra-colors-heading": "#F2F2F7",
          "--chakra-colors-paragraph": "#AEAEB2",
          "--chakra-colors-borderColor": "rgba(255,255,255,0.1)",
        }}
      >
        <HomepageTopNav />
        <HeroSection trackingCategory={TRACKING_CATEGORY} />

        <HomepageSection id="header" mb={60}>
          <Flex flexDir="column" gap={{ base: "80px", md: "120px" }}>
            <Flex flexDir="column" gap="56px">
              <Container maxW={907} mt={28}>
                <Heading as="h1" size="title.2xl" mb={6} textAlign="center">
                  What do I receive?
                </Heading>

                <Flex flexDir="column" gap={8}>
                  <Text
                    textAlign="center"
                    size="body.xl"
                    color="rgba(255, 255, 255, 0.70)"
                    lineHeight="36px"
                  >
                    The Superchain App Accelerator is a $3M fund for developers
                    to build seamless apps on any Superchain network — created
                    in partnership with Optimism.
                  </Text>
                </Flex>
              </Container>

              <LandingGridSection>
                <LandingIconSectionItem
                  icon={require("public/assets/grant/superchain/icon-smart-wallet.svg")}
                  title="Empower users with smart accounts"
                  description="Create seamless experiences for users with smart accounts — we'll cover the gas."
                />
                <LandingIconSectionItem
                  icon={require("public/assets/grant/superchain/icon-dashboard.svg")}
                  title="Use our dashboard for free"
                  description="Deploy smart contracts, mint NFTs, & perform any onchain action on the thirdweb Dashboard — for free."
                />
                <LandingIconSectionItem
                  icon={require("public/assets/grant/superchain/icon-tool.svg")}
                  title="Use our full-stack web3 dev tools"
                  description="Build your app without any friction with frontend, backend, and onchain tools."
                />
              </LandingGridSection>
            </Flex>

            <Flex flexDir="column" alignItems="center" gap="56px">
              <Container maxW={907} mt={28}>
                <Heading as="h1" size="title.2xl" mb={6} textAlign="center">
                  How do I apply?
                </Heading>

                <Flex flexDir="column" gap={8}>
                  <Text
                    textAlign="center"
                    size="body.xl"
                    color="rgba(255, 255, 255, 0.70)"
                    lineHeight="36px"
                  >
                    This program is designed to support remove builders working
                    on high-potential apps and projects that will push the space
                    forward.
                  </Text>

                  <Text
                    textAlign="center"
                    size="body.xl"
                    color="rgba(255, 255, 255, 0.70)"
                    lineHeight="36px"
                  >
                    Select your chain below, connect your wallet, and fill out
                    the form to apply for a grant.
                  </Text>
                </Flex>
              </Container>

              <Flex position="relative" px={{ base: 6, lg: 12 }}>
                <ChakraNextImage
                  src={require("public/assets/grant/superchain/chains.png")}
                  alt="chains"
                  display={{ base: "none", lg: "flex" }}
                />

                <Flex
                  flexWrap="wrap"
                  alignItems="center"
                  justifyContent="center"
                  gap="19px"
                >
                  {superchains.map(({ id, name, src, link, ...rest }) => {
                    return (
                      <TrackedLink
                        key={id}
                        href={link}
                        category={TRACKING_CATEGORY}
                        label={id}
                      >
                        {/* Desktop */}
                        <Flex
                          flexDir="column"
                          alignItems="center"
                          position="absolute"
                          zIndex={3}
                          w="7%"
                          display={{ base: "none", lg: "flex" }}
                          bottom="-23%"
                          transition="transform 150ms ease"
                          _hover={{
                            transform: "scale(1.1)",
                          }}
                          {...rest}
                        >
                          <ChakraNextImage src={src} alt={id} />

                          <Text
                            textAlign="center"
                            fontSize="14px"
                            fontWeight={500}
                            color="#fff"
                            mt="16px"
                          >
                            {name}
                          </Text>
                        </Flex>

                        {/* Mobile */}

                        <Card
                          flexDir="column"
                          alignItems="center"
                          padding="14px"
                          transition="border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease"
                          _hover={{
                            borderColor: "blue.500",
                            boxShadow: "0 0 16px hsl(215deg 100% 60% / 30%)",
                            transform: "scale(1.01)",
                          }}
                          display={{ base: "flex", lg: "none" }}
                          w="full"
                          maxW="120px"
                        >
                          <ChakraNextImage
                            src={src}
                            alt={id}
                            w="74px"
                            h="74px"
                          />

                          <Text
                            textAlign="center"
                            fontSize="14px"
                            fontWeight={500}
                            color="#fff"
                            mt="16px"
                          >
                            {name}
                          </Text>
                        </Card>
                      </TrackedLink>
                    );
                  })}
                </Flex>
              </Flex>
            </Flex>

            <Flex
              flexDir="column"
              alignItems="center"
              mt={{ base: "120px", lg: "271px" }}
            >
              <Container maxW="100%">
                <Heading as="h1" size="title.2xl" mb={6} textAlign="center">
                  Become a Superchain Builder
                </Heading>

                <Flex flexDir="column" gap={8}>
                  <Text
                    textAlign="center"
                    size="body.xl"
                    color="rgba(255, 255, 255, 0.70)"
                    lineHeight="36px"
                  >
                    For more information on the Superchain App Accelerator, read
                    announcement blog entry below.
                  </Text>
                </Flex>
              </Container>

              <Box
                borderRadius="12px"
                position="relative"
                padding="45px"
                minHeight={{ base: "auto", md: "360px" }}
                width="full"
                bg="black"
                border="1px solid #26282f"
                mt={16}
              >
                <ChakraNextImage
                  userSelect="none"
                  position="absolute"
                  borderRadius="12px"
                  top="0"
                  left="0"
                  right="0"
                  bottom="0"
                  width="100%"
                  height="100%"
                  objectFit="cover"
                  alt=""
                  src={require("public/assets/grant/superchain/blog-background.png")}
                  display={{ base: "none", md: "flex" }}
                />

                <Box position="relative" zIndex="2">
                  <Flex
                    flexDir="column"
                    gap="27px"
                    maxWidth="600px"
                    alignItems={{ base: "center", md: "flex-start" }}
                  >
                    <ChakraNextImage
                      src={require("public/assets/grant/superchain/logo-dashboard.png")}
                      alt="logo"
                      mb={{ base: 5, md: "16px" }}
                      w="full"
                      maxW={{ base: "230px", md: "133px" }}
                    />

                    <Heading
                      fontWeight="600"
                      color="white"
                      textAlign={{ base: "center", md: "left" }}
                      as="h1"
                      size="title.lg"
                      maxW="md"
                    >
                      Accelerating the Superchain with Optimism
                    </Heading>
                    <Text
                      fontSize="medium"
                      fontWeight="400"
                      color="white"
                      textAlign={{ base: "center", md: "left" }}
                    >
                      [subheader]
                    </Text>
                    <TrackedLinkButton
                      variant="outline"
                      isExternal
                      bgColor="#FFF"
                      color="#000"
                      border="none"
                      _hover={{
                        opacity: 0.9,
                      }}
                      py={6}
                      category={TRACKING_CATEGORY}
                      label="production-ready-launch"
                      href="https://blog.thirdweb.com/case-studies/coinbase-brings-onchain-experiences-to-life"
                      maxW="fit-content"
                    >
                      Learn more
                    </TrackedLinkButton>
                  </Flex>
                </Box>
              </Box>
            </Flex>
          </Flex>
        </HomepageSection>

        <HomepageFooter />
      </Flex>
    </DarkMode>
  );
};

GrantSuperChain.pageId = PageId.GrantSuperChain;

export default GrantSuperChain;
