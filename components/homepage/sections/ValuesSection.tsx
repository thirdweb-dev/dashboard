import { GradientBorder } from "../GradientBorder";
import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import { HomepageSection } from "components/product-pages/homepage/HomepageSection";
import { ReactNode } from "react";
import { Heading, Text } from "tw-components";

interface FeatureCardProps {
  title: string;
  description: ReactNode;
  gradient: string;
}

const features: FeatureCardProps[] = [
  {
    title: "Permissionless.",
    gradient: "linear-gradient(90deg, #8877f1, #7AA8D2)",
    description:
      "Anyone can use thirdweb tools without authorization. The code for our contracts, SDKs, dashboard and UI components is fully open source and available to everyone.",
  },

  {
    title: "Owned by you.",
    gradient: "linear-gradient(90deg, #F5BC91, #E386E9)",
    description:
      "Every contract is 100% owned by the creator’s wallet. Developers own how they use their contracts and how to monetize from it.",
  },

  {
    title: "Composable.",
    gradient: "linear-gradient(90deg, #DF85CD, #5F63E3)",
    description:
      "Our tools are designed to ensure no vendor lock-ins. Developers can easily modify, assemble and reassemble components to use in our toolkit.",
  },
];

const ValueCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  gradient,
}) => {
  return (
    <Box>
      <Heading
        textAlign="center"
        as="h3"
        fontSize="34px"
        mb={6}
        bgGradient={gradient}
        bgClip="text"
      >
        {title}
      </Heading>

      <Flex
        position="relative"
        justifyContent="center"
        alignItems="center"
        zIndex={10}
        as="section"
        p={{ lg: 12, base: 8 }}
        borderRadius="12px"
        minH={{ base: "auto", lg: "220px" }}
        background={"rgba(0,0,0,0.4)"}
      >
        <GradientBorder gradient={gradient} borderRadius={"12px"} width="4px" />
        <Text
          size="body.lg"
          lineHeight={1.7}
          textAlign="center"
          color="gray.400"
        >
          {description}
        </Text>
      </Flex>
    </Box>
  );
};

export const ValuesSection: React.FC = () => {
  return (
    <HomepageSection
      py={24}
      px={{ base: 4, lg: 0 }}
      middleGradient
      gradientOpacity={{ base: 0.6, md: 0.4 }}
    >
      <Heading as="h3" size="display.sm" mb={12} textAlign="center">
        Our core values.
      </Heading>
      <SimpleGrid columns={{ lg: 3, base: 1 }} gap={{ lg: 6, base: 12 }}>
        {features.map((feature, i) => (
          <Box key={feature.title} mt={{ lg: i !== 1 ? 12 : 0, base: 0 }}>
            <ValueCard {...feature} />{" "}
          </Box>
        ))}
      </SimpleGrid>
    </HomepageSection>
  );
};
