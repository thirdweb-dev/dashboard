import React, { useState } from "react";
import { Box, Flex, Icon, SimpleGrid } from "@chakra-ui/react";
import CustomIcon from "./CustomIcon";
import { Heading, LinkButton } from "tw-components";
import { BsLightningCharge } from "react-icons/bs";
import { ChakraNextImage } from "components/Image";
import { Aurora } from "../Aurora";

const interactives = [
  {
    title: "Connect",
    description: "Wallets UI Components Client-side SDKs",
    src: require("public/assets/product-icons/wallet-sdk.png"),
    marginTopIcon: "6px",
  },
  {
    title: "Contracts",
    description:
      "Back-end wallets Deploy, read & write contracts Gasless transactions",
    src: require("public/assets/product-icons/contracts-v2.png"),
    marginTopIcon: "10px",
  },
  {
    title: "Engine",
    description: "Build custom contracts Deploy to any EVM Publish contracts",
    src: require("public/assets/product-icons/engine.png"),
    marginTopIcon: "6px",
  },
];

const interactivePart: Record<string, any> = {
  0: {
    image: require("public/assets/landingpage/desktop/connect-view.png"),
    maxWidth: "37%",
    right: "-70px",
  },
  1: {
    image: require("public/assets/landingpage/desktop/contracts-view.png"),
    maxWidth: "50%",
    right: "-50px",
  },
  2: {
    image: require("public/assets/landingpage/desktop/engine-view.png"),
    maxWidth: "73%",
    right: "-60px",
  },
};

const Interactive = () => {
  const [currentSelectedState, setCurrentSelectedState] = useState(0);

  const interactivePartImage = interactivePart[currentSelectedState];

  return (
    <Flex
      w="full"
      flexDir="column"
      alignItems="center"
      mt="90px"
      position="relative"
      as="section"
      zIndex={2}
    >
      {/* left */}
      <Aurora
        pos={{ left: "50%", top: "0" }}
        size={{ width: "2050px", height: "1200px" }}
        color="hsl(290deg 92% 54% / 20%)"
      />

      <Flex w="full" maxW="892px" alignItems="center" flexDir="column">
        <Heading
          as="h2"
          letterSpacing="-0.04em"
          lineHeight={1.1}
          fontWeight={700}
          fontSize={{ base: "36px", md: "52px", lg: "64px" }}
          textAlign="center"
        >
          Build scalable web3 apps,
          <br />
          on any EVM chain.
        </Heading>
        <Heading
          as="h3"
          size="subtitle.md"
          textAlign="center"
          maxW="487px"
          mt="24px"
        >
          Onboard users with wallets, build & deploy smart contracts, accept
          fiat with payments, and scale apps with infrastructure — on any EVM
          chain.
        </Heading>

        <LinkButton
          href="/dashboard"
          onClick={() => /*   trackEvent({
              category: "cta-button",
              action: "click",
              label: "start",
              title: "Start building",
              experiment: "open_dashboard",
            }) */ {}}
          px={4}
          py={7}
          w="full"
          maxW="215px"
          mt="40px"
          // h={{ base: "48px", md: "68px" }}
          fontSize="20px"
          leftIcon={<Icon as={BsLightningCharge} color="black" />}
          color="black"
          flexShrink={0}
          background="rgba(255,255,255,1)"
          _hover={{
            background: "rgba(255,255,255,0.9)!important",
          }}
        >
          Get Started
        </LinkButton>
      </Flex>

      <Flex
        w="full"
        maxW="1100px"
        px="70px"
        justifyContent="center"
        marginTop="76px"
        marginBlock="124px"
      >
        <Flex
          flexDir="column"
          alignItems="flex-start"
          maxW="195px"
          w="full"
          mr="17px"
          gap="20px"
        >
          {interactives.map(
            ({ title, description, src, marginTopIcon }, idx) => (
              <CustomIcon
                key={idx}
                title={title}
                description={description}
                image={src}
                isActive={idx === currentSelectedState}
                marginTopIcon={marginTopIcon}
                onClick={() => {
                  setCurrentSelectedState(idx);
                }}
              />
            ),
          )}
        </Flex>

        <Flex flex="1" justifyContent="center" position="relative">
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
      </Flex>
    </Flex>
  );
};

export default Interactive;
