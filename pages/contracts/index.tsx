import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Center,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import { AppLayout } from "components/app-layouts/app";
import { DeployableContractTable } from "components/contract-components/contract-table";
import { usePublishedContractsQuery } from "components/contract-components/hooks";
import { BuiltinContractMap } from "constants/mappings";
import { PublisherSDKContext } from "contexts/custom-sdk-context";
import { useTrack } from "hooks/analytics/useTrack";
import { ReactElement, useMemo } from "react";
import { IoRefreshSharp } from "react-icons/io5";
import { Button, Heading, LinkButton, Text, TrackedLink } from "tw-components";

const ContractsHomepageWrapped: React.FC = () => {
  const { Track } = useTrack({
    page: "contracts",
  });

  const walletAddress = useAddress();
  const releasedContractsQuery = usePublishedContractsQuery(walletAddress);

  const prebuiltContracts = Object.keys(BuiltinContractMap).filter(
    (contract) => contract !== "custom",
  );

  const releasedContracts = useMemo(
    () =>
      (releasedContractsQuery.data || [])?.map((d) =>
        d.metadataUri.replace("ipfs://", ""),
      ),
    [releasedContractsQuery],
  );

  const allContracts = useMemo(
    () => [...releasedContracts, ...prebuiltContracts],
    [prebuiltContracts, releasedContracts],
  );

  return (
    <Track>
      <Flex gap={8} direction="column">
        <Flex gap={2} direction="column">
          <Heading size="title.md">Your contracts</Heading>
          <Text fontStyle="italic">
            A combination of our{" "}
            <TrackedLink
              category="contracts"
              label="pre-built"
              href="https://portal.thirdweb.com/pre-built-contracts"
              isExternal
              color="blue.500"
            >
              pre-built contracts
            </TrackedLink>{" "}
            and your{" "}
            <TrackedLink
              category="contracts"
              label="released"
              href="https://portal.thirdweb.com/thirdweb-cli"
              isExternal
              color="blue.500"
            >
              released contracts
            </TrackedLink>
            .
          </Text>
        </Flex>
        <DeployableContractTable
          isFetching={releasedContractsQuery.isFetching}
          contractIds={allContracts}
        />
      </Flex>
    </Track>
  );
};

export default function ContractsHomepage() {
  return (
    <PublisherSDKContext>
      <ContractsHomepageWrapped />
    </PublisherSDKContext>
  );
}

ContractsHomepage.getLayout = (page: ReactElement) => (
  <AppLayout>{page}</AppLayout>
);
