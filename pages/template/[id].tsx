import { Aurora } from "../../components/homepage/Aurora";
import {
  AspectRatio,
  Box,
  DarkMode,
  Flex,
  GridItem,
  SimpleGrid,
} from "@chakra-ui/react";
import { ProductButton } from "components/product-pages/common/ProductButton";
import { HomepageTopNav } from "components/product-pages/common/Topnav";
import { HomepageSection } from "components/product-pages/homepage/HomepageSection";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { PageId } from "page-id";
import { templates } from "pages/templates";
import { Heading, LinkButton, Text, TrackedLink } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

type SolanaProgramProps = {
  repo: any;
};

const TemplatePage: ThirdwebNextPage = (props: SolanaProgramProps) => {
  const router = useRouter();

  console.log("repo:", props.repo);
  console.log("query id:", router.query.id);

  console.log(templates);

  return (
    <DarkMode>
      <Flex
        sx={{
          // overwrite the theme colors because the home page is *always* in "dark mode"
          "--chakra-colors-heading": "#F2F2F7",
          "--chakra-colors-paragraph": "#AEAEB2",
          "--chakra-colors-borderColor": "rgba(255,255,255,0.1)",
        }}
        justify="center"
        flexDir="column"
        as="main"
        bg="#000"
      >
        <HomepageTopNav />
        <HomepageSection py={24} ml="auto" mr="auto">
          <Aurora
            pos={{ left: "10%", top: "60%" }}
            size={{ width: "2400px", height: "1800px" }}
            color="hsl(219deg 78% 30% / 25%)"
          />

          <Aurora
            pos={{ left: "90%", top: "60%" }}
            size={{ width: "2400px", height: "1800px" }}
            color="hsl(289deg 78% 30% / 25%)"
          />

          <Heading
            as="h3"
            fontSize={{ base: "32px", md: "48px" }}
            fontWeight={700}
            letterSpacing="-0.04em"
            mb={4}
            textAlign="center"
          >
            {templates.find((template) => template.id === router.query.id)
              ?.title + " Template"}
          </Heading>
          <Text fontSize="20px" textAlign="center" size="body.lg" mb={6}>
            {
              templates.find((template) => template.id === router.query.id)
                ?.description
            }
          </Text>

          <SimpleGrid
            mb={8}
            columns={{ base: 1, lg: 2 }}
            gap={2}
            rowGap={4}
            placeItems="center"
            w="50%"
            mx="auto"
          >
            <GridItem w="full">
              <ProductButton
                title={"View Demo"}
                href={props?.repo?.homepage || "#"}
                color="blackAlpha.900"
                bg="white"
              />
            </GridItem>
            <GridItem w="full">
              <LinkButton
                as={TrackedLink}
                variant="outline"
                borderWidth="2px"
                w="full"
                py={"22px"}
                fontSize="20px"
                fontWeight="bold"
                textAlign="center"
                borderRadius="md"
                // {...{
                //   category: trackingCategory,
                //   label: secondaryButton.text
                //     .replaceAll(" ", "_")
                //     .toLowerCase(),
                // }}
                href={props?.repo?.html_url}
                isExternal={true}
                noIcon
              >
                View Repo
              </LinkButton>
            </GridItem>
          </SimpleGrid>

          <AspectRatio ratio={{ base: 16 / 9, md: 16 / 9 }} w="100%">
            <Box
              bg="#000"
              borderRadius={{ base: "md", md: "lg" }}
              as="iframe"
              src={props?.repo?.homepage}
            />
          </AspectRatio>
        </HomepageSection>
      </Flex>
    </DarkMode>
  );
};

export default TemplatePage;
TemplatePage.pageId = PageId.Template;

// server side ---------------------------------------------------------------
export const getStaticProps: GetStaticProps<SolanaProgramProps> = async (
  ctx,
) => {
  try {
    // Using the id from the context, we can fetch the data for the template from GitHub.
    const { id } = ctx.params as { id: string };

    // Fetch the repository information from GitHub.
    const repo = await fetch(
      `https://api.github.com/repos/thirdweb-example/${id}`,
    );

    const data = await repo.json();

    return {
      props: {
        repo: data,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    fallback: true,
    paths: [],
  };
};
