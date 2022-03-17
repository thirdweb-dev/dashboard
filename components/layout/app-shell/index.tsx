import { IconButton } from "@chakra-ui/button";
import { useBoolean } from "@chakra-ui/hooks";
import Icon from "@chakra-ui/icon";
import { Flex, HStack } from "@chakra-ui/layout";
import { Container } from "@chakra-ui/react";
import { AccountConnector } from "components/web3/AccountConnector";
import { NetworkStatus } from "components/web3/NetworkStatus";
import React, { useMemo } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { SideBar } from "./Sidebar";

const SIDE_BAR_WIDTH = 275;

function numberToPx(number: number): string {
  return `${number}px`;
}

export const AppShell: React.FC = ({ children }) => {
  const [flag, setFlag] = useBoolean();

  const calculatedLeftValue = useMemo(() => {
    return flag ? SIDE_BAR_WIDTH : 0;
  }, [flag]);

  return (
    <Flex
      h="calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))"
      w="calc(100vw - env(safe-area-inset-left) - env(safe-area-inset-right))"
      position="relative"
      overflow="hidden"
    >
      <Flex
        as="aside"
        position="fixed"
        left={0}
        top={0}
        h="100%"
        flexShrink={0}
        bg="gray.800"
        color="white"
        w={numberToPx(SIDE_BAR_WIDTH)}
      >
        <SideBar />
      </Flex>
      <Flex
        bg="gray.100"
        transition="margin 350ms ease"
        zIndex="docked"
        marginLeft={[
          numberToPx(calculatedLeftValue),
          numberToPx(calculatedLeftValue),
          numberToPx(SIDE_BAR_WIDTH),
        ]}
        width={["100%", "100%", `calc(100% - ${numberToPx(SIDE_BAR_WIDTH)})`]}
        flexGrow={1}
        flexShrink={0}
        flexDir="column"
        overflowY="auto"
      >
        <Container
          maxW="100%"
          justifyContent="space-between"
          position="sticky"
          top={0}
          bg="gray.50"
          zIndex="banner"
          shadow="sm"
          display="flex"
          py={2}
          as="header"
        >
          <IconButton
            display={["block", "block", "none"]}
            variant="unstyled"
            aria-label={flag ? "Close Sidebar" : "Open Sidebar"}
            icon={<Icon boxSize={6} as={flag ? FiX : FiMenu} />}
            onClick={setFlag.toggle}
          />
          <HStack marginLeft="auto">
            <NetworkStatus />
            <AccountConnector />
          </HStack>
        </Container>
        <Container as="main" maxW="container.xl">
          {children}
        </Container>
      </Flex>
    </Flex>
  );
};
