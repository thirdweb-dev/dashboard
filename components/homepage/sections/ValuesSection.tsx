import { Box, SimpleGrid } from "@chakra-ui/react";
import { HomepageSection } from "components/product-pages/homepage/HomepageSection";
import { ReactNode } from "react";
import { Heading, Text } from "tw-components";

interface FeatureCardProps {
  title: string;
  description: ReactNode;
}

const features: FeatureCardProps[] = [
  {
    title: "Permissionless.",
    description:
      "Anyone can use thirdweb tools without authorization. The code for our contracts, SDKs, dashboard and UI components is fully open source and available to everyone.",
  },

  {
    title: "Owned by you.",
    description:
      "Every contract is 100% owned by the creator’s wallet. Developers own how they use their contracts and how to monetize from it.",
  },

  {
    title: "Composable.",
    description:
      "Our tools are designed to ensure no vendor lock-ins. Developers can easily modify, assemble and reassemble components to use in our toolkit.",
  },
];

const ValueCard: React.FC<FeatureCardProps> = ({ title, description }) => {
  return (
    <Box as="section">
      <Heading as="h3" fontSize="28px" mb={4} fontWeight={700}>
        {title}
      </Heading>

      <Text size="body.lg" lineHeight={1.7} color="#888">
        {description}
      </Text>
    </Box>
  );
};

export const ValuesSection: React.FC = () => {
  return (
    <HomepageSection my={24} px={{ base: 4, lg: 0 }}>
      <Heading
        as="h3"
        fontSize={{ base: "32px", md: "48px" }}
        letterSpacing="-0.04em"
        mb={12}
        textAlign="center"
      >
        Our core values.
      </Heading>

      <SimpleGrid
        background={"rgba(0,0,0,0.2)"}
        boxShadow="0 0 0 1px hsl(0deg 0% 100% / 15%)"
        borderRadius="12px"
        columns={{ lg: 3, base: 1 }}
        gap={{ lg: 12, base: 12 }}
        p={{ base: 6, md: 8 }}
      >
        {features.map((feature) => (
          <ValueCard {...feature} key={feature.title} />
        ))}
      </SimpleGrid>
    </HomepageSection>
  );
};
