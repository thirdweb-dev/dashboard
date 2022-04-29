import { useWeb3 } from "@3rdweb-sdk/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  FormControl,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Select,
  Skeleton,
  Stack,
  useClipboard,
  useDisclosure,
} from "@chakra-ui/react";
import { AddressZero } from "@ethersproject/constants";
import {
  ChainId,
  useConnect,
  useDisconnect,
  useGnosis,
  useMagic,
  useSigner,
} from "@thirdweb-dev/react";
import { ChakraNextImage } from "components/Image";
import { isAddress } from "ethers/lib/utils";
import { StaticImageData } from "next/image";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineDisconnect } from "react-icons/ai";
import { FiCheck, FiCopy } from "react-icons/fi";
import {
  Button,
  ButtonProps,
  FormErrorMessage,
  FormLabel,
  Text,
} from "tw-components";
import { SUPPORTED_CHAIN_IDS } from "utils/network";
import { shortenIfAddress } from "utils/usedapp-external";
import { Connector } from "wagmi-core";

const connectorIdToImageUrl: Record<string, StaticImageData> = {
  MetaMask: require("public/logos/metamask-fox.svg"),
  WalletConnect: require("public/logos/walletconnect-logo.svg"),
  "Coinbase Wallet": require("public/logos/coinbase-wallet-logo.svg"),
  Magic: require("public/logos/magic-logo.svg"),
  Gnosis: require("public/logos/gnosis-logo.svg"),
};

export const ConnectWallet: React.FC<ButtonProps> = (buttonProps) => {
  const [connector, connect] = useConnect();
  const { balance, address, chainId, getNetworkMetadata } = useWeb3();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const disconnect = useDisconnect();

  const { hasCopied, onCopy } = useClipboard(address || "");

  function handleConnect(_connector: Connector<any, any>) {
    if (_connector.name.toLowerCase() === "magic") {
      onOpen();
    } else {
      connect(_connector);
    }
  }

  const gnosisConnector = connector.data.connectors.find(
    (c) => c.id === "gnosis",
  );
  const isGnosisConnectorConnected =
    gnosisConnector && connector.data.connector?.id === gnosisConnector?.id;

  const gnosisModalState = useDisclosure();

  if (address && chainId) {
    const SVG = getNetworkMetadata(chainId).icon;
    return (
      <>
        <GnosisSafeModal
          isOpen={gnosisModalState.isOpen}
          onClose={gnosisModalState.onClose}
        />
        <Menu matchWidth isLazy>
          <MenuButton
            as={Button}
            {...buttonProps}
            variant="outline"
            colorScheme="gray"
            rightIcon={<ChevronDownIcon />}
          >
            <Flex direction="row" gap={3} align="center">
              <Icon boxSize={6} as={SVG} />
              <Flex gap={0.5} direction="column" textAlign="left">
                <Text size="label.sm">
                  <Skeleton as="span" isLoaded={!balance.isLoading}>
                    {balance.data?.formatted || "0.000"}
                  </Skeleton>{" "}
                  {getNetworkMetadata(chainId).symbol}
                </Text>
                <Text size="label.sm" color="gray.500">
                  {shortenIfAddress(address, true)} (
                  {getNetworkMetadata(chainId).chainName})
                </Text>
              </Flex>
              {isGnosisConnectorConnected && (
                <ChakraNextImage
                  boxSize={6}
                  _dark={{ filter: "invert(1)" }}
                  borderRadius="md"
                  src={connectorIdToImageUrl.Gnosis}
                  placeholder="empty"
                  alt=""
                />
              )}
            </Flex>
          </MenuButton>
          <MenuList borderRadius="lg">
            <MenuItem
              closeOnSelect={false}
              icon={
                <Icon
                  color={hasCopied ? "green.500" : undefined}
                  as={hasCopied ? FiCheck : FiCopy}
                />
              }
              onClick={onCopy}
            >
              <Text size="label.md">Copy wallet address</Text>
            </MenuItem>

            {gnosisConnector && !isGnosisConnectorConnected && (
              <>
                <MenuDivider my={0} />
                <MenuItem
                  icon={
                    <ChakraNextImage
                      _dark={{ filter: "invert(1)" }}
                      boxSize={4}
                      borderRadius="md"
                      src={connectorIdToImageUrl.Gnosis}
                      placeholder="empty"
                      alt=""
                    />
                  }
                  onClick={gnosisModalState.onOpen}
                >
                  <Text size="label.md">Connect Gnosis Safe</Text>
                </MenuItem>
              </>
            )}
            <MenuDivider my={0} />
            <MenuItem icon={<AiOutlineDisconnect />} onClick={disconnect}>
              <Text size="label.md">Disconnect Wallet</Text>
            </MenuItem>
          </MenuList>
        </Menu>
      </>
    );
  }

  return (
    <>
      <MagicModal isOpen={isOpen} onClose={onClose} />
      <Menu matchWidth isLazy>
        <MenuButton
          isLoading={connector.loading}
          as={Button}
          colorScheme="primary"
          rightIcon={<ChevronDownIcon />}
          {...buttonProps}
        >
          Connect Wallet
        </MenuButton>

        <MenuList>
          {connector.data.connectors
            .filter((c) => c.id !== "gnosis")
            .map((_connector) => {
              if (!_connector.ready) {
                return null;
              }

              return (
                <MenuItem
                  key={_connector.name}
                  icon={
                    <ChakraNextImage
                      boxSize={4}
                      borderRadius="md"
                      src={connectorIdToImageUrl[_connector.name]}
                      placeholder="empty"
                      alt=""
                    />
                  }
                  onClick={() => handleConnect(_connector)}
                >
                  <Text size="label.md">
                    {_connector.id === "magic"
                      ? "Email Wallet (Magic)"
                      : _connector.name}
                  </Text>
                </MenuItem>
              );
            })}
        </MenuList>
      </Menu>
    </>
  );
};

interface ConnectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GnosisSafeModal: React.FC<ConnectorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const signer = useSigner();
  const connectGnosis = useGnosis();
  const { chainId: signerChainId, getNetworkMetadata } = useWeb3();

  const {
    register,
    handleSubmit,
    setError,
    watch,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<{ safeAddress: string; safeChainId: string }>({
    defaultValues: {
      safeAddress: "",
      safeChainId: (signerChainId || -1).toString(),
    },
    reValidateMode: "onChange",
  });
  const formData = watch();

  useEffect(() => {
    if (!formData.safeAddress) {
      setError("safeAddress", {
        type: "required",
        message: "Safe address is required",
      });
    } else if (!isAddress(formData.safeAddress)) {
      setError("safeAddress", {
        type: "pattern",
        message: "Not a valid address",
      });
    } else {
      clearErrors("safeAddress");
    }
  }, [clearErrors, formData.safeAddress, setError]);

  useEffect(() => {
    if (formData.safeChainId !== (signerChainId || -1).toString()) {
      setError("safeChainId", {
        type: "value",
        message: "Safe network *must* match your connected wallet network",
      });
    } else {
      clearErrors("safeChainId");
    }
  }, [clearErrors, formData.safeChainId, setError, signerChainId]);

  const testnets = useMemo(() => {
    return SUPPORTED_CHAIN_IDS.filter((chainId) => chainId !== ChainId.Goerli)
      .map((supportedChain) => {
        return getNetworkMetadata(supportedChain);
      })
      .filter((n) => n.isTestnet);
  }, [getNetworkMetadata]);

  const mainnets = useMemo(() => {
    return SUPPORTED_CHAIN_IDS.map((supportedChain) => {
      return getNetworkMetadata(supportedChain);
    }).filter((n) => !n.isTestnet);
  }, [getNetworkMetadata]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent py={{ base: 5, md: 7 }} mx={{ base: 4, md: 0 }}>
        <ModalCloseButton />
        <ModalBody
          as="form"
          onSubmit={handleSubmit(async (d) => {
            if (!signer) {
              return;
            }

            try {
              await connectGnosis(signer, {
                ...d,
                safeChainId: parseInt(d.safeChainId),
              });
              onClose();
            } catch (err) {
              console.error("failed to connect", err);
            }
          })}
        >
          <Stack spacing={5}>
            <FormControl isRequired isInvalid={!!errors.safeAddress} mr={4}>
              <FormLabel>Safe Address</FormLabel>
              <Input
                {...register("safeAddress")}
                placeholder={AddressZero}
                autoFocus
              />
              <FormErrorMessage>
                {errors?.safeAddress?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.safeChainId} mr={4}>
              <FormLabel>Safe Network</FormLabel>
              <Select {...register("safeChainId")}>
                <option disabled value={-1}>
                  Select Network
                </option>
                <optgroup label="Mainnets">
                  {mainnets.map((mn) => (
                    <option
                      key={mn.chainId}
                      value={mn.chainId}
                      disabled={mn.chainId === ChainId.Fantom}
                    >
                      {mn.chainName} ({mn.symbol})
                      {mn.chainId === ChainId.Fantom ? " - unsupported" : ""}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Testnets">
                  {testnets.map((tn) => (
                    <option
                      key={tn.chainId}
                      value={tn.chainId}
                      disabled={tn.chainId === ChainId.Mumbai}
                    >
                      {tn.chainName} ({tn.symbol} Testnet)
                      {tn.chainId === ChainId.Mumbai ? " - unsupported" : ""}
                    </option>
                  ))}
                </optgroup>
              </Select>
              <FormErrorMessage>
                {errors?.safeChainId?.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              isDisabled={!!Object.keys(errors).length}
              isLoading={isSubmitting}
              type="submit"
              borderRadius="md"
              colorScheme="primary"
            >
              Connect
            </Button>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const MagicModal: React.FC<ConnectorModalProps> = ({ isOpen, onClose }) => {
  const connectMagic = useMagic();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<{ email: string }>();

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent p={{ base: 5, md: 7 }} mx={{ base: 4, md: 0 }}>
        <ModalCloseButton />
        <ModalBody
          as="form"
          onSubmit={handleSubmit(async ({ email }) => {
            try {
              await connectMagic({ email });
              onClose();
            } catch (err) {
              console.error("failed to connect", err);
              setError("email", {
                message:
                  err instanceof Error ? err.message : "Something went wrong",
              });
            }
          })}
        >
          <Stack spacing={5}>
            <FormControl isRequired isInvalid={!!errors.email} mr={4}>
              <Input
                {...register("email")}
                placeholder="name@example.com"
                autoFocus
                type="email"
              />
              <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
            </FormControl>
            <Button
              isLoading={isSubmitting}
              type="submit"
              borderRadius="md"
              colorScheme="primary"
            >
              Connect with Magic
            </Button>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
