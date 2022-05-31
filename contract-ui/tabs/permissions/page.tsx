import { ButtonGroup, Divider, Flex } from "@chakra-ui/react";
import { useContract } from "@thirdweb-dev/react";
import { SmartContract, ValidContractInstance } from "@thirdweb-dev/sdk";
import React from "react";
import { Card, Heading, LinkButton, Text } from "tw-components";

interface ContractPermissionsPageProps {
  contractAddress?: string;
}

export const ContractPermissionsPage: React.FC<
  ContractPermissionsPageProps
> = ({ contractAddress }) => {
  const contract = useContract(contractAddress);

  const detectedContract = detectPermissions(contract.contract);

  if (contract.isLoading) {
    // TODO build a skeleton for this
    return <div>Loading...</div>;
  }

  if (!detectedContract) {
    return (
      <Card as={Flex} flexDir="column" gap={3}>
        {/* TODO  extract this out into it's own component and make it better */}
        <Heading size="subtitle.md">No Token extension enabled</Heading>
        <Text>
          To enable Token features you will have to extend the required
          interfaces in your contract.
        </Text>

        <Divider my={1} borderColor="borderColor" />
        <Flex gap={4} align="center">
          <Heading size="label.md">Learn more: </Heading>
          <ButtonGroup colorScheme="purple" size="sm" variant="solid">
            <LinkButton
              isExternal
              href="https://portal.thirdweb.com/thirdweb-deploy/contract-features/erc20"
            >
              ERC20
            </LinkButton>
          </ButtonGroup>
        </Flex>
      </Card>
    );
  }

  return (
    <Flex direction="column" gap={6}>
      <Flex direction="row" justify="space-between" align="center">
        <Heading size="title.sm">Contract Tokens</Heading>
        <ButtonGroup>
          {/* <TokenMintButton contract={detectedContract} /> */}
        </ButtonGroup>
      </Flex>

      {/* <TokenSupply contract={detectedContract} /> */}
    </Flex>
  );
};

export function detectPermissions(
  contract: ValidContractInstance | SmartContract | null | undefined,
) {
  if (!contract) {
    return undefined;
  }
  if ("roles" in contract) {
    return contract.roles;
  }
  return undefined;
}
