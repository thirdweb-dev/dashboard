import { Box, Flex, Grid, Icon, Spacer } from "@chakra-ui/react";
import { AppLayout } from "components/app-layouts/app";
import { ConnectWalletPlayground } from "components/wallets/ConnectWalletPlayground/Playground";
import { WalletsSidebar } from "core-ui/sidebar/wallets";
import { PageId } from "page-id";
import { ThirdwebNextPage } from "utils/types";
import { Card, Heading, Link, Text } from "tw-components";

import { IconType } from "react-icons/lib";
import { BiCrop, BiSolidCustomize } from "react-icons/bi";
import { FiGlobe } from "react-icons/fi";
import { PiWrench } from "react-icons/pi";
import { BsTextParagraph } from "react-icons/bs";
import { HiOutlineTerminal } from "react-icons/hi";

import { AiOutlineArrowRight } from "react-icons/ai";
import { SupportedPlatformLink } from "components/wallets/SupportedPlatformLink";

const DashboardWalletsConnect: ThirdwebNextPage = () => {
  return (
    <Box>
      <Grid
        templateColumns={["1fr", "1fr 1.1fr"]}
        gap={10}
        alignItems={"center"}
      >
        {/* left   */}
        <Box>
          <Heading size="title.xl" as="h1">
            Connect
          </Heading>
          <Spacer height={4} />
          <Text fontWeight={500}>
            A complete toolkit for connecting wallets to applications, UI
            components that work out of the box and Hooks that let you build
            custom wallet connection UI
          </Text>

          <Spacer height={5} />
          <Flex alignItems="center" gap={2}>
            <Text mr={2} display={["none", "block"]} fontSize={12}>
              Supports
            </Text>
            <SupportedPlatformLink
              size="sm"
              platform="React"
              href="https://portal.thirdweb.com/react/react.connectwallet"
            />
            <SupportedPlatformLink
              size="sm"
              platform="React Native"
              href="https://portal.thirdweb.com/react-native/react-native.connectwallet"
            />
            <SupportedPlatformLink
              size="sm"
              platform="Unity"
              href="https://portal.thirdweb.com/unity/connectwallet"
            />
          </Flex>
        </Box>

        {/* right */}
        <Box>
          <Grid templateColumns={["1fr", "1fr 1fr"]} gap={4}>
            <Flex gap={3} flexDir="column">
              <Feature title="Fully Customizable" icon={BiSolidCustomize} />
              <Feature title="Cross-Platform Support" icon={BiCrop} />
              <Feature title="Support any EVM Network" icon={FiGlobe} />
            </Flex>

            <Flex gap={3} flexDir="column">
              <Feature title="Authenticate users (SIWE)" icon={PiWrench} />
              <Feature title="Enable seamless UX" icon={BsTextParagraph} />
              <Feature
                title="Integrate Account Abstraction"
                icon={HiOutlineTerminal}
              />
            </Flex>
          </Grid>
        </Box>
      </Grid>

      <Spacer height={12} />

      <ConnectWalletPlayground />

      <Spacer height={20} />

      <FooterSection />
    </Box>
  );
};

function FooterSection() {
  return (
    <Grid templateColumns={["1fr", "1fr 1fr"]} gap={5}>
      <Grid templateColumns="1fr" gap={5}>
        <ViewDocs />
        <ShareYourFeedback />
      </Grid>
      <RelevantGuides />
    </Grid>
  );
}

function ViewDocs() {
  return (
    <Card p={5}>
      <Flex gap={2} alignItems="center">
        <Heading fontSize={16} as="h3">
          View Docs
        </Heading>
        <Icon as={AiOutlineArrowRight} width={5} height={5} />
      </Flex>

      <Spacer height={6} />

      <Grid templateColumns={"1fr 1fr"} gap={3} maxW="400px">
        <SupportedPlatformLink
          size="md"
          noBorder
          platform="React"
          href="https://portal.thirdweb.com/react/react.connectwallet"
        />

        <SupportedPlatformLink
          noBorder
          size="md"
          platform="Unity"
          href="https://portal.thirdweb.com/unity/connectwallet"
        />
        <SupportedPlatformLink
          noBorder
          size="md"
          platform="React Native"
          href="https://portal.thirdweb.com/react-native/react-native.connectwallet"
        />
        <SupportedPlatformLink
          noBorder
          size="md"
          platform="TypeScript"
          href="https://portal.thirdweb.com/wallet/usage-with-typescript-sdk"
        />
      </Grid>
    </Card>
  );
}

function RelevantGuides() {
  return (
    <Card p={5}>
      <Flex gap={2} alignItems="center">
        <Heading fontSize={16} as="h3">
          Relevant Guides
        </Heading>
        <Icon as={AiOutlineArrowRight} width={5} height={5} />
      </Flex>
      <Spacer height={6} />
      TODO
      {/*
      <Link
        href="TODO"
        color="paragraph"
        isExternal
        _hover={{
          color: "blue.500",
        }}
      >
        Customizing your connect wallet button
      </Link> */}
    </Card>
  );
}

function ShareYourFeedback() {
  return (
    <Link
      href="https://docs.google.com/forms/d/e/1FAIpQLSdL6H8rscuWpKkwlRvwxsCN0u4sSSL4qh6KiBFmZwn19PGGIw/viewform"
      isExternal
      _hover={{
        textDecor: "none",
        color: "blue.500",
      }}
    >
      <Card
        p={5}
        _hover={{
          borderColor: "blue.500",
        }}
      >
        <Flex gap={2} alignItems="center">
          <Heading fontSize={16} as="h3" color="inherit">
            Share your feedback
          </Heading>
          <Icon as={AiOutlineArrowRight} width={5} height={5} />
        </Flex>
        <Spacer height={3} />
        <Text color="paragraph">
          Report bugs, echo your thoughts and suggest improvements.
        </Text>
      </Card>
    </Link>
  );
}

function Feature({ title, icon }: { title: string; icon: IconType }) {
  return (
    <Flex gap={3} alignItems="center">
      <Flex
        p={2}
        border="1px solid"
        borderColor="borderColor"
        justifyContent="center"
        alignItems="center"
        borderRadius="md"
      >
        <Icon as={icon} w={5} h={5} color="faded" />
      </Flex>
      <Text fontWeight={500} color="heading">
        {title}
      </Text>
    </Flex>
  );
}
DashboardWalletsConnect.getLayout = (page, props) => (
  <AppLayout {...props} hasSidebar={true} noOverflowX={true}>
    <WalletsSidebar activePage="connect" />
    {page}
  </AppLayout>
);

DashboardWalletsConnect.pageId = PageId.DashboardWalletsConnect;

export default DashboardWalletsConnect;
