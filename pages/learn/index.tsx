import { Box, SimpleGrid } from "@chakra-ui/react";
import { Hero } from "components/product-pages/common/Hero";
import HeroImage from "public/assets/landingpage/hero.png";
import { PageId } from "page-id";
import { ProductCard } from "components/product-pages/common/ProductCard";
import { ProductPage } from "components/product-pages/common/ProductPage";
import { ProductSection } from "components/product-pages/common/ProductSection";
import { Heading, Text } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const TRACKING_CATEGORY = "learn";

const Learn: ThirdwebNextPage = () => {
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

Learn.pageId = PageId.Learn;

export default Learn;
