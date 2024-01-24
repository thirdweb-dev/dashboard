import { Container, Flex } from "@chakra-ui/react";
import { LandingDesktopMobileImage } from "components/landing-pages/desktop-mobile-image";
import React, { useEffect, useRef, useState } from "react";
import { Text } from "tw-components";

const OverviewSection = () => {
  const [offsetY, setOffsetY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const relativeOffset = window.pageYOffset - containerRect.top;
      setOffsetY(relativeOffset);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      position="relative"
      mt={40}
      ref={containerRef}
      flexDir={{ base: "column", "2xl": "row" }}
      gap={{ base: "80px", "2xl": 0 }}
    >
      <LandingDesktopMobileImage
        image={require("public/assets/landingpage/desktop/parallax-left.png")}
        mobileImage={require("public/assets/landingpage/mobile/parallax-left.png")}
        alt="parallax-one"
        maxW={{ base: "100%", "2xl": "512px" }}
        position={{ base: "relative", "2xl": "absolute" }}
        left={0}
        transform={{ base: "auto", "2xl": `translateY(${0.15 * offsetY}px)` }}
        transition="transform 0.2 ease-out'"
      />

      <Container
        as={Flex}
        flexDir="column"
        maxW="container.page"
        alignItems="center"
        position="relative"
        zIndex={5}
      >
        <Text size="body.xl" textAlign="center" maxW={540} color="#fff">
          <Text as="span" size="body.xl" fontWeight="bold" color="#fff">
            Over 70,000 web3 developers
          </Text>
          &nbsp;trust thirdweb to build web3 apps and games. thirdweb&apos;s
          tools are designed to help developers build apps and experiences which
          are seamless for users and abstract away the blockchain.
        </Text>
      </Container>

      <LandingDesktopMobileImage
        image={require("public/assets/landingpage/desktop/parallax-right.png")}
        mobileImage={require("public/assets/landingpage/mobile/parallax-right.png")}
        alt="parallax-two"
        maxW={{ base: "100%", "2xl": "512px" }}
        position={{ base: "relative", "2xl": "absolute" }}
        right={0}
        transform={{ base: "auto", "2xl": `translateY(${0.15 * offsetY}px)` }}
        transition="transform 0.2 ease-out'"
      />
    </Flex>
  );
};

export default OverviewSection;
