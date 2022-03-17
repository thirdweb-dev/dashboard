import { useWeb3 } from "@3rdweb/hooks";
import { ConnectWallet } from "@3rdweb/react";
import { Button, ButtonProps, Tooltip } from "@chakra-ui/react";
import { useNetworkMismatch } from "hooks/useNetworkMismatch";
import React from "react";

export const MismatchButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, isDisabled, ...props }, ref) => {
    const { address } = useWeb3();
    const networksMismatch = useNetworkMismatch();
    if (!address) {
      return <ConnectWallet borderRadius="full" colorScheme="primary" />;
    }

    return (
      <Tooltip
        isDisabled={!networksMismatch}
        label="To do this please switch yout wallet network."
        hasArrow
        shouldWrapChildren
      >
        <Button
          w="full"
          {...props}
          ref={ref}
          isDisabled={networksMismatch || isDisabled}
        >
          {children}
        </Button>
      </Tooltip>
    );
  },
);

MismatchButton.displayName = "MismatchButton";
