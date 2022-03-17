import { Icon } from "@chakra-ui/icons";
import { Button, Tooltip } from "@chakra-ui/react";
import { shortenIfAddress, useEthers } from "@usedapp/core";
import React from "react";
import { IoWalletOutline } from "react-icons/io5";
import { Identicon } from "./Identicon";

interface IConnectButton {
  handleConnectModalOpen: () => void;
}

export const ConnectButton: React.FC<IConnectButton> = ({
  handleConnectModalOpen,
}) => {
  const { account } = useEthers();

  return (
    <Tooltip
      hasArrow
      label={
        account ? "Manage connected wallet" : "Connect a wallet to get started"
      }
    >
      <Button
        px={6}
        borderRadius="full"
        colorScheme="blackAlpha"
        variant="outline"
        leftIcon={
          account ? <Identicon /> : <Icon mt="-1px" as={IoWalletOutline}></Icon>
        }
        onClick={handleConnectModalOpen}
        iconSpacing={3}
      >
        {account ? shortenIfAddress(account) : "Connect Wallet"}
      </Button>
    </Tooltip>
  );
};
