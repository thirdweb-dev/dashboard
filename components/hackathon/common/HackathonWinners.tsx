import {
  Flex,
  Icon,
  Link,
  LinkOverlay,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { FiExternalLink } from "react-icons/fi";
import { Heading, Text } from "tw-components";

interface Winner {
  name: string;
  image: string;
  link: string;
  position: string;
}

interface HackathonWinnersProps {
  winners: Winner[];
}

export const HackathonWinners: React.FC<HackathonWinnersProps> = ({
  winners,
}) => {
  return (
    <VStack
      mb={{
        base: 40,
        md: 0,
      }}
    >
      <Heading size="title.2xl" textAlign="center" paddingTop={10}>
        Hackathon Winners
      </Heading>
      <SimpleGrid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        }}
        placeItems="center"
        gap={10}
        px={{
          base: 10,
          md: 20,
        }}
        py={10}
      >
        {winners.map(({ name, image, link, position }) => (
          <LinkOverlay
            href={link}
            isExternal
            key={name}
            _hover={{
              boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
              transform: "translateY(-5px)",
              transition: "all 0.3s ease",
            }}
            zIndex={2}
            display="flex"
            flexDir="column"
            pos="relative"
            bg="whiteAlpha.100"
            w="full"
            pb={4}
            rounded="lg"
          >
            <ChakraNextImage
              src={image}
              alt={name}
              objectFit="cover"
              height={60}
              width={600}
              roundedTop="lg"
            />
            <Flex flexDir="column" pl={4} mt={5}>
              <Heading size="title.md" color="white">
                {name}
              </Heading>
              <Text as="h4" fontSize="md" color="gray.200">
                {position}
              </Text>
            </Flex>
            <Icon
              as={FiExternalLink}
              width={6}
              height={6}
              color="white"
              ml="auto"
              mr={4}
            />
          </LinkOverlay>
        ))}
      </SimpleGrid>
    </VStack>
  );
};
