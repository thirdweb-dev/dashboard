import { ChakraNextImage } from "../../components/Image";
import { HomepageTopNav } from "../../components/product-pages/common/Topnav";
import {
  Box,
  DarkMode,
  Flex,
  GridItem,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
} from "@chakra-ui/react";
import { HomepageFooter } from "components/footer/Footer";
import { YoutubeEmbed } from "components/video-embed/YoutubeEmbed";
import { PageId } from "page-id";
import { Suspense } from "react";
import { Card, Heading, Link, LinkButton, Text } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const Base: ThirdwebNextPage = () => {
  return (
    <DarkMode>
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
        <Box mt="-80px" pt="80px" overflowX="hidden">
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            minH="calc(100vh - 80px)"
            alignItems="center"
          >
            <GridItem>
              <ChakraNextImage
                src="/assets/build/base/base.png"
                alt="Base"
                width={757}
                height={380}
              />
            </GridItem>
            <GridItem p={12}>
              <Heading as="h1" size="title.xl">
                Secure, low-cost, developer-friendly Ethereum L2.
              </Heading>
              <Heading as="h2" size="title.xl" mt={8} mb={10}>
                Built to bring the next billion users to web3.
              </Heading>
              <Link
                href="#"
                color="#245CF1"
                textDecoration="none"
                fontSize="2rem"
                fontWeight={700}
                _hover={{
                  textDecoration: "underline",
                }}
              >
                Check out Base &rarr;
              </Link>
            </GridItem>
          </SimpleGrid>
          <Flex
            flexDir="column"
            alignItems="center"
            maxW="3xl"
            mx="auto"
            py={24}
            px={{ base: 2, md: 8 }}
          >
            <Heading
              as="h3"
              size="title.xl"
              textAlign="center"
              letterSpacing="-0.02em"
            >
              <Box
                as="span"
                background="linear-gradient(0deg, #A854F3 69.94%, #EEB2F9 93.45%)"
                bgClip="text"
              >
                thirdweb
              </Box>{" "}
              brings your web3 ideas to production in record time.
            </Heading>
            <Card p={0} w="full" mt={14} bg="#0F0F0F" border="0">
              <Flex flexDir="column" alignItems="center" p={12}>
                <Heading
                  size="title.2xl"
                  background="linear-gradient(0deg, #A854F3 69.94%, #EEB2F9 93.45%)"
                  bgClip="text"
                  textAlign="center"
                  letterSpacing="-0.02em"
                >
                  CatAttack
                </Heading>
                <Heading
                  size="title.lg"
                  mt={4}
                  textAlign="center"
                  letterSpacing="-0.02em"
                >
                  The first game built on Base.
                </Heading>
                <LinkButton
                  my={8}
                  href="#"
                  bg="white"
                  _hover={{ bg: "whiteAlpha.800" }}
                >
                  <Text as="span" size="label.lg" color="black">
                    Play the game
                  </Text>
                </LinkButton>
                <Heading
                  my={4}
                  size="title.sm"
                  fontSize="16px"
                  color="whiteAlpha.600"
                >
                  Download the game
                </Heading>
                <Flex gap={4}>
                  {[
                    {
                      title: "apple",
                      image: "/assets/build/base/apple.svg",
                      href: "#",
                    },
                    {
                      title: "google",
                      image: "/assets/build/base/google.svg",
                      href: "#",
                    },
                  ].map(({ title, image, href }) => (
                    <Link
                      p={1}
                      rounded="lg"
                      background="linear-gradient(-45deg, #A854F3, #EEB2F9, #A854F3)"
                      backgroundSize="200% 200%"
                      href={href}
                      transitionProperty="background-position, transform"
                      transitionDuration="slower"
                      _hover={{
                        backgroundPosition: "bottom right",
                      }}
                      _active={{
                        transform: "scale(0.95)",
                      }}
                    >
                      <Flex
                        rounded="lg"
                        bg="backgroundDark"
                        w={90}
                        h={90}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <ChakraNextImage
                          src={image}
                          alt={title}
                          width={16}
                          height={12}
                        />
                      </Flex>
                    </Link>
                  ))}
                </Flex>
              </Flex>
            </Card>
          </Flex>
          <Flex
            flexDir="column"
            alignItems="center"
            maxW="3xl"
            mx="auto"
            py={24}
            px={{ base: 2, md: 8 }}
          >
            <Heading
              as="h3"
              size="title.xl"
              textAlign="center"
              letterSpacing="-0.02em"
              background="linear-gradient(0deg, #A854F3 69.94%, #EEB2F9 93.45%)"
              bgClip="text"
            >
              Built with thirdweb in 2 days.
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} w="full" gap={6} mt={8}>
              {[
                { title: "100k", label: "player" },
                { title: "1 Million+", label: "contract transactions" },
              ].map(({ title, label }) => (
                <Card
                  as={GridItem}
                  bg="#0F0F0F"
                  border="0"
                  display="flex"
                  flexDir="column"
                  alignItems="center"
                  p={8}
                >
                  <Heading
                    size="title.2xl"
                    background="linear-gradient(0deg, #A854F3 69.94%, #EEB2F9 93.45%)"
                    bgClip="text"
                    textAlign="center"
                    letterSpacing="-0.02em"
                  >
                    {title}
                  </Heading>
                  <Heading
                    color="whiteAlpha.500"
                    size="title.xs"
                    mt={3}
                    textAlign="center"
                    letterSpacing="-0.02em"
                  >
                    {label}
                  </Heading>
                </Card>
              ))}
            </SimpleGrid>
          </Flex>
          <Flex
            flexDir="column"
            alignItems="center"
            maxW="3xl"
            mx="auto"
            py={24}
            px={{ base: 2, md: 8 }}
          >
            <Heading
              size="title.sm"
              bg="linear-gradient(0, #6891F7 -18.75%, #A7BFFA 100%)"
              bgClip="text"
              letterSpacing="-0.02em"
              textAlign="center"
            >
              You could be the next hit on Base.
            </Heading>
            <Heading
              size="title.2xl"
              letterSpacing="-0.02em"
              textAlign="center"
              mt={4}
            >
              Learn how to build your own web3 apps or games.
            </Heading>
            {/* <YoutubeEmbed /> */}
          </Flex>
          <Flex
            flexDir="column"
            alignItems="center"
            maxW="6xl"
            mx="auto"
            py={24}
            px={{ base: 2, md: 8 }}
          >
            <Heading
              size="title.2xl"
              letterSpacing="-0.02em"
              textAlign="center"
            >
              What will{" "}
              <Box
                as="span"
                bg="linear-gradient(0, #6891F7 -18.75%, #A7BFFA 100%)"
                bgClip="text"
              >
                you
              </Box>{" "}
              build?
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} mt={16} gap={6}>
              {[
                {
                  title: "Coinbase Wallet",
                  href: "https://www.coinbase.com/wallet",
                  image: "/assets/build/base/coinbase-wallet.png",
                },
                {
                  title: "Coinbase WaaS",
                  href: "https://www.coinbase.com/cloud/products/waas",
                  image: "/assets/build/base/coinbase-waas.png",
                },
                {
                  title: "Coinbase Pay",
                  href: "https://www.coinbase.com/cloud/products/pay-sdk",
                  image: "/assets/build/base/coinbase-pay.png",
                },
              ].map(({ title, href, image }) => (
                <LinkBox
                  as={Card}
                  bg="#0F0F0F"
                  border="3px solid transparent"
                  transitionProperty="border"
                  transitionDuration="slow"
                  _hover={{ borderColor: "#2151F5" }}
                  p={10}
                >
                  <Flex flexDir="column" alignItems="center">
                    <Heading
                      textAlign="center"
                      size="title.lg"
                      letterSpacing="-0.02em"
                      background="linear-gradient(80deg, #6891F7, #C0D2FF, #6891F7)"
                      backgroundClip="text"
                      backgroundSize="200% 200%"
                      transitionProperty="background-position, transform"
                      transitionDuration="slower"
                      _hover={{
                        backgroundPosition: "bottom right",
                      }}
                      {...{ as: LinkOverlay, href, isExternal: true }}
                    >
                      {title}
                    </Heading>
                    <Box h={20} mt={10}>
                      <ChakraNextImage
                        height="78"
                        width="160"
                        src={image}
                        alt=""
                      />{" "}
                    </Box>
                  </Flex>
                </LinkBox>
              ))}
            </SimpleGrid>
          </Flex>
          <Suspense>
            <HomepageFooter />
          </Suspense>
        </Box>
      </Flex>
    </DarkMode>
  );
};

Base.pageId = PageId.BuildBaseLanding;

export default Base;
