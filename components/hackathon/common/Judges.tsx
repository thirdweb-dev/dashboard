import { Avatar, Flex, SimpleGrid, VStack } from "@chakra-ui/react";
import { Heading, Text, TrackedLink } from "tw-components";

export const Judges: React.FC = () => {
  const judges = [
    {
      name: "TBA",
      twitter: "",
      image: "/assets/hackathon/judges/tba.svg",
      company: "TBA",
    },
    {
      name: "TBA",
      twitter: "",
      image: "/assets/hackathon/judges/tba.svg",
      company: "TBA",
    },
    {
      name: "TBA",
      twitter: "",
      image: "/assets/hackathon/judges/tba.svg",
      company: "TBA",
    },
    {
      name: "TBA",
      twitter: "",
      image: "/assets/hackathon/judges/tba.svg",
      company: "TBA",
    },
  ];

  return (
    <VStack spacing={8}>
      <Heading size="title.2xl">Judges</Heading>
      <SimpleGrid
        columns={{ base: 1, md: 4 }}
        gap={{ base: 8, md: 24 }}
        justifyContent="space-evenly"
      >
        {judges.map(({ name, company, image, twitter }) => (
          <Flex
            key={name}
            flexDir="column"
            gap={2}
            alignItems="center"
            zIndex={10}
          >
            <Avatar src={image} rounded="full" name={name} boxSize={40} />
            <Heading size="title.sm">{name}</Heading>
            <Text size="body.lg" color="gray.500">
              {company}
            </Text>
            <TrackedLink
              href={`https://twitter.com/${twitter}`}
              isExternal
              category="solanathon"
              label={name}
            >
              {twitter && (
                <Text size="label.md" color="gray.500">
                  @{twitter}
                </Text>
              )}
            </TrackedLink>
          </Flex>
        ))}
      </SimpleGrid>
    </VStack>
  );
};
