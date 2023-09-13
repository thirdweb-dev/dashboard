import { Flex, SimpleGrid } from "@chakra-ui/react";
import { AppLayout } from "components/app-layouts/app";
import { PageId } from "page-id";
import { ThirdwebNextPage } from "utils/types";
import { Heading } from "tw-components";
import { NavigationCard } from "components/dashboard/NavigationCard";
import { ContractsSidebar } from "core-ui/sidebar/contracts";

const TRACKING_CATEGORY = "dashboard-contracts";

const SECTIONS = [
  {
    title: "Build",
    description: "Build your own contracts with base templates and extensions.",
    image: require("public/assets/dashboard/build.png"),
    href: "/dashboard/contracts/build",
  },
  {
    title: "Explore",
    description: "Ready-to-deploy contracts to any EVM chain.",
    image: require("public/assets/dashboard/explore.png"),
    href: "/explore",
  },
  {
    title: "Publish",
    description: "Publish your contracts on-chain to make it discoverable.",
    image: require("public/assets/dashboard/publish.png"),
    href: "/dashboard/contracts/publish",
  },
  {
    title: "Deploy",
    description: "Deploy your contracts with CLI and Dashboard.",
    image: require("public/assets/dashboard/deploy.png"),
    href: "/dashboard/contracts/deploy",
  },
];

const DashboardInfrastructure: ThirdwebNextPage = () => {
  return (
    <Flex
      flexDir="column"
      gap={12}
      mt={{ base: 2, md: 6 }}
      w={{ base: "100%", xl: "70%" }}
    >
      <Flex flexDir="column" gap={4}>
        <Heading size="title.lg">Contracts</Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
          {SECTIONS.map(({ title, description, image, href }) => (
            <NavigationCard
              key={title}
              title={title}
              description={description}
              image={image}
              href={href}
              TRACKING_CATEGORY={TRACKING_CATEGORY}
            />
          ))}
        </SimpleGrid>
      </Flex>
    </Flex>
  );
};

DashboardInfrastructure.getLayout = (page, props) => (
  <AppLayout {...props} hasSidebar={true}>
    <ContractsSidebar activePage="overview" />
    {page}
  </AppLayout>
);

DashboardInfrastructure.pageId = PageId.DashboardInfrastructure;

export default DashboardInfrastructure;
