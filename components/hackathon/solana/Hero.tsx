import { Flex, Image } from "@chakra-ui/react";
import { HomepageTopNav } from "components/product-pages/common/Topnav";
import { HomepageSection } from "components/product-pages/homepage/HomepageSection";
import { useTrack } from "hooks/analytics/useTrack";
import dynamic from "next/dynamic";
import { Heading, LinkButton } from "tw-components";



export const Hero: React.FC = () => {
  const trackEvent = useTrack();

  return (
    <Flex
      bg="url(/assets/hackathon/hero-bg.svg) no-repeat center"
      flexDir="column"
      h="100vh"
    >
     
    </Flex>
  );
};
