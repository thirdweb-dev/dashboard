import { Container, Flex } from "@chakra-ui/react";
import { LandingDesktopMobileImage } from "components/landing-pages/desktop-mobile-image";
import { LandingFAQ } from "components/landing-pages/faq";
import { useParallaxEffect } from "hooks/effect/useParallexEffect";
import React, { useEffect, useRef, useState } from "react";
import { Heading, Text } from "tw-components";

interface HowSectionProps {
  TRACKING_CATEGORY: string;
}

const faqs = [
  {
    title: "How do I get started?",
    description: (
      <Text>
        thirdweb Starter plan is open and completely self-serve. We&apos;ve made
        it easy for you to get started — simply connect your wallet to start
        using thirdweb platform. You only need to create an account with your
        email address and add payment method when you&apos;re approaching your
        monthly free usage limits (so that we can send you billing updates if
        you go over).
      </Text>
    ),
  },
  {
    title: "How do I sign up for thirdweb pro plan?",
    description: (
      <Text>
        To sign for a thirdweb pro plan, team to learn about thirdweb pro
        features and get a quote for monthly subscription fee.
      </Text>
    ),
  },
  {
    title: "How do I update my payment method?",
    description: <Text>Go to thirdweb Settings &gt; Billing in </Text>,
  },
  {
    title: "Where can I see my usage history?",
    description: <Text>Go to thirdweb Settings &gt; Billing in </Text>,
  },
];

const HowSection = ({ TRACKING_CATEGORY }: HowSectionProps) => {
  const [offsetY, setOffsetY] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (ref.current) {
      const elementTop =
        ref.current.getBoundingClientRect().top + window.pageYOffset;

      const startOffset = window.innerHeight / 2;
      const scrollPosition = window.pageYOffset;

      if (scrollPosition > elementTop - startOffset) {
        const newOffset = Math.min(
          (scrollPosition - elementTop + startOffset) * 0.2,
          150,
        );
        setOffsetY(newOffset);
      } else {
        setOffsetY(0);
      }
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
      mt={{ base: "0", md: 40 }}
      flexDir={{ base: "column", xl: "row" }}
      gap={{ base: "80px", xl: 0 }}
      ref={ref}
    >
      <LandingDesktopMobileImage
        image={require("public/assets/landingpage/mobile/parallax-left-v2.png")}
        mobileImage={require("public/assets/landingpage/mobile/parallax-left-v2.png")}
        alt="parallax-one"
        maxW={{ base: "100%", xl: "412px", "2xl": "512px" }}
        transform={{
          base: "auto",
          xl: `translateY(${-offsetY + 200}px)`,
        }}
        transition="transform 0.8s cubic-bezier(0.33, 1, 0.68, 1)"
      />

      <Container
        as={Flex}
        flexDir="column"
        maxW="container.page"
        alignItems="center"
        position="relative"
        zIndex={5}
      >
        <Heading textAlign="center" size="title.sm">
          But how?
        </Heading>
        <Text mt={3} maxW="490px" textAlign="center">
          Web3 enables developers to build internet products with public
          backends. This unlocks some powerful new digital experiences:
        </Text>

        <LandingFAQ
          hideMarginTop
          TRACKING_CATEGORY={TRACKING_CATEGORY}
          title=""
          faqs={faqs}
          titleSize="title.2xl"
        />
      </Container>

      <LandingDesktopMobileImage
        image={require("public/assets/landingpage/desktop/parallax-right-v2.png")}
        mobileImage={require("public/assets/landingpage/desktop/parallax-right-v2.png")}
        alt="parallax-one"
        maxW={{ base: "100%", xl: "412px", "2xl": "512px" }}
        transform={{
          base: "auto",
          xl: `translateY(${-offsetY + 200}px)`,
        }}
        transition="transform 0.8s cubic-bezier(0.33, 1, 0.68, 1)"
      />
    </Flex>
  );
};

export default HowSection;
