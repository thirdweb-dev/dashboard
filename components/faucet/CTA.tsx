import { AspectRatio, Flex } from "@chakra-ui/react";
import { useTrack } from "hooks/analytics/useTrack";
import { Card, LinkButton, Text } from "tw-components";

export const CTA: React.FC = () => {
  const trackEvent = useTrack();

  return (
    <AspectRatio ratio={4 / 1}>
      <Card
        bg="url(/assets/faucet/cta-bg.png) no-repeat center"
        bgSize="cover"
        gap="6"
        flexDir="column"
        px={10}
        my={4}
        alignItems="flex-start !important"
      >
        <Text color="white" fontSize="28px" fontWeight="bold" maxW="450px">
          Now that you have testnet funds, build your web3 app
        </Text>
        <Flex gap="4">
          <LinkButton
            px="6"
            py="4"
            fontSize="18px"
            color="black"
            background="rgba(255,255,255,1)"
            _hover={{
              background: "rgba(255,255,255,0.9) !important",
            }}
            href="/dashboard"
            onClick={() =>
              trackEvent({
                category: "solana-faucet",
                action: "click",
                label: "start",
                title: "Start building",
              })
            }
          >
            Start building
          </LinkButton>

          <LinkButton
            isExternal
            href="https://portal.thirdweb.com"
            bg="rgba(255, 255, 255, 0.1)"
            border="1px solid rgba(255, 255, 255, 0.2)"
            px="6"
            onClick={() =>
              trackEvent({
                category: "solana-faucet",
                action: "click",
                label: "view",
                title: "View docs",
              })
            }
          >
            View docs
          </LinkButton>
        </Flex>
      </Card>
    </AspectRatio>
  );
};
