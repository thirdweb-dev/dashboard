import { useSwitchNetwork, useWeb3 } from "@3rdweb/hooks";
import {
  Alert,
  AlertIcon,
  Flex,
  Heading,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { SUPPORTED_CHAINS } from "components/app-layouts/web3-providers";
import React, { useEffect, useState } from "react";

export const NetworkSwitcherModal: React.FC<{
  isOpen: boolean;
  selected: boolean;
  setSelected: () => void;
  onClose: () => void;
}> = ({ isOpen, selected, setSelected, onClose }) => {
  const { chainId, getNetworkMetadata } = useWeb3();
  const { switchNetwork, switchError } = useSwitchNetwork();
  const [newNetwork, setNewNetwork] = useState<number | null>(null);
  const supportedChainIds = SUPPORTED_CHAINS as number[];

  useEffect(() => {
    if (chainId && newNetwork === chainId && !switchError) {
      setSelected();
    }
  }, [chainId, newNetwork, switchError, setSelected]);

  useEffect(() => {
    const switchNetworkAsync = async () => {
      await switchNetwork(newNetwork as number);
    };

    if (newNetwork && switchNetwork) {
      switchNetworkAsync();
    }
  }, [newNetwork, switchNetwork]);

  function handleSwitchNetwork(cId: number) {
    if (chainId === cId) {
      setSelected();
    } else {
      setNewNetwork(cId);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay />
      <ModalContent pb={4} bg="gray.50">
        <ModalCloseButton />
        <ModalBody pt="24px">
          <Heading as="h4" size="sm" fontWeight="600" mb="12px">
            Select Network
          </Heading>
          <Flex direction="column">
            {supportedChainIds
              .filter((cId) => !getNetworkMetadata(cId).isTestnet)
              .map((cId, index) => (
                <Network
                  key={index}
                  index={index}
                  cId={cId}
                  selected={selected}
                  switchNetwork={handleSwitchNetwork}
                />
              ))}
            {supportedChainIds
              .filter((cId) => getNetworkMetadata(cId).isTestnet)
              .map((cId, index) => (
                <Network
                  key={index}
                  index={index}
                  cId={cId}
                  selected={selected}
                  switchNetwork={handleSwitchNetwork}
                />
              ))}

            {switchError && (
              <Alert
                status="error"
                borderRadius="md"
                fontSize="sm"
                fontWeight="medium"
              >
                <AlertIcon />
                {switchError?.message}
              </Alert>
            )}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const Network: React.FC<{
  index: number;
  cId: number;
  selected: boolean;
  switchNetwork: (chainId: number) => void;
}> = ({ index, cId, selected, switchNetwork }) => {
  const { chainId, getNetworkMetadata } = useWeb3();
  const icon = getNetworkMetadata(cId as number).icon;

  return (
    <Flex
      key={index}
      alignSelf="center"
      onClick={() => switchNetwork(cId)}
      align="center"
      width="md"
      px="20px"
      py="2px"
      cursor="pointer"
    >
      <Flex
        width="100%"
        align="center"
        borderRadius="25px"
        padding="6px"
        justify="space-between"
        bg={cId === chainId && selected ? "gray.100" : undefined}
        _hover={{
          bg: "gray.200",
        }}
      >
        <Flex align="center">
          {typeof icon === "string" ? (
            <Image src={icon} height="36px" width="36px" />
          ) : (
            <Icon as={icon} height="36px" width="36px" />
          )}
          <Text ml="12px" fontWeight="medium" fontSize="14px">
            {getNetworkMetadata(cId).chainName}
          </Text>
          {getNetworkMetadata(cId).isTestnet && (
            <Text fontSize="14px" color="gray.400">
              &nbsp;(testnet)
            </Text>
          )}
        </Flex>
        {cId === chainId && selected && (
          <Text color="blue.400" fontSize="14px" mr="8px">
            Connected
          </Text>
        )}
      </Flex>
    </Flex>
  );
};
