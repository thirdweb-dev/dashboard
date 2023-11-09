import {
  Box,
  Container,
  Flex,
  GridItem,
  Icon,
  SimpleGrid,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { LandingLayout } from "components/landing-pages/layout";
import { PageId } from "page-id";
import { Card, Heading, Link, Text, TrackedLinkButton } from "tw-components";
import { ThirdwebNextPage } from "utils/types";
import { IoCheckmarkCircle } from "react-icons/io5";
import { LandingFAQ } from "components/landing-pages/faq";
import { getAbsoluteUrl } from "lib/vercel-utils";
import { PricingSection } from "components/homepage/sections/PricingSection";
import { PLANS, SECTIONS } from "utils/pricing";

const TRACKING_CATEGORY = "pricing-page";

const generalFaqs = [
  {
    title: "How do I get started?",
    description: (
      <Text>
        thirdweb Starter plan is completely usage based. Simply connect your
        wallet to start using thirdweb platform. You only need to create an
        account with your email address and add payment method when you&apos;re
        approaching your monthly free usage limits (so that we can send you
        billing updates if you go over).
      </Text>
    ),
  },
  {
    title: "Which plan is right for me?",
    description: (
      <Text>
        If you are looking for production grade infrastructure, advanced
        customizations, and higher limits for transactions, Growth tier is the
        right choice. If you are looking for dedicated solutions and support
        SLAs, we recommend signing up for the Pro plan.
      </Text>
    ),
  },
  {
    title: "Do I need to talk to the sales team for the Growth plan?",
    description: (
      <Text>
        Nope! You can self serve and upgrade to the Growth plan in the Dashboard
        under{" "}
        <Link href="/dashboard/settings/billing" color="blue.500">
          Billing
        </Link>{" "}
        whenever you are ready!
      </Text>
    ),
  },
  {
    title: "Will I be able to see my usage history?",
    description: (
      <Text>
        You can review your usage history at any time on the Dashboard by
        visiting the{" "}
        <Link href="/dashboard/settings/usage" color="blue.500">
          Usage
        </Link>{" "}
        tab under Settings.
      </Text>
    ),
  },
];

const pricingFaqs = [
  {
    title: "RPC requests",
    description: (
      <Text>
        When your app makes requests to the blockchain, and you use
        thirdweb&apos;s built-in infrastructure, it will count as a RPC request.
      </Text>
    ),
  },
  {
    title: "Storage gateway",
    description: (
      <Text>
        When your app downloads files from IPFS, and you use thirdweb&apos;s
        built-in infrastructure, it will count as a storage gateway request.
      </Text>
    ),
  },
  {
    title: "Storage pinning",
    description: (
      <Text>
        When your app uploads files to IPFS, and you use thirdweb&apos;s
        built-in infrastructure, it will count towards your storage pinning
        limit.
      </Text>
    ),
  },
  {
    title: "Monthly Active Wallet",
    description: (
      <Text>
        When a user logs in during a 30-day period in using the embedded wallet
        service, they are counted as a monthly active wallet.
      </Text>
    ),
  },
  {
    title: "Checkout Transaction Limit",
    description: <Text>This is the max USD per credit card transaction.</Text>,
  },
];

const Pricing: ThirdwebNextPage = () => {
  const isMobile = useBreakpointValue({ base: true, lg: false });

  return (
    <LandingLayout
      seo={{
        title: "thirdweb Pro: Build production-grade web3 apps at scale",
        description:
          "The most efficient way to build web3 apps for millions of users — with a robust infrastructure stack that scales as you grow. Learn more.",
        openGraph: {
          images: [
            {
              url: `${getAbsoluteUrl()}/assets/og-image/thirdweb-pro.png`,
              width: 1200,
              height: 630,
              alt: "thirdweb Pro",
            },
          ],
        },
      }}
    >
      <Container
        maxW="container.page"
        as={Flex}
        flexDir="column"
        gap={{ base: "80px", lg: "120px" }}
      >
        <PricingSection trackingCategory={TRACKING_CATEGORY} />

        <Flex flexDir="column" gap={20}>
          {SECTIONS.map((section) => (
            <Flex flexDir="column" key={section.title} gap={4}>
              <SimpleGrid columns={isMobile ? 2 : 4}>
                <Flex gap={2} alignItems="center" pl={3}>
                  <ChakraNextImage src={section.icon} boxSize={5} alt="" />{" "}
                  <Text color="white" size="body.lg">
                    {section.title}
                  </Text>
                </Flex>

                {!isMobile && (
                  <>
                    <Text size="body.lg" color="gray.600" textAlign="center">
                      Starter
                    </Text>
                    <Text size="body.lg" color="gray.600" textAlign="center">
                      Growth
                    </Text>
                    <Text size="body.lg" color="gray.600" textAlign="center">
                      Pro
                    </Text>
                  </>
                )}
              </SimpleGrid>

              <Flex flexDir="column">
                {section.items.map((item) => {
                  const isShared =
                    item.starter === item.growth && item.growth === item.pro;
                  const sharedItem = (
                    <GridItem colSpan={3}>
                      <Card
                        borderColor={{
                          base: "transparent",
                          lg: "gray.900",
                        }}
                        borderRadius="none"
                        borderWidth={0.5}
                        borderRight="none"
                      >
                        <Text
                          color="gray.600"
                          size="body.md"
                          textAlign={{ base: "right", lg: "center" }}
                        >
                          {item.starter === "checkmark" ? (
                            <Icon
                              as={IoCheckmarkCircle}
                              boxSize={4}
                              color="white"
                            />
                          ) : (
                            item.starter
                          )}
                        </Text>
                      </Card>
                    </GridItem>
                  );

                  return (
                    <SimpleGrid
                      columns={{ base: 1, lg: 4 }}
                      key={item.title}
                      alignItems="center"
                    >
                      <Flex justifyContent="space-between">
                        <Card
                          borderRadius="none"
                          borderColor={{ base: "transparent", lg: "gray.900" }}
                          borderWidth={0.5}
                          borderLeft="none"
                          as={Flex}
                          alignItems="center"
                          flex={1}
                        >
                          <Flex gap={2}>
                            <Text color="white" size="body.md">
                              {item.title}
                            </Text>
                            {(item as any)?.comingSoon && (
                              <Text color="gray.800" size="body.md">
                                Coming Soon
                              </Text>
                            )}
                          </Flex>
                        </Card>
                        {isMobile && sharedItem}
                      </Flex>
                      {!isMobile && (
                        <>
                          {isShared ? (
                            sharedItem
                          ) : (
                            <>
                              <Card
                                borderColor={{
                                  base: "transparent",
                                  lg: "gray.900",
                                }}
                                borderRadius="none"
                                borderWidth={0.5}
                              >
                                <Flex
                                  justifyContent={{
                                    base: "space-between",
                                    lg: "inherit",
                                  }}
                                >
                                  {isMobile && (
                                    <Text size="body.lg">Starter</Text>
                                  )}
                                  <Text
                                    w="full"
                                    color="gray.600"
                                    size="body.md"
                                    textAlign={{ base: "right", lg: "center" }}
                                  >
                                    {item.starter === "checkmark" ? (
                                      <Icon
                                        as={IoCheckmarkCircle}
                                        boxSize={4}
                                        color="white"
                                      />
                                    ) : (
                                      item.starter
                                    )}
                                  </Text>
                                </Flex>
                              </Card>
                              <Card
                                borderColor={{
                                  base: "transparent",
                                  lg: "gray.900",
                                }}
                                borderRadius="none"
                                borderWidth={0.5}
                              >
                                <Flex
                                  justifyContent={{
                                    base: "space-between",
                                    lg: "inherit",
                                  }}
                                >
                                  {isMobile && (
                                    <Text size="body.lg">Growth</Text>
                                  )}
                                  <Text
                                    w="full"
                                    color="gray.600"
                                    size="body.md"
                                    textAlign={{ base: "right", lg: "center" }}
                                  >
                                    {item.growth === "checkmark" ? (
                                      <Icon
                                        as={IoCheckmarkCircle}
                                        boxSize={4}
                                        color="white"
                                      />
                                    ) : (
                                      item.growth
                                    )}
                                  </Text>
                                </Flex>
                              </Card>
                              <Card
                                borderColor={{
                                  base: "transparent",
                                  lg: "gray.900",
                                }}
                                borderRadius="none"
                                borderRight="none"
                                borderWidth={0.5}
                              >
                                <Flex
                                  justifyContent={{
                                    base: "space-between",
                                    lg: "inherit",
                                  }}
                                >
                                  {isMobile && <Text size="body.lg">Pro</Text>}
                                  <Text
                                    color="gray.600"
                                    size="body.md"
                                    textAlign={{ base: "right", lg: "center" }}
                                    w="full"
                                  >
                                    {item.pro === "checkmark" ? (
                                      <Icon
                                        as={IoCheckmarkCircle}
                                        boxSize={4}
                                        color="white"
                                      />
                                    ) : (
                                      item.pro
                                    )}
                                  </Text>
                                </Flex>
                              </Card>
                            </>
                          )}
                        </>
                      )}
                    </SimpleGrid>
                  );
                })}
              </Flex>
            </Flex>
          ))}
          {!isMobile && (
            <SimpleGrid columns={4} mt={-14}>
              <Box>&nbsp;</Box>
              <TrackedLinkButton
                mx={6}
                variant="outline"
                borderColor="gray.900"
                py={6}
                category={TRACKING_CATEGORY}
                label="starter"
                href="/dashboard/settings/billing"
              >
                Get Started
              </TrackedLinkButton>
              <TrackedLinkButton
                mx={6}
                py={6}
                category={TRACKING_CATEGORY}
                label="growth"
                href="/dashboard/settings/billing"
                bgColor="white"
                _hover={{
                  bgColor: "white",
                  opacity: 0.8,
                }}
                color="black"
              >
                Start {PLANS.growth.trialPeriodDays} day Free Trial
              </TrackedLinkButton>
              <TrackedLinkButton
                mx={6}
                py={6}
                variant="outline"
                borderColor="gray.900"
                category={TRACKING_CATEGORY}
                label="pro"
                href="/contact-us"
              >
                Contact Sales
              </TrackedLinkButton>
            </SimpleGrid>
          )}
        </Flex>
        <Flex gap={4} flexDir="column" alignItems="center">
          <Heading size="title.xl" color="white">
            FAQ
          </Heading>
          <LandingFAQ
            title="General"
            faqs={generalFaqs}
            TRACKING_CATEGORY={TRACKING_CATEGORY}
          />
          <LandingFAQ
            title="Key Terminologies"
            faqs={pricingFaqs}
            TRACKING_CATEGORY={TRACKING_CATEGORY}
          />
        </Flex>
      </Container>
    </LandingLayout>
  );
};

Pricing.pageId = PageId.Pricing;

export default Pricing;
