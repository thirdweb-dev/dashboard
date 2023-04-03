import { Box, Flex, Icon, Image, SimpleGrid } from "@chakra-ui/react";
import { GuidesShowcase } from "components/product-pages/common/GuideShowcase";
import { Hero } from "components/product-pages/common/Hero";
import HeroImage from "public/assets/landingpage/hero.png";
import { ProductCard } from "components/product-pages/common/ProductCard";
import { ProductLearnMoreCard } from "components/product-pages/common/ProductLearnMoreCard";
import { ProductPage } from "components/product-pages/common/ProductPage";
import { ProductSection } from "components/product-pages/common/ProductSection";
import { YoutubeEmbed } from "components/video-embed/YoutubeEmbed";
import { replaceIpfsUrl } from "lib/sdk";
import { PageId } from "page-id";
import { FiArrowRight } from "react-icons/fi";
import {
  Card,
  Heading,
  Link,
  LinkButton,
  Text,
  TrackedLink,
} from "tw-components";
import { ThirdwebNextPage } from "utils/types";

interface NFTContractInfo {
  name: string;
  description: string;
  img: string;
  link: string;
}

const TRACKING_CATEGORY = "learn";

const exploreNFTContracts: NFTContractInfo[] = [
  {
    name: "Multiwrap",
    description:
      "Bundle multiple ERC721/ERC1155/ERC20 tokens into a single ERC721.",
    img: replaceIpfsUrl(
      "ipfs://QmQm3UytP51wWMMwmDYdDHH4vCdokPqt52bUtBQoLsx5qy/edition.png",
    ),
    link: "/thirdweb.eth/Multiwrap",
  },
  {
    name: "ERC4907",
    description: "Rental NFT, ERC-721 User And Expires Extension.",
    img: replaceIpfsUrl(
      "ipfs://QmaKC631DSxDtjDcveAFVuGpSwM84icnXSGQgqrLpw3Lkh/yellow%E2%80%94360x360.png",
    ),
    link: "/doubledev.eth/ERC4907",
  },
  {
    name: "NFT Collection",
    description: "Create collection of unique NFTs.",
    img: replaceIpfsUrl(
      "ipfs://QmWARxASHf4UcWkwxTUDJxAXVDUG5STu5yBePJg35GzqjZ/nft-collection.png",
    ),
    link: "/thirdweb.eth/TokenERC721",
  },
  {
    name: "Edition",
    description: "Create editions of ERC1155 tokens.",
    img: replaceIpfsUrl(
      "ipfs://QmQm3UytP51wWMMwmDYdDHH4vCdokPqt52bUtBQoLsx5qy/edition.png",
    ),
    link: "/thirdweb.eth/TokenERC1155",
  },
  {
    name: "ERC721CommunityStream",
    description: "Equally distribute any token to community of NFT holders.",
    img: replaceIpfsUrl(
      "ipfs://QmbGjq5DY6gW1T7W7j3HEgYSAB2g4TnpzrNADTuniDXsqU/0.png",
    ),
    link: "/flairsdk.eth/ERC721CommunityStream",
  },
  {
    name: "Pack",
    description:
      "Pack multiple tokens into ERC1155 NFTs that act as randomized loot boxes.",
    img: replaceIpfsUrl(
      "ipfs://QmaLYhDh2oKxSjAS6iA434z8fvY43oAEug2AHHEMYMBU3K/pack.png",
    ),
    link: "/thirdweb.eth/Pack",
  },
];

const GUIDES = [
  {
    title: "Release an NFT Drop with an Allowlist and Multiple Claim Phases",
    image:
      "https://blog.thirdweb.com/content/images/size/w1000/2022/08/thumbnail-13.png",
    link: "https://blog.thirdweb.com/guides/create-nft-drop-with-claim-phases/",
  },
  {
    title: "Create an ERC721A NFT Drop with Signature-Based Minting",
    image:
      "https://blog.thirdweb.com/content/images/size/w1000/2022/08/thumbnail-39.png",
    link: "https://blog.thirdweb.com/guides/signature-drop/",
  },
  {
    title: "Create an Early Access NFT with TypeScript and React",
    image:
      "https://blog.thirdweb.com/content/images/size/w1000/2022/08/thumbnail-22.png",
    link: "https://blog.thirdweb.com/guides/early-access-nft-with-typescript/",
  },
];

const Minting: ThirdwebNextPage = () => {
  return (
    <ProductPage
      seo={{
        title: "Learn | web3",
        description: "Learn web3 foundations and the thirdweb sdk",
      }}
    >
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
        // TODO: Update the button link
        buttonLink="https://portal.thirdweb.com/pre-built-contracts/choosing-the-right-pre-built-contract"
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

      {/* Video Embed section*/}
      <ProductSection py={{ base: 12, lg: 24 }}>
        <Flex alignItems="center" flexDirection="column">
          <Heading
            as="h2"
            size="title.xl"
            textAlign="center"
            mb={12}
            maxW={900}
          >
            Focus on creating powerful NFT experiences and let us handle the
            complexity
          </Heading>
          <YoutubeEmbed
            maxWidth={680}
            videoId="Eoy84LxJKEU"
            aspectRatio={16 / 9}
            title="Create an ERC721 NFT drop using thirdweb"
          />
        </Flex>
      </ProductSection>


      {/* Explore NFT contracts */}
      <ProductSection py={{ base: 12, md: 24 }}>
        <Heading size="title.2xl" mb={4} as="h2" textAlign="center">
          Get started with our NFT contracts
        </Heading>

        <Text fontSize="large" textAlign="center" mb={12}>
          Go to{" "}
          <Link color="white" href="https://thirdweb.com/explore" isExternal>
            Explore
          </Link>{" "}
          to deploy in 1-click.
        </Text>

        <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={12}>
          {exploreNFTContracts.map((contractInfo) => {
            return (
              <article key={contractInfo.name}>
                <TrackedLink
                  category={TRACKING_CATEGORY}
                  label="contract"
                  trackingProps={{
                    contract: contractInfo.name
                      .toLowerCase()
                      .replaceAll(" ", "-"),
                  }}
                  href={contractInfo.link}
                  isExternal
                  textDecoration="none !important"
                >
                  <Card
                    h="100%"
                    bg="rgba(255, 255, 255, 0.05)"
                    border="1px solid rgba(255, 255, 255, 0.05)"
                    transition="border 200ms ease"
                    _hover={{
                      borderColor: "white",
                    }}
                  >
                    <Image
                      src={contractInfo.img}
                      alt=""
                      width={8}
                      mb={4}
                      borderRadius="full"
                    />
                    <Heading size="title.sm" mb={2}>
                      {contractInfo.name}
                    </Heading>
                    <Text size="body.lg">{contractInfo.description}</Text>
                  </Card>
                </TrackedLink>
              </article>
            );
          })}
        </SimpleGrid>

        <Flex justify="center" mb={8} gap={6}>
          <LinkButton
            flexShrink={0}
            size="sm"
            isExternal
            rightIcon={<Icon as={FiArrowRight} />}
            variant="link"
            href={`/explore/nft`}
            fontWeight={500}
            fontSize="20px"
          >
            View all NFT Contracts
          </LinkButton>
        </Flex>
      </ProductSection>

      {/* Guides */}
      <GuidesShowcase
        title="Start building NFT experiences"
        category={TRACKING_CATEGORY}
        description="Check out our guides to start building NFT experiences with thirdweb."
        solution="NFT-Drop"
        guides={GUIDES}
      />

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
    </ProductPage>
  );
};

Minting.pageId = PageId.SolutionsMinting;

export default Minting;
