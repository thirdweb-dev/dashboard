import {
  Box,
  Flex,
  GridItem,
  IconButton,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
} from "@chakra-ui/react";
import { SiJavascript } from "@react-icons/all-files/si/SiJavascript";
import { SiReact } from "@react-icons/all-files/si/SiReact";
import { SiUnity } from "@react-icons/all-files/si/SiUnity";
import {
  ConnectWallet,
  ThirdwebProvider,
  coinbaseWallet,
  metamaskWallet,
  walletConnectV1,
} from "@thirdweb-dev/react";
import { AppLayout } from "components/app-layouts/app";
import { ChainIcon } from "components/icons/ChainIcon";
import { PageId } from "page-id";
import React, { useEffect, useMemo, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { Button, Card, CodeBlock, Heading, Link, Text } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const WALLETS = [
  {
    id: "smart",
    name: "Smart Wallet",
    description: "Deploy smart contract wallets for your users",
    iconUrl:
      "ipfs://QmeAJVqn17aDNQhjEU3kcWVZCFBrfta8LzaDGkS8Egdiyk/smart-wallet.svg",
    link: "https://portal.thirdweb.com/wallet/smart-wallet",
    supportedLanguages: ["JavaScript", "React", "React Native"],
  },
  {
    id: "local",
    name: "Local Wallet",
    description: "Generate wallets for new users on the fly",
    iconUrl:
      "ipfs://QmeAJVqn17aDNQhjEU3kcWVZCFBrfta8LzaDGkS8Egdiyk/local-wallet-desktop.svg",
    link: "https://portal.thirdweb.com/wallet/local-wallet",
    supportedLanguages: ["JavaScript", "React", "Unity", "React Native"],
  },
  {
    id: "coinbase",
    name: "Coinbase Wallet",
    description: "Connect with Coinbase Wallet",
    iconUrl:
      "ipfs://QmcJBHopbwfJcLqJpX2xEufSS84aLbF7bHavYhaXUcrLaH/coinbase.svg",
    link: "https://portal.thirdweb.com/wallet/coinbase-wallet",
    supportedLanguages: ["JavaScript", "React", "Unity", "React Native"],
  },
  {
    id: "metamask",
    name: "MetaMask",
    description: "Connect with MetaMask",
    iconUrl:
      "ipfs://QmZZHcw7zcXursywnLDAyY6Hfxzqop5GKgwoq8NB9jjrkN/metamask.svg",
    link: "https://portal.thirdweb.com/wallet/metamask",
    supportedLanguages: ["JavaScript", "React", "Unity", "React Native"],
  },
  {
    id: "paper",
    name: "Paper",
    description: "Connect with email via Paper",
    iconUrl:
      "ipfs://QmNrLXtPoFrh4yjZbXui39zUMozS1oetpgU8dvZhFAxfRa/paper-logo-icon.svg",
    link: "https://portal.thirdweb.com/wallet/paper",
    supportedLanguages: ["JavaScript", "React"],
  },
  {
    id: "ethers",
    name: "Ethers.js",
    description: "Connect any ethers.js compatible wallet",
    iconUrl: "ipfs://QmTWXcv6XnRqwUwEQxWp21oCrXZJ5QomiSTVBjKPQAv92k/ethers.png",
    link: "https://portal.thirdweb.com/wallet",
    supportedLanguages: ["JavaScript", "React"],
  },
  {
    id: "private-key",
    name: "Private Key",
    description: "Connect a wallet directly by private key",
    iconUrl:
      "ipfs://QmNrycnX15y8EwxDPrwSxnwQgTBWRxUgwSirmhAFoGSod7/private-key.png",
    link: "https://portal.thirdweb.com/wallet",
    supportedLanguages: ["JavaScript", "React", "Unity", "React Native"],
  },
  {
    id: "aws-kms",
    name: "AWS KMS",
    description: "Connect with AWS Key Management Service",
    iconUrl:
      "ipfs://QmVuWYpq5CaMfmbB1qMXXgc4dtUUGY31xiG6sxwvNafoZg/aws-kms.png",
    link: "https://portal.thirdweb.com/wallet",
    supportedLanguages: ["JavaScript"],
  },
  {
    id: "aws-secrets-manager",
    name: "AWS Secrets Manager",
    description: "Connect with AWS Secrets Manager",
    iconUrl:
      "ipfs://QmVuWYpq5CaMfmbB1qMXXgc4dtUUGY31xiG6sxwvNafoZg/aws-secrets-manager.png",
    link: "https://portal.thirdweb.com/wallet",
    supportedLanguages: ["JavaScript"],
  },
  {
    id: "wallet-connect",
    name: "WalletConnect",
    description: "Connect with WalletConnect (v1 & v2)",
    iconUrl:
      "ipfs://QmX58KPRaTC9JYZ7KriuBzeoEaV2P9eZcA3qbFnTHZazKw/wallet-connect.svg",
    link: "https://portal.thirdweb.com/wallet/wallet-connect-v1",
    supportedLanguages: ["JavaScript", "React", "Unity", "React Native"],
  },
  {
    id: "safe",
    name: "Safe",
    description: "Connect to multi-sig wallets via Safe",
    iconUrl:
      "ipfs://QmbbyxDDmmLQh8DzzeUR6X6B75bESsNUFmbdvS3ZsQ2pN1/SafeToken.svg",
    link: "https://portal.thirdweb.com/wallet/safe",
    supportedLanguages: ["JavaScript", "React"],
  },
  {
    id: "magic-link",
    name: "Magic Link",
    description: "Connect with email or phone number via Magic",
    iconUrl:
      "ipfs://QmUMBFZGXxBpgDmZzZAHhbcCL5nYvZnVaYLTajsNjLcxMU/1-Icon_Magic_Color.svg",
    link: "https://portal.thirdweb.com/wallet",
    supportedLanguages: ["JavaScript", "React", "Unity"],
  },
] as const;

type WalletLanguage = (typeof WALLETS)[number]["supportedLanguages"][number];

const WALLET_LANGUAGES = WALLETS.reduce<WalletLanguage[]>(
  (acc, wallet) => [...new Set([...acc, ...wallet.supportedLanguages])].sort(),
  [],
);

const langToIconMap: Record<WalletLanguage, JSX.Element> = {
  JavaScript: <SiJavascript />,
  React: <SiReact />,
  Unity: <SiUnity />,
  "React Native": <SiReact />,
};

interface WalletLanguageSelectorProps {
  setSelectedLanguage: (language: WalletLanguage) => void;
  selectedLanuage: WalletLanguage;
}

const WalletLanguageSelector: React.FC<WalletLanguageSelectorProps> = ({
  setSelectedLanguage,
  selectedLanuage,
}) => {
  return (
    <Flex gap={4}>
      {WALLET_LANGUAGES.map((language) => (
        <Button
          key={language}
          size="sm"
          variant="outline"
          _active={{
            bg: "bgBlack",
            color: "bgWhite",
          }}
          leftIcon={langToIconMap[language]}
          isActive={language === selectedLanuage}
          onClick={() => setSelectedLanguage(language)}
        >
          {language}
        </Button>
      ))}
    </Flex>
  );
};

interface SupportedWalletsSelectorProps {
  selectedLanguage: WalletLanguage;
  selectedWallet: (typeof WALLETS)[number] | null;
  setSelectedWallet: (wallet: (typeof WALLETS)[number]) => void;
}

const SupportedWalletsSelector: React.FC<SupportedWalletsSelectorProps> = ({
  selectedLanguage,
  selectedWallet,
  setSelectedWallet,
}) => {
  const sortedWallets = useMemo(() => {
    // sort by language being supported or not
    const supportedWallets = WALLETS.filter((wallet) =>
      wallet.supportedLanguages.includes(selectedLanguage as any),
    );
    const unsupportedWallets = WALLETS.filter(
      (wallet) => !wallet.supportedLanguages.includes(selectedLanguage as any),
    );
    return [
      ...supportedWallets,
      ...unsupportedWallets.map((w) => ({ ...w, _isUnsupported: true })),
    ];
  }, [selectedLanguage]);

  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
      {sortedWallets.map((wallet) => {
        const isWalletSupported = !("_isUnsupported" in wallet);
        return (
          <Card
            key={wallet.id}
            onClick={
              isWalletSupported ? () => setSelectedWallet(wallet) : undefined
            }
            as={Flex}
            flexDir="column"
            gap={3}
            p={6}
            _hover={isWalletSupported ? { borderColor: "blue.500" } : {}}
            position="relative"
            cursor={isWalletSupported ? "pointer" : "not-allowed"}
            borderColor={
              wallet.id === selectedWallet?.id ? "blue.500" : "borderColor"
            }
            overflow="hidden"
          >
            <Box opacity={isWalletSupported ? 1 : 0.3}>
              <Flex justifyContent="space-between">
                <Flex alignItems="center" gap={3}>
                  <ChainIcon size={25} ipfsSrc={wallet.iconUrl} sizes={[]} />

                  <Heading size="subtitle.sm" as="h3" noOfLines={1}>
                    {wallet.name}
                  </Heading>
                </Flex>
              </Flex>
              <Flex>
                <Flex flexDir="column" gap={1} w="full">
                  <Text opacity={0.6}>{wallet.description}</Text>
                </Flex>
              </Flex>
            </Box>
            {!isWalletSupported && (
              <SimpleGrid
                placeItems="center"
                position="absolute"
                top={0}
                bottom={0}
                right={0}
                left={0}
                backdropFilter="blur(3px)"
                zIndex={1}
              >
                <Heading as="p" size="label.sm">
                  Not yet supported in {selectedLanguage}
                </Heading>
              </SimpleGrid>
            )}
          </Card>
        );
      })}
    </SimpleGrid>
  );
};

const DashboardWallets: ThirdwebNextPage = () => {
  const [selectedLanguage, setSelectedLanguage] =
    useState<WalletLanguage>("JavaScript");

  const [selectedWallet, setSelectedWallet] = useState<
    (typeof WALLETS)[number] | null
  >(null);

  const onLanguageSelect = (language: WalletLanguage) => {
    if (
      selectedWallet &&
      !selectedWallet.supportedLanguages.includes(language as any)
    ) {
      setSelectedWallet(null);
    }
    setSelectedLanguage(language);
  };

  return (
    <Flex flexDir="column" gap={12} mt={{ base: 2, md: 6 }}>
      <Flex direction="column" gap={2}>
        <Flex
          justifyContent="space-between"
          direction={{ base: "column", md: "row" }}
          gap={4}
        >
          <Heading size="title.lg" as="h1">
            Wallet SDK
          </Heading>
        </Flex>
        <Text>
          Simplified wallet connection to your app, game or backend using a{" "}
          <Link
            href="https://portal.thirdweb.com/wallet"
            color="blue.400"
            isExternal
          >
            universal wallet interface
          </Link>
          .
        </Text>
      </Flex>

      <Flex direction={"column"} gap={4}>
        <Heading size="subtitle.sm" as="h3">
          Step 1: Pick a language to get started
        </Heading>
        <WalletLanguageSelector
          selectedLanuage={selectedLanguage}
          setSelectedLanguage={onLanguageSelect}
        />
      </Flex>

      <Flex direction={"column"} gap={4}>
        <Heading size="subtitle.sm" as="h3">
          Step 2: Pick a supported wallet
        </Heading>
        <SupportedWalletsSelector
          selectedLanguage={selectedLanguage}
          selectedWallet={selectedWallet}
          setSelectedWallet={setSelectedWallet}
        />
      </Flex>

      {/* <Flex direction={"column"} gap={2}>
        <Heading size="title.sm" as="h3">
          Connect Wallet button
        </Heading>
        <Text>
          One line of code to add a{" "}
          <Link
            href="https://portal.thirdweb.com/react/react.connectwallet"
            color="blue.400"
            isExternal
          >
            Connect Wallet UI component
          </Link>{" "}
          to React, React Native and Unity apps.
        </Text>
        <ConnectWalletWithPreview />
      </Flex>

      <Flex direction={"column"} gap={4}>
        <Flex direction={"column"} gap={2}>
          <Heading size="title.sm" as="h3">
            Supported Wallets
          </Heading>
          <Text>
            Access the largest catalog of wallets, from custodial to MPC to
            smart contracts.{" "}
          </Text>
        </Flex>

      </Flex> */}
    </Flex>
  );
};

DashboardWallets.getLayout = (page, props) => (
  <AppLayout {...props}>{page}</AppLayout>
);

DashboardWallets.pageId = PageId.DashboardWallets;

export default DashboardWallets;

const ConnectWalletWithPreview: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState<"light" | "dark">("light");
  return (
    <SimpleGrid columns={{ base: 6, md: 12 }} gap={8} mt={8}>
      <GridItem colSpan={7}>
        <Flex direction="column" gap={2}>
          <Heading size="label.md">Code</Heading>
          <CodeBlock
            language="jsx"
            code={`import { ThirdwebProvider, ConnectWallet } from "@thirdweb/react";

export default function App() {
return (
    <ThirdwebProvider>
      <ConnectWallet theme="${selectedTheme}" />
    </ThirdwebProvider>
  );
}`}
          />
        </Flex>
      </GridItem>
      <GridItem colSpan={5} gap={2}>
        <Flex gap={2} direction="column" align="flex-start" h="full">
          <Heading size="label.md">Preview</Heading>
          <Box w="full" my="auto" display="grid" placeItems="center">
            <ThirdwebProvider
              supportedWallets={[
                metamaskWallet(),
                coinbaseWallet(),
                walletConnectV1(),
              ]}
            >
              <ConnectWallet
                theme={selectedTheme}
                // overrides
                auth={{ loginOptional: true }}
              />
            </ThirdwebProvider>
          </Box>
          <Flex>
            <IconButton
              size="sm"
              onClick={() => {
                setSelectedTheme(selectedTheme === "light" ? "dark" : "light");
              }}
              icon={selectedTheme === "light" ? <FiSun /> : <FiMoon />}
              aria-label="Toggle button theme"
              variant="ghost"
            />
          </Flex>
        </Flex>
      </GridItem>
    </SimpleGrid>
  );
};
