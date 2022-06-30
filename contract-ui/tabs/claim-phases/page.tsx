import { AddToDashboardCard } from "../overview/cards/add-to-dashboard";
import { ClaimPhases } from "./components/claim-phases";
import { ButtonGroup, Divider, Flex } from "@chakra-ui/react";
import { useContract } from "@thirdweb-dev/react";
import { extensionDetectedState } from "components/buttons/ExtensionDetectButton";
import { Card, Heading, LinkButton, Text } from "tw-components";

interface ClaimPhasesPageProps {
  contractAddress?: string;
}

export const ClaimPhasesPage: React.FC<ClaimPhasesPageProps> = ({
  contractAddress,
}) => {
  const contract = useContract(contractAddress);

  if (contract.isLoading) {
    // TODO build a skeleton for this
    return <div>Loading...</div>;
  }

  return (
    <Flex direction="column" gap={4}>
      <Flex gap={8} w="100%">
        <Flex flexDir="column" w="100%" gap={8}>
          <ClaimPhases contract={contract.contract?.nft} />
        </Flex>
      </Flex>
    </Flex>
  );
};
