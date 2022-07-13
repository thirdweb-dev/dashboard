import {
  useContractPublishMetadataFromURI,
  useLatestRelease,
} from "../../hooks";
import { DeployableContractContractCellProps } from "../../types";
import { useAddress } from "@thirdweb-dev/react";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { Text } from "tw-components";

export const ContractVersionCell: React.FC<
  DeployableContractContractCellProps
> = ({ cell: { value } }) => {
  const address = useAddress();
  const wallet = useSingleQueryParam("wallet");
  const publishMetadata = useContractPublishMetadataFromURI(value);
  const latestRelease = useLatestRelease(
    wallet || address,
    publishMetadata.data?.name,
  );
  return (
    <Text size="body.md">{latestRelease.data?.version || "First Release"}</Text>
  );
};
