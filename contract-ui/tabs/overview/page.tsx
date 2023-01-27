import { ChakraNextImage } from "../../../components/Image";
import { BuildYourApp } from "./components/BuildYourApp";
import { Box, Flex, GridItem, SimpleGrid } from "@chakra-ui/react";
import { useContract } from "@thirdweb-dev/react";
import { Abi } from "@thirdweb-dev/sdk";
import { useContractFunctions } from "components/contract-components/hooks";
import { ImportContract } from "components/contract-components/import-contract";
import { ContractFunctionsOverview } from "components/contract-functions/contract-functions";
import { Card, Heading, Text } from "tw-components";

interface CustomContractOverviewPageProps {
  contractAddress?: string;
}

export const CustomContractOverviewPage: React.FC<
  CustomContractOverviewPageProps
> = ({ contractAddress }) => {
  const { contract, isSuccess, isError } = useContract(contractAddress);
  const functions = useContractFunctions(contract?.abi as Abi);
  if (!contractAddress) {
    return <div>No contract address provided</div>;
  }

  if ((!contract?.abi && isSuccess) || isError) {
    return <ImportContract contractAddress={contractAddress} />;
  }

  return (
    <SimpleGrid columns={{ base: 1, xl: 4 }} gap={16}>
      <GridItem as={Flex} colSpan={{ xl: 3 }} direction="column" gap={16}>
        <Flex direction="column" gap={6}>
          <Heading size="title.sm">Contract Explorer</Heading>
          {contract && (
            <ContractFunctionsOverview
              onlyFunctions
              functions={functions}
              contract={contract}
            />
          )}
          <BuildYourApp />
        </Flex>
      </GridItem>
      <GridItem as={Flex} colSpan={1} direction="column" gap={6}>
        <Heading size="title.sm">Relevant guides</Heading>
      </GridItem>
    </SimpleGrid>
  );
};
