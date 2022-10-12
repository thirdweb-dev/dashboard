import {
  AspectRatio,
  Box,
  Center,
  Container,
  Flex,
  HStack,
  Icon,
  Link,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { GuideCard } from "components/product-pages/common/GuideCard";
import { ProductButton } from "components/product-pages/common/ProductButton";
import { ProductPage } from "components/product-pages/common/ProductPage";
import { ProductSection } from "components/product-pages/common/ProductSection";
import { DashboardCard } from "components/product-pages/homepage/DashboardCard";
import { PageId } from "page-id";
import { ThirdwebNextPage } from "pages/_app";
import { FiArrowRight } from "react-icons/fi";
import { Heading, LinkButton, Text, TrackedLink } from "tw-components";

const SOLANA_GUIDES = [
  {
    title:
      "Getting Started with Solana: How to Create a Phantom Wallet and Get Funds",
    image:
      "https://blog.thirdweb.com/content/images/size/w2000/2022/09/Getting-started-with-solana-thirdweb.png",
    link: "https://blog.thirdweb.com/guides/getting-started-with-solana/",
  },
  {
    title: "How to Create An NFT Drop on Solana",
    image:
      "https://blog.thirdweb.com/content/images/size/w2000/2022/10/create-nft-drop-on-sol.png",
    link: "https://blog.thirdweb.com/guides/how-to-build-an-nft-drop-on-solana/",
  },
  {
    title: "How to Create A Solana NFT Collection with TypeScript",
    image:
      "https://blog.thirdweb.com/content/images/size/w2000/2022/10/This-is-the-one-2-.png",
    link: "https://blog.thirdweb.com/guides/mint-a-solana-nft-collection-with-typescript/",
  },
  {
    title: "Create your own token on Solana in less than 5 minutes!",
    image:
      "https://blog.thirdweb.com/content/images/size/w2000/2022/09/This-is-the-one-6.png",
    link: "https://blog.thirdweb.com/guides/create-your-own-token-on-solana-in-less-than-2-minutes/",
  },
  {
    title: "Building on Solana (SOL): Pros and Cons",
    image:
      "https://blog.thirdweb.com/content/images/size/w2000/2022/09/This-is-the-one-5.png",
    link: "https://blog.thirdweb.com/guides/solana-development-pros-and-cons/",
  },
];

const Solana: ThirdwebNextPage = () => {
  return (
    <ProductPage
      seo={{
        title: "Solana",
        description:
          "We're excited to announce that thirdweb developer tools are coming to Solana!",
      }}
    >
      <Center
        w="100%"
        as="section"
        flexDirection="column"
        bg="#030A1A"
        padding={{ base: 0, md: "64px" }}
      >
        <SimpleGrid
          as={Container}
          maxW="container.page"
          borderRadius={{ base: 0, md: 24 }}
          columns={{ base: 1, md: 9 }}
          padding={0}
          margin={{ base: "0px", md: "40px" }}
          mb={0}
          minHeight="578px"
        >
          <Flex
            gridColumnEnd={{ base: undefined, md: "span 6" }}
            padding={{ base: "24px", md: "48px" }}
            pt={{ base: "36px", md: undefined }}
            borderLeftRadius={{ base: 0, md: 24 }}
            flexDir="column"
            gap={{ base: 6, md: "32px" }}
            align={{ base: "initial", md: "start" }}
            justify={{ base: "start", md: "center" }}
          >
            <Heading
              as="h2"
              fontSize="48px"
              fontWeight="bold"
              size="display.sm"
              textAlign={{ base: "center", md: "left" }}
            >
              We&apos;re bringing engineering excellence to Solana
            </Heading>
            <Heading
              as="h3"
              size="subtitle.md"
              color="white"
              opacity={0.8}
              textAlign={{ base: "center", md: "left" }}
            >
              <strong>Building on Solana has never been easier.</strong>{" "}
              We&apos;ve simplified the Solana development workflow with our
              intuitive Dashboard and SDKs to deploy and interact with your
              programs. Focus on creating value for your users and leave all the
              web3 complexity to us.
            </Heading>
            <Stack
              spacing={5}
              direction={{ base: "column", lg: "row" }}
              align={"center"}
              mt="24px"
            >
              <ProductButton
                maxW="260px"
                title="Start building"
                href="/programs"
                color="blackAlpha.900"
                bg="white"
              />
              <LinkButton
                variant="outline"
                href="https://portal.thirdweb.com/solana"
                px={"64px"}
                py={"28px"}
                fontSize="20px"
                maxW="260px"
                fontWeight="bold"
                isExternal
              >
                Explore docs
              </LinkButton>
            </Stack>
          </Flex>

          <Center gridColumnEnd={{ base: undefined, md: "span 3" }}>
            <Flex justifyContent={{ base: "center", md: "flex-end" }} w="100%">
              <AspectRatio ratio={1} w="100%">
                <ChakraNextImage
                  alt=""
                  src={require("public/assets/network-pages/solana/hero.png")}
                  layout="fill"
                  objectFit="contain"
                  priority
                />
              </AspectRatio>
            </Flex>
          </Center>
        </SimpleGrid>
      </Center>

      <ProductSection>
        <Flex
          flexDir="column"
          py={{ base: 24, lg: 36 }}
          align="center"
          gap={{ base: 12, lg: 24 }}
        >
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
            <DashboardCard
              headingTitle="Build"
              title={"Powerful Solana SDKs"}
              subtitle="Create frontend and backend applications with Solana using our fully-featured SDKs."
              rightImage={require("public/assets/landingpage/thirdweb-teams.png")}
              gradientBGs={{
                topGradient: "#8752F3",
                bottomGradient: "#28E0B9",
                rightGradient: "#9945FF",
                leftGradient: "#19FB9B",
              }}
            />
            <DashboardCard
              headingTitle="Launch"
              title={"Easily Deploy Programs"}
              subtitle="Deploy NFT Collections, Drops, and Tokens in a single click or single line of code."
              rightImage={require("public/assets/landingpage/contracts.png")}
              gradientBGs={{
                rightGradient: "#8752F3",
                leftGradient: "#28E0B9",
                bottomGradient: "#9945FF",
                topGradient: "#19FB9B",
              }}
            />
            <DashboardCard
              headingTitle="Manage"
              title={"Intuitive Dashboard"}
              subtitle="Monitor, configure, and interact with your programs from an intuitive admin dashboard."
              rightImage={require("public/assets/landingpage/analytics.png")}
              gradientBGs={{
                bottomGradient: "#8752F3",
                topGradient: "#28E0B9",
                leftGradient: "#9945FF",
                rightGradient: "#19FB9B",
              }}
            />
          </SimpleGrid>
        </Flex>
      </ProductSection>

      <ProductSection>
        <Flex
          flexDir="column"
          py={{ base: 24, lg: 36 }}
          align="center"
          gap={{ base: 6, lg: 8 }}
        >
          <Heading
            as="h2"
            bgGradient="linear(to-r, #28E0B9, #C5D8FF 80%)"
            bgClip="text"
            size="display.sm"
            fontWeight={700}
            textAlign="center"
          >
            Learn how to build on Solana
          </Heading>
          <Heading
            as="h3"
            maxW="820px"
            textAlign="center"
            color="whiteAlpha.600"
            size="subtitle.md"
          >
            Check out our comprehensive guides to get you started building on
            Solana with thirdweb.
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
            {SOLANA_GUIDES.map(({ title, image, link }) => (
              <GuideCard key={title} image={image} title={title} link={link} />
            ))}
          </SimpleGrid>
          <TrackedLink
            href="https://blog.thirdweb.com/tag/solana/"
            category="solana"
            label="see-all-guides"
            isExternal
          >
            <HStack>
              <Heading
                fontSize="20px"
                fontWeight="medium"
                as="p"
                lineHeight={{ base: 1.5, md: undefined }}
              >
                See all of our Solana guides
              </Heading>
              <Icon as={FiArrowRight} />
            </HStack>
          </TrackedLink>
        </Flex>
      </ProductSection>

      <Box
        h="1px"
        bg="linear-gradient(93.96deg, rgba(25, 26, 27, 0.8) 17.14%, rgba(24, 67, 78, 0.8) 36.78%, rgba(108, 47, 115, 0.8) 61%, rgba(25, 26, 27, 0.8) 79.98%)"
        opacity="0.8"
      />

      <Box w="100%" as="section" zIndex={2} position="relative" bg="#030A1A">
        <Flex
          flexDir="column"
          pt={{ base: 24, md: 36 }}
          pb={{ base: 20, md: 32 }}
          px={"20px"}
          align="center"
        >
          <Text
            size="body.2xl"
            maxWidth="820px"
            color="white"
            textAlign="center"
          >
            &quot;We&apos;re excited to announce that thirdweb developer tools
            are coming to Solana. Quickly learn how to ship web3 apps on Solana
            ecosystem with the same effortless workflow that you&apos;re already
            used to&quot;
          </Text>
          <AspectRatio ratio={1} w="320px" height="180px">
            <ChakraNextImage
              alt=""
              src={require("public/assets/network-pages/solana/solana-logo.png")}
              layout="fill"
              objectFit="contain"
              priority
            />
          </AspectRatio>
        </Flex>
      </Box>

      <Box
        h="1px"
        bg="linear-gradient(93.96deg, rgba(25, 26, 27, 0.8) 17.14%, rgba(24, 67, 78, 0.8) 36.78%, rgba(108, 47, 115, 0.8) 61%, rgba(25, 26, 27, 0.8) 79.98%)"
        opacity="0.8"
      />

      <Box w="100%" as="section" zIndex={2} position="relative" bg="#030A1A">
        <Flex
          flexDir="column"
          pb={{ base: 24, md: 36 }}
          pt={{ base: 20, md: 32 }}
          align="center"
          gap={{ base: 6, md: 8 }}
        >
          <Stack align="center" spacing={12}>
            <Heading
              as="h2"
              size="display.sm"
              maxW="820px"
              fontWeight={700}
              textAlign="center"
            >
              Build, launch, and manage web3 apps on Solana today
            </Heading>
            <HStack spacing={5}>
              <ProductButton
                maxW="260px"
                title="Start building"
                href="/programs"
                color="blackAlpha.900"
                bg="white"
              />
              <LinkButton
                variant="outline"
                href="https://portal.thirdweb.com/solana"
                px={"64px"}
                py={"28px"}
                fontSize="20px"
                fontWeight="bold"
                isExternal
              >
                Explore docs
              </LinkButton>
            </HStack>
          </Stack>
        </Flex>
      </Box>
    </ProductPage>
  );
};

Solana.pageId = PageId.Solana;

export default Solana;
