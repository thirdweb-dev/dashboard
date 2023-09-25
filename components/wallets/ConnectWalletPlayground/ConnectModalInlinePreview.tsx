import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";
import {
  ConnectModalInline,
  useDisconnect,
  useConnectionStatus,
} from "@thirdweb-dev/react";
import React, { useEffect } from "react";
import { Text } from "tw-components";
import styles from "./ConnectModalInline.module.css";
import {
  hideUIForWalletIds,
  hideUIForWalletIdsMobile,
} from "./walletInfoRecord";

type Theme = "light" | "dark";

export const ConnectModalInlinePreview = (props: {
  walletIds: string[];
  modalTitle: string;
  modalSize: "compact" | "wide";
  selectedTheme: Theme;
  modalTitleIconUrl?: string;
  welcomeScreen?: WelcomeScreen;
}) => {
  const isMobile = useBreakpointValue(
    { base: true, md: false },
    { ssr: false },
  );
  const disconnect = useDisconnect();
  const walletIdsJoin = props.walletIds.join(",");
  const connectionStatus = useConnectionStatus();

  // if somehow the wallet is connected, disconnect it
  useEffect(() => {
    if (connectionStatus === "connected") {
      disconnect();
    }
  }, [walletIdsJoin, disconnect, connectionStatus]);

  let showInlineModal = true;

  if (props.walletIds.length === 1) {
    const walletId = props.walletIds[0];

    if (hideUIForWalletIds.has(walletId)) {
      showInlineModal = false;
    }
    if (isMobile && hideUIForWalletIdsMobile.has(walletId)) {
      showInlineModal = false;
    }
  }

  return (
    <Flex
      width="full"
      justifyContent="flex-start"
      alignItems="center"
      flexDir="column"
      gap={12}
      cursor="not-allowed"
    >
      {showInlineModal && (
        <ConnectModalInline
          modalSize={isMobile ? "compact" : props.modalSize}
          className={styles.ConnectModalInline}
          modalTitle={props.modalTitle}
          theme={props.selectedTheme}
          modalTitleIconUrl={props.modalTitleIconUrl}
          welcomeScreen={props.welcomeScreen}
        />
      )}

      {!showInlineModal && (
        <Box
          textAlign="center"
          bg="backgroundBody"
          p={3}
          border="1px solid"
          borderColor="backgroundHighlight"
          borderRadius="md"
          maxW="400px"
        >
          <Text mb={2}>
            {" "}
            Can not show Modal UI for selected configuration because it triggers
            wallet connection{" "}
          </Text>
          <Text> See Live Preview instead </Text>
        </Box>
      )}
    </Flex>
  );
};

export type WelcomeScreen = {
  title?: string;
  subtitle?: string;
  img?: {
    src: string;
    width?: number;
    height?: number;
  };
};
