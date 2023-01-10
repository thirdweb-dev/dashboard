import { Flex, Image } from "@chakra-ui/react";
import { Heading, TrackedLink } from "tw-components";

interface Sponsor {
  name: string;
  logo: string;
  link: string;
}

interface SponsorProps {
  sponsors: Sponsor[];
  hackathonName: string;
}

export const Sponsors: React.FC<SponsorProps> = ({
  sponsors,
  hackathonName,
}) => {
  return (
    <Flex w="full" pb={20} flexDir="column" mx="auto" gap={12} mt={24}>
      <Heading
        fontSize={{ base: "24px", md: "32px" }}
        textAlign="center"
        fontWeight={700}
      >
        Our Partners
      </Heading>
      <Flex gap={{ base: 8, md: 16 }} justifyContent="center" flexWrap="wrap">
        {sponsors.map(({ name, link, logo }) => (
          <TrackedLink
            key={name}
            href={link}
            isExternal
            category={hackathonName}
            label={name}
          >
            <Image
              // w="px"
              maxW="150px"
              h="60px"
              objectFit="contain"
              src={logo}
              alt={name}
            />
          </TrackedLink>
        ))}
      </Flex>
    </Flex>
  );
};
