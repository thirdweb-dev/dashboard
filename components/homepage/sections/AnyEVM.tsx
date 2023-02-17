import Hero from "../../../public/assets/landingpage/hero.png";
import { ChakraNextImage } from "../../Image";
import { HomepageSection } from "../../product-pages/homepage/HomepageSection";
import { Aurora } from "../Aurora";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { Heading, Text } from "tw-components";

export const AnyEVMSection = () => {
  return (
    <HomepageSection id="any-evm">
      <Flex
        flexDir="column"
        pt={{ base: 12, lg: 24 }}
        align="center"
        gap={{ base: 6, md: 8 }}
        pb={16}
      >
        <Heading
          bg="linear-gradient(350deg, #FFFFFF -15%, rgba(255, 255, 255, 0) 135%)"
          bgClip="text"
          as="h2"
          size="title.2xl"
          textAlign="center"
          letterSpacing="-0.04em"
        >
          Any Contract. Any Chain.
        </Heading>
        <Text
          bg="linear-gradient(30deg, #FFFFFF -10%, rgba(255, 255, 255, 0) 150%);"
          bgClip="text"
          textAlign="center"
          as="h3"
          maxW={480}
          size="label.xl"
          lineHeight={1.2}
        >
          Our tools work with any contract deployed on any EVM compatible chain.
        </Text>
      </Flex>
      <Box mb="-60%" zIndex="-1" position="relative" mt={12}>
        <ChakraNextImage
          transform="translate(-50%, -60%)"
          ml="50%"
          alt=""
          minW="950px"
          src={require("public/assets/landingpage/any-evm.png")}
          justifySelf="flex-end"
        />
      </Box>
    </HomepageSection>
  );
};
