import { Image, VStack } from "@chakra-ui/react";
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
        w="600px"
        objectFit="contain"
      />
      <Heading fontSize="72px">
        $10,000 in prizes.
        <br /> Hack it your way.
      </Heading>
      <LinkButton
        // TODO: update this link
        href="/"
        onClick={() =>
          trackEvent({
            category: "solana-hackathon",
            action: "click",
            label: "register",
            title: "Register Now",
          })
        }
        h="68px"
        w={{ base: "100%", md: "700px" }}
        fontSize="20px"
        color="black"
        flexShrink={0}
        background="rgba(255,255,255,1)"
        _hover={{
          background: "rgba(255,255,255,0.9)!important",
        }}
      >
        🪄 Register Now
      </LinkButton>
    </VStack>
  );
};
