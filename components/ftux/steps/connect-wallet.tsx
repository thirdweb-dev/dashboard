import { useWeb3 } from "@3rdweb/hooks";
import {
  Button,
  ButtonGroup,
  Divider,
  Grid,
  Heading,
  Icon,
  Stack,
} from "@chakra-ui/react";
import { AccountConnector } from "components/web3/AccountConnector";
import { useTrack } from "hooks/analytics/useTrack";
import type { FTUXStepProps } from "pages/start";
import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Layout } from "../Layout";

export const FTUXConnectWalletStep: React.FC<FTUXStepProps> = ({
  onPrev,
  onNext,
}) => {
  const { Track, trackEvent } = useTrack({
    ftuxStep: "connect-wallet",
  });
  const { address } = useWeb3();

  return (
    <Track>
      <Layout>
        <Stack spacing={3}>
          <Heading size="title.lg">Connect your wallet</Heading>
          <Heading size="subtitle.sm">
            This wallet will be used to deploy your project.
          </Heading>

          <Divider />
          <Grid placeContent="center" py={3} gap={5}>
            <AccountConnector />
          </Grid>
          <Divider />
        </Stack>
        <ButtonGroup w="100%" size="lg" mt="20px">
          <Button
            onClick={() => {
              trackEvent({
                category: "ftux",
                action: "click",
                label: "prev",
              });
              if (onPrev) {
                onPrev();
              }
            }}
            flexShrink={0}
            leftIcon={<Icon as={FiChevronLeft} />}
          >
            Back
          </Button>
          <Button
            isDisabled={!address}
            colorScheme="primary"
            w="full"
            onClick={() => {
              trackEvent({
                category: "ftux",
                action: "click",
                label: "next",
              });
              if (onNext) {
                onNext();
              }
            }}
            rightIcon={<Icon as={FiChevronRight} />}
          >
            Continue
          </Button>
        </ButtonGroup>
      </Layout>
    </Track>
  );
};
