import { Grid, Stack } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import React from "react";
import { Heading, Text } from "tw-components";

export const partnerMap = {
  paper: {
    title: "Paper.xyz",
    description: "Payment provider",
  },
  whop: {
    title: "Whop",
    description: "SAAS",
  },
  filta: {
    title: "Filta",
    description: "SAAS",
  },
  daocentral: {
    title: "Dao Central",
    description: "DAO",
  },
  presearch: {
    title: "Presearch",
    description: "SAAS",
  },
  citydao: {
    title: "CityDao",
    description: "SAAS",
  },
} as const;

type PartnerType = keyof typeof partnerMap;

export const Partner: React.FC<{ type: PartnerType }> = ({ type }) => {
  const { title, description } = partnerMap[type];
  return (
    <Stack
      spacing={6}
      align="center"
      border=".5px solid"
      borderColor="#ffffff26"
      py={8}
      px={10}
      borderRadius="lg"
      backgroundColor="#0000004d"
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
  );
};
