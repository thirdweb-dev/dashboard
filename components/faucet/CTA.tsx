import { AspectRatio, Flex } from "@chakra-ui/react";
import { Button, Card, Text, TrackedLink } from "tw-components";

export const CTA: React.FC = () => {
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
          <TrackedLink href="/dashboard" category="solana-faucet">
            <Button
              px="6"
              py="4"
              fontSize="18px"
              color="black"
              background="rgba(255,255,255,1)"
              _hover={{
                background: "rgba(255,255,255,0.9) !important",
              }}
            >
              Start building
            </Button>
          </TrackedLink>

          <TrackedLink
            href="https://portal.thirdweb.com"
            category="solana-faucet"
            isExternal
          >
            <Button
              bg="rgba(255, 255, 255, 0.1)"
              border="1px solid rgba(255, 255, 255, 0.2)"
              px="6"
            >
              View docs
            </Button>
          </TrackedLink>
        </Flex>
      </Card>
    </AspectRatio>
  );
};
