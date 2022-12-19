import { Flex, Icon } from "@chakra-ui/react";
import { ImMagicWand } from "@react-icons/all-files/im/ImMagicWand";
import { Logo } from "components/logo";
import { useTrack } from "hooks/analytics/useTrack";
import type { FC } from "react";
import { Heading, LinkButton } from "tw-components";

export const CTAFooter: FC = () => {
  const trackEvent = useTrack();

  return (
    <Flex py={20} align="center" justify="center" flexDir="column" gap={6}>
      <Logo forceShowWordMark color="#fff" />
      <Heading
        bgImage="linear-gradient(128deg, #9945FF -9.03%, #14EE92 98.25%)"
        bgClip="text"
        size="display.lg"
        textAlign="center"
      >
        $125,000 in prizes
      </Heading>

      <Heading size="title.lg" textAlign="center">
        BUILD THE FUTURE OF GAMING
      </Heading>

      <LinkButton
        href="https://thirdweb.typeform.com/to/jta0ye4M"
        onClick={() =>
          trackEvent({
            category: "readyplayer3",
            action: "click",
            label: "register-now",
          })
        }
        h="68px"
        w={{ base: "100%", md: 96 }}
        fontSize="20px"
        leftIcon={<Icon as={ImMagicWand} />}
        color="black"
        flexShrink={0}
        background="rgba(255,255,255,1)"
        _hover={{
          background: "rgba(255,255,255,0.9)!important",
        }}
        isExternal
        noIcon
        mx="auto"
        mt={4}
      >
        Register Now
      </LinkButton>
    </Flex>
  );
};
