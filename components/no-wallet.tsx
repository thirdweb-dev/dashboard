import { ConnectWallet } from "@3rdweb-sdk/react/components/connect-wallet";
import { Container, Divider, Flex } from "@chakra-ui/react";
import { Card, Heading, Text } from "tw-components";

interface NoWalletProps {
  ecosystem: "evm" | "solana";
}

export const NoWallet: React.FC<NoWalletProps> = ({ ecosystem }) => {
  return (
    <Container maxW="lg">
      <Card p={6} as={Flex} flexDir="column" gap={2}>
        <Heading as="h2" size="title.sm">
          Please connect your wallet
        </Heading>
        <Text>
          In order to interact with your contracts you need to connect{" "}
          {ecosystem === "evm" ? "an EVM " : "a Solana "}
          compatible wallet.
        </Text>
        <Divider my={4} />
        <ConnectWallet ecosystem={ecosystem} />
      </Card>
    </Container>
  );
};
