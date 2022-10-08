import { Timer } from "./Timer";
import { Flex, Image } from "@chakra-ui/react";
import { HackathonNav } from "components/hackathon/solana/HackathonNav";
import { useTrack } from "hooks/analytics/useTrack";
import { Heading, LinkButton } from "tw-components";

export const Hero: React.FC = () => {
  const trackEvent = useTrack();

  return (
    <Flex
      bg="url(/assets/hackathon/hero-bg.svg) no-repeat center"
      flexDir="column"
      h="100vh"
    >
      <HackathonNav />

      <Flex
        flexDir="column"
        gap={8}
        w="100vw"
        align="center"
        justify="center"
        mt={10}
        h="full"
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

        <Timer />

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
      </Flex>
    </Flex>
  );
};
