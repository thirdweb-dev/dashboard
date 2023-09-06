import {
  Box,
  Center,
  Container,
  Flex,
  GridItem,
  Icon,
  ListItem,
  SimpleGrid,
  UnorderedList,
} from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { LandingDynamicSelector } from "components/landing-pages/dynamic-selector";
import { LandingEndCTA } from "components/landing-pages/end-cta";
import { LandingGridSection } from "components/landing-pages/grid-section";
import { LandingIconSectionItem } from "components/landing-pages/icon-section-item";
import { LandingLayout } from "components/landing-pages/layout";
import { LandingMainImage } from "components/landing-pages/main-image";
import { LandingSectionHeading } from "components/landing-pages/section-heading";
import { PageId } from "page-id";
import { Button, Card, Heading, Text, TrackedLinkButton } from "tw-components";
import { ThirdwebNextPage } from "utils/types";
import WhiteLogo from "public/assets/landingpage/white-logo.png";
import { IoCheckmarkCircle } from "react-icons/io5";

const TRACKING_CATEGORY = "pricing-page";

const SECTIONS = [
  {
    title: "Infrastructure",
    icon: require("public/assets/product-icons/infrastructure.png"),
    items: [
      {
        title: "RPCs",
        starter: "100 Requests Per Second",
        pro: "5000 Requests Per Second",
      },
      {
        title: "Storage Gateway",
        starter: "100 Requests Per Second",
        pro: "5000 Requests Per Second",
      },
      {
        title: "Storage Pinning",
        starter: "Free up to 50 GB ($0.10 per GB after)",
        pro: "Free up to 50 GB ($0.10 per GB after)",
      },
      {
        title: "Storage Pinning File Size",
        starter: "5GB (per file size)",
        pro: "25 GB (per file size)",
      },
    ],
  },
  {
    title: "Wallets",
    icon: require("public/assets/product-icons/wallets.png"),
    items: [
      {
        title: "Email Wallet (Self-Recovery)",
        starter: "Unlimited",
        pro: "Unlimited",
      },
      {
        title: "Email Wallet (Managed Recovery)",
        starter:
          "Free up to 10,000 Monthly Active Wallets ($0.02 per Wallet after)",
        pro: "Free up to 10,000 Monthly Active Wallets ($0.02 per Wallet after)",
      },
      {
        title: "Device Wallets",
        starter: "checkmark",
        pro: "checkmark",
      },
      {
        title: "Smart Wallets",
        starter: "checkmark",
        pro: "checkmark",
      },
    ],
  },
  {
    title: "Payments",
    icon: require("public/assets/product-icons/payments.png"),
    items: [
      {
        title: "NFT Checkout Sellers",
        starter: "Free",
        pro: "Free",
      },
      {
        title: "NFT Checkout Purchasers (By Fiat)",
        starter: "4.9% + $0.30 fee per transaction",
        pro: "4.9% + $0.30 fee per transaction",
      },
      {
        title: "NFT Checkout Purchasers (By Crypto)",
        starter: "1% for crypto payments",
        pro: "1% for crypto payments",
      },
      {
        title: "NFT Checkout Transaction limit",
        starter: "$2,500 Per Transaction Limit",
        pro: "$15,000 Per Transaction Limit",
      },
      {
        title: "Smart Wallet - Paymaster",
        starter: "10% premium on top of network fee",
        pro: "10% premium on top of network fee",
      },
      {
        title: "Smart Wallet - Bundler",
        starter: "10% premium on top of network fee",
        pro: "10% premium on top of network fee",
      },
      {
        title: "Sponsored transactions",
        starter: "10% premium on top of network fee",
        pro: "10% premium on top of network fee",
      },
    ],
  },
  {
    title: "Platform",
    icon: require("public/assets/product-icons/dashboards.png"),
    items: [
      {
        title: "Custom RPC / IPFS Domains",
        starter: "--",
        pro: "checkmark",
      },
      {
        title: "Sponsored transactions",
        starter: "--",
        pro: "checkmark",
      },
      {
        title: "White labelling",
        comingSoon: true,
        starter: "--",
        pro: "checkmark",
      },
      {
        title: "Team Seats",
        comingSoon: true,
        starter: "--",
        pro: "checkmark",
      },
      {
        title: "Appchain/Subnet Support",
        comingSoon: true,
        starter: "--",
        pro: "checkmark",
      },
      {
        title: "Sign Sign-on",
        comingSoon: true,
        starter: "--",
        pro: "checkmark",
      },
      {
        title: "HTML files for IPFS",
        comingSoon: true,
        starter: "--",
        pro: "checkmark",
      },
    ],
  },
  {
    title: "Support",
    icon: require("public/assets/product-icons/support.png"),
    items: [
      {
        title: "Infrastructure SLAs",
        starter: "--",
        pro: "99.9% Uptime",
      },
      {
        title: "Customer support SLAs",
        starter: "--",
        pro: "24 hours Dedicated Support",
      },
      {
        title: "Prioritized Customer Support",
        starter: "--",
        pro: "checkmark",
      },
      {
        title: "Dedicated Slack support channel",
        starter: "Discord Support Only",
        pro: "checkmark",
      },
    ],
  },
];

const Pricing: ThirdwebNextPage = () => {
  return (
    <LandingLayout
      seo={{
        title: "Build production-grade web3 apps at scale | thirdweb Pro",
        description:
          "Build brand loyalty programs that turn customeThe best way to build web3 apps for millions of users — with a robust infrastructure stack that scales as you grow. Learn more.",
      }}
    >
      <Container
        maxW="container.page"
        as={Flex}
        flexDir="column"
        gap={{ base: "80px", md: "120px" }}
      >
        <Flex flexDir="column">
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
          <Heading
            as="h1"
            size="display.md"
            textAlign="center"
            px={{ base: 2, md: 0 }}
          >
            Simple, transparent & flexible{" "}
            <Box bgGradient="linear(to-r, #4DABEE, #692AC1)" bgClip="text">
              pricing for every team.
            </Box>
          </Heading>
        </Flex>
        <Container maxW="max-content">
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={8}>
            <Card
              as={Flex}
              gap={10}
              flexDir="column"
              borderColor="gray.900"
              p={10}
              h="full"
            >
              <Flex flexDir="column" gap={8}>
                <Flex flexDir="column" gap={4}>
                  <Heading as="h3" size="title.lg">
                    Starter
                  </Heading>
                  <Text>
                    Ideal for individuals and small teams <br /> who require
                    basic features.
                  </Text>
                </Flex>
                <Heading size="title.2xl" color="white">
                  Free
                </Heading>
              </Flex>
              <Flex flexDir="column" gap={2}>
                <CheckmarkItem text="RPCs & Storage Gateway" />
                <CheckmarkItem text="Storage Pinning (First 50GB free)" />
                <CheckmarkItem text="NFT Checkout" />
                <CheckmarkItem text="Email Wallets" />
                <CheckmarkItem text="Device Wallets" />
                <CheckmarkItem text="Smart Wallets" />
              </Flex>
              <TrackedLinkButton
                variant="outline"
                borderColor="gray.900"
                py={6}
                category={TRACKING_CATEGORY}
                label="starter"
                href=""
              >
                Get Started
              </TrackedLinkButton>
            </Card>
            <Card
              as={Flex}
              gap={10}
              flexDir="column"
              borderColor="gray.900"
              p={10}
            >
              <Flex flexDir="column" gap={8}>
                <Flex flexDir="column" gap={4}>
                  <Heading as="h3" size="title.lg">
                    Pro
                  </Heading>
                  <Text>
                    deal for teams that require more <br />
                    customization, SLA&apos;s, and support.
                  </Text>
                </Flex>
                <Heading size="title.2xl" color="white">
                  $999+
                </Heading>
              </Flex>
              <Flex flexDir="column" gap={2}>
                <Text color="white">Everything in Free Plan Bundle plus:</Text>
                <CheckmarkItem text="Higher rate limits for RPC" />
                <CheckmarkItem text="Higher rate limits for Storage Gateway" />
                <CheckmarkItem text="Higher storage pinning file size for IPFS" />
                <CheckmarkItem text="Higher transaction limit for checkout" />
                <CheckmarkItem text="99.9% Infrastructure uptime SLA's" />
                <CheckmarkItem text="24 hour customer support SLA's" />
                <CheckmarkItem text="Dedicated support channels" />
              </Flex>
              <TrackedLinkButton
                bgColor="white"
                _hover={{
                  bgColor: "white",
                  opacity: 0.8,
                }}
                color="black"
                py={6}
                category={TRACKING_CATEGORY}
                label="pro"
                href="/contact-us"
              >
                Contact Sales
              </TrackedLinkButton>
            </Card>
          </SimpleGrid>
        </Container>
        <Flex flexDir="column" gap={20}>
          {SECTIONS.map((section) => (
            <Flex flexDir="column" key={section.title} gap={4}>
              <SimpleGrid columns={3}>
                <Flex gap={2} alignItems="center">
                  <ChakraNextImage src={section.icon} boxSize={5} alt="" />{" "}
                  <Text color="white" size="body.xl">
                    {section.title}
                  </Text>
                </Flex>
                <Text size="body.xl" color="gray.700" textAlign="center">
                  Starter
                </Text>
                <Text size="body.xl" color="gray.700" textAlign="center">
                  Pro
                </Text>
              </SimpleGrid>
              <Flex flexDir="column">
                {section.items.map((item) => (
                  <SimpleGrid columns={3} key={item.title} alignItems="center">
                    <Card
                      borderRadius="none"
                      borderColor="gray.900"
                      borderLeft="none"
                    >
                      <Text color="white" size="body.lg">
                        {item.title}
                      </Text>
                    </Card>
                    {item.starter === item.pro ? (
                      <GridItem colSpan={2}>
                        <Card
                          borderRadius="none"
                          borderColor="gray.900"
                          borderRight="none"
                        >
                          <Text
                            color="gray.700"
                            size="body.lg"
                            textAlign="center"
                          >
                            {item.starter === "checkmark" ? (
                              <Icon
                                as={IoCheckmarkCircle}
                                boxSize={4}
                                color="blue.500"
                              />
                            ) : (
                              item.starter
                            )}
                          </Text>
                        </Card>
                      </GridItem>
                    ) : (
                      <>
                        <Card borderRadius="none" borderColor="gray.900">
                          <Text
                            color="gray.700"
                            size="body.lg"
                            textAlign="center"
                          >
                            {item.starter === "checkmark" ? (
                              <Icon
                                as={IoCheckmarkCircle}
                                boxSize={4}
                                color="blue.500"
                              />
                            ) : (
                              item.starter
                            )}
                          </Text>
                        </Card>
                        <Card
                          borderRadius="none"
                          borderColor="gray.900"
                          borderRight="none"
                        >
                          <Text
                            color="gray.700"
                            size="body.lg"
                            textAlign="center"
                          >
                            {item.pro === "checkmark" ? (
                              <Icon
                                as={IoCheckmarkCircle}
                                boxSize={4}
                                color="blue.500"
                              />
                            ) : (
                              item.pro
                            )}
                          </Text>
                        </Card>
                      </>
                    )}
                  </SimpleGrid>
                ))}
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Container>
    </LandingLayout>
  );
};

Pricing.pageId = PageId.Pricing;

export default Pricing;

interface CheckmarkItemProps {
  text: string;
}

const CheckmarkItem: React.FC<CheckmarkItemProps> = ({ text }) => (
  <Flex gap={2} alignItems="center">
    <Icon as={IoCheckmarkCircle} boxSize={5} />{" "}
    <Text color="gray.600">{text}</Text>
  </Flex>
);
