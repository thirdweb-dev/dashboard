import {
  useAppModule,
  useIsAdmin,
  useUpgradeModuleListMutation,
} from "@3rdweb-sdk/react";
import { useWeb3 } from "@3rdweb/hooks";
import { ModuleMetadata, ModuleType } from "@3rdweb/sdk";
import {
  Badge,
  Button,
  Flex,
  Heading,
  HStack,
  LinkBox,
  LinkOverlay,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { BigNumber } from "ethers";
import { useNetworkUrl } from "hooks/useHref";
import { useNetworkMismatch } from "hooks/useNetworkMismatch";
import { useSingleQueryParam } from "hooks/useQueryParam";
import NextLink from "next/link";
import React from "react";
import { parseErrorToMessage } from "utils/errorParser";
import { FeatureIconMap } from "utils/feature-icons";
import { buildModuleUrl } from "utils/moduleUrls";
import { getChainIdFromNetwork } from "utils/network";
import { MODULE_TYPE_TO_NAME } from "./add-module/select/SelectModule";
import { EmailLink } from "./EmailLink";
import { ChakraNextImage } from "./Image";
import { AddressCopyButton } from "./web3/AddressCopyButton";

interface IContractDetailCard {
  contract: ModuleMetadata;
  needsUpgrade: boolean;
}

const ColorSchemeMap: Record<ModuleType, string> = {
  [ModuleType.CURRENCY]: "yellow",
  [ModuleType.NFT]: "blue",
  [ModuleType.COLLECTION]: "teal",
  [ModuleType.PACK]: "purple",
  [ModuleType.MARKET]: "green",
  [ModuleType.MARKETPLACE]: "green",
  [ModuleType.DROP]: "orange",
  [ModuleType.BUNDLE_DROP]: "cyan",
  [ModuleType.BUNDLE_SIGNATURE]: "cyan",
  [ModuleType.DATASTORE]: "red",
  [ModuleType.DYNAMIC_NFT]: "red",
  [ModuleType.ACCESS_NFT]: "red",
  [ModuleType.SPLITS]: "red",
  [ModuleType.VOTE]: "red",
};

function useModuleUrl(
  network: string,
  moduleType: ModuleType,
  moduleAddress: string,
) {
  return buildModuleUrl(
    network,
    moduleType,
    useSingleQueryParam("app") || "",
    moduleAddress,
  );
}

export const ContractDetailCard: React.FC<IContractDetailCard> = ({
  contract,
  needsUpgrade,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getNetworkMetadata, address: walletAddress } = useWeb3();
  const chainId = getChainIdFromNetwork(useSingleQueryParam("network"));

  const appAddress = useSingleQueryParam("app");
  const appModule = useAppModule(appAddress);
  const image = FeatureIconMap[contract.type];
  const title = MODULE_TYPE_TO_NAME[contract.type];
  const colorScheme = ColorSchemeMap[contract.type];
  const network = useNetworkUrl();
  const isAdmin = useIsAdmin(appModule);

  const hasRoyaltyPercentBiggerThanZero = BigNumber.from(
    contract.metadata?.seller_fee_basis_points || 0,
  ).gt(0);

  const url = useModuleUrl(network, contract.type, contract.address);

  const upgradeModuleListMutation = useUpgradeModuleListMutation(appAddress);

  const toast = useToast();

  const networkMismatched = useNetworkMismatch();
  const isTestnet = chainId ? getNetworkMetadata(chainId)?.isTestnet : true;

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading size="title.sm">Upgrade Module</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody as={Stack}>
            <Text>
              This module uses the royalty feature and needs to be updated to
              send the resulting royalties to your upgraded project.
            </Text>
            <Text>
              If you have any questions or concerns please reach out to us:{" "}
              <EmailLink
                email="support@thirdweb.com"
                subjectLine="Module Upgrade"
                color="blue.600"
                context={{
                  walletAddress,
                  projectAddress: appAddress,
                  moduleAddress: contract.address,
                }}
              >
                support@thirdweb.com
              </EmailLink>
            </Text>
          </ModalBody>
          <ModalFooter>
            <Stack w="full" align="center">
              <Button
                colorScheme="blue"
                isLoading={upgradeModuleListMutation.isLoading}
                onClick={() => {
                  upgradeModuleListMutation.mutate(contract.address, {
                    onSuccess: () => {
                      toast({
                        title: "Success",
                        description: "Module upgraded successfully!",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                      });
                      onClose();
                    },
                    onError: (err: any) => {
                      toast({
                        title: "Error",
                        description: parseErrorToMessage(err),
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                      });
                    },
                  });
                }}
              >
                Upgrade Module
              </Button>
              <Text size="body.sm" color="gray.600">
                You will be prompted to approve 1 transaction
              </Text>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <LinkBox
        as={HStack}
        spacing={4}
        align="center"
        _hover={{ bg: "gray.100", shadow: "sm" }}
        borderRadius="md"
        p={2}
      >
        <Flex align="center" justify="space-between" flexGrow={1}>
          <Stack>
            <HStack>
              {image && <ChakraNextImage boxSize={8} src={image} alt={title} />}
              {needsUpgrade &&
              isAdmin &&
              !networkMismatched &&
              !isTestnet &&
              hasRoyaltyPercentBiggerThanZero ? (
                <Stack cursor="pointer" onClick={onOpen}>
                  <LinkOverlay display="flex">
                    <Heading size="sm" mr={2}>
                      {contract.metadata?.name}
                    </Heading>
                    <Badge borderRadius="full" px={".75rem"} bg="purple.50">
                      Needs upgrade
                    </Badge>
                  </LinkOverlay>
                </Stack>
              ) : (
                <NextLink href={url} passHref>
                  <LinkOverlay>
                    <Heading size="sm">{contract.metadata?.name}</Heading>
                  </LinkOverlay>
                </NextLink>
              )}
            </HStack>
            <Text>{contract.metadata?.description}</Text>
          </Stack>
          <HStack>
            {
              <Badge
                w={40}
                borderRadius="xl"
                py={1.5}
                textAlign="center"
                colorScheme={colorScheme}
              >
                {title}
              </Badge>
            }
            <AddressCopyButton
              fontFamily="mono"
              variant="outline"
              address={contract.address}
            />
          </HStack>
        </Flex>
      </LinkBox>
    </>
  );
};
