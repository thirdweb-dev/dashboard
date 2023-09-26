/* eslint-disable inclusive-language/use-inclusive-words */
import {
  Box,
  Flex,
  GridItem,
  Input,
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
  ThemeOverrides,
  ThirdwebProvider,
  darkTheme,
  lightTheme,
  smartWallet,
} from "@thirdweb-dev/react";
import React, { useDeferredValue, useEffect, useState } from "react";
import { Button, Heading, Text, FormLabel, CodeBlock } from "tw-components";
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
import { DASHBOARD_THIRDWEB_CLIENT_ID, isProd } from "constants/rpc";
import { defaultChains } from "@thirdweb-dev/chains";
import { StorageSingleton } from "lib/sdk";
import { ColorInput } from "./ColorInput";
import { BsStars } from "react-icons/bs";

type OptionalUrl = { url: string; enabled: boolean };
export const ConnectWalletPlayground: React.FC = () => {
  const defaultOptionalUrl: OptionalUrl = {
    enabled: false,
    url: "",
  };

  const [tabToShow, setTabToShow] = useState<1 | 2 | 3>(1);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [btnTitle, setBtnTitle] = useState("");
  const [modalSize, setModalSize] = useState<"compact" | "wide">("wide");
  const [modalTitle, setModalTitle] = useState("");
  const [tosUrl, setTosUrl] = useState<OptionalUrl>(defaultOptionalUrl);
  const [privacyPolicyUrl, setPrivacyPolicyUrl] =
    useState<OptionalUrl>(defaultOptionalUrl);
  const [modalTitleIconUrl, setModalTitleIconUrl] =
    useState<OptionalUrl>(defaultOptionalUrl);
  const [welcomeScreen, setWelcomeScreen] = useState<WelcomeScreen>({});

  const [smartWalletOptions, setSmartWalletOptions] = useState({
    factoryAddress: "0x549BceA1590B6239b967fB46E5487b8177B7cf4D",
    enabled: false,
    gasless: true,
  });
  const { colorMode, toggleColorMode } = useColorMode();
  const selectedTheme = colorMode === "light" ? "light" : "dark";
  const [authEnabled, setAuthEnabled] = useState(false);
  const [switchToActiveChain, setSwitchToActiveChain] = useState(false);
  const [code, setCode] = useState("");
  const [colorOverridesOrignal, setColorOverrides] = useState<
    NonNullable<ThemeOverrides["colors"]>
  >({});

  const colorOverrides = useDeferredValue(colorOverridesOrignal);

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
      baseTheme: selectedTheme,
      colorOverrides,
      imports: enabledWallets.map(
        (walletId) => walletInfoRecord[walletId].import,
      ),
      smartWalletOptions: smartWalletOptions.enabled
        ? {
            factoryAddress: "YOUR_FACTORY_ADDRESS",
            gasless: smartWalletOptions.gasless,
          }
        : undefined,
      thirdwebProvider: {
        supportedWallets:
          enabledWallets.length > 0
            ? `[${enabledWallets
                .map((walletId) =>
                  walletInfoRecord[walletId].code(
                    walletInfoRecord[walletId].component.recommended,
                  ),
                )
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
        modalTitleIconUrl: modalTitleIconUrl.enabled
          ? `"${modalTitleIconUrl.url}"`
          : undefined,
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
    colorOverrides,
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
          bundlerUrl: "https://mumbai.bundler-staging.thirdweb.com",
          paymasterUrl: "https://mumbai.bundler-staging.thirdweb.com",
        })
      : walletConfig;
  });

  const themeObj =
    selectedTheme === "light"
      ? lightTheme({
          colors: colorOverrides,
        })
      : darkTheme({
          colors: colorOverrides,
        });

  const withThirdwebProvider = (content: React.ReactNode) => (
    <ThirdwebProvider
      activeChain="mumbai"
      supportedWallets={
        supportedWallets.length > 0 ? supportedWallets : undefined
      }
      supportedChains={
        isProd
          ? defaultChains
          : defaultChains.map((chain) => {
              return {
                ...chain,
                rpc: chain.rpc.map((rpc) =>
                  rpc.replace("rpc.thirdweb.com", "rpc-staging.thirdweb.com"),
                ),
              };
            })
      }
      clientId={DASHBOARD_THIRDWEB_CLIENT_ID}
      storageInterface={StorageSingleton}
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
          name="Embedded Wallet"
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

  const previewSection = (
    <Box>
      <Text color="faded">Live Preview</Text>
      <Spacer height={2} />
      <Box
        border="1px solid"
        borderColor="borderColor"
        minH="120px"
        borderRadius="md"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box>
          {withThirdwebProvider(
            <ConnectWallet
              modalSize={modalSize}
              modalTitle={modalTitle}
              theme={themeObj}
              btnTitle={btnTitle || undefined}
              modalTitleIconUrl={
                modalTitleIconUrl.enabled ? modalTitleIconUrl.url : undefined
              }
              auth={{ loginOptional: !authEnabled }}
              switchToActiveChain={switchToActiveChain}
              welcomeScreen={welcomeScreen}
              termsOfServiceUrl={tosUrl.enabled ? tosUrl.url : undefined}
              privacyPolicyUrl={
                privacyPolicyUrl.enabled ? privacyPolicyUrl.url : undefined
              }
            />,
          )}
        </Box>
      </Box>

      <Spacer height={10} flexGrow={0} flexShrink={0} />

      {/* Modal UI */}
      <Box>
        <Text color="faded">Modal UI</Text>
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
              theme={themeObj}
              welcomeScreen={welcomeScreen}
              modalTitleIconUrl={
                modalTitleIconUrl.enabled ? modalTitleIconUrl.url : undefined
              }
              termsOfServiceUrl={tosUrl.enabled ? tosUrl.url : undefined}
              privacyPolicyUrl={
                privacyPolicyUrl.enabled ? privacyPolicyUrl.url : undefined
              }
            />
          </ClientOnly>,
        )}
      </Box>
    </Box>
  );

  const tab1 = (
    <Box>
      <Grid templateColumns="1fr 1fr">
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
    </Box>
  );

  const tab2 = (
    <Box>
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
                isChecked={modalTitleIconUrl.enabled}
                onChange={() => {
                  setModalTitleIconUrl({
                    ...modalTitleIconUrl,
                    enabled: !modalTitleIconUrl.enabled,
                  });
                }}
              ></Switch>
              <Text>
                {"custom" in modalTitleIconUrl ? "Custom" : "Default"}
              </Text>
            </Flex>
            <Spacer height={2} />
            {modalTitleIconUrl.enabled && (
              <Input
                placeholder="https://..."
                value={modalTitleIconUrl.url}
                onChange={(e) => {
                  setModalTitleIconUrl({
                    ...modalTitleIconUrl,
                    url: e.target.value,
                  });
                }}
              />
            )}
          </FormItem>
        </Flex>

        <Box borderTop="1px solid" borderColor="borderColor" />

        {/* Welcome Screen */}
        {welcomeScreenContent}

        <Box borderTop="1px solid" borderColor="borderColor" />

        {/* Terms of Service */}
        <Box>
          <Flex justifyContent="space-between" alignItems="center">
            <FormLabel m={0}> Terms of Service </FormLabel>
            <Switch
              isChecked={tosUrl.enabled}
              size="lg"
              onChange={() => {
                setTosUrl({
                  url: tosUrl.url,
                  enabled: !tosUrl.enabled,
                });
              }}
            />
          </Flex>

          {tosUrl.enabled && (
            <>
              <Spacer height={2} />
              <Input
                value={tosUrl.url}
                placeholder="https://.."
                onChange={(e) =>
                  setTosUrl({
                    url: e.target.value,
                    enabled: tosUrl.enabled,
                  })
                }
              />
            </>
          )}
        </Box>

        {/* Privacy Policy */}
        <Box>
          <Flex justifyContent="space-between" alignItems="center">
            <FormLabel m={0}> Privacy Policy </FormLabel>
            <Switch
              isChecked={privacyPolicyUrl.enabled}
              size="lg"
              onChange={() => {
                setPrivacyPolicyUrl({
                  url: privacyPolicyUrl.url,
                  enabled: !privacyPolicyUrl.enabled,
                });
              }}
            />
          </Flex>

          {privacyPolicyUrl.enabled && (
            <>
              <Spacer height={2} />
              <Input
                value={privacyPolicyUrl.url}
                placeholder="https://.."
                onChange={(e) =>
                  setPrivacyPolicyUrl({
                    url: e.target.value,
                    enabled: privacyPolicyUrl.enabled,
                  })
                }
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );

  type ColorMeta = { key: keyof (typeof themeObj)["colors"]; name: string };

  const renderColorList = (sectionName: string, _colorList: ColorMeta[]) => (
    <Box>
      <Heading as="h3" fontSize={16} color="faded">
        {sectionName}
      </Heading>
      <Spacer height={5} />
      <Flex gap={6} flexDir="column">
        {_colorList.map((colorInfo) => {
          return (
            <ColorInput
              key={colorInfo.key}
              value={themeObj.colors[colorInfo.key]}
              name={colorInfo.name}
              onChange={(value) => {
                setColorOverrides((c) => ({ ...c, [colorInfo.key]: value }));
              }}
            />
          );
        })}
      </Flex>
    </Box>
  );

  const tab3 = (
    <Box>
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

      <Spacer height={10} />

      <Flex flexDir="column" gap={10}>
        {renderColorList("Basic", [
          {
            name: "Modal Background",
            key: "modalBg",
          },
          {
            name: "Dropdown Background",
            key: "dropdownBg",
          },
          {
            name: "Border Color",
            key: "borderColor",
          },
          {
            name: "Separator Line",
            key: "separatorLine",
          },
          {
            name: "Danger",
            key: "danger",
          },
          {
            name: "Success",
            key: "success",
          },
        ])}

        {renderColorList("Texts", [
          {
            name: "Primary Text",
            key: "primaryText",
          },
          {
            name: "Secondary Text",
            key: "secondaryText",
          },
          {
            name: "Accent Text",
            key: "accentText",
          },
        ])}

        {renderColorList("Buttons", [
          {
            name: "Accent Button Background",
            key: "accentButtonBg",
          },
          {
            name: "Accent Button Text",
            key: "accentButtonText",
          },
          {
            name: "Primary Button Background",
            key: "primaryButtonBg",
          },
          {
            name: "Primary Button Text",
            key: "primaryButtonText",
          },
          {
            name: "Secondary Button Background",
            key: "secondaryButtonBg",
          },
          {
            name: "Secondary Button Hover Background",
            key: "secondaryButtonHoverBg",
          },
          {
            name: "Secondary Button Text",
            key: "secondaryButtonText",
          },
          {
            name: "Connected Button Background",
            key: "connectedButtonBg",
          },
          {
            name: "Connected Button Hover Background",
            key: "connectedButtonBgHover",
          },
          {
            name: "Wallet Selector Button Hover Background",
            key: "walletSelectorButtonHoverBg",
          },
        ])}

        {renderColorList("Icons", [
          {
            name: "Secondary Icon Color",
            key: "secondaryIconColor",
          },
          {
            name: "Secondary Icon Hover Color",
            key: "secondaryIconHoverColor",
          },
          {
            name: "Secondary Icon Hover Background",
            key: "secondaryIconHoverBg",
          },
        ])}

        {renderColorList("Others", [
          {
            name: "Loading Skeleton Color",
            key: "skeletonBg",
          },
          {
            name: "User Selected Text Color",
            key: "selectedTextColor",
          },
          {
            name: "User Selected Text Background",
            key: "selectedTextBg",
          },
        ])}
      </Flex>
    </Box>
  );

  return (
    <Box>
      <Flex gap={2} alignItems="center">
        <Icon as={BsStars} width={6} height={6} color="faded" />
        <Heading fontSize={20}>Customize</Heading>
      </Flex>

      <Spacer height={6} />
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
          {/* Tabs */}
          <Flex gap={2}>
            <CustomTab
              label="General"
              isActive={tabToShow === 1}
              onClick={() => setTabToShow(1)}
            />
            <CustomTab
              label="Appearance"
              isActive={tabToShow === 2}
              onClick={() => setTabToShow(2)}
            />
            <CustomTab
              label="Theming"
              isActive={tabToShow === 3}
              onClick={() => setTabToShow(3)}
            />
          </Flex>

          <Spacer height={8} />

          {tabToShow === 1 && tab1}
          {tabToShow === 2 && tab2}
          {tabToShow === 3 && tab3}
        </GridItem>

        {/* right */}
        <GridItem>
          <Box position="sticky" top={3}>
            {previewSection}
            <Spacer height={8} />
            <Text color="faded"> Code </Text>
            <Spacer height={2} />
            <CodeBlock
              language="jsx"
              code={code}
              maxH="400px"
              overflowY="auto"
            />
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

function CustomTab(props: {
  label: string;
  onClick: () => void;
  isActive: boolean;
}) {
  return (
    <Button
      fontWeight={600}
      fontSize={14}
      onClick={props.onClick}
      border="2px solid"
      borderRadius="lg"
      borderColor={props.isActive ? "blue.500" : "borderColor"}
      bg="none"
      color={props.isActive ? "heading" : "faded"}
      _hover={{
        bg: "inputBg",
        borderColor: "heading",
      }}
    >
      {props.label}
    </Button>
  );
}

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
