import { useContractPrePublishMetadata, useResolvedEnsName } from "../../hooks";
import { DeployableContractContractCellProps } from "../../types";
import { useAddress } from "@thirdweb-dev/react";
import { BuiltinContractMap } from "constants/mappings";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { Text } from "tw-components";

export const ContractVersionCell: React.FC<
  DeployableContractContractCellProps
> = ({ cell: { value } }) => {
  const address = useAddress();
  const wallet = useSingleQueryParam("networkOrAddress");

  const resolvedAddress = useResolvedEnsName(wallet);
  const fullPublishMetadata = useContractPrePublishMetadata(
    value,
    resolvedAddress.data || wallet || address,
  );

  const isPrebuilt =
    !!BuiltinContractMap[value as keyof typeof BuiltinContractMap];

  return (
    <Text size="body.md">
      {fullPublishMetadata.data?.latestPublishedContractMetadata
        ?.publishedMetadata.version || (isPrebuilt ? "2.0.0" : "First Release")}
    </Text>
  );
};
