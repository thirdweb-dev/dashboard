import { Flex, Grid, Icon, Image, Link, VStack } from "@chakra-ui/react";
import { FiExternalLink } from "react-icons/fi";
import { Heading, Text } from "tw-components";

interface IWinner {
  name: string;
  image: string;
  link: string;
  position: string;
}

interface HackathonWinnersProps {
  winners: IWinner[];
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
      <Grid
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
          <Link href={link} isExternal key={name}>
            <Flex
              _hover={{
                boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
                transform: "translateY(-5px)",
                transition: "all 0.3s ease",
              }}
              zIndex={2}
              key={name}
              direction="column"
              pos="relative"
              bg="whiteAlpha.100"
              w="full"
              pb={4}
              rounded="lg"
            >
              <Image
                src={image}
                alt={name}
                objectFit="cover"
                h={60}
                roundedTop="lg"
              />
              <Flex flexDir="column" pl={4}>
                <Heading size="title.md" color="white" mt={5}>
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
                pos="absolute"
                right="4"
                bottom="6"
              />
            </Flex>
          </Link>
        ))}
      </Grid>
    </VStack>
  );
};
