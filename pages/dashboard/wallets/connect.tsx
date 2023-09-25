import { Box, Flex, Grid, Icon, Spacer } from "@chakra-ui/react";
import { AppLayout } from "components/app-layouts/app";
import { ConnectWalletPlayground } from "components/wallets/ConnectWalletPlayground/Playground";
import { WalletsSidebar } from "core-ui/sidebar/wallets";
import { PageId } from "page-id";
import { ThirdwebNextPage } from "utils/types";
import { Heading, Link, Text } from "tw-components";

import { IconType } from "react-icons/lib";
import { BiCrop, BiSolidCustomize } from "react-icons/bi";
import { FiGlobe } from "react-icons/fi";
import { PiWrench } from "react-icons/pi";
import { BsTextParagraph } from "react-icons/bs";
import { HiOutlineTerminal } from "react-icons/hi";

import { SiReact } from "@react-icons/all-files/si/SiReact";
import { SiUnity } from "@react-icons/all-files/si/SiUnity";

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
              title="React"
              icon={SiReact}
              href="https://portal.thirdweb.com/react/react.connectwallet"
            />
            <LanguageBadge
              title="React Native"
              icon={SiReact}
              href="https://portal.thirdweb.com/react-native"
            />
            <LanguageBadge
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

      <Spacer height={40} />
    </Box>
  );
};

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

function LanguageBadge(props: { icon: IconType; title: string; href: string }) {
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
        gap={2}
        alignItems="center"
        border="1px solid"
        borderColor="borderColor"
        px={2}
        py={1}
        borderRadius="md"
        _groupHover={{
          borderColor: "blue.500",
        }}
        transition="border-color 200ms ease"
      >
        <Icon
          as={props.icon}
          w={4}
          h={4}
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
          fontSize={12}
          transition="color 200ms ease"
        >
          {props.title}
        </Text>
      </Flex>
    </Link>
  );
}

DashboardWalletsConnect.getLayout = (page, props) => (
  <AppLayout {...props} hasSidebar={true}>
    <WalletsSidebar activePage="connect" />
    {page}
  </AppLayout>
);

DashboardWalletsConnect.pageId = PageId.DashboardWalletsConnect;

export default DashboardWalletsConnect;
