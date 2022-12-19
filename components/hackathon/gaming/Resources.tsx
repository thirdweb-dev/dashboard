import { Flex, Grid, Image } from "@chakra-ui/react";
import type { FC } from "react";
import { Heading, Text, TrackedLink } from "tw-components";

export const Resources: FC = () => {
  const resources = [
    {
      name: "GamingKit",
      link: "https://portal.thirdweb.com/gamingkit",
      image: "/thirdweb.png",
    },
    {
      name: "GamingKit QuickStart",
      link: "https://portal.thirdweb.com/gamingkit/quickstart",
      image: "/thirdweb.png",
    },
    {
      name: "Gaming Guides/Blog",
      link: "https://blog.thirdweb.com/tag/gaming/",
      image: "/thirdweb.png",
    },
    {
      name: "Gaming Guides/Blog",
      link: "https://blog.thirdweb.com/tag/gaming/",
      image: "/thirdweb.png",
    },
  ];

  return (
    <Flex flexDir="column">
      <Heading>Resources</Heading>
      <Grid templateColumns="repeat(4, 1fr)" gap={6} mt={4}>
        {resources.map(({ name, link, image }, i) => (
          <TrackedLink
            href={link}
            isExternal
            category="readyplayer3"
            label={name}
            key={i}
          >
            <Flex flexDir="column" rounded="lg" bg="whiteAlpha.100" p={4}>
              <Image
                src={image}
                alt={name}
                w="full"
                objectFit="contain"
                rounded="lg"
              />
              <Text mt={2} color="white" ml={2}>
                {name}
              </Text>
            </Flex>
          </TrackedLink>
        ))}
      </Grid>
    </Flex>
  );
};
