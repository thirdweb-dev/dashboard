import { ContractCard } from "../contract-card";
import { Flex, SimpleGrid } from "@chakra-ui/react";
import { Heading } from "tw-components";

export const ContractRow: React.FC = () => {
  return (
    <Flex gap={5} direction="column" as="section">
      <Flex gap={2} direction="column" as="header">
        <Heading as="h2" size="label.xl">
          Popular
        </Heading>
        <Heading as="h3" size="label.md" fontWeight={400}>
          Contracts that are popular among the community
        </Heading>
      </Flex>
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={5}>
        <ContractCard
          publisher="deployer.thirdweb.eth"
          contractId="DropERC721"
        />
        <ContractCard publisher="unlock-protocol.eth" contractId="PublicLock" />
        <ContractCard
          publisher="flairsdk.eth"
          contractId="ERC721CommunityStream"
        />
        <ContractCard publisher="doubledev.eth" contractId="ERC4907" />
      </SimpleGrid>
    </Flex>
  );
};
