import { chakra } from "@chakra-ui/react";
import { MediaRenderer } from "@thirdweb-dev/react";
import { NFTMetadata } from "@thirdweb-dev/sdk";

const ChakraMediaRenderer = chakra(MediaRenderer);

interface MediaCellProps {
  cell: {
    value: NFTMetadata;
  };
}

export const MediaCell: React.VFC<MediaCellProps> = ({ cell }) => {
  const nftMetadata = cell.value;
  return (
    <ChakraMediaRenderer
      src={nftMetadata.animation_url || nftMetadata.image}
      poster={nftMetadata.image}
      alt={nftMetadata.name}
      requireInteraction
      flexShrink={0}
      boxSize={24}
      objectFit="contain"
    />
  );
};
