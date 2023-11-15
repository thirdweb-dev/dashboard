import { Flex, SimpleGrid, VStack } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
/* import { MaskedAvatar } from "components/contract-components/releaser/masked-avatar";
 */ import { Heading, Text, TrackedLink } from "tw-components";

export const Judges: React.FC = () => {
  const judges = [
    {
      name: "Furqan Rhydan",
      twitter: "FurqanR",
      image: require("public/assets/landingpage/furqan-rydhan.png"),
    },
    {
      name: "Samina Kabir",
      twitter: "saminacodes",
      image: require("public/assets/landingpage/samina.jpeg"),
    },
    {
      name: "Joaquim Vergès",
      twitter: "joenrv",
      image: require("public/assets/landingpage/joaquim.jpeg"),
    },
  ];

  return (
    <VStack mb={20} spacing={8}>
      <Heading size="title.2xl">Judges</Heading>
      <SimpleGrid
        columns={{ base: 1, md: 3 }}
        gap={{ base: 8, md: 24 }}
        justifyContent="space-evenly"
      >
        {judges.map((judge) => (
          <Flex key={judge.name} flexDir="column" gap={2} alignItems="center">
            <ChakraNextImage
              boxSize={40}
              objectFit="cover"
              src={judge.image}
              alt={judge.name}
            />
            <Heading size="title.sm">{judge.name}</Heading>
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
