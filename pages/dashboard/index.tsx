import {
  Flex,
  GridItem,
  LinkOverlay,
  SimpleGrid,
  useColorMode,
} from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { AppLayout } from "components/app-layouts/app";
import { Changelog } from "components/dashboard/Changelog";
import { PageId } from "page-id";
import { Card, Heading, Text, TrackedLink } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const TRACKING_CATEGORY = "dashboard";

const GET_STARTED_SECTIONS = [
  {
    title: "Deploy a contract",
    description: "Start deploying contracts on-chain in just a few minutes.",
    image: require("public/assets/dashboard/home-deploy.png"),
    lightImage: require("public/assets/dashboard/home-deploy-light.png"),
    href: "/contracts",
  },
  {
    title: "Browse contracts",
    description:
      "Explore contracts from world-class web3 protocols & engineers- all deployable with 1-click.",
    image: require("public/assets/dashboard/home-browse.png"),
    lightImage: require("public/assets/dashboard/home-browse-light.png"),
    href: "/explore",
  },
  {
    title: "Browse templates",
    description:
      "Get inspired and start building your own web3 apps on top of our templates.",
    image: require("public/assets/dashboard/home-templates.png"),
    lightImage: require("public/assets/dashboard/home-templates-light.png"),
    href: "https://portal.thirdweb.com/templates",
    isExternal: true,
  },
];

const Dashboard: ThirdwebNextPage = () => {
  const { colorMode } = useColorMode();

  return (
    <SimpleGrid columns={{ base: 1, xl: 4 }} gap={8} mt={12}>
      <GridItem as={Flex} colSpan={{ xl: 3 }} direction="column" gap={8}>
        <Heading>Get started quickly</Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
          {GET_STARTED_SECTIONS.map(
            ({ title, description, lightImage, image, href, isExternal }) => (
              <LinkOverlay
                key={title}
                as={TrackedLink}
                category={TRACKING_CATEGORY}
                label={title}
                href={href}
                isExternal={isExternal}
                _hover={{ textDecor: "none" }}
                role="group"
                overflow="hidden"
                position="relative"
              >
                <Card p={0} overflow="hidden">
                  <Flex direction="column" gap={3} p={6}>
                    <Heading
                      size="title.xs"
                      _groupHover={{ color: "blue.500" }}
                      transitionDuration="200ms"
                    >
                      {title} ➝
                    </Heading>
                    <Text>{description}</Text>
                  </Flex>
                  <Flex justifyContent="center">
                    <ChakraNextImage
                      src={colorMode === "light" ? lightImage : image}
                      alt=""
                    />
                  </Flex>
                </Card>
              </LinkOverlay>
            ),
          )}
        </SimpleGrid>
      </GridItem>
      <GridItem as={Flex} direction="column" gap={6}>
        <Heading size="title.sm">Latest changes</Heading>
        <Changelog />
      </GridItem>
    </SimpleGrid>
  );
};

Dashboard.getLayout = (page, props) => <AppLayout {...props}>{page}</AppLayout>;
Dashboard.pageId = PageId.Dashboard;

export default Dashboard;
