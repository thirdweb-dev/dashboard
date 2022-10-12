import { Icon, Image, VStack } from "@chakra-ui/react";
import { ImMagicWand } from "@react-icons/all-files/im/ImMagicWand";
import { useTrack } from "hooks/analytics/useTrack";
import type { FC } from "react";
import { Heading, LinkButton } from "tw-components";

export const HackathonFooter: FC = () => {
  const trackEvent = useTrack();

  return (
    <VStack
      bg='url("/assets/hackathon/footer-bg.png")'
      bgSize="cover"
      bgRepeat="no-repeat"
      bgPosition="center"
      w="100%"
      py={20}
      gap={8}
      borderTopRadius="50px"
    >
      <Image
        src="/assets/hackathon/tw-solana.svg"
        alt="Solana Hackathon"
        w={{ base: "300px", md: "600px" }}
        objectFit="contain"
      />
      <Heading size="display.sm" textAlign="center">
        $10,000 in prizes.
        <br /> Hack it your way.
      </Heading>

      <LinkButton
        href="https://thirdweb.typeform.com/to/zfrq8Jx0"
        onClick={() =>
          trackEvent({
            category: "solana-hackathon",
            action: "click",
            label: "register-now",
          })
        }
        h="68px"
        w={{ base: "90%", md: 96 }}
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
      >
        Register now
      </LinkButton>
    </VStack>
  );
};
