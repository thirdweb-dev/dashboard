import {
  Box,
  Flex,
  GridItem,
  Input,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  Grid,
  useBreakpointValue,
  useColorMode,
  Spacer,
  Switch,
  IconButton,
  Icon,
  Tooltip,
} from "@chakra-ui/react";
import {
  ConnectWallet,
  ThirdwebProvider,
  smartWallet,
} from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";
import { Button, CodeBlock, Heading, Text, FormLabel } from "tw-components";
import { THIRDWEB_DOMAIN, THIRDWEB_API_HOST } from "constants/urls";
import { format } from "prettier/standalone";
import parserBabel from "prettier/plugins/babel";
import estree from "prettier/plugins/estree";
import { ClientOnly } from "components/ClientOnly/ClientOnly";
import { walletInfoRecord, WalletId } from "./walletInfoRecord";
import { getCode } from "./getCode";
import { WalletButton } from "./WalletButton";
import {
  ConnectModalInlinePreview,
  WelcomeScreen,
} from "./ConnectModalInlinePreview";
import { FormItem } from "./FormItem";
import { SwitchFormItem } from "./SwitchFormItem";
import { FaRectangleList } from "react-icons/fa6";
import { RiFileListFill } from "react-icons/ri";
import { AiOutlineStar } from "react-icons/ai";
import { DASHBOARD_THIRDWEB_CLIENT_ID } from "constants/rpc";

export const ConnectWalletPlayground: React.FC = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [btnTitle, setBtnTitle] = useState("");
  const [modalSize, setModalSize] = useState<"compact" | "wide">("wide");
  const [modalTitle, setModalTitle] = useState("");
  const [modalTitleIconUrl, setModalTitleIconUrl] = useState<ModalTitleIconUrl>(
    { default: true },
  );
  const [welcomeScreen, setWelcomeScreen] = useState<WelcomeScreen>({});

  const [smartWalletOptions, setSmartWalletOptions] = useState({
    factoryAddress: "0x219312a1c180B82abEE14FbDB4C9EE04E90c1809",
    enabled: false,
    gasless: true,
  });
  const { colorMode, toggleColorMode } = useColorMode();
  const selectedTheme = colorMode === "light" ? "light" : "dark";
  const [authEnabled, setAuthEnabled] = useState(false);
  const [switchToActiveChain, setSwitchToActiveChain] = useState(false);
  const [code, setCode] = useState("");

  const [walletSelection, setWalletSelection] = useState<
    Record<WalletId, boolean | "recommended">
  >({
    MetaMask: "recommended",
    Coinbase: true,
    WalletConnect: true,
    Safe: false,
    "Guest Mode": false,
    "Email Wallet": false,
    Trust: true,
    Zerion: true,
    Blocto: false,
    "Magic Link": false,
    Frame: false,
    Rainbow: true,
    Phantom: true,
  });

  const enabledWallets = Object.entries(walletSelection)
    .filter((x) => x[1])
    .map((x) => x[0] as WalletId);

  useEffect(() => {
    const _code = getCode({
      imports: enabledWallets.map(
        (walletId) => walletInfoRecord[walletId].import,
      ),
      smartWalletOptions: smartWalletOptions.enabled
        ? {
            factoryAddress: smartWalletOptions.factoryAddress,
            gasless: smartWalletOptions.gasless,
          }
        : undefined,
      thirdwebProvider: {
        supportedWallets:
          enabledWallets.length > 0
            ? `[${enabledWallets
                .map((walletId) => walletInfoRecord[walletId].code)
                .join(",")}]`
            : undefined,
        authConfig: authEnabled
          ? `{ authUrl: "/api/auth", domain: "https://example.com" }`
          : undefined,
      },
      connectWallet: {
        theme: `"${selectedTheme}"`,
        btnTitle: btnTitle ? `"${btnTitle}"` : undefined,
        modalTitle: modalTitle ? `"${modalTitle}"` : undefined,
        auth: authEnabled ? "{ loginOptional: false }" : undefined,
        switchToActiveChain: switchToActiveChain ? "true" : undefined,
        modalSize: `"${modalSize}"`,
        welcomeScreen:
          Object.keys(welcomeScreen).length > 0
            ? JSON.stringify(welcomeScreen)
            : undefined,
        modalTitleIconUrl:
          "default" in modalTitleIconUrl
            ? undefined
            : `"${modalTitleIconUrl.custom}"`,
      },
    });

    format(_code, {
      parser: "babel",
      plugins: [parserBabel, estree],
      printWidth: 50,
    }).then((formattedCode) => {
      setCode(formattedCode);
    });
  }, [
    authEnabled,
    btnTitle,
    enabledWallets,
    modalTitle,
    selectedTheme,
    switchToActiveChain,
    modalSize,
    smartWalletOptions,
    modalTitleIconUrl,
    welcomeScreen,
  ]);

  const supportedWallets = enabledWallets.map((walletId) => {
    // set recommended
    walletInfoRecord[walletId].component.recommended =
      walletSelection[walletId] === "recommended";

    // wrap with smart wallet
    const walletConfig = walletInfoRecord[walletId].component;

    return smartWalletOptions.enabled
      ? smartWallet(walletConfig, {
          factoryAddress: smartWalletOptions.factoryAddress,
          gasless: smartWalletOptions.gasless,
        })
      : walletConfig;
  });

  const withThirdwebProvider = (content: React.ReactNode) => (
    <ThirdwebProvider
      activeChain="mumbai"
      supportedWallets={
        supportedWallets.length > 0 ? supportedWallets : undefined
      }
      clientId={DASHBOARD_THIRDWEB_CLIENT_ID}
      authConfig={
        authEnabled
          ? {
              domain: THIRDWEB_DOMAIN,
              authUrl: `${THIRDWEB_API_HOST}/v1/auth`,
            }
          : undefined
      }
    >
      {content}
    </ThirdwebProvider>
  );

  const welcomeScreenContent = (
    <Flex direction="column" gap={5}>
      <Heading size="label.lg" as="h3" color="faded">
        Welcome Screen
      </Heading>

      {/* Welcome Screen Title */}
      <FormItem label="Title">
        <Input
          placeholder="Your gateway to the decentralized world"
          value={welcomeScreen.title}
          onChange={(e) => {
            setWelcomeScreen({
              ...welcomeScreen,
              title: e.target.value,
            });
          }}
        />
      </FormItem>

      {/* Welcome Screen Subtitle */}
      <FormItem label="Subtitle">
        <Input
          placeholder="Connect a wallet to get started"
          value={welcomeScreen.subtitle}
          onChange={(e) => {
            setWelcomeScreen({
              ...welcomeScreen,
              subtitle: e.target.value,
            });
          }}
        />
      </FormItem>

      {/* Welcome Screen Image */}
      <FormItem label="Splash Image">
        <Flex gap={3} alignItems="center">
          <Switch
            size="lg"
            isChecked={!!welcomeScreen.img}
            onChange={() => {
              setWelcomeScreen({
                ...welcomeScreen,
                img: welcomeScreen.img
                  ? undefined
                  : {
                      src: "",
                      width: 150,
                      height: 150,
                    },
              });
            }}
          ></Switch>
          <Text>{welcomeScreen.img ? "Custom" : "Default"}</Text>
        </Flex>
        <Spacer height={4} />

        {welcomeScreen.img && (
          <Flex flexDir="column" gap={3}>
            <Box>
              <FormLabel m={0} mb={2}>
                Image Address
              </FormLabel>
              <Input
                placeholder="https://..."
                value={welcomeScreen.img.src || ""}
                onChange={(e) => {
                  setWelcomeScreen({
                    ...welcomeScreen,
                    img: {
                      ...welcomeScreen.img,
                      src: e.target.value,
                    },
                  });
                }}
              />
            </Box>

            <Grid gap={2} templateColumns="1fr 1fr">
              <Box>
                <FormLabel m={0} mb={2}>
                  width
                </FormLabel>
                <Input
                  placeholder="150"
                  value={welcomeScreen.img.width}
                  onChange={(e) => {
                    setWelcomeScreen({
                      ...welcomeScreen,
                      img: {
                        src: welcomeScreen.img?.src || "",
                        ...welcomeScreen.img,
                        width: Number(e.target.value),
                      },
                    });
                  }}
                />
              </Box>

              <Box>
                <FormLabel m={0} mb={2}>
                  height
                </FormLabel>
                <Input
                  placeholder="150"
                  value={welcomeScreen.img.height}
                  onChange={(e) => {
                    setWelcomeScreen({
                      ...welcomeScreen,
                      img: {
                        src: welcomeScreen.img?.src || "",
                        ...welcomeScreen.img,
                        height: Number(e.target.value),
                      },
                    });
                  }}
                />
              </Box>
            </Grid>
          </Flex>
        )}
      </FormItem>
    </Flex>
  );

  const socialLogins = (
    <>
      <Heading size="label.md" color="heading">
        Email & Social Logins
      </Heading>
      <Spacer height={3} />
      <Grid gap={2} flexDir="column" templateColumns="1fr">
        {/* Email Wallet */}
        <WalletButton
          name="Embeded Wallet"
          subtitle="Email and Google sign in"
          icon={walletInfoRecord["Email Wallet"].component.meta.iconURL}
          onRecommendedClick={() => {
            const current = walletSelection["Email Wallet"];
            setWalletSelection({
              ...walletSelection,
              "Email Wallet": current === "recommended" ? true : "recommended",
              "Magic Link": false,
            });
          }}
          recommended={walletSelection["Email Wallet"] === "recommended"}
          isChecked={!!walletSelection["Email Wallet"]}
          onSelect={() => {
            const selected = !walletSelection["Email Wallet"];
            setWalletSelection({
              ...walletSelection,
              "Email Wallet": selected,
              "Magic Link": selected
                ? !selected
                : walletSelection["Magic Link"],
            });
          }}
        />

        {/* Magic Link */}
        <WalletButton
          subtitle="Phone number & Social Logins"
          name="Magic Link"
          icon={walletInfoRecord["Magic Link"].component.meta.iconURL}
          onRecommendedClick={() => {
            const current = walletSelection["Magic Link"];
            setWalletSelection({
              ...walletSelection,
              "Magic Link": current === "recommended" ? true : "recommended",
              "Email Wallet": false,
            });
          }}
          recommended={walletSelection["Magic Link"] === "recommended"}
          isChecked={!!walletSelection["Magic Link"]}
          onSelect={() => {
            const selected = !walletSelection["Magic Link"];
            setWalletSelection({
              ...walletSelection,
              "Magic Link": selected,
              "Email Wallet": selected
                ? false
                : walletSelection["Email Wallet"],
            });
          }}
        />
      </Grid>
    </>
  );

  const eoalWallets = (
    <>
      <Heading size="label.md" color="heading">
        Web3 Wallets
      </Heading>

      <Spacer height={2} />

      <Flex color="faded" alignItems="center" gap={1} fontSize={14}>
        Click on <Icon as={AiOutlineStar} w={4} h={4} color="faded" /> to tag
        wallet as recommended
      </Flex>

      <Spacer height={3} />
      <Grid gap={2} flexDir="column" templateColumns="1fr 1fr">
        {(Object.keys(walletInfoRecord) as WalletId[])
          .filter((key) => walletInfoRecord[key].type === "eoa")
          .map((key) => {
            const walletId = key as WalletId;
            const walletInfo = walletInfoRecord[walletId];
            const selection = walletSelection[walletId];

            return (
              <WalletButton
                name={walletId}
                key={walletId}
                icon={walletInfo.component.meta.iconURL}
                onRecommendedClick={() => {
                  const current = selection;
                  setWalletSelection({
                    ...walletSelection,
                    [walletId]:
                      current === "recommended" ? true : "recommended",
                  });
                }}
                recommended={selection === "recommended"}
                isChecked={!!selection}
                onSelect={() => {
                  setWalletSelection({
                    ...walletSelection,
                    [walletId]: !selection,
                  });
                }}
              />
            );
          })}
      </Grid>
    </>
  );

  return (
    <Grid
      templateColumns={{
        md: "1fr 732px",
        sm: "1fr",
      }}
      gap={{
        base: 14,
        md: 4,
      }}
    >
      {/* left */}
      <GridItem>
        <Tabs isLazy>
          <TabList fontSize={14} gap={2}>
            <CustomTab title="Options" />
            <CustomTab title="Customize" />
          </TabList>

          <TabPanels>
            {/* supportedWallets */}
            <TabPanel p={0} pt={8}>
              {/* theme */}
              <Grid templateColumns="1fr 1fr">
                <FormItem label="Theme">
                  <Flex gap={2}>
                    <ThemeButton
                      theme="dark"
                      isSelected={selectedTheme === "dark"}
                      onClick={() => {
                        if (selectedTheme !== "dark") {
                          toggleColorMode();
                        }
                      }}
                    />

                    <ThemeButton
                      theme="light"
                      isSelected={selectedTheme === "light"}
                      onClick={() => {
                        if (selectedTheme !== "light") {
                          toggleColorMode();
                        }
                      }}
                    />
                  </Flex>
                </FormItem>

                {/* modal size */}
                {!isMobile && (
                  <FormItem label="Modal Size">
                    <Flex gap={2}>
                      <ModalSizeButton
                        modalSize="wide"
                        isSelected={modalSize === "wide"}
                        onClick={() => {
                          setModalSize("wide");
                        }}
                      />

                      <ModalSizeButton
                        modalSize="compact"
                        isSelected={modalSize === "compact"}
                        onClick={() => {
                          setModalSize("compact");
                        }}
                      />
                    </Flex>
                  </FormItem>
                )}
              </Grid>

              <Spacer height={8} />

              {eoalWallets}
              <Spacer height={8} />
              {socialLogins}
              <Spacer height={10} />

              {/* Guest Mode */}
              <SwitchFormItem
                label="Continue as Guest"
                description="Access your app with a guest account"
                onCheck={(_isChecked) => {
                  setWalletSelection({
                    ...walletSelection,
                    "Guest Mode": _isChecked,
                  });
                }}
                isChecked={!!walletSelection["Guest Mode"]}
              />

              <Spacer height={5} />
              <Box borderTop="1px solid" borderColor="borderColor" />
              <Spacer height={5} />

              {/* Smart wallet */}
              <SwitchFormItem
                label="Smart Wallets"
                description="Use ERC-4337 (Account Abstraction) compatible smart wallets"
                onCheck={(_isChecked) => {
                  setSmartWalletOptions({
                    ...smartWalletOptions,
                    enabled: _isChecked,
                  });
                }}
                isChecked={smartWalletOptions.enabled}
              />

              <Spacer height={5} />
              <Box borderTop="1px solid" borderColor="borderColor" />
              <Spacer height={5} />

              <SwitchFormItem
                label="Auth"
                description="Enforce signatures (SIWE) after wallet connection"
                onCheck={(_isChecked) => {
                  setAuthEnabled(_isChecked);
                }}
                isChecked={authEnabled}
              />

              <Spacer height={5} />
              <Box borderTop="1px solid" borderColor="borderColor" />
              <Spacer height={5} />

              <SwitchFormItem
                label="Switch to Active Chain"
                description="Prompt user to switch to activeChain set in ThirdwebProvider after wallet connection"
                onCheck={(_isChecked) => {
                  setSwitchToActiveChain(_isChecked);
                }}
                isChecked={switchToActiveChain}
              />
            </TabPanel>

            {/* Design */}
            <TabPanel p={0} pt={6}>
              <Flex direction="column" gap={5}>
                {/* Button Title */}
                <FormItem
                  label="Button Title"
                  description="Title of ConnectWallet button"
                >
                  <Input
                    placeholder="Connect Wallet"
                    value={btnTitle}
                    onChange={(e) => {
                      setBtnTitle(e.target.value);
                    }}
                  />
                </FormItem>

                <Spacer height={10} />

                <Flex direction="column" gap={5}>
                  <Heading size="label.lg" as="h3" color="faded">
                    Modal
                  </Heading>

                  {/* Modal Title */}
                  <FormItem label="Modal Title">
                    <Input
                      placeholder="Choose your wallet"
                      value={modalTitle}
                      onChange={(e) => {
                        setModalTitle(e.target.value);
                      }}
                    />
                  </FormItem>

                  {/* Modal Title Icon */}
                  <FormItem
                    label="Modal Title Icon"
                    description="Icon to shown next to the modal title"
                  >
                    <Flex gap={3} alignItems="center">
                      <Switch
                        size="lg"
                        isChecked={"custom" in modalTitleIconUrl}
                        onChange={() => {
                          setModalTitleIconUrl(
                            "custom" in modalTitleIconUrl
                              ? {
                                  default: true,
                                }
                              : {
                                  custom: "",
                                },
                          );
                        }}
                      ></Switch>
                      <Text>
                        {"custom" in modalTitleIconUrl ? "Custom" : "Default"}
                      </Text>
                    </Flex>
                    <Spacer height={2} />
                    {"custom" in modalTitleIconUrl && (
                      <Input
                        placeholder="https://..."
                        value={modalTitleIconUrl.custom}
                        onChange={(e) => {
                          setModalTitleIconUrl({
                            custom: e.target.value,
                          });
                        }}
                      />
                    )}
                  </FormItem>
                </Flex>

                <Spacer height={10} />

                {/* Welcome Screen */}
                {welcomeScreenContent}
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </GridItem>

      {/* right */}
      <GridItem>
        <Tabs>
          <TabList fontSize={14} gap={2}>
            <CustomTab title="Preview" />
            <CustomTab title="Code" />
          </TabList>

          <TabPanels>
            <TabPanel p={0} pt={6}>
              {/* Live Preivew */}
              <Text color={"gray.700"} textAlign="center">
                Live Preview
              </Text>
              <Spacer height={2} />
              <Flex justifyContent="center">
                <Box>
                  {withThirdwebProvider(
                    <ConnectWallet
                      modalSize={modalSize}
                      modalTitle={modalTitle}
                      theme={selectedTheme}
                      btnTitle={btnTitle || undefined}
                      modalTitleIconUrl={
                        "default" in modalTitleIconUrl
                          ? undefined
                          : modalTitleIconUrl.custom
                      }
                      auth={{ loginOptional: !authEnabled }}
                      switchToActiveChain={switchToActiveChain}
                      welcomeScreen={welcomeScreen}
                    />,
                  )}
                </Box>
              </Flex>

              <Spacer height={10} flexGrow={0} flexShrink={0} />

              {/* Modal UI */}
              <Box>
                <Text color={"gray.700"} textAlign="center">
                  Modal UI
                </Text>
                <Box height={2} />
                {withThirdwebProvider(
                  <ClientOnly
                    ssr={null}
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <ConnectModalInlinePreview
                      modalSize={modalSize}
                      walletIds={supportedWallets.map((x) => x.id)}
                      modalTitle={modalTitle}
                      selectedTheme={selectedTheme}
                      welcomeScreen={welcomeScreen}
                      modalTitleIconUrl={
                        "default" in modalTitleIconUrl
                          ? undefined
                          : modalTitleIconUrl.custom
                      }
                    />
                  </ClientOnly>,
                )}
              </Box>
            </TabPanel>

            <TabPanel p={0} pt={6}>
              <CodeBlock language="jsx" code={code} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </GridItem>
    </Grid>
  );
};

function CustomTab(props: { title: string }) {
  return (
    <Tab fontWeight={600} fontSize={14}>
      {props.title}
    </Tab>
  );
}

type ModalTitleIconUrl =
  | {
      default: true;
    }
  | {
      custom: string;
    };

function ModalSizeButton(props: {
  modalSize: "compact" | "wide";
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <Tooltip label={props.modalSize}>
      <IconButton
        w={10}
        h={10}
        color={props.isSelected ? "bgWhite" : "heading"}
        bg={props.isSelected ? "blue.500" : "borderColor"}
        _hover={{
          bg: props.isSelected ? "blue.500" : "borderColor",
        }}
        borderRadius="50%"
        aria-label="compact"
        icon={
          <Icon
            as={props.modalSize === "wide" ? FaRectangleList : RiFileListFill}
            width={5}
            height={5}
          />
        }
        onClick={props.onClick}
      />
    </Tooltip>
  );
}
export function ThemeButton(props: {
  theme: "light" | "dark";
  isSelected: boolean;
  onClick: () => void;
}) {
  const bg = props.theme === "dark" ? "black" : "white";
  const borderColor = props.theme === "dark" ? "gray.800" : "gray.200";
  return (
    <Tooltip label={props.theme}>
      <Button
        w={10}
        h={10}
        borderRadius="50%"
        aria-label={props.theme}
        border="3px solid"
        bg={bg}
        _hover={{
          bg,
        }}
        borderColor={props.isSelected ? "blue.500" : borderColor}
        onClick={props.onClick}
      ></Button>
    </Tooltip>
  );
}
