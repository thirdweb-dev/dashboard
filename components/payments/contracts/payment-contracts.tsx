import { useAllContractList } from "@3rdweb-sdk/react";
import { Flex } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import { PaymentContractsTable } from "./payment-contracts-table";
import {
  Arbitrum,
  ArbitrumGoerli,
  Avalanche,
  AvalancheFuji,
  Base,
  BaseGoerli,
  Ethereum,
  Goerli,
  Mumbai,
  Optimism,
  OptimismGoerli,
  Polygon,
  Sepolia,
} from "@thirdweb-dev/chains";
import { Heading, Text } from "tw-components";

// TODO: Get this from API
const validCheckoutChainIds: number[] = [
  Polygon.chainId,
  Ethereum.chainId,
  Optimism.chainId,
  Base.chainId,
  Avalanche.chainId,
  Arbitrum.chainId,
  Mumbai.chainId,
  Goerli.chainId,
  Sepolia.chainId,
  OptimismGoerli.chainId,
  BaseGoerli.chainId,
  AvalancheFuji.chainId,
  ArbitrumGoerli.chainId,
];

export const PaymentContracts = () => {
  const address = useAddress();
  const deployedContracts = useAllContractList(address);

  const filteredContracts =
    deployedContracts?.data?.filter((contract) =>
      validCheckoutChainIds.includes(contract.chainId),
    ) || [];

  return (
    <Flex flexDir="column" gap={3}>
      <Heading size="title.md">Contracts</Heading>
      <Text>Select a contract to enable payments & checkout links for</Text>
      <PaymentContractsTable
        paymentContracts={filteredContracts}
        isLoading={deployedContracts.isLoading}
        isFetched={deployedContracts.isFetched}
      />
    </Flex>
  );
};
