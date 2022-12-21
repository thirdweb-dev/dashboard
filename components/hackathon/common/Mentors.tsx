import { Avatar, Flex, SimpleGrid, VStack } from "@chakra-ui/react";
import { Heading, Text, TrackedLink } from "tw-components";

export const Mentors: React.FC = () => {
  const mentors = [
    {
      name: "TBA",
      twitter: "",
      image: "/assets/hackathon/mentors/tba.svg",
      company: "TBA",
    },
    {
      name: "TBA",
      twitter: "",
      image: "/assets/hackathon/mentors/tba.svg",
      company: "TBA",
    },
    {
      name: "TBA",
      twitter: "",
      image: "/assets/hackathon/mentors/tba.svg",
      company: "TBA",
    },
    {
      name: "TBA",
      twitter: "",
      image: "/assets/hackathon/mentors/tba.svg",
      company: "TBA",
    },
  ];

  return (
    <VStack mb={20} spacing={8}>
      <Heading size="title.2xl">Mentors</Heading>
      <SimpleGrid
        columns={{ base: 1, md: 4 }}
        gap={{ base: 8, md: 24 }}
        justifyContent="space-evenly"
      >
        {mentors.map(({ name, image, company, twitter }) => (
          <Flex key={name} flexDir="column" gap={2} alignItems="center">
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
