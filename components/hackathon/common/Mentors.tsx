import { Flex, SimpleGrid, VStack } from "@chakra-ui/react";
import { Heading, Text, TrackedLink } from "tw-components";
import { MaskedAvatar } from "tw-components/masked-avatar";

export const Mentors: React.FC = () => {
  const mentors = [
    {
      name: "Samina Kabir",
      twitter: "saminacodes",
      image: "/assets/landingpage/samina.jpeg",
      company: "thirdweb",
    },
    {
      name: "Farza Majeed",
      twitter: "FarzaTV",
      image: "/assets/landingpage/farza.jpeg",
      company: "buildspace",
    },
    {
      name: "Noah Hein",
      twitter: "nheindev",
      image: "/assets/landingpage/noah.png",
      company: "Phantom",
    },
    {
      name: "Chris Ahn",
      twitter: "ahnchrisj",
      image: "/assets/landingpage/chris.jpg",
      company: "Haun Ventures",
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
            <MaskedAvatar src={image} alt="" boxSize={40} />
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
              <Text size="label.md" color="gray.500">
                @{twitter}
              </Text>
            </TrackedLink>
          </Flex>
        ))}
      </SimpleGrid>
    </VStack>
  );
};
