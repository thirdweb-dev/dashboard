import { Flex, LinkBox, LinkOverlay, SimpleGrid } from "@chakra-ui/react";
import { AppLayout } from "components/app-layouts/app";
import { ChainIcon } from "components/icons/ChainIcon";
import { PageId } from "page-id";
import React from "react";
import { Card, Heading, Text } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const WALLETS = [
  {
    name: "Smart Wallet",
    description: "Deploy account abstraction wallets for users",
    iconUrl:
      "ipfs://QmeAJVqn17aDNQhjEU3kcWVZCFBrfta8LzaDGkS8Egdiyk/smart-wallet.svg",
    link: "https://portal.thirdweb.com/wallet/smart-wallet",
  },
  {
    name: "Local Wallet",
    description: "Generate wallets for new users on the fly",
    iconUrl:
      "ipfs://QmeAJVqn17aDNQhjEU3kcWVZCFBrfta8LzaDGkS8Egdiyk/local-wallet-desktop.svg",
    link: "https://portal.thirdweb.com/wallet/local-wallet",
  },
  {
    name: "Gnosis Safe",
    description: "Connect to multi-sig wallets via Gnosis Safe",
    iconUrl:
      "ipfs://QmbbyxDDmmLQh8DzzeUR6X6B75bESsNUFmbdvS3ZsQ2pN1/SafeToken.svg",
    link: "https://portal.thirdweb.com/wallet/safe",
  },
  {
    name: "Magic Link",
    description: "Connect with email or phone number via Magic",
    iconUrl:
      "ipfs://QmUMBFZGXxBpgDmZzZAHhbcCL5nYvZnVaYLTajsNjLcxMU/1-Icon_Magic_Color.svg",
    link: "https://portal.thirdweb.com/wallets",
  },
  {
    name: "Paper",
    description: "Connect with email via Paper",
    iconUrl:
      "ipfs://QmNrLXtPoFrh4yjZbXui39zUMozS1oetpgU8dvZhFAxfRa/paper-logo-icon.svg",
    link: "https://portal.thirdweb.com/wallet/paper",
  },
  {
    name: "MetaMask",
    description: "Connect with MetaMask",
    iconUrl:
      "ipfs://QmZZHcw7zcXursywnLDAyY6Hfxzqop5GKgwoq8NB9jjrkN/metamask.svg",
    link: "https://portal.thirdweb.com/wallet/metamask",
  },
  {
    name: "Coinbase Wallet",
    description: "Connect with Coinbase Wallet",
    iconUrl:
      "ipfs://QmcJBHopbwfJcLqJpX2xEufSS84aLbF7bHavYhaXUcrLaH/coinbase.svg",
    link: "https://portal.thirdweb.com/wallet/coinbase-wallet",
  },
  {
    name: "WalletConnect",
    description: "Connect with WalletConnect",
    iconUrl:
      "ipfs://QmX58KPRaTC9JYZ7KriuBzeoEaV2P9eZcA3qbFnTHZazKw/wallet-connect.svg",
    link: "https://portal.thirdweb.com/wallet/wallet-connect-v1",
  },
  {
    name: "AWS KMS",
    description: "Connect with AWS Key Management Service",
    iconUrl:
      "ipfs://QmVuWYpq5CaMfmbB1qMXXgc4dtUUGY31xiG6sxwvNafoZg/aws-kms.png",
    link: "https://portal.thirdweb.com/wallet",
  },
  {
    name: "AWS Secrets Manager",
    description: "Connect with AWS Secrets Manager",
    iconUrl:
      "ipfs://QmVuWYpq5CaMfmbB1qMXXgc4dtUUGY31xiG6sxwvNafoZg/aws-secrets-manager.png",
    link: "https://portal.thirdweb.com/wallet",
  },
  {
    name: "Ethers.js",
    description: "Connect any ethers.js compatible wallet",
    iconUrl: "ipfs://QmTWXcv6XnRqwUwEQxWp21oCrXZJ5QomiSTVBjKPQAv92k/ethers.png",
    link: "https://portal.thirdweb.com/wallet",
  },
  {
    name: "Private Key",
    description: "Connect a wallet directly by private key",
    iconUrl:
      "ipfs://QmNrycnX15y8EwxDPrwSxnwQgTBWRxUgwSirmhAFoGSod7/private-key.png",
    link: "https://portal.thirdweb.com/wallet",
  },
];

const DashboardWallets: ThirdwebNextPage = () => {
  return (
    <Flex flexDir="column" gap={8} mt={{ base: 2, md: 6 }}>
      <Flex direction="column" gap={2}>
        <Flex
          justifyContent="space-between"
          direction={{ base: "column", md: "row" }}
          gap={4}
        >
          <Heading size="title.lg" as="h1">
            Wallets
          </Heading>
        </Flex>
        <Text>
          thirdweb&apos;s wallet SDK lets your users connect to your
          applications with any wallet.
        </Text>
      </Flex>

      <Heading size="title.sm" as="h3">
        Supported Wallets
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
        {WALLETS.map((wallet) => (
          <LinkBox key={wallet.name} position="relative" role="group">
            <LinkOverlay href={wallet.link} isExternal>
              <Card
                as={Flex}
                flexDir="column"
                gap={3}
                p={6}
                _groupHover={{ borderColor: "blue.500" }}
                position="relative"
              >
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
              </Card>
            </LinkOverlay>
          </LinkBox>
        ))}
      </SimpleGrid>
    </Flex>
  );
};

DashboardWallets.getLayout = (page, props) => (
  <AppLayout {...props}>{page}</AppLayout>
);

DashboardWallets.pageId = PageId.DashboardWallets;

export default DashboardWallets;
