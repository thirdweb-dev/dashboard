import { Box, Flex } from "@chakra-ui/react";
import { useContract } from "@thirdweb-dev/react";
import { SmartContract, ValidContractInstance } from "@thirdweb-dev/sdk";
import { Heading } from "tw-components";

interface CustomContractOverviewPageProps {
  contractAddress?: string;
}

export const CustomContractSettingsTab: React.FC<
  CustomContractOverviewPageProps
> = ({ contractAddress }) => {
  const contractQuery = useContract(contractAddress);

  if (!contractQuery || contractQuery?.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Flex direction="column" gap={4}>
      <Flex gap={8} w="100%">
        <Heading>Settings page</Heading>
        <Box minH="200vh"></Box>
      </Flex>
    </Flex>
  );
};

export function detectPrimarySale(
  contract: ValidContractInstance | SmartContract | null | undefined,
) {
  if (!contract) {
    return undefined;
  }
  if ("sales" in contract) {
    return contract.sales;
  }
  return undefined;
}

export function detectPlatformFees(
  contract: ValidContractInstance | SmartContract | null | undefined,
) {
  if (!contract) {
    return undefined;
  }
  if ("platformFees" in contract) {
    return contract.platformFees;
  }
  return undefined;
}

export function detectRoyalties(
  contract: ValidContractInstance | SmartContract | null | undefined,
) {
  if (!contract) {
    return undefined;
  }
  if ("royalties" in contract) {
    return contract.royalties;
  }
  return undefined;
}
