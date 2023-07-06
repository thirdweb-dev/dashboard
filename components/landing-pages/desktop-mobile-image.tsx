import { LandingDesktopMobileImageProps } from "./types";
import { Container } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";

export const LandingDesktopMobileImage: React.FC<
  LandingDesktopMobileImageProps
> = ({ image, mobileImage }) => {
  if (!image && !mobileImage) {
    return null;
  }

  return (
    <Container maxW="container.page">
      {image && (
        <ChakraNextImage
          src={image}
          w="full"
          alt=""
          display={{
            base: mobileImage ? "hidden" : "inherit",
            md: "inherit",
          }}
        />
      )}
      {mobileImage && (
        <ChakraNextImage
          src={mobileImage}
          w="full"
          alt=""
          display={{
            base: "inherit",
            md: "hidden",
          }}
        />
      )}
    </Container>
  );
};
