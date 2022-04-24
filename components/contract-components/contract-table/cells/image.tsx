import { useContractPublishMetadataFromURI } from "../hooks";
import { DeployableContractContractCellProps } from "../types";
import { Image, Skeleton } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { FeatureIconMap } from "constants/mappings";

export const ContractImageCell: React.VFC<
  DeployableContractContractCellProps
> = ({ cell: { value } }) => {
  const publishMetadata = useContractPublishMetadataFromURI(value);

  const imgWithDefault = publishMetadata.data?.image || FeatureIconMap.custom;

  const isStaticImage = typeof imgWithDefault !== "string";

  return (
    <Skeleton isLoaded={publishMetadata.isSuccess}>
      {isStaticImage ? (
        <ChakraNextImage
          boxSize={8}
          src={imgWithDefault}
          alt={publishMetadata.data?.name || "Contract Image"}
        />
      ) : (
        <Image
          boxSize={8}
          src={imgWithDefault}
          alt={publishMetadata.data?.name || "Contract Image"}
        />
      )}
    </Skeleton>
  );
};
