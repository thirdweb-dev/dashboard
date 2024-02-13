import React, { useState } from "react";
import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import CustomIcon from "./CustomIcon";
import { Heading, TrackedLink } from "tw-components";
import { ChakraNextImage } from "components/Image";

interface InteractiveProps {
  TRACKING_CATEGORY: string;
}

const interactives = [
  {
    title: "Front-end",
    href: "/connect",
    label: "connect",
    category: "CONNECT",
    description: "Wallets UI Components Client-side SDKs",
    src: require("public/assets/product-icons/wallet-sdk.png"),
    marginTopIcon: "0",
  },
  {
    title: "Back-end",
    href: "/engine",
    label: "engine",
    category: "ENGINE",
    description:
      "Back-end wallets Deploy, read & write contracts Gasless transactions",
    src: require("public/assets/product-icons/engine.png"),
    marginTopIcon: "0",
  },
  {
    title: "Onchain",
    href: "https://portal.thirdweb.com/contracts/build/overview",
    label: "contracts",
    category: "CONTRACTS",
    description: "Build custom contracts Deploy to any EVM Publish contracts",
    src: require("public/assets/product-icons/contracts-v2.png"),
    marginTopIcon: "0",
  },
];

const interactivePart: Record<string, any> = {
  0: {
    image: require("public/assets/landingpage/desktop/connect-view.png"),
    mobileImage: require("public/assets/landingpage/mobile/connect-view.png"),
    maxWidth: "37%",
    responsiveMaxWidth: "242px",
    right: "-70px",
  },
  1: {
    image: require("public/assets/landingpage/desktop/contracts-view.png"),
    mobileImage: require("public/assets/landingpage/mobile/contracts-view.png"),
    maxWidth: "50%",
    responsiveMaxWidth: "276px",
    right: "-50px",
  },
  2: {
    image: require("public/assets/landingpage/desktop/engine-view.png"),
    mobileImage: require("public/assets/landingpage/mobile/engine-view.png"),
    maxWidth: "73%",
    responsiveMaxWidth: "335px",
    right: "-60px",
  },
};

const Interactive = ({ TRACKING_CATEGORY }: InteractiveProps) => {
  const [currentSelectedState, setCurrentSelectedState] = useState(0);

  const interactivePartImage = interactivePart[currentSelectedState];

  return (
    <Flex
      w="full"
      flexDir="column"
      alignItems="center"
      mt={{ base: "0", lg: "90px" }}
      position="relative"
      as="section"
      zIndex={2}
    >
      {/* Preload images invisibly */}
      {Object.values(interactivePart).map((part, index) => (
        <Box key={index} style={{ display: "none" }}>
          <ChakraNextImage src={part.image} alt="" priority />
          <ChakraNextImage src={part.mobileImage} alt="" priority />
        </Box>
      ))}

      <Flex
        w="full"
        maxW="892px"
        alignItems="center"
        flexDir="column"
        display={{ base: "none", lg: "flex" }}
      >
        <Heading
          as="h2"
          letterSpacing="-0.04em"
          lineHeight={1.1}
          fontWeight={700}
          fontSize={{ base: "36px", md: "52px", lg: "64px" }}
          textAlign="center"
        >
          The full stack web3 development platform
        </Heading>
      </Flex>

      <Flex
        w="full"
        maxW={{ base: "100%", lg: "1100px" }}
        px={{ base: "20px", lg: "70px" }}
        justifyContent="center"
        marginTop={{ base: "0", lg: "47px" }}
        flexDirection={{ base: "column", lg: "row" }}
      >
        <SimpleGrid
          column={1}
          w="full"
          mr={{ base: "0", lg: "17px" }}
          gap="20px"
          flexDirection={{ base: "row", lg: "column" }}
          maxW={{ base: "100%", lg: "195px" }}
        >
          {interactives.map(
            (
              { title, description, src, marginTopIcon, label, category, href },
              idx,
            ) => (
              <TrackedLink
                key={idx}
                href={href}
                target="_blank"
                category={TRACKING_CATEGORY}
                label={label}
                _hover={{ textDecoration: "none" }}
              >
                <CustomIcon
                  title={title}
                  category={category}
                  description={description}
                  image={src}
                  isActive={idx === currentSelectedState}
                  marginTopIcon={{ base: "0", lg: marginTopIcon }}
                  onMouseOver={() => {
                    setCurrentSelectedState(idx);
                  }}
                  onClick={() => {}}
                />
              </TrackedLink>
            ),
          )}
        </SimpleGrid>

        {/* Desktop */}
        <Flex
          flex="1"
          justifyContent="center"
          position="relative"
          display={{ base: "none", lg: "flex" }}
        >
          <ChakraNextImage
            position="absolute"
            zIndex={2}
            src={interactivePartImage.image}
            alt=""
            maxWidth={interactivePartImage.maxWidth}
            w="full"
            top="50%"
            right={interactivePartImage.right}
            transform="translateY(-50%)"
            transition="250ms ease"
          />

          <ChakraNextImage
            src={require("public/assets/landingpage/desktop/gameplay.png")}
            alt="gameplay"
            maxW="668px"
            w="full"
            borderRadius="4px"
          />
        </Flex>

        {/* mobile */}
        <Flex
          flex="1"
          justifyContent="center"
          position="relative"
          display={{ base: "flex", lg: "none" }}
          bg="#131418"
          borderColor="#26282F"
          borderRadius="12px"
          borderWidth={1}
          mt="17px"
          padding={{ base: "22px", md: "32px 51px" }}
        >
          <ChakraNextImage
            src={interactivePartImage.mobileImage}
            alt=""
            maxWidth={interactivePartImage.responsiveMaxWidth}
            w="full"
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Interactive;
