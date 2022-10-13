import { Layout } from "../Layout";
import { NetworkSwitcherModal } from "../NetworkSwitcher";
import { useWeb3 } from "@3rdweb/hooks";
import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Grid,
  Heading,
  Icon,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useTrack } from "hooks/analytics/useTrack";
import type { FTUXStepProps } from "pages/start";
import React, { useCallback, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";

export const FTUXChooseNetworkStep: React.FC<FTUXStepProps> = ({
  onPrev,
  onNext,
}) => {
  const [selected, setSelected] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { Track, trackEvent } = useTrack({
    ftuxStep: "choose-network",
  });

  const { chainId, getNetworkMetadata } = useWeb3();

  function isTestChain(_chainId: number) {
    return _chainId === 80001 || _chainId === 4;
  }

  const onSelected = useCallback(() => {
    setSelected(true);
    onClose();
  }, [setSelected, onClose]);

  return (
    <Track>
      <Layout>
        <NetworkSwitcherModal
          isOpen={isOpen}
          onClose={onClose}
          selected={selected}
          setSelected={onSelected}
        />

        <Stack spacing={3}>
          <Heading size="title.lg">Select your network</Heading>
          <Heading size="subtitle.sm">
            Your project will be deployed on the network you select.
          </Heading>

          <Divider />
          <Flex direction="column">
            <Button
              onClick={onOpen}
              mt="12px"
              variant="outline"
              alignSelf="center"
              width="220px"
              rightIcon={<Icon as={IoMdArrowDropdown} />}
              leftIcon={
                <Box
                  w={1.5}
                  h={1.5}
                  borderRadius="full"
                  bgColor={
                    selected
                      ? getNetworkMetadata(chainId || 0).isTestnet
                        ? "blue.500"
                        : "green.500"
                      : undefined
                  }
                />
              }
            >
              {selected
                ? getNetworkMetadata(chainId || 0).chainName
                : "Select Network"}
            </Button>
          </Flex>

          <Grid mt="8px" mb="24px" placeContent="center" />
          <Text textAlign="center" size="body.md">
            Your wallet is currently connected to the{" "}
            <Badge borderRadius="full" px={".75rem"} bg="purple.50">
              {getNetworkMetadata(chainId || 0).chainName}
            </Badge>{" "}
            {isTestChain(chainId || 0) ? "testnet" : "network"}.
          </Text>

          {!isTestChain(chainId || 0) && (
            <>
              <Text borderRadius="8px" bg="blue.50" padding="12px">
                We recommend starting on a testnet like{" "}
                <strong>Goerli (ETH)</strong> or <strong>Mumbai (MATIC)</strong>
                , if this is your first experience with Web3.
              </Text>
            </>
          )}
          <Divider />
        </Stack>

        <ButtonGroup
          w="100%"
          size="lg"
          mt="20px"
          flexWrap={{ base: "wrap", sm: "nowrap" }}
          display="flex"
          justifyContent="center"
        >
          <Button
            mb="12px"
            onClick={() => {
              trackEvent({ category: "ftux", action: "click", label: "prev" });
              if (onPrev) {
                onPrev();
              }
            }}
            leftIcon={<Icon as={FiChevronLeft} />}
            flexShrink={0}
          >
            Back
          </Button>
          <Button
            isDisabled={!selected}
            colorScheme="primary"
            w="full"
            onClick={() => {
              trackEvent({ category: "ftux", action: "click", label: "next" });
              if (onNext) {
                onNext();
              }
            }}
            rightIcon={<Icon as={FiChevronRight} />}
          >
            {!selected ? "Select network to continue" : "Continue"}
          </Button>
        </ButtonGroup>
      </Layout>
    </Track>
  );
};
