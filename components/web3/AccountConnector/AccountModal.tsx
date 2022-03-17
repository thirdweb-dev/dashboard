import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  AspectRatio,
  Badge,
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import { getExplorerAddressLink, useEthers } from "@usedapp/core";
import { Card } from "components/layout/Card";
import { useActivateWalletConnect } from "hooks/web3/useActivateWalletConnect";
import React, { useMemo } from "react";
import { AddressCopyButton } from "../AddressCopyButton";
import { Identicon } from "./Identicon";

interface IAccountModalProps {
  isOpen: boolean;
  onClose: any;
}

export const AccountModal: React.FC<IAccountModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    account,
    chainId,
    connector,
    library,
    activateBrowserWallet,
    deactivate,
  } = useEthers();

  const activateWalletConnect = useActivateWalletConnect();

  const activeProvider = useMemo(() => {
    return library?.provider;
  }, [library?.provider]);

  const handleChangeAccount = async () => {
    const provider = activeProvider;
    if (!provider) {
      return;
    }
    // re-auth the metamask flow
    if (provider.isMetaMask && provider.request) {
      const request = await provider.request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }],
      });
      return request;
    } else {
      if (connector && (connector as any).close) {
        (connector as any).close();
        return;
      }
      return deactivate();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay />
      <ModalContent pb={4} bg="gray.100">
        <ModalHeader as={Heading} size="lg">
          Connection Manager
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Stack spacing={4}>
            {account && (
              <>
                <Stack as={Card}>
                  <Heading as="h4" size="sm" fontWeight="600">
                    Connected Wallet
                  </Heading>
                  <Flex align="center">
                    <Identicon h={8} w={8} mt={0} />
                    <Flex px={2} direction="column" align="start">
                      <AddressCopyButton address={account} />
                      {chainId && (
                        <Link
                          mt={0.5}
                          pl={3}
                          isExternal
                          fontSize="sm"
                          lineHeight={1}
                          href={getExplorerAddressLink(account, chainId)}
                        >
                          View on explorer
                          <ExternalLinkIcon ml={1} mt="-3px" />
                        </Link>
                      )}
                    </Flex>
                    {activeProvider?.isMetaMask ? (
                      <Badge
                        display={["none", "none", "block"]}
                        mx={2}
                        variant="outline"
                        colorScheme="orange"
                      >
                        MetaMask
                      </Badge>
                    ) : undefined}
                    <Button
                      onClick={handleChangeAccount}
                      variant="outline"
                      ml="auto"
                      size="sm"
                    >
                      {activeProvider?.isMetaMask ? "Switch" : "Disconnect"}
                    </Button>
                  </Flex>
                </Stack>

                <hr />
              </>
            )}
            <Stack as={Card} spacing={4}>
              <Heading as="h4" size="sm" fontWeight="600">
                Connect a{activeProvider ? " different" : ""} wallet
              </Heading>
              <Button
                colorScheme="orange"
                isFullWidth
                leftIcon={
                  <AspectRatio ratio={1} w={6}>
                    <Image src="/logos/metamask-fox.svg" />
                  </AspectRatio>
                }
                onClick={() => activateBrowserWallet()}
              >
                Connect via MetaMask
              </Button>

              <Button
                colorScheme="blue"
                isFullWidth
                leftIcon={
                  <AspectRatio ratio={1} w={6}>
                    <Image src="/logos/walletconnect-logo.svg" />
                  </AspectRatio>
                }
                onClick={() => activateWalletConnect()}
              >
                Connect via WalletConnect
              </Button>
            </Stack>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
