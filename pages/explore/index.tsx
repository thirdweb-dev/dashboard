import { Flex } from "@chakra-ui/react";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { AppLayout } from "components/app-layouts/app";
import { ContractRow } from "components/explore/contract-row";
import { DeployUpsellCard } from "components/explore/upsells/deploy-your-own";
import { ReleaseUpsellCard } from "components/explore/upsells/release-submit";
import { PublisherSDKContext } from "contexts/custom-sdk-context";
import {
  EXPLORE_PAGE_DATA,
  ExploreCategory,
  prefetchCategory,
} from "data/explore";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { PageId } from "page-id";
import { ThirdwebNextPage } from "pages/_app";
import React, { ReactElement } from "react";
import { Heading, Text } from "tw-components";

const ExplorePage: ThirdwebNextPage = (
  props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  return (
    <Flex direction="column" gap={{ base: 12, md: 16 }}>
      <Flex direction="column" gap={2}>
        <Heading as="h1" size="display.md">
          Explore
        </Heading>
        <Text size="body.xl" maxW="container.md">
          Welcome to the front page for smart contracts. Deploy contracts made
          by the best web3 developers with one-click.
        </Text>
      </Flex>
      {props.categories.map((category, idx) => (
        <React.Fragment key={category.id}>
          {Math.floor(props.categories.length / 2) === idx && (
            <ReleaseUpsellCard />
          )}
          <ContractRow category={category} />
        </React.Fragment>
      ))}
      <DeployUpsellCard />
    </Flex>
  );
};

ExplorePage.getLayout = (page: ReactElement) => (
  <AppLayout>
    <PublisherSDKContext>{page}</PublisherSDKContext>
  </AppLayout>
);

ExplorePage.pageId = PageId.Explore;

export default ExplorePage;

interface ExplorePageProps {
  categories: ExploreCategory[];
}

export const getStaticProps: GetStaticProps<ExplorePageProps> = async () => {
  const categories = EXPLORE_PAGE_DATA;

  // pre load the data as well
  const queryClient = new QueryClient();
  await Promise.all(categories.map((c) => prefetchCategory(c, queryClient)));

  return {
    props: { categories, dehydratedState: dehydrate(queryClient) },
  };
};
