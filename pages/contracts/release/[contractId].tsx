import { Flex, Link } from "@chakra-ui/react";
import { AppLayout } from "components/app-layouts/app";
import { ContractReleaseForm } from "components/contract-components/contract-release-form";
import { PublisherSDKContext } from "contexts/custom-sdk-context";
import { useTrack } from "hooks/analytics/useTrack";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { ReactElement } from "react";
import { Heading, Text } from "tw-components";

const ContractsPublishPageWrapped: React.FC = () => {
  const { Track } = useTrack({
    page: "publish",
  });

  const contractId = useSingleQueryParam("contractId");

  return (
    <Track>
      <Flex gap={8} direction="column">
        <Flex gap={2} direction="column">
          <Heading size="title.md">Release a new contract version</Heading>
          <Text fontStyle="normal" maxW="container.md">
            Once released, you&apos;ll be able to share this version for others
            to deploy. We&apos;ll automatically generate SDKs to interact with
            your contract and provide admin dashboards with analytics, contract
            explorer and extensions.
            <br />
            <Link
              color="primary.500"
              isExternal
              href="https://portal.thirdweb.com/thirdweb-deploy/thirdweb-cli"
            >
              Learn more about releasing contracts
            </Link>
          </Text>
        </Flex>
        {contractId && <ContractReleaseForm contractId={contractId} />}
      </Flex>
    </Track>
  );
};

export default function ContractsPublishPage() {
  return (
    <PublisherSDKContext>
      <ContractsPublishPageWrapped />
    </PublisherSDKContext>
  );
}

ContractsPublishPage.getLayout = (page: ReactElement) => (
  <AppLayout>{page}</AppLayout>
);
