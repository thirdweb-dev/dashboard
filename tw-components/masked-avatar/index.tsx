import hexagon from "./hexagon.png";
import { ImgProps } from "@chakra-ui/image";
import { Skeleton } from "@chakra-ui/skeleton";
import { ChakraNextImage } from "components/Image";
import { StaticImageData } from "next/image";

export interface MaskedAvatarProps {
  src: StaticImageData;
  isLoading?: boolean;
  name?: string;
  boxSize?: number;
}

export const MaskedAvatar: React.FC<MaskedAvatarProps> = ({
  src,
  name,
  boxSize = 12,
  isLoading,
  ...restBoxProps
}) => {
  return (
    <Skeleton
      isLoaded={!isLoading}
      style={{
        WebkitMaskImage: `url("${hexagon.src}")`,
        WebkitMaskSize: "cover",
        mask: `url("${hexagon.src}")`,
        maskSize: "cover",
      }}
      boxSize={boxSize}
    >
      <ChakraNextImage
        boxSize={boxSize}
        objectFit="cover"
        {...restBoxProps}
        src={src}
        alt={name || ""}
      />
    </Skeleton>
  );
};
