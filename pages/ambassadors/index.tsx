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
import HeroImage from "public/assets/learn/hero.png";
import { BsLightningCharge } from "react-icons/bs";
import { Heading, LinkButton, Text, TrackedLink } from "tw-components";
import { MaskedAvatar } from "tw-components/masked-avatar";
import { ThirdwebNextPage } from "utils/types";

const TRACKING_CATEGORY = "ambassadors";

const SEO = {
  title: "ThirdWeb Ambassador Program | Ambassador Program Web 3 | thirdweb",
  description:
    "Do you want to empower the developer community, be a pioneer in web3 development, and build your brand while you’re at it?",
};

const Ambassadors: ThirdwebNextPage = () => {
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
            name="thirdweb Ambassador Program"
            title="Empower the community"
            description={
              <>
                At thirdweb we love developers, and serving the developer
                community is one of the most rewarding things we do.
                <br />
                <br />
                Join us in our mission to advocate for devs by sharing knowledge
                on new groundbreaking web3 developer tools through meetups,
                conferences, written content, webinars, and other events as a
                thirdweb Ambassador.
                <br />
                <br />
                We just started our Ambassador program and thirdweb is
                represented in 7 countries. Be a part of this early team!
              </>
            }
            trackingCategory={TRACKING_CATEGORY}
            buttonText="Join the Mission"
            type="Ambassador"
            buttonLink="https://docs.google.com/forms/d/e/1FAIpQLSfuhnYtA-CMo5PT1jF4vzzPy0jVS_DNRMSOayV4FNxx7rpKKQ/viewform"
            gradient="linear-gradient(145.96deg, rgb(142 14 255) 5.07%, #16bdf0 100%)"
            image={HeroImage}
          ></Hero>
          <ProductSection paddingY={{ base: 12, md: 24 }}>
            <Heading size="title.2xl" as="h2" textAlign="center">
              Program Benefits
            </Heading>

            <SimpleGrid
              columns={{ base: 1, md: 3 }}
              gap={{ base: 12, md: 6 }}
              py={{ base: 12, md: 24 }}
            >
              <ProductCard
                title="Recognition"
                icon={require("/public/assets/product-pages/authentication/verify.png")}
              >
                Recognition on thirdweb’s social media accounts
              </ProductCard>
              <ProductCard
                title="Training & Mentorship"
                icon={require("/public/assets/product-pages/dashboard/hero-icon-2.png")}
              >
                Training with experts on web3, thirdweb, and more (resume
                building and 1:1 coaching)
              </ProductCard>
              <ProductCard
                title="thirdweb Merchandise"
                icon={require("/public/assets/product-pages/sdk/hero-icon-2.png")}
              >
                The thirdweb merch that identifies you as part of the Ambassador
                Program
              </ProductCard>
              <ProductCard
                title="Acces to sponsorships"
                icon={require("/public/assets/product-pages/deploy/hero-icon-1.png")}
              >
                Access to sponsorship & travel perks
              </ProductCard>
              <ProductCard
                title="Exclusive Access"
                icon={require("/public/assets/product-pages/authentication/verify.png")}
              >
                Exclusive access to new and experimental thirdweb features!
              </ProductCard>
              <ProductCard
                title="Help the community"
                icon={require("/public/assets/product-pages/dashboard/hero-icon-3.png")}
              >
                Help the community by sharing your knowledge and experience,
                build with the thirdweb community, and get involved in the
                thirdweb ecosystem.
              </ProductCard>
            </SimpleGrid>
          </ProductSection>
          <ProductSection paddingY={{ base: 12, md: 24 }}>
            <Heading size="title.2xl" as="h2" textAlign="center">
              Ambassador of the Month
            </Heading>
            <Center marginTop={16}>
              <Flex gap={6} align="center">
                <MaskedAvatar
                  src={"/assets/landingpage/warren-gonzaga.png"}
                  alt=""
                  boxSize={40}
                />

                <Flex flexDir="column" gap={2} justifyContent="center">
                  <Heading
                    size="title.lg"
                    bgGradient="linear(to-r, #B8EEFF, #8689E3)"
                    bgClip="text"
                  >
                    Warren Gonzaga
                  </Heading>
                  <TrackedLink
                    href="https://twitter.com/warengonzaga"
                    isExternal
                    category="team"
                    label="Warren Gonzaga"
                  >
                    <Text size="label.md" color="gray.500">
                      @warengonzaga
                    </Text>
                  </TrackedLink>
                </Flex>
              </Flex>
            </Center>
          </ProductSection>
          <ProductSection paddingY={{ base: 12, md: 24 }}>
            <Heading size="title.2xl" as="h2" textAlign="center">
              Ambassadors
            </Heading>
            <Center marginTop={16}>
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={16} marginTop={16}>
                <Flex gap={8} align="center" width="100%">
                  <MaskedAvatar
                    src={"/assets/landingpage/danny-roberts.png"}
                    alt=""
                    boxSize={40}
                  />

                  <Flex flexDir="column" gap={2} justifyContent="center">
                    <Heading
                      size="title.lg"
                      bgGradient="linear(to-r, #B8EEFF, #8689E3)"
                      bgClip="text"
                    >
                      Danny Roberts
                    </Heading>
                    <TrackedLink
                      href="https://twitter.com/danny_roberts"
                      isExternal
                      category="team"
                      label="Danny Roberts"
                    >
                      <Text size="label.md" color="gray.500">
                        @danny_roberts
                      </Text>
                    </TrackedLink>
                  </Flex>
                </Flex>
                <Flex gap={8} align="center">
                  <MaskedAvatar
                    src={"/assets/landingpage/frank-ramos.png"}
                    alt=""
                    boxSize={40}
                  />

                  <Flex flexDir="column" gap={2} justifyContent="center">
                    <Heading
                      size="title.lg"
                      bgGradient="linear(to-r, #B8EEFF, #8689E3)"
                      bgClip="text"
                    >
                      Frank Ramos
                    </Heading>
                    <TrackedLink
                      href="https://twitter.com/frankramosdev"
                      isExternal
                      category="team"
                      label="Frank Ramos"
                    >
                      <Text size="label.md" color="gray.500">
                        @frankramosdev
                      </Text>
                    </TrackedLink>
                  </Flex>
                </Flex>
                <Flex gap={8} align="center">
                  <MaskedAvatar
                    src={"/assets/landingpage/matt-wong.png"}
                    alt=""
                    boxSize={40}
                  />

                  <Flex flexDir="column" gap={2} justifyContent="center">
                    <Heading
                      size="title.lg"
                      bgGradient="linear(to-r, #B8EEFF, #8689E3)"
                      bgClip="text"
                    >
                      Matt Wong
                    </Heading>
                    <TrackedLink
                      href="https://twitter.com/mattwong_ca"
                      isExternal
                      category="team"
                      label="Matt Wong"
                    >
                      <Text size="label.md" color="gray.500">
                        @mattwong_ca
                      </Text>
                    </TrackedLink>
                  </Flex>
                </Flex>
                <Flex gap={8} align="center">
                  <MaskedAvatar
                    src={"/assets/landingpage/myk-cryptodev.svg"}
                    alt=""
                    boxSize={40}
                  />

                  <Flex flexDir="column" gap={2} justifyContent="center">
                    <Heading
                      size="title.lg"
                      bgGradient="linear(to-r, #B8EEFF, #8689E3)"
                      bgClip="text"
                    >
                      Myk
                    </Heading>
                    <TrackedLink
                      href="https://twitter.com/mykcryptodev"
                      isExternal
                      category="team"
                      label="Myk Cryptodev"
                    >
                      <Text size="label.md" color="gray.500">
                        @mykcryptodev
                      </Text>
                    </TrackedLink>
                  </Flex>
                </Flex>
                <Flex gap={8} align="center">
                  <MaskedAvatar
                    src={"/assets/landingpage/naman-grg.png"}
                    alt=""
                    boxSize={40}
                  />

                  <Flex flexDir="column" gap={2} justifyContent="center">
                    <Heading
                      size="title.lg"
                      bgGradient="linear(to-r, #B8EEFF, #8689E3)"
                      bgClip="text"
                    >
                      Naman Garg
                    </Heading>
                    <TrackedLink
                      href="https://twitter.com/namn_grg"
                      isExternal
                      category="team"
                      label="Naman Garg"
                    >
                      <Text size="label.md" color="gray.500">
                        @namn_grg
                      </Text>
                    </TrackedLink>
                  </Flex>
                </Flex>
                <Flex gap={8} align="center">
                  <MaskedAvatar
                    src={"/assets/landingpage/paula-codewith.png"}
                    alt=""
                    boxSize={40}
                  />

                  <Flex flexDir="column" gap={2} justifyContent="center">
                    <Heading
                      size="title.lg"
                      bgGradient="linear(to-r, #B8EEFF, #8689E3)"
                      bgClip="text"
                    >
                      Paula
                    </Heading>
                    <TrackedLink
                      href="https://twitter.com/codewithpaula"
                      isExternal
                      category="team"
                      label="Code With Paula"
                    >
                      <Text size="label.md" color="gray.500">
                        @codewithpaula
                      </Text>
                    </TrackedLink>
                  </Flex>
                </Flex>
                <Flex gap={8} align="center">
                  <MaskedAvatar
                    src={"/assets/landingpage/samu-sarmiento.png"}
                    alt=""
                    boxSize={40}
                  />

                  <Flex flexDir="column" gap={2} justifyContent="center">
                    <Heading
                      size="title.lg"
                      bgGradient="linear(to-r, #B8EEFF, #8689E3)"
                      bgClip="text"
                    >
                      Samu Sarmiento
                    </Heading>
                    <TrackedLink
                      href="https://twitter.com/samusarmiento_"
                      isExternal
                      category="team"
                      label="Samu Sarmiento"
                    >
                      <Text size="label.md" color="gray.500">
                        @samusarmiento_
                      </Text>
                    </TrackedLink>
                  </Flex>
                </Flex>
                <Flex gap={8} align="center">
                  <MaskedAvatar
                    src={"/assets/landingpage/tonydoteth.png"}
                    alt=""
                    boxSize={40}
                  />

                  <Flex flexDir="column" gap={2} justifyContent="center">
                    <Heading
                      size="title.lg"
                      bgGradient="linear(to-r, #B8EEFF, #8689E3)"
                      bgClip="text"
                    >
                      Tony.eth
                    </Heading>
                    <TrackedLink
                      href="https://twitter.com/tonydoteth"
                      isExternal
                      category="team"
                      label="Tony.eth"
                    >
                      <Text size="label.md" color="gray.500">
                        @tonydoteth
                      </Text>
                    </TrackedLink>
                  </Flex>
                </Flex>
                <Flex gap={8} align="center">
                  <MaskedAvatar
                    src={"/assets/landingpage/yuki.png"}
                    alt=""
                    boxSize={40}
                  />

                  <Flex flexDir="column" gap={2} justifyContent="center">
                    <Heading
                      size="title.lg"
                      bgGradient="linear(to-r, #B8EEFF, #8689E3)"
                      bgClip="text"
                    >
                      Yuki
                    </Heading>
                    <TrackedLink
                      href="https://twitter.com/stand_english"
                      isExternal
                      category="team"
                      label="Yuri"
                    >
                      <Text size="label.md" color="gray.500">
                        @stand_english
                      </Text>
                    </TrackedLink>
                  </Flex>
                </Flex>
                <Flex gap={8} align="center">
                  <MaskedAvatar
                    src={"/assets/landingpage/joseph-ambassador.png"}
                    alt=""
                    boxSize={40}
                  />

                  <Flex flexDir="column" gap={2} justifyContent="center">
                    <Heading
                      size="title.lg"
                      bgGradient="linear(to-r, #B8EEFF, #8689E3)"
                      bgClip="text"
                    >
                      Joseph
                    </Heading>
                    <TrackedLink
                      href="https://twitter.com/NFTwolfmaximus"
                      isExternal
                      category="team"
                      label="Joseph"
                    >
                      <Text size="label.md" color="gray.500">
                        @NFTwolfmaximus
                      </Text>
                    </TrackedLink>
                  </Flex>
                </Flex>
              </SimpleGrid>
            </Center>
          </ProductSection>
          <ProductSection paddingY={{ base: 12, md: 24 }}>
            <Heading size="title.2xl" as="h2" textAlign="center">
              Can I be a thirdweb Ambassador?
            </Heading>

            <SimpleGrid
              columns={{ base: 1, md: 3 }}
              gap={{ base: 12, md: 6 }}
              py={{ base: 12, md: 24 }}
            >
              <ProductCard
                title="Contribute to the program"
                icon={require("/public/assets/product-pages/dashboard/hero-icon-1.png")}
              >
                Contribute to the program on a quarterly basis. Be an active
                participant and/or a leader in a developer community.
              </ProductCard>
              <ProductCard
                title="Create & Share"
                icon={require("/public/assets/product-pages/dashboard/hero-icon-1.png")}
              >
                Demonstrate interest in creating or sharing technical content be
                it via blog posts, public speaking, or developer events.
              </ProductCard>
              <ProductCard
                title="Be a community builder"
                icon={require("/public/assets/product-pages/dashboard/hero-icon-1.png")}
              >
                Be committed to thirdweb’s values of collaboration,
                experimentation, and transparency
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
              Ready to be one of us?
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
                href="https://docs.google.com/forms/d/e/1FAIpQLSfuhnYtA-CMo5PT1jF4vzzPy0jVS_DNRMSOayV4FNxx7rpKKQ/viewform"
              >
                <Box as="span" py={0.5}>
                  Join the Mission
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

Ambassadors.pageId = PageId.Ambassadors;

export default Ambassadors;
