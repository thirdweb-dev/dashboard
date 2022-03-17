import { useWeb3 } from "@3rdweb/hooks";
import {
  Button,
  Heading,
  Icon,
  LinkBox,
  LinkOverlay,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { SUPPORTED_CHAINS } from "components/app-layouts/web3-providers";
import { Card } from "components/layout/Card";
import NextLink from "next/link";
import React from "react";
import { FiPlus } from "react-icons/fi";
import { SupportedChainId, SupportedChainIdToNetworkMap } from "utils/network";

interface NetworkCardProps {
  chainId: SupportedChainId;
}

const NetworkCard: React.FC<NetworkCardProps> = ({ chainId }) => {
  const { getNetworkMetadata } = useWeb3();
  return (
    <LinkBox key={chainId}>
      <Card h={20} _hover={{ backgroundColor: "gray.50" }}>
        <NextLink
          href={`/${SupportedChainIdToNetworkMap[chainId]}/new`}
          passHref
        >
          <LinkOverlay>
            <VStack>
              <Icon as={getNetworkMetadata(chainId).icon as any} boxSize={6} />
              <Text textTransform="capitalize">
                {getNetworkMetadata(chainId).chainName}
              </Text>
            </VStack>
          </LinkOverlay>
        </NextLink>
      </Card>
    </LinkBox>
  );
};

export const CreateProjectButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getNetworkMetadata } = useWeb3();

  return (
    <>
      <Button
        leftIcon={<Icon as={FiPlus} />}
        onClick={onOpen}
        colorScheme="primary"
        fontWeight="700"
        lineHeight="19px"
        size="md"
      >
        Create Project
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading size="title.lg">Choose network</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading size="subtitle.md">Testnet</Heading>
            <Text size="body.lg">Best for starting out & testing projects</Text>
            <SimpleGrid columns={4} spacing={4} mt={3} mb={6}>
              {SUPPORTED_CHAINS.filter(
                (chainId) => getNetworkMetadata(chainId).isTestnet,
              ).map((chainId) => (
                <NetworkCard key={chainId} chainId={chainId} />
              ))}
            </SimpleGrid>

            <Heading size="subtitle.md">Mainnet</Heading>
            <Text size="body.lg">Best for production & scaling</Text>
            <SimpleGrid columns={4} spacing={4} mt={3}>
              {SUPPORTED_CHAINS.filter(
                (chainId) => !getNetworkMetadata(chainId).isTestnet,
              ).map((chainId) => (
                <NetworkCard key={chainId} chainId={chainId} />
              ))}
            </SimpleGrid>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
};
