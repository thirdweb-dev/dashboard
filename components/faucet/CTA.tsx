import { AspectRatio, Flex, Icon } from "@chakra-ui/react";
import { useTrack } from "hooks/analytics/useTrack";
import { FiExternalLink } from "react-icons/fi";
import { Card, LinkButton, Text, TrackedLink } from "tw-components";

interface ICTA {
  transactionLink: string;
}

export const CTA: React.FC<ICTA> = ({ transactionLink }) => {
  const trackEvent = useTrack();

  return (
    <AspectRatio ratio={{ base: 1 / 1, md: 4 / 1 }}>
      <Card
        bg="url(/assets/faucet/cta-bg.png) no-repeat center"
        bgSize="cover"
        gap="6"
        flexDir="column"
        px={10}
        mt={8}
        alignItems="flex-start !important"
      >
        <Text
          color="white"
          fontSize={{ base: "24px", md: "32px" }}
          fontWeight="bold"
          maxW="450px"
        >
          Now that you have devnet funds, build your web3 app
        </Text>
        <Flex gap="4" align="center" flexWrap="wrap">
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
          {transactionLink && (
            <TrackedLink
              fontSize="18px"
              color="white"
              href={transactionLink}
              isExternal
              category="solana-faucet"
              display="flex"
              alignItems="center"
              gap={2}
            >
              View on Solana Explorer
              <Icon as={FiExternalLink} />
            </TrackedLink>
          )}
        </Flex>
      </Card>
    </AspectRatio>
  );
};
