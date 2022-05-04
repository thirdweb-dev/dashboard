import { ContractMetadata } from "./contract-metadata";
import { Box, Container, Flex } from "@chakra-ui/react";
import { AddressCopyButton } from "tw-components";

interface ContractHeaderProps {
  contractAddress: string;
}

export const ContractHeader: React.VFC<ContractHeaderProps> = ({
  contractAddress,
}) => {
  return (
    <Box
      borderBottomColor="borderColor"
      borderBottomWidth={1}
      bg="backgroundHighlight"
      w="full"
      as="aside"
      py={6}
    >
      <Container maxW="container.page">
        <Flex justify="space-between" align="center" direction="row">
          <ContractMetadata contractAddress={contractAddress} />
          <AddressCopyButton colorScheme="gray" address={contractAddress} />
        </Flex>
      </Container>
    </Box>
  );
};
