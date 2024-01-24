import { Flex, SimpleGrid } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { LandingDesktopMobileImage } from "components/landing-pages/desktop-mobile-image";
import React from "react";
import { Heading, Text } from "tw-components";

const builders = [
  {
    name: "Myna Swap",
    src: "",
    left: "40px",
    top: "160px",
  },
  {
    name: "Mirror",
    src: "",
    left: "127px",
    top: "130px",
  },
  {
    name: "Courtyard",
    src: "",
    left: "210px",
    top: "130px",
  },
  {
    name: "Paima Studios",
    src: "",
    left: "40px",
    top: "260px",
  },
  {
    name: "NBA Top Shot",
    src: "",
    left: "130px",
    top: "230px",
    textMaxWidth: "60px",
  },
  {
    name: "Pixels",
    src: "",
    left: "210px",
    top: "230px",
  },

  {
    name: "Animoca Brands",
    src: "",
    left: "130px",
    top: "335px",
    textMaxWidth: "60px",
  },
  {
    name: "Yuga Labs",
    src: "",
    left: "210px",
    top: "335px",
  },
];

const chainV1 = [
  {
    name: "Ex Populus",
    src: "",
    left: "38px",
    top: "160px",
  },
  {
    name: "Treasure",
    src: "",
    left: "116px",
    top: "160px",
  },
  {
    name: "Lens",
    src: "",
    left: "38px",
    top: "260px",
  },
  {
    name: "Farcaster",
    src: "",
    left: "116px",
    top: "260px",
  },
];

const chainV2 = [
  {
    name: "Optimism",
    src: "",
    left: "308px",
    top: "130px",
  },
  {
    name: "Base",
    src: "",
    left: "232px",
    top: "130px",
  },
  {
    name: "Ava Labs",
    src: "",
    left: "232px",
    top: "226px",
  },
  {
    name: "BNB",
    src: "",
    left: "308px",
    top: "226px",
  },
  {
    name: "Chainlink",
    src: "",
    left: "381px",
    top: "226px",
  },
  {
    name: "Polygon",
    src: "",
    left: "232px",
    top: "320px",
  },
  {
    name: "Circle",
    src: "",
    left: "308px",
    top: "320px",
  },
];

const brands = [
  {
    name: "Starbucks",
    src: "",
  },
  {
    name: "Lufthansa",
    src: "",
  },
  {
    name: "Etihad",
    src: "",
  },
  {
    name: "Reddit",
    src: "",
  },
  {
    name: "Adidas",
    src: "",
  },
  {
    name: "Valentino",
    src: "",
  },
  {
    name: "Nike",
    src: "",
  },
];

const ReasonSection = () => {
  return (
    <SimpleGrid
      columns={{ base: 1, md: 2 }}
      alignItems="center"
      gap="48px"
      placeItems="center"
      position="relative"
    >
      <Flex flexDir="column" maxW={"400px"}>
        <Heading size="title.lg" mt={46}>
          Who is thirdweb for?
        </Heading>

        <Text mt={4} size="body.md" color="#fff">
          We believe that the most compelling use cases of blockchain technology
          will be found by crypto-native builders and startups who are building
          with web3 at the heart of their app. thirdweb is built by web3 native
          builders for web3 native builders.
        </Text>
      </Flex>

      <LandingDesktopMobileImage
        image={require("public/assets/landingpage/desktop/audience.png")}
        mobileImage={require("public/assets/landingpage/mobile/audience.png")}
        alt="audience"
        w="100%"
        maxHeight="100%"
      />
    </SimpleGrid>
  );
};

export default ReasonSection;
