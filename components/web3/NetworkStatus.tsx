import {
  Box,
  Button,
  ButtonProps,
  Heading,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { getChainName, isTestChain } from "@usedapp/core";
import { ChainIdExt } from "constants/networks";
import { useNetworkSwitch } from "hooks/web3/useNetworkSwitch";
import React, { useState } from "react";

enum ChainType {
  TEST,
  MAIN,
  LOCALHOST,
  DISCONNECTED,
}

function getNetworkName(chainId: number): string {
  let chainName = "";
  if (chainId) {
    if (chainId === ChainIdExt.Avalanche) {
      chainName = "Avalanche";
    } else if (chainId === ChainIdExt.Fantom) {
      chainName = "Fantom";
    } else {
      chainName = getChainName(chainId);
    }

    if (isTestChain(chainId)) {
      chainName = `${chainName} (testnet)`;
    }
  }
  return chainName;
}

const ChainTypeColorMap: Record<ChainType, string> = {
  [ChainType.TEST]: "blue.500",
  [ChainType.MAIN]: "green.500",
  [ChainType.DISCONNECTED]: "red.500",
  [ChainType.LOCALHOST]: "yellow.500",
};

interface INetworkStatusButton extends ButtonProps {
  chainId?: number;
  onSwitchChain?: (chain: number) => Promise<void>;
}

const NetworkStatusButton = React.forwardRef<
  HTMLButtonElement,
  INetworkStatusButton
>(({ chainId, onSwitchChain, onClick, ...restButtonProps }, ref) => {
  const toast = useToast();
  const [isBusy, setIsBusy] = useState(false);
  let chainName = "";
  let chainType = ChainType.DISCONNECTED;

  if (chainId) {
    chainName = getNetworkName(chainId);
    chainType =
      chainId === 1337
        ? ChainType.LOCALHOST
        : isTestChain(chainId)
        ? ChainType.TEST
        : ChainType.MAIN;
  }

  const handleSwitchChain = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (onClick) {
      onClick(e);
    }
    if (!onSwitchChain || chainId === undefined) {
      return;
    }
    setIsBusy(true);
    try {
      await onSwitchChain(chainId);
    } catch (err) {
      if (err instanceof Error) {
        toast({
          title: "Failed to switch networks",
          description: err.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      {...restButtonProps}
      onClick={handleSwitchChain}
      isLoading={isBusy}
      hidden={ChainType.LOCALHOST === chainType ? true : false}
      leftIcon={
        <Box
          w={1.5}
          h={1.5}
          borderRadius="full"
          bgColor={ChainTypeColorMap[chainType]}
        />
      }
      ref={ref}
    >
      {chainType === ChainType.DISCONNECTED ? "Not Connected" : chainName}
    </Button>
  );
});

NetworkStatusButton.displayName = "NetworkStatusButton";

export const NetworkStatus: React.FC = () => {
  const networkSwitch = useNetworkSwitch();

  const isSwitching = networkSwitch.canSwitch && networkSwitch.isSwitching;
  const chainId =
    (networkSwitch.canSwitch && networkSwitch.chainId) || undefined;
  const switchChain =
    (networkSwitch.canSwitch && networkSwitch.switchChain) || undefined;

  return (
    <Popover>
      <PopoverTrigger>
        <NetworkStatusButton isLoading={isSwitching} chainId={chainId} />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader as={Heading} size="md" fontWeight="semibold">
          Switch Network
        </PopoverHeader>
        <PopoverArrow />
        <PopoverBody>
          <Stack>
            {networkSwitch.supportedChains.map((cId) => (
              <NetworkStatusButton
                key={cId}
                chainId={cId}
                isDisabled={isSwitching}
                onSwitchChain={switchChain}
              />
            ))}
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
