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

import { SiReact } from "@react-icons/all-files/si/SiReact";
import { SiUnity } from "@react-icons/all-files/si/SiUnity";
import { SiTypescript } from "@react-icons/all-files/si/SiTypescript";
import { AiOutlineArrowRight } from "react-icons/ai";

const DashboardWalletsConnect: ThirdwebNextPage = () => {
  return (
    <Box>
      <Grid
        templateColumns={["1fr", "1fr 1.1fr"]}
        gap={10}
        alignItems={"center"}
      >
        {/* left */}
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
            <LanguageBadge
              size="sm"
              title="React"
              icon={SiReact}
              href="https://portal.thirdweb.com/react/react.connectwallet"
            />
            <LanguageBadge
              size="sm"
              title="React Native"
              icon={SiReact}
              href="https://portal.thirdweb.com/react-native/react-native.connectwallet"
            />
            <LanguageBadge
              size="sm"
              title="Unity"
              icon={SiUnity}
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
        <LanguageBadge
          size="md"
          noBorder
          title="React"
          icon={SiReact}
          href="https://portal.thirdweb.com/react/react.connectwallet"
        />

        <LanguageBadge
          noBorder
          size="md"
          title="Unity"
          icon={SiUnity}
          href="https://portal.thirdweb.com/unity/connectwallet"
        />
        <LanguageBadge
          noBorder
          size="md"
          title="React Native"
          icon={SiReact}
          href="https://portal.thirdweb.com/react-native/react-native.connectwallet"
        />
        <LanguageBadge
          noBorder
          size="md"
          title="TypeScript"
          icon={SiTypescript}
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

function LanguageBadge(props: {
  icon: IconType;
  title: string;
  href: string;
  noBorder?: boolean;
  size: "sm" | "md";
}) {
  return (
    <Link
      href={props.href}
      isExternal
      _hover={{
        textDecor: "none",
        color: "blue.500",
      }}
      role="group"
    >
      <Flex
        gap={props.size === "sm" ? 2 : 3}
        alignItems="center"
        border={props.noBorder ? undefined : "1px solid"}
        borderColor="borderColor"
        px={props.noBorder ? 0 : 2}
        py={1}
        borderRadius="md"
        _groupHover={{
          borderColor: "blue.500",
        }}
        transition="border-color 200ms ease"
      >
        <Icon
          as={props.icon}
          w={props.size === "sm" ? 4 : 5}
          h={props.size === "sm" ? 4 : 5}
          color="faded"
          _groupHover={{
            color: "blue.500",
          }}
          transition="color 200ms ease"
        />
        <Text
          fontWeight={500}
          color="heading"
          _groupHover={{
            color: "blue.500",
          }}
          fontSize={props.size === "sm" ? 12 : 14}
          transition="color 200ms ease"
        >
          {props.title}
        </Text>
      </Flex>
    </Link>
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
