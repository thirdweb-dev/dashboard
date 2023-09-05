import {
  Box,
  Center,
  Container,
  Flex,
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

const Pricing: ThirdwebNextPage = () => {
  return (
    <LandingLayout seo={{}}>
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
                <CheckmarkItem text="Device Wallet" />
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
