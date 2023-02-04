import Image from "next/image";

// TODO - Have a better icon here
const fallbackIcon = `https://gateway.ipfscdn.io/ipfs/QmcxZHpyJa8T4i63xqjPYrZ6tKrt55tZJpbXcjSDKuKaf9/ethereum/512.png`;

export const ChainIcon: React.FC<{ ipfsSrc?: string; size: number }> = (
  props,
) => {
  const src = props.ipfsSrc
    ? `https://gateway.ipfscdn.io/ipfs/${props.ipfsSrc.slice(`ipfs://`.length)}`
    : fallbackIcon;

  // have 4x resolution to make it look good
  const resolution = props.size * 4;
  const size = `${props.size}px`;

  return (
    <Image
      // render different image element if src changes to avoid showing old image while loading new one
      key={src}
      src={src}
      width={resolution}
      height={resolution}
      style={{
        objectFit: "contain",
        maxWidth: size,
        maxHeight: size,
      }}
      loading="lazy"
      decoding="async"
      alt=""
      onError={(event) => {
        event.currentTarget.srcset = `${fallbackIcon} 1x`;
        event.currentTarget.src = fallbackIcon;
      }}
    />
  );
};
