import { Grid, Stack } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { useTrack } from "hooks/analytics/useTrack";
import React from "react";
import { Heading, Link, Text } from "tw-components";

export const partnerMap = {
  paper: {
    title: "Paper.xyz",
    description: "Payment provider",
    href: "https://paper.xyz/",
  },
  whop: {
    title: "Whop",
    description: "Marketplace",
    href: "https://whop.com/",
  },
  filta: {
    title: "Filta",
    description: "Marketplace",
    href: "https://www.getfilta.com/",
  },
  daocentral: {
    title: "Dao Central",
    description: "DAO",
    href: "https://daocentral.com/",
  },
  presearch: {
    title: "Presearch",
    description: "Search Engine",
    href: "https://presearch.org/",
  },
  citydao: {
    title: "CityDao",
    description: "DAO",
    href: "https://www.citydao.io/",
  },
} as const;

type PartnerType = keyof typeof partnerMap;

export const Partner: React.FC<{ type: PartnerType }> = ({ type }) => {
  const { title, description, href } = partnerMap[type];
  const { trackEvent } = useTrack();
  return (
    <Link
      href={href}
      isExternal
      _hover={{ textDecoration: "none" }}
      onClick={() =>
        trackEvent({
          category: "partners",
          action: "click",
          label: title,
        })
      }
    >
      <Stack
        spacing={6}
        align="center"
        border="1px solid"
        borderColor="#ffffff26"
        py={8}
        px={10}
        borderRadius="lg"
        backgroundColor="#0000004d"
        _hover={{ borderColor: "primary.600" }}
      >
        <Grid
          bg="black"
          boxSize={{ base: "6rem", md: "6rem" }}
          placeItems="center"
          borderRadius="full"
        >
          <ChakraNextImage
            alt=""
            boxSize="55%"
            layout="fill"
            objectFit="contain"
            objectPosition="center"
            src={require(`/public/assets/partners/${type}.png`)}
          />
        </Grid>
        <Stack spacing={3} align="center">
          <Heading as="h4" size="title.sm" fontWeight="600" color="gray.50">
            {title}
          </Heading>
          <Text size="label.md">{description}</Text>
        </Stack>
      </Stack>
    </Link>
  );
};
