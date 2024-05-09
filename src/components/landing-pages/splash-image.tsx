import { LandingCTAButtons } from "./cta-buttons";
import { LandingDesktopMobileImage } from "./desktop-mobile-image";
import { Box, Container, Flex } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { StaticImageData } from "next/image";
import { Heading, Text } from "tw-components";

interface SplashImageProps {
  title: string;
  titleWithGradient: string;
  subtitle: string;
  trackingCategory: string;
  ctaText?: string;
  ctaLink?: string;
  lottie?: {};
  gradient: string;
  image?: StaticImageData;
  mobileImage?: StaticImageData;
  noCta?: boolean;
  contactUsTitle?: string;
  contactUsLink?: string;
}

export const SplashImage: React.FC<SplashImageProps> = ({
  title,
  titleWithGradient,
  subtitle,
  trackingCategory,
  ctaText,
  ctaLink,
  gradient,
  lottie,
  image,
  mobileImage,
  noCta,
  contactUsTitle,
  contactUsLink,
}) => {
  return (
    <Flex
      flexDir="column"
      gap={{ base: 2, md: 4 }}
      paddingTop={{ base: 0, md: "10px" }}
    >
      <Container maxW="container.lg" paddingX={{ base: 4, md: 16 }}>
        <Flex flexDir="column" gap={{ base: 6, md: 8 }}>
          <Flex flexDir="column" gap={4}>
            <Heading
              as="h1"
              size="display.md"
              textAlign="center"
              px={{ base: 2, md: 0 }}
            >
              {title}{" "}
              <Box as="span" bgGradient={gradient} bgClip="text">
                {titleWithGradient}
              </Box>
            </Heading>
          </Flex>
          <Text textAlign="center" size="body.lg">
            {subtitle}
          </Text>
        </Flex>
        <Flex maxH="500px">
          <LandingDesktopMobileImage
            lottie={lottie}
            image={image}
            mobileImage={mobileImage}
          />
        </Flex>
        <Flex gap={2} justifyContent="center" alignItems="center">
          <LandingCTAButtons
            noCta={noCta}
            ctaText={ctaText}
            ctaLink={ctaLink}
            trackingCategory={trackingCategory}
            contactUsTitle={contactUsTitle}
            contactUsLink={contactUsLink}
          />
        </Flex>
      </Container>
      <LandingDesktopMobileImage image={image} mobileImage={mobileImage} />
    </Flex>
  );
};
