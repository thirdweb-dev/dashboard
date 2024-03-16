import { Image, type ImageProps } from "@chakra-ui/react";
import { replaceIpfsUrl } from "lib/sdk";

const fallbackIcon = replaceIpfsUrl(
  "ipfs://QmU1r24UsmGg2w2RePz98zV5hR3CnjvakLZzB6yH4prPFh/globe.svg",
);

type ChainIconProps = Omit<ImageProps, "src" | "size"> & {
  ipfsSrc?: string;
  size: ImageProps["width"];
};

export const ChainIcon: React.FC<React.PropsWithRef<ChainIconProps>> = ({
  ipfsSrc,
  size,
  ...restProps
}) => {
  const src = ipfsSrc ? replaceIpfsUrl(ipfsSrc) : fallbackIcon;
  // treat size of number as "px"
  size = typeof size === "number" ? `${size}px` : size;

  // TODO - use sizes to create srcset

  return (
    <Image
      {...restProps}
      // render different image element if src changes to avoid showing old image while loading new one
      key={src}
      src={src}
      width={size}
      height={size}
      style={{
        objectFit: "contain",
      }}
      loading="lazy"
      decoding="async"
      alt=""
      fallbackSrc={fallbackIcon}
    />
  );
};
