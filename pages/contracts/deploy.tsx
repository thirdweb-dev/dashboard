import { Flex, Heading, Text } from "@chakra-ui/react";
import { AppLayout } from "components/app-layouts/app";
import { Badge } from "components/badges/badge";
import { ContractDeployForm } from "components/contract-components/contract-deploy-form";
import { Card } from "components/layout/Card";
import { useTrack } from "hooks/analytics/useTrack";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { ConsolePage } from "pages/_app";

const ContractsDeployPage: ConsolePage = () => {
  const { Track } = useTrack({
    page: "deploy",
  });
  const contract = useSingleQueryParam("contract");
  return (
    <Track>
      <Flex gap={8} direction="column">
        <Flex gap={2} direction="column">
          <Heading size="title.md">
            Deploy Contract{" "}
            <Badge py={0.5} variant="outline" colorScheme="purple">
              beta
            </Badge>
          </Heading>
          <Text>
            Welcome to the thirdweb contract publishing & deployment flow.
          </Text>
        </Flex>
        <Card>
          <ContractDeployForm shouldRedirect contractId={contract || ""} />
        </Card>
      </Flex>
    </Track>
  );
};

ContractsDeployPage.Layout = AppLayout;

export default ContractsDeployPage;
