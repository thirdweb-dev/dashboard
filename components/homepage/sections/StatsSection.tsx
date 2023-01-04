import { Box, Container, SimpleGrid } from "@chakra-ui/react";
import { Heading, Text } from "tw-components";

const stats: StatBoxProps[] = [
  {
    title: "60k+",
    description: "Web3 developers use thirdweb",
  },
  {
    title: "200k+",
    description: "Total contracts deployed",
  },
  {
    title: "3M",
    description: "Total Transactions",
  },
];

interface StatBoxProps {
  title: string;
  description: string;
}

const Stat: React.FC<StatBoxProps> = ({ title, description }) => {
  return (
    <Box
      zIndex={10}
      position="relative"
      textAlign="center"
      p={{ base: 4, md: 6 }}
      alignItems={"center"}
      borderRadius="8px"
    >
      <Heading
        as="h3"
        bg="linear-gradient(180deg,#fff,hsla(0,0%,100%,.75))"
        bgClip="text"
        display={"inline-block"}
        letterSpacing="-0.05em"
        fontSize={{ md: "56px", base: "48px" }}
        mb={2}
      >
        {title}
      </Heading>
      <Text size="body.lg" lineHeight={1.5} fontWeight={400} color="#888">
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
      mt={12}
      mb={{ base: 12, md: 40 }}
      zIndex={10}
    >
      <SimpleGrid
        columns={{ lg: 3, base: 1 }}
        px={{ base: 4, md: 0 }}
        boxShadow="0 0 0 1px hsl(0deg 0% 100% / 10%)"
        borderRadius="8px"
        background="rgba(0,0,0,0.2)"
      >
        {stats.map((stat) => (
          <Stat key={stat.title} {...stat} />
        ))}
      </SimpleGrid>
    </Container>
  );
};
