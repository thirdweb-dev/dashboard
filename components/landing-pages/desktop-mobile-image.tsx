import { LandingDesktopMobileImageProps } from "./types";
import { ChakraNextImage } from "components/Image";

export const LandingDesktopMobileImage: React.FC<
  LandingDesktopMobileImageProps
> = ({ image, mobileImage, ...props }) => {
  return (
    <>
      {!props.video && mobileImage && (
        <ChakraNextImage
          {...props}
          display={{ base: "block", md: "none" }}
          src={mobileImage}
          alt=""
        />
      )}

      {!props.video && image && (
        <ChakraNextImage
          {...props}
          src={image}
          alt=""
          display={{ base: mobileImage ? "none" : "block", md: "block" }}
        />
      )}

      {props.video && (
        <video
          loop
          playsInline
          preload="auto"
          poster={image?.src}
          autoPlay
          src={props.video}
          muted
        />
      )}
    </>
  );
};
