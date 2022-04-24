import { useContractPublishMetadataFromURI } from "../hooks";
import { DeployableContractContractCellProps } from "../types";
import { Skeleton, Text } from "@chakra-ui/react";

export const ContractNameCell: React.VFC<
  DeployableContractContractCellProps
> = ({ cell: { value } }) => {
  const publishMetadata = useContractPublishMetadataFromURI(value);

  return (
    <Skeleton isLoaded={publishMetadata.isSuccess}>
      <Text>{publishMetadata.data?.name}</Text>
    </Skeleton>
  );
};
