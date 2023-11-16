import { Box, Flex, SimpleGrid, VStack } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { Heading, Text, TrackedLink } from "tw-components";
import { MaskedAvatar } from "tw-components/masked-avatar";

export const Judges: React.FC = () => {
  const judges = [
    {
      name: "Furqan Rhydan",
      twitter: "FurqanR",
      description: "Founder, thirdweb",
      image: "assets/landingpage/furqan-rydhan.png",
    },
    {
      name: "Chris Ahn",
      twitter: "ahnchrisj",
      description: "Partner, Haun Ventures",
      image: "assets/landingpage/chris.jpg",
    },
    {
      name: "Michael Anderson",
      twitter: "im_manderson",
      description: "Partner, Framework Ventures",
      image: "assets/landingpage/manderson.jpg",
    },
  ];

  return (
    <VStack spacing={8} position="relative">
      <Heading size="title.2xl">Judges</Heading>
      <SimpleGrid
        columns={{ base: 1, md: 3 }}
        gap={{ base: 8, md: 24 }}
        justifyContent="space-evenly"
      >
        {judges.map((judge) => (
          <Flex key={judge.name} flexDir="column" gap={2} alignItems="center">
            <MaskedAvatar
              boxSize={40}
              objectFit="cover"
              src={judge.image}
              alt={judge.name}
              borderRadius="full"
            />
            <Heading size="title.sm" mt={4}>
              {judge.name}
            </Heading>
            <Text size="body.md">{judge.description}</Text>
            <TrackedLink
              href={`https://twitter.com/${judge.twitter}`}
              isExternal
              category="solanathon"
              label={judge.name}
            >
              <Text size="label.md" color="gray.500">
                @{judge.twitter}
              </Text>
            </TrackedLink>
          </Flex>
        ))}
      </SimpleGrid>
    </VStack>
  );
};
