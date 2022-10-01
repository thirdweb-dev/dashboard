import { AspectRatio, Flex } from "@chakra-ui/react";
import { Card, LinkButton, Text } from "tw-components";

export const CTA: React.FC = () => {
  return (
    <AspectRatio ratio={4 / 1}>
      <Card
        bg="url(/assets/faucet/cta-bg.png) no-repeat center"
        bgSize="cover"
        gap="6"
        mt={10}
        flexDir="column"
        px={10}
        alignItems="flex-start !important"
      >
        <Text color="white" fontSize="28px" fontWeight="bold" maxW="450px">
          Now that you have testnet funds, build your web3 app
        </Text>
        <Flex gap="4">
          <LinkButton
            href="/dashboard"
            fontSize="20px"
            color="black"
            background="rgba(255,255,255,1)"
            _hover={{
              background: "rgba(255,255,255,0.9) !important",
            }}
            px="6"
            py="4"
          >
            Start building
          </LinkButton>

          <LinkButton
            href="https://portal.thirdweb.com"
            bg="rgba(255, 255, 255, 0.1)"
            border="1px solid rgba(255, 255, 255, 0.2)"
            px="6"
            isExternal
          >
            View docs
          </LinkButton>
        </Flex>
      </Card>
    </AspectRatio>
  );
};
