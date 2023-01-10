import { Box, Flex } from "@chakra-ui/react";
import { Logo } from "components/logo";
import { useTrack } from "hooks/analytics/useTrack";
import type { FC } from "react";
import { Heading, LinkButton } from "tw-components";

export const CTAFooter: FC = () => {
  const trackEvent = useTrack();

  return (
    <Flex
      py={40}
      align="center"
      justify="center"
      flexDir="column"
      pos="relative"
      mt={20}
      gap={4}
      zIndex={1}
    >
      <Box
        pointerEvents={"none"}
        width="2400px"
        height="1400px"
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        backgroundImage={`radial-gradient(ellipse at center, hsl(300deg 100% 50% / 10%), transparent 60%)`}
      ></Box>

      <Logo forceShowWordMark color="#fff" />

      <Heading
        size="display.lg"
        textAlign="center"
        color="white"
        zIndex={2}
        letterSpacing="-0.04em"
      >
        Build the Future of Gaming.
      </Heading>

      <Heading size="title.xl" textAlign="center" color="#e984f3" zIndex={2}>
        $100,000 in prizes & perks.
      </Heading>

      <LinkButton
        href="https://readyplayer3.devpost.com/"
        onClick={() =>
          trackEvent({
            category: "readyplayer3",
            action: "click",
            label: "register-now",
          })
        }
        py={7}
        px={14}
        // h="68px"
        // w={{ base: "100%", md: 96 }}
        fontSize="20px"
        // leftIcon={<Icon as={ImMagicWand} />}
        color="black"
        flexShrink={0}
        background="rgba(255,255,255,1)"
        _hover={{
          background: "rgba(255,255,255,0.9) !important",
        }}
        isExternal
        noIcon
        mx="auto"
        mt={8}
      >
        Register Now
      </LinkButton>
    </Flex>
  );
};
