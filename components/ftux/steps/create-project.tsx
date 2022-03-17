import { useWeb3 } from "@3rdweb/hooks";
import {
  Button,
  ButtonGroup,
  Divider,
  Heading,
  Icon,
  Stack,
} from "@chakra-ui/react";
import { LinkButton } from "components/shared/LinkButton";
import { useTrack } from "hooks/analytics/useTrack";
import type { FTUXStepProps } from "pages/start";
import { default as React } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { VscRocket } from "react-icons/vsc";
import { getNetworkFromChainId, SupportedChainId } from "utils/network";
import { Layout } from "../Layout";

export const FTUXCreateProject: React.FC<FTUXStepProps> = ({ onPrev }) => {
  const { Track, trackEvent } = useTrack({
    ftuxStep: "create-project",
  });
  const { address, chainId } = useWeb3();

  const network =
    chainId && getNetworkFromChainId(chainId as number as SupportedChainId);

  return (
    <Track>
      <Layout>
        <Stack spacing={3}>
          <Heading size="title.lg">
            🎉 Congrats you&apos;re all connected!
          </Heading>
          <Heading size="subtitle.sm">
            Now let&apos;s create a project which contains roles, modules, and
            money for your team
          </Heading>
        </Stack>
        <Divider my={6} />
        <ButtonGroup
          w="100%"
          size="lg"
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
          <LinkButton
            textTransform="capitalize"
            padding="12px"
            isDisabled={!network}
            isLoading={!address}
            href={`/${network}/new`}
            colorScheme="primary"
            w="full"
            rightIcon={<Icon as={VscRocket} />}
            onClick={() => {
              trackEvent({ category: "ftux", action: "click", label: "next" });
            }}
          >
            {network
              ? `Create First Project on ${network}`
              : "Unsupported Network"}
          </LinkButton>
        </ButtonGroup>
      </Layout>
    </Track>
  );
};
