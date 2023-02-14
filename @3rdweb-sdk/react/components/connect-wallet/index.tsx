import {
  Flex,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuList,
  useClipboard,
  useColorMode,
} from "@chakra-ui/react";
import { AiOutlineDisconnect } from "@react-icons/all-files/ai/AiOutlineDisconnect";
import {
  WalletNotSelectedError,
  useWallet as useSolWallet,
} from "@solana/wallet-adapter-react";
import Solana from "@thirdweb-dev/chain-icons/dist/solana";
import { defaultChains } from "@thirdweb-dev/chains";
import {
  ConnectWallet as ConnectWalletNew,
  useAddress,
  useConnectionStatus,
  useLogout,
  useUser,
} from "@thirdweb-dev/react";
import { ChakraNextImage } from "components/Image";
import { CustomChainRenderer } from "components/selects/CustomChainRenderer";
import {
  useAddRecentlyUsedChainId,
  useRecentlyUsedChains,
} from "hooks/chains/recentlyUsedChains";
import { useSetIsNetworkConfigModalOpen } from "hooks/networkConfigModal";
import { useEffect } from "react";
import { FiCheck, FiChevronDown, FiCopy } from "react-icons/fi";
import { Button, ButtonProps, MenuItem, Text } from "tw-components";
import { shortenString } from "utils/usedapp-external";

export interface ConnectWalletProps extends ButtonProps {
  ecosystem?: "evm" | "solana" | "either";
  requireLogin?: boolean;
  shrinkMobile?: boolean;
  upsellTestnet?: boolean;
  onChainSelect?: (chainId: number) => void;
}

export const ConnectWallet: React.FC<ConnectWalletProps> = ({
  requireLogin = false,
  ecosystem = "either",
  ...buttonProps
}) => {
  const { user } = useUser();
  const address = useAddress();
  const { logout } = useLogout();
  const { colorMode } = useColorMode();
  const recentChains = useRecentlyUsedChains();
  const addRecentlyUsedChainId = useAddRecentlyUsedChainId();
  const setIsNetworkConfigModalOpen = useSetIsNetworkConfigModalOpen();

  const solWallet = useSolWallet();
  const {
    hasCopied: hasCopiedSol,
    onCopy: onCopySol,
    setValue: setValueSol,
  } = useClipboard(solWallet.publicKey?.toBase58() || "");

  useEffect(() => {
    if (solWallet.publicKey) {
      setValueSol(solWallet.publicKey?.toBase58());
    }
  }, [solWallet.publicKey, setValueSol]);

  useEffect(() => {
    if (!!user && user?.address !== address) {
      logout();
    }
  }, [address, user, logout]);

  const connectionStatus = useConnectionStatus();

  // if solana is connected we hit this
  if (solWallet.publicKey && ecosystem !== "evm") {
    return (
      <Menu isLazy>
        <MenuButton
          as={Button}
          {...buttonProps}
          variant="outline"
          colorScheme="gray"
          rightIcon={<FiChevronDown />}
        >
          <Flex direction="row" gap={3} align="center">
            <Image alt="" boxSize={6} src={solWallet.wallet?.adapter.icon} />
            <Text size="label.sm">
              {shortenString(solWallet.publicKey.toBase58())}
            </Text>
          </Flex>
        </MenuButton>
        <MenuList borderRadius="lg" py={2}>
          <MenuItem
            closeOnSelect={false}
            icon={
              <Icon
                color={hasCopiedSol ? "green.500" : "inherit"}
                as={hasCopiedSol ? FiCheck : FiCopy}
              />
            }
            onClick={onCopySol}
          >
            Copy public key
          </MenuItem>
          <MenuItem
            icon={<AiOutlineDisconnect />}
            onClick={async () => {
              await solWallet.disconnect();
            }}
          >
            Disconnect
          </MenuItem>
        </MenuList>
      </Menu>
    );
  }

  if (ecosystem === "evm" || ecosystem === "either") {
    return (
      <ConnectWalletNew
        theme={colorMode}
        networkSelector={{
          popularChains: defaultChains,
          recentChains,
          onSwitch(chain) {
            addRecentlyUsedChainId(chain.chainId);
          },
          onCustomClick() {
            setIsNetworkConfigModalOpen(true);
          },
          renderChain: CustomChainRenderer,
        }}
        auth={{
          loginOptional: !requireLogin,
        }}
      />
    );
  }

  return (
    <>
      <Menu isLazy>
        <MenuButton
          isLoading={
            connectionStatus === "connecting" || connectionStatus === "unknown"
          }
          as={Button}
          colorScheme="blue"
          rightIcon={<FiChevronDown />}
          {...buttonProps}
        >
          Connect Wallet
        </MenuButton>

        <MenuList>
          {solWallet.wallets.length === 0 ? (
            <MenuItem
              py={3}
              icon={
                <ChakraNextImage
                  boxSize={4}
                  borderRadius="md"
                  src={require("public/assets/dashboard/phantom.png")}
                  placeholder="empty"
                  alt=""
                />
              }
              w="100%"
              onClick={() => {
                window.open("https://phantom.app/", "_blank");
              }}
            >
              <Flex as="span" align="center" justify="space-between">
                <span>Phantom</span>
                <Icon as={Solana} />
              </Flex>
            </MenuItem>
          ) : (
            solWallet.wallets.map((sWallet) => {
              return (
                <MenuItem
                  key={sWallet.adapter.name}
                  py={3}
                  icon={
                    <Image
                      boxSize={4}
                      borderRadius="md"
                      src={sWallet.adapter.icon}
                      placeholder="empty"
                      alt=""
                    />
                  }
                  w="100%"
                  onClick={async () => {
                    solWallet.select(sWallet.adapter.name);
                    try {
                      await solWallet.connect();
                    } catch (e) {
                      if (e instanceof WalletNotSelectedError) {
                        // seems safe to ignore?
                      } else {
                        console.error(
                          "failed to connect to solana wallet",
                          e,
                          sWallet,
                        );
                      }
                    }
                  }}
                >
                  <Flex as="span" align="center" justify="space-between">
                    <span>{sWallet.adapter.name}</span>
                    <Icon as={Solana} />
                  </Flex>
                </MenuItem>
              );
            })
          )}
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
  const connectGnosis = useGnosis();

  const {
    register,
    handleSubmit,
    setError,
    watch,
    clearErrors,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<{ safeAddress: string; safeChainId: string }>({
    defaultValues: {
      safeAddress: "",
      safeChainId: (-1).toString(),
    },
    reValidateMode: "onChange",
  });
  const formData = watch();
  const safeChainId = parseInt(formData.safeChainId);

  useEffect(() => {
    if (!formData.safeAddress) {
      setError("safeAddress", {
        type: "required",
        message: "Safe address is required",
      });
    } else if (!utils.isAddress(formData.safeAddress)) {
      setError("safeAddress", {
        type: "pattern",
        message: "Not a valid address",
      });
    } else {
      clearErrors("safeAddress");
    }
  }, [clearErrors, formData.safeAddress, setError]);

  const { onError } = useTxNotifications(
    "Connected Gnosis Safe",
    "Failed to connect Gnosis Safe",
  );
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent pb={5} mx={{ base: 4, md: 0 }}>
        <ModalHeader>
          <Flex gap={2} align="center">
            <Heading size="subtitle.md">Gnosis Safe Connect </Heading>
            <Badge variant="outline" colorScheme="purple">
              beta
            </Badge>
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody
          as="form"
          onSubmit={handleSubmit(async (d) => {
            try {
              const response = await connectGnosis({
                ...d,
                safeChainId: parseInt(d.safeChainId),
              });
              if (response.error) {
                throw response.error;
              }
              onClose();
            } catch (err) {
              console.error("failed to connect", err);
              onError(err);
            }
          })}
        >
          <Stack spacing={5}>
            <FormControl isRequired isInvalid={!!errors.safeAddress} mr={4}>
              <FormLabel>Safe Address</FormLabel>
              <Input
                onPaste={(e) => {
                  try {
                    const text = e.clipboardData.getData("Text");
                    if (text.indexOf(":0x") > -1) {
                      // looks like we have a network key from gnosis safe in there

                      const [gnosisNetwork, gnosisSafeAddress] =
                        text.split(":");

                      // prevent the default (setting the data to the input) since we're about to handle it
                      if (
                        utils.isAddress(gnosisSafeAddress) &&
                        gnosisNetwork in GNOSIS_TO_CHAIN_ID
                      ) {
                        e.preventDefault();
                        // just re-set the form with the data we found
                        reset({
                          safeAddress: gnosisSafeAddress,
                          safeChainId:
                            GNOSIS_TO_CHAIN_ID[
                              gnosisNetwork as keyof typeof GNOSIS_TO_CHAIN_ID
                            ].toString(),
                        });
                      }
                    }
                  } catch (err) {
                    console.error("failed to get paste data", err);
                  }
                }}
                {...register("safeAddress")}
                placeholder={`net:${constants.AddressZero}`}
                autoFocus
              />
              <FormHelperText>
                You can find this address on your gnosis safe dashboard.
              </FormHelperText>
              <FormErrorMessage>
                {errors?.safeAddress?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.safeChainId} mr={4}>
              <FormLabel>Safe Network</FormLabel>
              <SupportedNetworkSelect
                disabledChainIds={[
                  ChainId.Fantom,
                  ChainId.Mumbai,
                  ChainId.Optimism,
                  ChainId.OptimismGoerli,
                  ChainId.Arbitrum,
                  ChainId.ArbitrumGoerli,
                  ChainId.FantomTestnet,
                  ChainId.AvalancheFujiTestnet,
                ]}
                {...register("safeChainId")}
                value={safeChainId}
              />

              <FormHelperText>
                The network your gnosis safe is deployed on.
              </FormHelperText>
              <FormErrorMessage>
                {errors?.safeChainId?.message}
              </FormErrorMessage>
            </FormControl>
            <CustomSDKContext
              desiredChainId={parseInt(formData.safeChainId || "1")}
            >
              <MismatchButton
                isDisabled={!!Object.keys(errors).length}
                isLoading={isSubmitting}
                type="submit"
                borderRadius="md"
                colorScheme="blue"
              >
                Connect to Gnosis Safe
              </MismatchButton>
            </CustomSDKContext>
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
      <ModalContent pb={5} mx={{ base: 4, md: 0 }}>
        <ModalHeader>
          <Heading size="subtitle.md">Email Connect</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody
          as="form"
          onSubmit={handleSubmit(async ({ email }) => {
            try {
              posthog.capture("wallet_connected_attempt", {
                connector: "magic",
              });
              await connectMagic({ email });
              registerConnector("magic");

              onClose();
            } catch (error) {
              console.error("failed to connect", error);
              setError("email", {
                message:
                  error instanceof Error
                    ? error.message
                    : "Something went wrong",
              });
              posthog.capture("wallet_connected_fail", {
                connector: "magic",
                error,
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
              colorScheme="blue"
            >
              Sign In
            </Button>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
