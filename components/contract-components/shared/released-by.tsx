import { Flex, Link } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import {
  ens,
  useReleasesFromDeploy,
} from "components/contract-components/hooks";
import { useMemo } from "react";
import { LinkButton, Text } from "tw-components";
import { shortenIfAddress } from "utils/usedapp-external";

interface ReleasedByProps {
  contractAddress: string;
}

export const ReleasedBy: React.FC<ReleasedByProps> = ({ contractAddress }) => {
  const contractEnsQuery = ens.useQuery(contractAddress);

  const releasesFromDeploy = useReleasesFromDeploy(
    contractEnsQuery.data?.address || undefined,
  );

  const address = useAddress();

  const releaseToShow = useMemo(() => {
    return (
      releasesFromDeploy.data?.find(
        (release) => release.publisher === address,
      ) ||
      releasesFromDeploy.data?.at(-1) ||
      undefined
    );
  }, [releasesFromDeploy.data, address]);

  const releaserEnsQuery = ens.useQuery(releaseToShow?.publisher);

  const isOwnRelease = address === releaserEnsQuery.data?.address;

  if (!releaseToShow) {
    return null;
  }

  const releaserAddress =
    releaserEnsQuery.data?.ensName || releaserEnsQuery.data?.address;
  return releaseToShow ? (
    <Flex flexDir="column" gap={3} alignItems="end">
      <LinkButton
        href={`/contracts/${releaserAddress}/${releaseToShow?.name}/${releaseToShow?.version}`}
        noMatch
        size="sm"
        variant="outline"
      >
        {releaseToShow?.name} v{releaseToShow?.version}
      </LinkButton>
      <Link href={`/${releaserAddress}`}>
        <Text size="label.sm" textAlign="center">
          Released by{" "}
          <strong>
            {isOwnRelease ? "you" : shortenIfAddress(releaserAddress)}
          </strong>
        </Text>
      </Link>
    </Flex>
  ) : null;
};
