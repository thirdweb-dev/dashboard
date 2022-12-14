import { Flex, Image, SimpleGrid } from "@chakra-ui/react";
import { Text, TrackedLink } from "tw-components";

interface ISponsorProps {
  sponsors: {
    name: string;
    logo: string;
    link: string;
  }[];
}

export const Sponsors: React.FC<ISponsorProps> = ({ sponsors }) => {
  return (
    <Flex w="full" pb={20} flexDir="column" mx="auto" gap={4} mt={24}>
      <Text size="label.lg" textAlign="center">
        OUR PARTNERS
      </Text>
      <SimpleGrid columns={{ base: 2, md: 4 }} gap={8} placeItems="center">
        {sponsors.map(({ name, link, logo }) => (
          <TrackedLink
            key={name}
            href={link}
            isExternal
            category="solanathon"
            label={name}
          >
            <Image
              w="164px"
              h="50px"
              objectFit="contain"
              src={logo}
              alt={name}
            />
          </TrackedLink>
        ))}
      </SimpleGrid>
    </Flex>
  );
};
