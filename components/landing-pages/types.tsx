import { StaticImageData } from "next/image";

export interface LandingDesktopMobileImageProps {
  image?: StaticImageData;
  mobileImage?: StaticImageData;
}

export interface LandingSectionHeadingProps {
  blackToWhiteTitle: string;
  title: string;
}
