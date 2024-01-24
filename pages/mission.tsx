import { Container, Flex } from "@chakra-ui/react";
import { LandingLayout } from "components/landing-pages/layout";
import { PageId } from "page-id";
import { ThirdwebNextPage } from "utils/types";
import { MarkdownRenderer } from "../components/contract-components/published-contract/markdown-renderer";
import HeroSection from "components/mission/HeroSection";
import MissionSection from "components/mission/MissionSection";
import { Aurora } from "components/homepage/Aurora";
import OverviewSection from "components/mission/OverviewSection";
import ReasonSection from "components/mission/ReasonSection";
import ReasonWeb3Section from "components/mission/ReasonWeb3Section";
import HowSection from "components/mission/HowSection";

const TRACKING_CATEGORY = "mission";

const Mission: ThirdwebNextPage = () => {
  return (
    <LandingLayout
      seo={{
        title: "thirdweb's Privacy Policy",
        description:
          "The most efficient way to build web3 apps for millions of users — with a robust infrastructure stack that scales as you grow. Learn more.",
      }}
    >
      <Flex flexDir="column" position="relative" overflowX="hidden">
        <Aurora
          pos={{ left: "50%", top: "1050px" }}
          size={{ width: "calc(100vw + 500px)", height: "1500px" }}
          color="hsl(260deg 100% 55% / 30%)"
          zIndex={2}
        />

        <Container
          maxW="100%"
          as={Flex}
          flexDir="column"
          gap={{ base: "120px", md: "180px" }}
          position="relative"
          zIndex={3}
          px={0}
        >
          <Container
            as={Flex}
            flexDir="column"
            maxW="container.page"
            gap={{ base: "120px", md: "180px" }}
          >
            <HeroSection />
            <MissionSection />
          </Container>

          <OverviewSection />

          <Container
            as={Flex}
            flexDir="column"
            maxW="container.page"
            gap={{ base: "120px", md: "180px" }}
            mt={{ base: "100px", "2xl": "500px" }}
          >
            <ReasonSection />
            <ReasonWeb3Section />
            <HowSection TRACKING_CATEGORY={TRACKING_CATEGORY} />
          </Container>
        </Container>
      </Flex>
    </LandingLayout>
  );
};

Mission.pageId = PageId.Mission;

export default Mission;
