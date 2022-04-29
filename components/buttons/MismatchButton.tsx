import { ConnectWallet, useWeb3 } from "@3rdweb-sdk/react";
import { Flex, Icon, Tooltip } from "@chakra-ui/react";
import {
  useDesiredChainId,
  useNetwork,
  useNetworkMismatch,
} from "@thirdweb-dev/react";
import React, { useCallback } from "react";
import { AiOutlineWarning } from "react-icons/ai";
import { VscDebugDisconnect } from "react-icons/vsc";
import { Button, ButtonProps, Heading, Text } from "tw-components";
import {
  SUPPORTED_CHAIN_ID,
  SupportedChainIdToNetworkMap,
  getNetworkFromChainId,
} from "utils/network";

export const MismatchButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, isDisabled, onClick, loadingText, type, ...props }, ref) => {
    const { address } = useWeb3();
    const networksMismatch = useNetworkMismatch();
    if (!address) {
      return (
        <ConnectWallet borderRadius="full" colorScheme="primary" {...props} />
      );
    }

    if (networksMismatch) {
    }

    return (
      <Tooltip
        portalProps={{ containerRef: ref || undefined }}
        bg="backgroundHighlight"
        p={4}
        borderRadius="xl"
        borderWidth="1px"
        borderColor="borderColor"
        mx={6}
        isDisabled={!networksMismatch}
        label={<MismatchNotice />}
        hasArrow
        shouldWrapChildren
        // isOpen={stayOpen}
        closeDelay={500}
        pointerEvents="all"
      >
        <Button
          w="full"
          {...props}
          type={type}
          loadingText={loadingText}
          onClick={onClick}
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

const MismatchNotice: React.VFC = () => {
  const { chainId, getNetworkMetadata } = useWeb3();
  const activeChainId = useDesiredChainId();
  const signerChainId = chainId as SUPPORTED_CHAIN_ID;
  const [network, switchNetwork] = useNetwork();

  const actuallyCanAttemptSwitch = !!switchNetwork;

  const signerNetworkIsSupported =
    signerChainId in SupportedChainIdToNetworkMap;

  const walletNetwork = (
    signerNetworkIsSupported
      ? getNetworkFromChainId(signerChainId)
      : getNetworkMetadata(signerChainId as unknown as number).chainName
  )
    .split("")
    .map((s, idx) => (idx === 0 ? s.toUpperCase() : s))
    .join("");

  const twNetwork = getNetworkFromChainId(activeChainId)
    .split("")
    .map((s, idx) => (idx === 0 ? s.toUpperCase() : s))
    .join("");

  const onSwitchWallet = useCallback(() => {
    if (actuallyCanAttemptSwitch && activeChainId) {
      switchNetwork(activeChainId);
    }
  }, [activeChainId, actuallyCanAttemptSwitch, switchNetwork]);

  return (
    <Flex direction="column" gap={4}>
      <Heading size="label.lg">
        <Flex gap={2} align="center">
          <Icon boxSize={6} as={AiOutlineWarning} />
          <span>Network Mismatch</span>
        </Flex>
      </Heading>

      <Text>
        You are connected to the <strong>{walletNetwork}</strong> network but
        you are trying to interact on the <strong>{twNetwork}</strong> network.
      </Text>

      <Button
        leftIcon={<Icon as={VscDebugDisconnect} />}
        size="sm"
        onClick={onSwitchWallet}
        isLoading={network.loading}
        isDisabled={!actuallyCanAttemptSwitch}
        colorScheme="orange"
      >
        Switch wallet to {twNetwork}
      </Button>

      {!actuallyCanAttemptSwitch && (
        <Text size="body.sm" fontStyle="italic">
          Your connected wallet does not support programatic switching.
          <br />
          Please manually switch the network in your wallet.
        </Text>
      )}
    </Flex>
  );
};
