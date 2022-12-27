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
      position="relative"
      textAlign="center"
      border="4px solid transparent"
      borderRadius="8px"
      padding={6}
      pt={{ base: 6, md: 10 }}
      alignItems={"center"}
      background={`linear-gradient(black, black) padding-box, ${gradient} border-box`}
    >
      <Heading
        as="h3"
        bgGradient={gradient}
        bgClip="text"
        letterSpacing="-0.05em"
        fontSize={{ md: "72px", base: "48px" }}
        mb={2}
      >
        {title}
      </Heading>
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
