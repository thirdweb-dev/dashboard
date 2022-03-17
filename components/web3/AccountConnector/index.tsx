import { ConnectWallet } from "@3rdweb/react";
import { ButtonProps } from "@chakra-ui/react";
import React from "react";

export const AccountConnector: React.FC<
  ButtonProps & { enableNetworkSwitching?: boolean }
> = ({ enableNetworkSwitching }) => {
  // Defaults to disableNetworkSwitching
  return (
    <ConnectWallet
      borderRadius="full"
      colorScheme="primary"
      disableNetworkSwitching={!enableNetworkSwitching}
    />
  );
};
