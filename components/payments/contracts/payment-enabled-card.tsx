import { Flex, LinkBox, LinkOverlay, Skeleton } from "@chakra-ui/react";
import { Card, Text } from "tw-components";
import { PaperChainToChainId } from "@3rdweb-sdk/react/hooks/usePayments";
import { AddressCopyButton } from "tw-components/AddressCopyButton";
import React, { useEffect, useState } from "react";
import { getEVMThirdwebSDK } from "lib/sdk";
import { PROD_OR_DEV_URL } from "constants/rpc";
import { useChainSlug } from "hooks/chains/chainSlug";

interface PaymentEnabledCardProps {
  contract: {
    id: string;
    address: string;
    chain: string;
    display_name: string;
  };
}

export const PaymentEnabledCard: React.FC<PaymentEnabledCardProps> = ({
  contract: { chain, address, display_name, id },
}) => {
  const [contractName, setContractName] = useState("");
  const [isContractNameLoading, setIsContractNameLoading] = useState(true);

  const chainSlug = useChainSlug(PaperChainToChainId[chain]);

  useEffect(() => {
    const getName = async () => {
      setIsContractNameLoading(true);
      try {
        const chainId = PaperChainToChainId[chain];
        const sdk = getEVMThirdwebSDK(
          chainId,
          `https://${chainId}.rpc.${PROD_OR_DEV_URL}`,
        );

        const sdkContract = await sdk.getContract(address);
        const name = (await sdkContract.metadata.get()).name;
        setContractName(name);
      } catch (e) {
        console.error(e);
      } finally {
        setIsContractNameLoading(false);
      }
    };

    getName();
  }, [chain, address]);

  return (
    <LinkBox>
      <Card
        p={6}
        as={Flex}
        flexDir="column"
        gap={4}
        transition="border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease"
        _hover={{
          borderColor: "blue.500",
          boxShadow: "0 0 16px hsl(215deg 100% 60% / 30%)",
        }}
      >
        <Flex flexDir="column">
          <Text color="bgBlack">
            <LinkOverlay href={`/${chainSlug}/${address}/payments`}>
              <Skeleton isLoaded={!isContractNameLoading}>
                {contractName || display_name}
              </Skeleton>
            </LinkOverlay>
          </Text>
          <Text>{chain}</Text>
        </Flex>
        <Flex gap={6}>
          <Flex flexDir="column" gap={1}>
            <Text>Contract ID</Text>
            <AddressCopyButton address={id} size="xs" title="contract ID" />
          </Flex>
          <Flex flexDir="column" gap={1}>
            <Text>Contract Address</Text>
            <AddressCopyButton address={address} size="xs" />
          </Flex>
        </Flex>
      </Card>
    </LinkBox>
  );
};
