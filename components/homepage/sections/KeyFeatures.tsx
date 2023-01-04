import { Aurora } from "../Aurora";
import { Box, Image, SimpleGrid } from "@chakra-ui/react";
import { HomepageSection } from "components/product-pages/homepage/HomepageSection";
import { ReactNode } from "react";
import { Heading, Link, Text } from "tw-components";

interface FeatureCardProps {
  title: string;
  description: ReactNode;
  img: string;
  // gradient: string;
}

const features: FeatureCardProps[] = [
  {
    title: "Build.",
    // gradient: "linear-gradient(90deg, #8877f1, #7AA8D2)",
    description: (
      <>
        Integrate web3 into your apps and games easily with our{" "}
        <Link color="white" isExternal href="https://portal.thirdweb.com/sdk">
          SDKs
        </Link>
        . Explore{" "}
        <Link color="white" isExternal href="https://thirdweb.com/explore">
          ready-to-deploy contracts
        </Link>{" "}
        or build your own contract with our{" "}
        <Link
          color="white"
          isExternal
          href="https://portal.thirdweb.com/contractkit"
        >
          ContractKit
        </Link>
        .
      </>
    ),
    img: "/assets/landingpage/icons/Build.svg",
  },

  {
    title: "Launch.",
    // gradient: "linear-gradient(90deg, #F5BC91, #E386E9)",
    description: (
      <>
        Ship your contracts on-chain with{" "}
        <Link
          color="white"
          isExternal
          href="https://portal.thirdweb.com/deploy"
        >
          Deploy
        </Link>
        , a simple deployment workflow for teams. Publish contracts with{" "}
        <Link
          color="white"
          isExternal
          href="https://portal.thirdweb.com/release"
        >
          Release
        </Link>{" "}
        and be discovered by global web3 devs.
      </>
    ),
    img: "/assets/landingpage/icons/Launch.svg",
  },

  {
    title: "Manage.",
    // gradient: "linear-gradient(90deg, #DF85CD, #5F63E3)",
    description: (
      <>
        Monitor, interact and configure your contracts directly from the{" "}
        <Link color="white" isExternal href="https://thirdweb.com/dashboard">
          Dashboard
        </Link>
        . Invite your team to collaborate and control their access with
        permissions.
      </>
    ),
    img: "/assets/landingpage/icons/Manage.svg",
  },
];

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  img,
}) => {
  return (
    <Box
      zIndex={10}
      as="section"
      background="rgba(0,0,0,0.4)"
      boxShadow="0 0 1px 1px hsl(0deg 0% 100% / 10%)"
      p={8}
      borderRadius="8px"
    >
      <Box
        mb={8}
        p={3}
        background="hsl(0deg 0% 100% / 4%)"
        borderRadius={8}
        boxShadow="0 0 0px 1px hsl(0deg 0% 100% / 15%)"
        display="inline-block"
      >
        <Image src={img} alt="" width={6} />
      </Box>
      <Heading
        as="h3"
        fontSize={{ base: "24px", md: "32px" }}
        fontWeight={700}
        letterSpacing="-0.02em"
        mb={4}
        bg="linear-gradient(296deg,#ffffff,#eee)"
        bgClip={"text"}
      >
        {title}
      </Heading>

      <Text size="body.lg" lineHeight={1.7} color="#888">
        {description}
      </Text>
    </Box>
  );
};

export const KeyFeatures: React.FC = () => {
  return (
    <HomepageSection my={20}>
      <Aurora
        pos={{ left: "50%", top: "10%" }}
        size={{ width: "2400px", height: "1800px" }}
        color="hsl(289deg 08% 30% / 20%)"
      />

      <Heading
        as="h3"
        fontSize={{ base: "32px", md: "48px" }}
        lineHeight={1.1}
        mb={{ base: 10, md: 16 }}
        textAlign="center"
        letterSpacing={"-0.04em"}
      >
        Building for web3
        <br />
        has never been easier.
      </Heading>
      <SimpleGrid columns={{ md: 3, base: 1 }} gap={6}>
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </SimpleGrid>
    </HomepageSection>
  );
};
