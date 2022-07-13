import {
  useContractPublishMetadataFromURI,
  useLatestRelease,
} from "../../hooks";
import { DeployableContractContractCellProps } from "../../types";
import { Skeleton } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { Text } from "tw-components";

export const ContractDescriptionCell: React.FC<
  DeployableContractContractCellProps
> = ({ cell: { value } }) => {
  const compilerMeta = useContractPublishMetadataFromURI(value);
  const address = useAddress();
  const wallet = useSingleQueryParam("wallet");
  const publishMetadata = useContractPublishMetadataFromURI(value);
  const latestRelease = useLatestRelease(
    wallet || address,
    publishMetadata.data?.name,
  );
  const description =
    latestRelease.data?.description || compilerMeta.data?.description || "None";

  return (
    <Skeleton isLoaded={compilerMeta.isSuccess}>
      <Text size="body.md" noOfLines={1}>
        {description}
      </Text>
    </Skeleton>
  );
};
