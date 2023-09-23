import { LandingDesktopMobileImageProps } from "./types";
import { useBreakpointValue } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";

export const LandingDesktopMobileImage: React.FC<
  LandingDesktopMobileImageProps
> = ({ image, mobileImage }) => {
  const isDesktop = useBreakpointValue({ base: false, md: true });

  const imageToShow = !isDesktop && mobileImage ? mobileImage : image;

  if (!imageToShow) {
    return null;
  }

  return <ChakraNextImage src={imageToShow} alt="" />;
};
