import { Button, Heading, Icon, Stack } from "@chakra-ui/react";
import { useTrack } from "hooks/analytics/useTrack";
import type { FTUXStepProps } from "pages/start";
import React from "react";
import { FiChevronRight } from "react-icons/fi";
import { Layout } from "../Layout";

export const FTUXWelcomeStep: React.FC<FTUXStepProps> = ({ onNext }) => {
  const { Track, trackEvent } = useTrack({
    ftuxStep: "welcome",
  });
  return (
    <Track>
      <Layout>
        <Stack spacing={3}>
          <Heading size="title.lg">👋{"  "}Welcome to thirdweb</Heading>
          <Heading size="subtitle.sm">
            You are a few steps away from deploying your own web3 app with smart
            contracts.
          </Heading>
        </Stack>

        <Button
          mt="32px"
          size="lg"
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
          Let&apos;s get started!
        </Button>
      </Layout>
    </Track>
  );
};
