import { DarkMode, Flex, Icon, LinkBox, SimpleGrid } from "@chakra-ui/react";
import { AmbassadorCard } from "components/devRelEvents/AmbassadorCards";
import { ProductCard } from "components/product-pages/common/ProductCard";
import { ProductPage } from "components/product-pages/common/ProductPage";
import { HomepageSection } from "components/product-pages/homepage/HomepageSection";
import { useTrack } from "hooks/analytics/useTrack";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { PageId } from "page-id";
import { Heading, LinkButton, Text, TrackedLink } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const ambassadors = [
  {
    name: "Danny Roberts",
    twitter: "danny_roberts",
  },
  {
    name: "Frank Ramos",
    twitter: "frankramosdev",
  },
  {
    name: "Matt Wong",
    twitter: "mattwong_ca",
  },
  {
    name: "Myk",
    twitter: "mykcryptodev",
  },
  {
    name: "Naman Garg",
    twitter: "namn_grg",
  },
  {
    name: "Paula Isabel Signo",
    twitter: "codewithpau",
  },
  {
    name: "Tanay Patel",
    twitter: "tonydoteth",
  },
  {
    name: "Samu ​​Sarmiento",
    twitter: "SamuSarmiento_",
  },
  {
    name: "Yuki",
    twitter: "stand_english",
  },
  {
    name: "Wolfmaximus",
    twitter: "NFTwolfmaximus",
  },
].sort((a, b) => a.name.localeCompare(b.name));

const Ambassadors: ThirdwebNextPage = () => {
  const trackEvent = useTrack();

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
        <ProductPage
          seo={{
            title: "Ambassadors",
            description:
              "Join thirdweb's ambassador program to build decentralized technologies, empower developer communities, and build your own brand.",
            openGraph: {
              images: [
                {
                  url: `${getAbsoluteUrl()}/assets/og-image/sdk.png`,
                  width: 2334,
                  height: 1260,
                  alt: "thirdweb ambassador program",
                },
              ],
            },
          }}
        >
          <HomepageSection pt="100px" bottomPattern>
            <Flex
              pt={24}
              mb={{ base: 24, md: -24 }}
              flexDir="column"
              gap={{ base: 6, md: 8 }}
              align={{ base: "initial", md: "center" }}
            >
              <Heading
                as="h1"
                fontSize={{ base: "64px", md: "64px" }}
                fontWeight={700}
                letterSpacing="-0.04em"
                mb={4}
                textAlign="center"
              >
                Become a{" "}
                <Text
                  fontSize={{ base: "64px", md: "64px" }}
                  fontWeight={700}
                  letterSpacing="-0.04em"
                  as="span"
                  bgGradient="linear-gradient(243.9deg, #BFA3DA 21.81%, #84309C 48.81%, #C735B0 86.61%);"
                  bgClip={"text"}
                >
                  thirdweb <br /> Ambassador.
                </Text>
              </Heading>
              <Heading
                as="h3"
                size="subtitle.md"
                textAlign="center"
                maxW="container.sm"
              >
                Are you a builder, believer in decentralized technologies, want
                to empower the developer community, and build your own brand?
              </Heading>
              <Flex flexDir="row" gap={3} flexGrow={1} minW={300}>
                <LinkButton
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfuhnYtA-CMo5PT1jF4vzzPy0jVS_DNRMSOayV4FNxx7rpKKQ/viewform"
                  isExternal
                  onClick={() =>
                    trackEvent({
                      category: "cta-button",
                      action: "click",
                      label: "ambassador",
                      title: "Join the Community",
                    })
                  }
                  px={4}
                  py={7}
                  fontSize="20px"
                  color="black"
                  flexShrink={0}
                  background="rgba(255,255,255,1)"
                  _hover={{
                    background: "rgba(255,255,255,0.9)!important",
                  }}
                  zIndex={12}
                >
                  Apply now
                </LinkButton>
                <LinkButton
                  href=""
                  isExternal
                  onClick={() =>
                    trackEvent({
                      category: "cta-button",
                      action: "click",
                      label: "ambassador",
                      title: "Join the community",
                    })
                  }
                  px={4}
                  py={7}
                  fontSize="20px"
                  color="white"
                  variant="outline"
                  flexShrink={0}
                  background="rgba(0,0,0,1)"
                  _hover={{
                    background: "rgba(0,0,0,0.9)!important",
                  }}
                  zIndex={12}
                >
                  Join the community
                </LinkButton>
              </Flex>
            </Flex>
          </HomepageSection>
          <HomepageSection pb={32}>
            <Flex
              pt={24}
              mb={{ base: 24, md: -24 }}
              flexDir="column"
              gap={{ base: 6, md: 8 }}
              align={{ base: "initial", md: "center" }}
            >
              <Text
                fontSize={{ base: "24px", md: "24px" }}
                fontWeight={700}
                bgGradient="linear-gradient(243.9deg, #BFA3DA 21.81%, #84309C 48.81%, #C735B0 86.61%);"
                bgClip={"text"}
              >
                Our goal
              </Text>
              <Heading
                as="h2"
                fontSize={{ base: "64px", md: "64px" }}
                fontWeight={700}
                letterSpacing="-0.04em"
                mb={4}
                textAlign="center"
              >
                We are{" "}
                <Text
                  fontSize={{ base: "64px", md: "64px" }}
                  fontWeight={700}
                  letterSpacing="-0.04em"
                  as="span"
                  bgGradient="linear-gradient(243.9deg, #BFA3DA 21.81%, #84309C 48.81%, #C735B0 86.61%);"
                  bgClip={"text"}
                >
                  developer obsessed.
                </Text>
              </Heading>
              <Heading
                as="h3"
                size="subtitle.md"
                textAlign={{ base: "center" }}
                maxW="container.lg"
              >
                Providing incredible experiences for the developer community is
                one of the most rewarding things we do. Join us in our mission
                to grow web3 development.
              </Heading>
              <Flex flexDir="row" alignItems="center">
                <SimpleGrid
                  justifyContent="flex-start"
                  w="100%"
                  columns={{ base: 1, md: 3 }}
                  gap={{ base: 12, md: 3 }}
                >
                  <AmbassadorCard
                    icon={require("/public/assets/ambassadors/card-1-icon.svg")}
                  >
                    Share your knowledge on new groundbreaking web3 tools.
                  </AmbassadorCard>
                  <AmbassadorCard
                    icon={require("/public/assets/ambassadors/card-2-icon.svg")}
                  >
                    Have fun creating and sharing the type of content you love
                    the most.
                  </AmbassadorCard>
                  <AmbassadorCard
                    icon={require("/public/assets/ambassadors/card-3-icon.svg")}
                  >
                    Get rewarded with benefits exclusive to ambassadors.
                  </AmbassadorCard>
                </SimpleGrid>
              </Flex>
            </Flex>
          </HomepageSection>
          <HomepageSection pb={32}>
            <Flex
              pt={24}
              mb={{ base: 24, md: -24 }}
              flexDir="column"
              gap={{ base: 6, md: 8 }}
              align={{ base: "initial", md: "center" }}
            >
              <Text
                fontSize={{ base: "24px", md: "24px" }}
                fontWeight={700}
                bgGradient="linear-gradient(243.9deg, #3385FF
                    21.81%, #91B7F0 48.81%, #95BBF2 86.61%);"
                bgClip={"text"}
              >
                Benefits & Rewards
              </Text>
              <Heading
                as="h2"
                fontSize={{ base: "64px", md: "64px" }}
                fontWeight={700}
                letterSpacing="-0.04em"
                mb={4}
                textAlign="center"
              >
                <Text
                  fontSize={{ base: "64px", md: "64px" }}
                  fontWeight={700}
                  letterSpacing="-0.04em"
                  as="span"
                  bgGradient="linear-gradient(243.9deg, #3385FF
                    21.81%, #91B7F0 48.81%, #95BBF2 86.61%);"
                  bgClip={"text"}
                >
                  Exclusive benefits <br />
                </Text>
                for Ambassadors.
              </Heading>
              <Flex flexDir="row" alignItems="center">
                <SimpleGrid
                  justifyContent="flex-start"
                  w="100%"
                  columns={{ base: 1, md: 5 }}
                  gap={{ base: 12, md: 6 }}
                >
                  <ProductCard
                    title="Recognition"
                    icon={require("/public/assets/ambassadors/recognition-icon.svg")}
                  >
                    Grow your personal brand from recognition on our pages.
                  </ProductCard>
                  <ProductCard
                    title="Mentorship"
                    icon={require("/public/assets/ambassadors/mentorship-icon.svg")}
                  >
                    Learn directly from experts on web3 development and related
                    topics.
                  </ProductCard>
                  <ProductCard
                    title="Merch & Swag"
                    icon={require("/public/assets/ambassadors/merch-icon.svg")}
                  >
                    Receive exclusive thirdweb merch that identifies you as part
                    of the team.
                  </ProductCard>
                  <ProductCard
                    title="Network"
                    icon={require("/public/assets/ambassadors/network-icon.svg")}
                  >
                    Meet like-minded individuals and grow your network in web3.
                  </ProductCard>
                  <ProductCard
                    title="Access"
                    icon={require("/public/assets/ambassadors/access-icon.svg")}
                  >
                    Insider access to the team, roadmap, events.
                  </ProductCard>
                </SimpleGrid>
              </Flex>
            </Flex>
          </HomepageSection>
          <HomepageSection>
            <Flex
              pt={24}
              mb={{ base: 24, md: -24 }}
              flexDir="column"
              gap={{ base: 6, md: 8 }}
              align={{ base: "initial", md: "center" }}
            >
              <Heading
                as="h2"
                fontSize={{ base: "64px", md: "64px" }}
                fontWeight={700}
                letterSpacing="-0.04em"
                mb={4}
                textAlign="center"
              >
                Meet the{" "}
                <Text
                  fontSize={{ base: "64px", md: "64px" }}
                  fontWeight={700}
                  letterSpacing="-0.04em"
                  as="span"
                  bgGradient="linear-gradient(243.9deg, #BFA3DA 21.81%, #84309C 48.81%, #C735B0 86.61%);"
                  bgClip={"text"}
                >
                  Ambassadors.
                </Text>
              </Heading>
              <SimpleGrid
                columns={{ base: 2, md: 5 }}
                gap={8}
                justifyContent="space-evenly"
              >
                {ambassadors.map((ambassador) => (
                  <Flex key={ambassador.name} flexDir="column" gap={1}>
                    <Heading size="title.sm">{ambassador.name}</Heading>
                    {ambassador.twitter ? (
                      <TrackedLink
                        href={`https://twitter.com/${ambassador.twitter}`}
                        isExternal
                        category="team"
                        label={ambassador.name}
                      >
                        <Text size="label.md" color="gray.500">
                          @{ambassador.twitter}
                        </Text>
                      </TrackedLink>
                    ) : (
                      <Text
                        size="label.md"
                        color="gray.700"
                        fontWeight={400}
                        fontStyle="italic"
                      >
                        no twitter
                      </Text>
                    )}
                  </Flex>
                ))}
              </SimpleGrid>
            </Flex>
          </HomepageSection>
          <HomepageSection pt="100px">
            <Flex
              pt={24}
              mb={{ base: 24, md: -24 }}
              flexDir="column"
              gap={{ base: 6, md: 8 }}
              align={{ base: "initial", md: "center" }}
            >
              <Heading
                as="h2"
                fontSize={{ base: "64px", md: "64px" }}
                fontWeight={700}
                letterSpacing="-0.04em"
                mb={4}
                textAlign="center"
              >
                Become an{" "}
                <Text
                  fontSize={{ base: "64px", md: "64px" }}
                  fontWeight={700}
                  letterSpacing="-0.04em"
                  as="span"
                  bgGradient="linear-gradient(243.9deg, #BFA3DA 21.81%, #84309C 48.81%, #C735B0 86.61%);"
                  bgClip={"text"}
                >
                  Ambassador today.
                </Text>
              </Heading>
              <Heading
                as="h3"
                size="subtitle.md"
                textAlign={{ base: "center" }}
                maxW="container.lg"
              >
                Tell us about yourself by filling out the form below and we’ll
                be in touch soon! <br /> We require ambassadors to be 18 years
                old or over.
              </Heading>
              <LinkButton
                href="https://docs.google.com/forms/d/e/1FAIpQLSfuhnYtA-CMo5PT1jF4vzzPy0jVS_DNRMSOayV4FNxx7rpKKQ/viewform"
                isExternal
                onClick={() =>
                  trackEvent({
                    category: "cta-button",
                    action: "click",
                    label: "ambassador",
                    title: "Apply now",
                  })
                }
                px={4}
                py={7}
                fontSize="20px"
                color="black"
                flexShrink={0}
                background="rgba(255,255,255,1)"
                _hover={{
                  background: "rgba(255,255,255,0.9)!important",
                }}
                zIndex={12}
              >
                Apply now
              </LinkButton>
            </Flex>
          </HomepageSection>
        </ProductPage>
      </Flex>
    </DarkMode>
  );
};

Ambassadors.pageId = PageId.Ambassadors;

export default Ambassadors;
