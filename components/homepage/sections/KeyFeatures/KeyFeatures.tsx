import BuildSVG from "./icons/Build.svg";
import LaunchSVG from "./icons/Launch.svg";
import ManangeSVG from "./icons/Manage.svg";
import { Box, Image, SimpleGrid } from "@chakra-ui/react";
import { HomepageSection } from "components/product-pages/homepage/HomepageSection";
import { Heading, Text } from "tw-components";

interface FeatureCardProps {
  title: string;
  description: string;
  img: string;
  gradient: string;
}

const features: FeatureCardProps[] = [
  {
    title: "01 Build",
    gradient: "linear-gradient(90deg, #8877f1, #7AA8D2)",
    description:
      "Integrate web3 into your apps and games easily with our SDKs. Explore ready-to-deploy contracts or build your own contract with our ContractKit.",
    img: BuildSVG.src,
  },
  {
    title: "02 Launch",
    gradient: "linear-gradient(90deg, #F5BC91, #E386E9)",
    description:
      "Integrate web3 into your apps and games easily with our SDKs. Explore ready-to-deploy contracts or build your own contract with our ContractKit.",
    img: LaunchSVG.src,
  },
  {
    title: "03 Manage",
    gradient: "linear-gradient(90deg, #DF85CD, #5F63E3)",
    description:
      "Integrate web3 into your apps and games easily with our SDKs. Explore ready-to-deploy contracts or build your own contract with our ContractKit.",
    img: ManangeSVG.src,
  },
];

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  img,
  gradient,
}) => {
  return (
    <Box
      zIndex={10}
      as="section"
      background="rgba(0,0,0,0.7)"
      px={10}
      py={12}
      borderRadius="8px"
    >
      <Image src={img} alt="" width={12} mb={12} />
      <Heading
        as="h3"
        fontSize="24px"
        mb={6}
        bgGradient={gradient}
        bgClip="text"
      >
        {title}
      </Heading>
      <Text size="body.lg" lineHeight={1.7}>
        {description}
      </Text>
    </Box>
  );
};

export const KeyFeatures: React.FC = () => {
  return (
    <HomepageSection
      py={24}
      middleGradient
      gradientOpacity={{ base: 1, md: 0.5 }}
    >
      <Heading as="h3" size="display.sm" mb={24} textAlign="center">
        <Box
          as="span"
          bgGradient="linear-gradient(270.45deg, #ECC4FF 11.79%, #88B7FF 88.06%)"
          bgClip="text"
        >
          Building for web3
        </Box>
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
