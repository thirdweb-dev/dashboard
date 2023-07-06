import { LandingDesktopMobileImage } from "./desktop-mobile-image";
import { Box, Container, Flex, Icon } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { StaticImageData } from "next/image";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { Heading, Text, TrackedLinkButton } from "tw-components";

interface LandingHeroProps {
  title: string;
  titleWithGradient: string;
  subtitle: string;
  inPartnershipWith?: StaticImageData;
  trackingCategory: string;
  ctaText?: string;
  ctaLink: string;
  gradient: string;
  image?: StaticImageData;
  mobileImage?: StaticImageData;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  title,
  titleWithGradient,
  subtitle,
  inPartnershipWith,
  trackingCategory,
  ctaText = "Get Started",
  ctaLink,
  gradient,
  image,
  mobileImage,
}) => {
  return (
    <Flex
      flexDir="column"
      padding={{ base: 0, md: "64px" }}
      my={{ base: "120px", md: "80px" }}
      gap={{ base: 8, md: 20 }}
    >
      <Container maxW="container.sm">
        <Flex flexDir="column" gap={{ base: 6, md: 8 }}>
          <Flex flexDir="column" gap={4}>
            {inPartnershipWith && (
              <Flex gap={2} justifyContent="center" alignItems="center">
                <Heading size="subtitle.sm" as="span">
                  In partnership with
                </Heading>
                <ChakraNextImage
                  src={require("public/assets/solutions-pages/commerce/shopify.png")}
                  width="80px"
                  alt="Shopify"
                />
              </Flex>
            )}
            <Heading
              pt={{ base: 20, md: 0 }}
              as="h1"
              size="display.md"
              textAlign="center"
            >
              {title}{" "}
              <Box as="span" bgGradient={gradient} bgClip="text">
                {titleWithGradient}
              </Box>
            </Heading>
          </Flex>
          <Text textAlign="center" size="body.xl">
            {subtitle}
          </Text>
          <Flex gap={{ base: 4, md: 6 }} mx="auto">
            <TrackedLinkButton
              leftIcon={<Icon as={BsFillLightningChargeFill} boxSize={4} />}
              py={6}
              px={8}
              bgColor="white"
              _hover={{
                bgColor: "white",
                opacity: 0.8,
              }}
              color="black"
              href={ctaLink}
              category={trackingCategory}
              label="contact-us"
              fontWeight="bold"
            >
              {ctaText}
            </TrackedLinkButton>
            <TrackedLinkButton
              variant="outline"
              py={6}
              px={8}
              href="/contact-us"
              category={trackingCategory}
              label="contact-us"
            >
              Contact Us
            </TrackedLinkButton>
          </Flex>
        </Flex>
      </Container>
      <LandingDesktopMobileImage image={image} mobileImage={mobileImage} />
    </Flex>
  );
};
