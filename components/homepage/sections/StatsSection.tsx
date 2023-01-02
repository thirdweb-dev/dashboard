import { GradientBorder } from "../GradientBorder";
import { Box, Container, SimpleGrid } from "@chakra-ui/react";
import { Heading, Text } from "tw-components";

const stats: StatBoxProps[] = [
  {
    title: "60k+",
    description: "Web3 developers use thirdweb",
    gradient: "linear-gradient(90deg, #A79AF9, #7AA8D2)",
  },
  {
    title: "200k+",
    description: "Total contracts deployed",
    gradient: "linear-gradient(90deg, #F5BD90, #D67FDC)",
  },
  {
    title: "$4M+",
    description: "Revenue per month generated from thirdweb contracts",
    gradient: "linear-gradient(90deg, #CB79BB, #5F63E3)",
  },
];

interface StatBoxProps {
  title: string;
  description: string;
  gradient: string;
}

const Stat: React.FC<StatBoxProps> = ({ title, description, gradient }) => {
  return (
    <Box
      zIndex={10}
      position="relative"
      textAlign="center"
      background={"rgba(0,0,0,0.4)"}
      padding={4}
      pt={{ base: 4, md: 6 }}
      alignItems={"center"}
    >
      <Heading
        as="h3"
        bgGradient={gradient}
        bgClip="text"
        letterSpacing="-0.05em"
        fontSize="36px"
        mb={2}
      >
        {title}
      </Heading>
      <GradientBorder width="4px" gradient={gradient} borderRadius="8px" />
      <Text size="body.lg" lineHeight={1.5}>
        {description}
      </Text>
    </Box>
  );
};

export const StatsSection: React.FC = () => {
  return (
    <Container
      position="relative"
      maxW={"container.page"}
      py={{ base: 12, md: 24 }}
    >
      <SimpleGrid columns={{ lg: 3, base: 1 }} gap={6} px={{ base: 4, md: 0 }}>
        {stats.map((stat) => (
          <Stat key={stat.title} {...stat} />
        ))}
      </SimpleGrid>
    </Container>
  );
};
