import { Flex, SimpleGrid } from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import { AppLayout } from "components/app-layouts/app";
import { PRODUCTS } from "components/product-pages/common/nav/data";
import { NextSeo } from "next-seo";
import { PageId } from "page-id";
import { Card, Heading, Link } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const helpProducts = [
  {
    title: "Wallets",
    icon: PRODUCTS.find((p) => p.label === "connect")?.icon,
    viewAllUrl: "https://portal.thirdweb.com",
    helpArticles: [
      {
        title: "How to create a wallet",
        url: "https://portal.thirdweb.com",
      },
      {
        title: "How to create a wallet 2",
        url: "https://portal.thirdweb.com",
      },
    ],
  },
  {
    title: "Contracts",
    icon: PRODUCTS.find((p) => p.label === "smart-wallet")?.icon,
    viewAllUrl: "https://portal.thirdweb.com",
    helpArticles: [
      {
        title: "How to create a wallet 3",
        url: "https://portal.thirdweb.com",
      },
      {
        title: "How to create a wallet 4",
        url: "https://portal.thirdweb.com",
      },
    ],
  },
];

const HelpPage: ThirdwebNextPage = () => {
  const title = "Help Page";
  const description = "thirdweb help page.";

  console.log(PRODUCTS.find((p) => p.label === "wallets")?.icon);

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          title,
          description,
          /*           images: [
            {
              url: `${getAbsoluteUrl()}/assets/og-image/help.png`,
              width: 1200,
              height: 630,
              alt: title,
            },
          ], */
        }}
      />
      <Flex
        direction="column"
        mx="auto"
        pb={8}
        overflowX="hidden"
        px={24}
        gap={8}
      >
        <Heading size="title.md">Popular links by products</Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={8}>
          {helpProducts.map((product) => (
            <Card key={product.title} as={Flex} flexDir="column" gap={4}>
              <Flex gap={2} alignItems="center">
                {product.icon && (
                  <ChakraNextImage
                    boxSize={6}
                    mb="-4px"
                    src={product.icon}
                    alt="icon"
                  />
                )}
                <Heading size="title.sm">{product.title}</Heading>
              </Flex>
              <Flex flexDir="column" gap={2}>
                {product.helpArticles.map((article) => (
                  <Link key={article.title} href={article.url}>
                    <Heading
                      size="label.md"
                      color="blue.500"
                      fontWeight="normal"
                    >
                      {article.title}
                    </Heading>
                  </Link>
                ))}
              </Flex>
            </Card>
          ))}
        </SimpleGrid>
      </Flex>
    </>
  );
};

export default HelpPage;
HelpPage.pageId = PageId.Help;
HelpPage.getLayout = (page, props) => {
  return (
    <AppLayout
      layout="custom-contract"
      noSEOOverride
      dehydratedState={props.dehydratedState}
    >
      {page}
    </AppLayout>
  );
};
