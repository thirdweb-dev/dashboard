import { Aurora } from "../Aurora";
import { Flex, SimpleGrid } from "@chakra-ui/react";
import { AiOutlineTeam } from "@react-icons/all-files/ai/AiOutlineTeam";
import { DashboardCard } from "components/product-pages/homepage/DashboardCard";
import { HomepageSection } from "components/product-pages/homepage/HomepageSection";
import Analytics from "public/assets/landingpage/analytics.png";
import Contracts from "public/assets/landingpage/contracts.png";
import ThirdwebTeams from "public/assets/landingpage/thirdweb-teams.png";
import { BsMenuButtonWide } from "react-icons/bs";
import { MdOutlineAnalytics } from "react-icons/md";
import { Heading } from "tw-components";

/**
 * Highlights the features of ThirdWeb Dashboards
 */
export const DashboardFeaturesSection = () => {
  return (
    <HomepageSection id="features">
      <Aurora
        pos={{ left: "20%", top: "30%" }}
        size={{ width: "2400px", height: "1800px" }}
        color="hsl(276deg 84% 42% / 15%)"
      />

      <Aurora
        pos={{ left: "80%", top: "70%" }}
        size={{ width: "2400px", height: "1800px" }}
        color="hsl(206deg 84% 42% / 15%)"
      />

      <Flex
        flexDir="column"
        pb={{ base: 12, lg: 24 }}
        pt={24}
        align="center"
        gap={{ base: 12, lg: 14 }}
      >
        <Heading
          as="h2"
          textAlign="center"
          fontSize={{ base: "32px", lg: "48px" }}
          letterSpacing={"-0.04em"}
        >
          Dashboards for everything.
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
          <DashboardCard
            headingTitle="teams"
            headingIcon={AiOutlineTeam}
            title={
              <>
                Built with a focus on{" "}
                <Heading
                  as="span"
                  bgGradient="linear(to-l, #48BCA8, #A998FF)"
                  bgClip="text"
                  display="inline"
                  size="title.sm"
                >
                  empowering your team
                </Heading>
              </>
            }
            subtitle="Deploy and manage your contracts with your multi-sig, manage permissions, and more."
            rightImage={ThirdwebTeams}
            gradientBGs={{
              topGradient:
                "linear-gradient(135.89deg, #E21E12 17.67%, #00FFE0 59.03%)",
              bottomGradient: "#C512E2",
            }}
          />
          <DashboardCard
            headingTitle="Contract manager"
            headingIcon={BsMenuButtonWide}
            title={
              <>
                <Heading
                  as="span"
                  bgGradient="linear(to-l, #E483F4, #FAC588)"
                  bgClip="text"
                  display="inline"
                  size="title.sm"
                >
                  Your contracts
                </Heading>
                , at your fingertips
              </>
            }
            subtitle="Keep track of your contracts, easily deploy new versions, perform transactions and more."
            rightImage={Contracts}
            gradientBGs={{
              rightGradient: "#E28F12",
              leftGradient: "#C512E2",
            }}
          />
          <DashboardCard
            headingTitle="analytics"
            headingIcon={MdOutlineAnalytics}
            title={
              <>
                Automatic reports with
                <br />
                <Heading
                  as="span"
                  bgGradient="linear(to-l, #585EE9, #E487D0)"
                  bgClip="text"
                  display="inline"
                  size="title.sm"
                >
                  on-chain analytics
                </Heading>
              </>
            }
            subtitle="Pre-built reports for all of your contracts. Understand how your contracts are being used."
            rightImage={Analytics}
            gradientBGs={{
              rightGradient: "#C512E2",
              bottomGradient: "#00FFE0",
            }}
          />
        </SimpleGrid>
      </Flex>
    </HomepageSection>
  );
};
