import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  Flex,
  Icon,
  SimpleGrid,
} from "@chakra-ui/react";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { AppLayout } from "components/app-layouts/app";
import { ContractCard } from "components/explore/contract-card";
import { PublisherSDKContext } from "contexts/custom-sdk-context";
import {
  ALL_CATEGORIES,
  ExploreCategory,
  getCategory,
  prefetchCategory,
} from "data/explore";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { NextSeo } from "next-seo";
import { PageId } from "page-id";
import { ThirdwebNextPage } from "pages/_app";
import { ReactElement } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { Heading, Link, Text } from "tw-components";
import { getSingleQueryValue } from "utils/router";

const ExploreCategoryPage: ThirdwebNextPage = (
  props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  return (
    <>
      <NextSeo
        title={`Explore > ${props.category.name}`}
        description={props.category.description}
      />
      <Flex direction="column" gap={{ base: 6, md: 12 }}>
        <Flex direction="column" gap={{ base: 2, md: 4 }}>
          <Heading as="span" size="display.sm">
            <Breadcrumb fontWeight={400} separator={<Box mx={2}>/</Box>}>
              <BreadcrumbItem>
                <Link href="/explore">
                  <Flex as="span" align="center">
                    <Icon as={FiChevronLeft} />
                    Explore
                  </Flex>
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <Heading as="h1" size="display.sm">
                  <Box as="span" display={{ base: "none", md: "block" }}>
                    {props.category.name}
                  </Box>
                  <Box as="span" display={{ base: "block", md: "none" }}>
                    {props.category.shortName || props.category.name}
                  </Box>
                </Heading>
              </BreadcrumbItem>
            </Breadcrumb>
          </Heading>
          <Text size="body.xl" maxW="container.md">
            {props.category.description}
          </Text>
        </Flex>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={5}>
          {props.category.contracts.map((publishedContractId) => {
            const [publisher, contractId] = publishedContractId.split("/");
            return (
              <ContractCard
                key={publishedContractId}
                publisher={publisher}
                contractId={contractId}
              />
            );
          })}
        </SimpleGrid>
      </Flex>
    </>
  );
};

ExploreCategoryPage.getLayout = (page: ReactElement) => (
  <AppLayout>
    <PublisherSDKContext>{page}</PublisherSDKContext>
  </AppLayout>
);

ExploreCategoryPage.pageId = PageId.ExploreCategory;

export default ExploreCategoryPage;

interface ExplorePageProps {
  category: ExploreCategory;
}

export const getStaticProps: GetStaticProps<ExplorePageProps> = async (ctx) => {
  const categoryId = getSingleQueryValue(ctx.params, "category") as string;

  const category = getCategory(categoryId);
  if (!category) {
    return {
      notFound: true,
    };
  }
  // pre load the data as well
  const queryClient = new QueryClient();
  await prefetchCategory(category, queryClient);

  return {
    props: { category, dehydratedState: dehydrate(queryClient) },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ALL_CATEGORIES.map((category) => ({
      params: { category },
    })),
    fallback: false,
  };
};
