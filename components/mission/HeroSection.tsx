import { Flex } from "@chakra-ui/react";
import { LandingDesktopMobileImage } from "components/landing-pages/desktop-mobile-image";
import React, { Fragment } from "react";
import { Heading } from "tw-components";

const HeroSection = () => {
  return (
    <Flex flexDir="column" alignItems="center" mt={{ base: 140, md: 342 }}>
      <LandingDesktopMobileImage
        image={require("public/assets/landingpage/desktop/xl-logo.png")}
        mobileImage={require("public/assets/landingpage/mobile/xl-logo.png")}
        alt="thirdweb"
        maxW="80%"
      />
      <Heading
        size="title.lg"
        maxW="xl"
        fontWeight="semibold"
        textAlign="center"
        mt={46}
      >
        Making the internet more open and valuable for builders and users.
      </Heading>
    </Flex>
  );
};

export default HeroSection;
