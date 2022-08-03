import {
  useContractPrePublishMetadata,
  useEnsName,
  useResolvedEnsName,
} from "../../hooks";
import { DeployableContractContractCellProps } from "../../types";
import { useAddress } from "@thirdweb-dev/react";
import { BuiltinContractMap } from "constants/mappings";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { LinkButton, Text } from "tw-components";
import { shortenIfAddress } from "utils/usedapp-external";

export const ContractReleasedByCell: React.FC<
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

  const releaser =
    fullPublishMetadata.data?.latestPublishedContractMetadata?.publishedMetadata
      .publisher;

  const ensName = useEnsName(releaser);

  return (
    <LinkButton
      href={`/${ensName.data || releaser}`}
      variant="outline"
      px={3}
      mr={3}
      pointerEvents={isPrebuilt ? "none" : "auto"}
      fontFamily="mono"
      size="sm"
      width="100%"
    >
      <Text size="body.md">
        {shortenIfAddress(ensName.data || releaser, true) ||
          (isPrebuilt ? "thirdweb" : "Unknown")}
      </Text>
    </LinkButton>
  );
};
