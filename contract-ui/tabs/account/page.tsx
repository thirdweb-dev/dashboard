import { Box, Flex } from "@chakra-ui/react";
import { useContract, useSmartWalletSigners } from "@thirdweb-dev/react";
import { extensionDetectedState } from "components/buttons/ExtensionDetectButton";
import { detectFeatures } from "components/contract-components/utils";
import { Card, Heading, LinkButton, Text } from "tw-components";

interface AccountPageProps {
  contractAddress?: string;
}

export const AccountPage: React.FC<AccountPageProps> = ({
  contractAddress,
}) => {
  const contractQuery = useContract(contractAddress);
  const smartWalletSignersQuery = useSmartWalletSigners(
    contractQuery?.contract,
  );

  console.log({ smartWalletSignersQuery });

  const detectedFeature = extensionDetectedState({
    contractQuery,
    feature: ["SmartWallet"],
  });

  if (contractQuery.isLoading) {
    return null;
  }

  if (!detectedFeature) {
    return (
      <Card as={Flex} flexDir="column" gap={3}>
        {/* TODO  extract this out into it's own component and make it better */}
        <Heading size="subtitle.md">No Account extension enabled</Heading>
        <Text>This contract is not an smart wallet.</Text>
        <Box>
          <LinkButton
            isExternal
            href="https://portal.thirdweb.com/solidity/extensions/base-account"
            colorScheme="purple"
          >
            Learn more
          </LinkButton>
        </Box>
      </Card>
    );
  }

  return (
    <Flex direction="column" gap={6}>
      <Flex direction="row" justify="space-between" align="center">
        <Heading size="title.sm">Account</Heading>
      </Flex>
    </Flex>
  );
};
