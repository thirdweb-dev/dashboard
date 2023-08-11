import {
  Box,
  Flex,
  FormControl,
  GridItem,
  Input,
  Select,
  SimpleGrid,
  Image,
} from "@chakra-ui/react";
import {
  ConnectWallet,
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  safeWallet,
  WalletConfig,
  smartWallet,
  localWallet,
  paperWallet,
  trustWallet,
  zerionWallet,
  magicLink,
  bloctoWallet,
  frameWallet,
  rainbowWallet,
} from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";
import { CodeBlock, FormLabel, Heading, Link } from "tw-components";
import { replaceIpfsUrl } from "lib/sdk";
import { AiOutlineInfoCircle } from "react-icons/ai";
import {
  DASHBOARD_THIRDWEB_CLIENT_ID,
  DASHBOARD_THIRDWEB_SECRET_KEY,
} from "constants/rpc";
import { THIRDWEB_DOMAIN, THIRDWEB_API_HOST } from "constants/urls";
import { format } from "prettier/standalone";
import parserBabel from "prettier/plugins/babel";
import estree from "prettier/plugins/estree";

type Theme = "light" | "dark" | "default";
type EnabledOrDisabled = "enabled" | "disabled";
type DefaultOrCustom = "default" | "custom";
type WalletId =
  | "MetaMask"
  | "Coinbase"
  | "WalletConnect"
  | "Safe"
  | "Smart Wallet"
  | "Local Wallet ( Continue as Guest )"
  | "Paper Wallet ( Email Wallet )"
  | "Trust Wallet"
  | "Zerion Wallet"
  | "Magic Link"
  | "Blocto Wallet"
  | "Frame Wallet"
  | "Rainbow Wallet";
type WalletInfo = Record<
  WalletId,
  {
    code: string;
    component: WalletConfig<any>;
    link: string;
    import: string;
  }
>;

type WalletSetupOptions = {
  imports: string[];
  thirdwebProvider: {
    supportedWallets?: string;
    authConfig?: string;
  };
  connectWallet: {
    theme?: string;
    btnTitle?: string;
    auth?: string;
    modalTitle?: string;
    dropdownPosition?: string;
  };
};

const wallets: WalletInfo = {
  MetaMask: {
    code: "metamaskWallet()",
    component: metamaskWallet(),
    link: "https://portal.thirdweb.com/react/react.metamaskwallet",
    import: "metamaskWallet",
  },
  Coinbase: {
    code: "coinbaseWallet()",
    component: coinbaseWallet(),
    link: "https://portal.thirdweb.com/react/react.coinbasewallet",
    import: "coinbaseWallet",
  },
  WalletConnect: {
    code: "walletConnect()",
    component: walletConnect(),
    link: "https://portal.thirdweb.com/react/react.walletconnect",
    import: "walletConnect",
  },
  Safe: {
    code: `safeWallet({ personalWallets: [ metamaskWallet(), coinbaseWallet(), walletConnect() ] })`,
    component: safeWallet({
      personalWallets: [metamaskWallet(), coinbaseWallet(), walletConnect()],
    }),
    link: "https://portal.thirdweb.com/react/react.safewallet",
    import: "safeWallet",
  },
  "Smart Wallet": {
    code: `smartWallet({ factoryAddress: "<FACTORY_ADDRESS>", gasless: true, personalWallets: [ metamaskWallet(), coinbaseWallet(), walletConnect() ] })`,
    component: smartWallet({
      factoryAddress: "FACTORY_ADDRESS",
      gasless: true,
    }),
    link: "https://portal.thirdweb.com/react/react.smartwallet",
    import: "smartWallet",
  },
  "Local Wallet ( Continue as Guest )": {
    code: `localWallet()`,
    component: localWallet(),
    link: "https://portal.thirdweb.com/react/react.localwallet",
    import: "localWallet",
  },
  "Paper Wallet ( Email Wallet )": {
    code: `paperWallet({ paperClientId: "<YOUR_PAPER_CLIENT_ID>" })`,
    component: paperWallet({
      paperClientId: "9a2f6238-c441-4bf4-895f-d13c2faf2ddb",
    }),
    link: "https://portal.thirdweb.com/react/react.paperwallet",
    import: "paperWallet",
  },
  "Magic Link": {
    code: `magicLink({ apiKey: "YOUR_MAGIC_API_KEY", oauthOptions: { providers: ["google", "facebook", "twitter", "apple"] }})`,
    component: magicLink({
      apiKey: "pk_live_3EFC32B01A29985C",
      oauthOptions: {
        providers: ["google", "facebook", "twitter", "apple"],
      },
    }),
    link: "https://portal.thirdweb.com/react/react.magiclink",
    import: "magicLink",
  },
  "Rainbow Wallet": {
    code: `rainbowWallet()`,
    component: rainbowWallet(),
    link: "https://portal.thirdweb.com/react/react.rainbowWallet",
    import: "rainbowWallet",
  },
  "Trust Wallet": {
    code: `trustWallet()`,
    component: trustWallet(),
    link: "https://portal.thirdweb.com/react/react.trustWallet",
    import: "trustWallet",
  },
  "Zerion Wallet": {
    code: "zerionWallet()",
    component: zerionWallet(),
    link: "https://portal.thirdweb.com/react/react.zerion",
    import: "zerionWallet",
  },
  "Blocto Wallet": {
    code: "bloctoWallet()",
    component: bloctoWallet(),
    link: "https://portal.thirdweb.com/react/react.blocto",
    import: "bloctoWallet",
  },
  "Frame Wallet": {
    code: "frameWallet()",
    component: frameWallet(),
    link: "https://portal.thirdweb.com/react/react.frame",
    import: "frameWallet",
  },
};

export const ConnectWalletWithPreview: React.FC = () => {
  const [btnTitle, setBtnTitle] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [dropdownPosition, setdropdownPosition] =
    useState<DefaultOrCustom>("default");
  const [selectedTheme, setSelectedTheme] = useState<Theme>("default");
  const [authEnabled, setAuthEnabled] = useState<EnabledOrDisabled>("disabled");
  const [walletSelection, setWalletSelection] = useState<
    Record<WalletId, boolean>
  >({
    MetaMask: true,
    Coinbase: true,
    WalletConnect: true,
    Safe: false,
    "Smart Wallet": false,
    "Local Wallet ( Continue as Guest )": true,
    "Paper Wallet ( Email Wallet )": true,
    "Trust Wallet": false,
    "Zerion Wallet": false,
    "Blocto Wallet": false,
    "Magic Link": false,
    "Frame Wallet": false,
    "Rainbow Wallet": false,
  });
  const [code, setCode] = useState("");

  const enabledWallets = Object.entries(walletSelection)
    .filter((x) => x[1])
    .map((x) => x[0] as WalletId);

  useEffect(() => {
    const _code = getWalletSetupCode({
      imports: enabledWallets.map((walletId) => wallets[walletId].import),
      thirdwebProvider: {
        supportedWallets:
          enabledWallets.length > 0
            ? `[${enabledWallets
                .map((walletId) => wallets[walletId].code)
                .join(",")}]`
            : undefined,
        authConfig:
          authEnabled === "enabled"
            ? `{ authUrl: "/api/auth", domain: "https://example.com" }`
            : undefined,
      },
      connectWallet: {
        theme: selectedTheme === "default" ? undefined : `"${selectedTheme}"`,
        btnTitle: btnTitle ? `"${btnTitle}"` : undefined,
        modalTitle: modalTitle ? `"${modalTitle}"` : undefined,
        auth:
          authEnabled === "enabled" ? "{ loginOptional: false }" : undefined,
        dropdownPosition:
          dropdownPosition === "custom"
            ? `{ align: "center", side: "bottom" }`
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
    dropdownPosition,
    enabledWallets,
    modalTitle,
    selectedTheme,
  ]);

  const supportedWallets = enabledWallets.map(
    (walletId) => wallets[walletId].component,
  );

  const previewCode = (
    <ThirdwebProvider
      clientId={DASHBOARD_THIRDWEB_CLIENT_ID}
      secretKey={DASHBOARD_THIRDWEB_SECRET_KEY}
      supportedWallets={
        supportedWallets.length > 0 ? supportedWallets : undefined
      }
      authConfig={
        authEnabled === "enabled"
          ? {
              domain: THIRDWEB_DOMAIN,
              authUrl: `${THIRDWEB_API_HOST}/v1/auth`,
            }
          : undefined
      }
    >
      <ConnectWallet
        modalTitle={modalTitle}
        dropdownPosition={
          dropdownPosition === "custom"
            ? {
                align: "center",
                side: "bottom",
              }
            : undefined
        }
        theme={selectedTheme === "default" ? undefined : selectedTheme}
        btnTitle={btnTitle || undefined}
        // overrides
        auth={{ loginOptional: authEnabled === "disabled" }}
      />
    </ThirdwebProvider>
  );

  return (
    <SimpleGrid columns={{ base: 6, md: 12 }} gap={8} mt={8}>
      {/* left */}
      <GridItem colSpan={6}>
        <Flex direction="column" gap={5}>
          <Box mb={4}>
            {/* supportedWallets */}
            <FormItem
              label="Wallets"
              link="https://portal.thirdweb.com/react/react.thirdwebprovider#supportedwallets-optional"
            >
              <Flex flexWrap={"wrap"} gap={3}>
                {Object.keys(wallets).map((key) => {
                  const walletId = key as WalletId;
                  const walletInfo = wallets[walletId];
                  const isChecked = walletSelection[walletId];

                  return (
                    <Flex
                      key={walletId}
                      borderRadius="lg"
                      gap={3}
                      bg={isChecked ? "heading" : "none"}
                      color={isChecked ? "backgroundBody" : "none"}
                      _hover={
                        !isChecked
                          ? {
                              bg: "inputBg",
                              borderColor: "heading",
                            }
                          : undefined
                      }
                      border={"2px solid"}
                      borderColor={
                        isChecked ? "backgroundBody" : "inputBgHover"
                      }
                      px={3}
                      py={2}
                      alignItems="center"
                      onClick={() => {
                        setWalletSelection({
                          ...walletSelection,
                          [walletId]: !walletSelection[walletId],
                        });
                      }}
                      userSelect={"none"}
                    >
                      <Image
                        width={7}
                        height={7}
                        alt={walletInfo.component.meta.name}
                        src={replaceIpfsUrl(walletInfo.component.meta.iconURL)}
                      />{" "}
                      {walletId}
                      <Link href={walletInfo.link} isExternal>
                        <AiOutlineInfoCircle color="gray.700" />
                      </Link>
                    </Flex>
                  );
                })}
              </Flex>
            </FormItem>
          </Box>

          {/* theme */}
          <FormItem
            label="Theme"
            link="https://portal.thirdweb.com/react/react.connectwallet#theme-optional"
          >
            <Select
              variant="filled"
              value={selectedTheme}
              onChange={(event) => {
                setSelectedTheme(event.target.value as Theme);
              }}
            >
              <option value="default">default (dark)</option>
              <option value="dark">dark</option>
              <option value="light">light</option>
            </Select>
          </FormItem>

          {/* Button Title */}
          <FormItem
            label="Button Title"
            link="https://portal.thirdweb.com/react/react.connectwallet#btntitle-optional"
          >
            <Input
              placeholder="Connect Wallet"
              value={btnTitle}
              onChange={(e) => {
                setBtnTitle(e.target.value);
              }}
            />
          </FormItem>

          {/* Modal Title */}
          <FormItem
            label="Modal Title"
            link="https://portal.thirdweb.com/react/react.connectwallet#modaltitle-optional"
          >
            <Input
              placeholder="Choose your wallet"
              value={modalTitle}
              onChange={(e) => {
                setModalTitle(e.target.value);
              }}
            />
          </FormItem>

          {/* auth */}
          <FormItem
            label="Auth"
            link="https://portal.thirdweb.com/react/react.connectwallet#auth-optional"
          >
            <Select
              variant="filled"
              value={authEnabled}
              onChange={(event) => {
                setAuthEnabled(event.target.value as EnabledOrDisabled);
              }}
            >
              <option value="disabled">disabled</option>
              <option value="enabled">enabled</option>
            </Select>
          </FormItem>

          {/* dropdownPosition */}
          <FormItem
            label="dropdownPosition"
            link="https://portal.thirdweb.com/react/react.connectwallet#dropdownposition-optional"
          >
            <Select
              variant="filled"
              value={dropdownPosition}
              onChange={(event) => {
                setdropdownPosition(event.target.value as DefaultOrCustom);
              }}
            >
              <option value="default">default</option>
              <option value="custom">custom</option>
            </Select>
          </FormItem>
        </Flex>
      </GridItem>

      {/* right */}
      <GridItem colSpan={6} gap={4}>
        {/* preview */}
        <Flex gap={6} direction="column" align="flex-start">
          <Flex direction="column" gap={2} w={"full"}>
            <Heading size="label.md">Preview</Heading>
            <Box
              borderRadius="md"
              w="full"
              my="auto"
              display="grid"
              placeItems="center"
              h="100px"
              bg={selectedTheme === "light" ? "gray.300" : "black"}
              border="1px solid"
              borderColor={"backgroundHighlight"}
            >
              {previewCode}
            </Box>
          </Flex>

          <Flex direction="column" gap={2} w={"full"}>
            <Heading size="label.md">Code</Heading>
            <CodeBlock language="jsx" code={code} />
          </Flex>
        </Flex>
      </GridItem>
    </SimpleGrid>
  );
};

const FormItem: React.FC<{
  label: string;
  link: string;
  children: React.ReactNode;
}> = (props) => {
  return (
    <FormControl>
      <Flex gap={2} mb={2} alignItems="center">
        <FormLabel m={0}>{props.label}</FormLabel>
        <Link href={props.link} isExternal>
          <AiOutlineInfoCircle color="gray.700" />
        </Link>
      </Flex>

      {props.children}
    </FormControl>
  );
};

function getWalletSetupCode(options: WalletSetupOptions) {
  return `\
import {
  ThirdwebProvider,
  ConnectWallet
  ${options.imports.length > 0 ? `, ${options.imports.join(",")}` : ""}
} from "@thirdweb-dev/react";

export default function App() {
  return (
    <ThirdwebProvider ${renderProps(options.thirdwebProvider)} >
      <ConnectWallet ${renderProps(options.connectWallet)}  />
    </ThirdwebProvider>
  );
}`;
}

function renderProps(obj: Record<string, string | undefined>) {
  return Object.entries(obj)
    .filter((x) => x[1] !== undefined)
    .map(([key, value]) => {
      return `${key}={${value}}`;
    })
    .join(" ");
}
