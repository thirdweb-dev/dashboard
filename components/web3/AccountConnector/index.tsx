import { Box, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { AccountModal } from "./AccountModal";
import { ConnectButton } from "./ConnectButton";

export const AccountConnector: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <ConnectButton handleConnectModalOpen={onOpen} />
      <AccountModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};
