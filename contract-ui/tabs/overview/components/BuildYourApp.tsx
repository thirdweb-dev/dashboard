import { ChakraNextImage } from "../../../../components/Image";
import { Flex, GridItem, Icon, SimpleGrid } from "@chakra-ui/react";
import { PRODUCTS } from "components/product-pages/common/nav/DesktopMenu";
import { Card, Heading, Link, Text } from "tw-components";

const RENDERED_PRODUCTS = [0, 7, 8, 1];

export const BuildYourApp = () => {
  return (
    <Card p={8} gap={8} as={SimpleGrid} {...{ columns: { base: 1, md: 2 } }}>
      <GridItem as={Flex} direction="column" gap={4}>
        <Heading size="label.lg">Build your app</Heading>
        <Text size="body.md">
          Learn more about how you can use thirdweb tools to build apps on top
          of this contract
        </Text>
      </GridItem>
      <GridItem as={Flex} align="center" gap={3}>
        {RENDERED_PRODUCTS.map((num) => {
          const product = PRODUCTS[num];
          return (
            product.icon && (
              <Flex
                key={product.name}
                as={Link}
                isExternal
                href={`https://thirdweb.com${product.link}`}
                rounded="full"
                bg="#0E0E10"
                align="center"
                justify="center"
                w={14}
                h={14}
              >
                <ChakraNextImage
                  boxSize={7}
                  src={product.icon}
                  alt={product.name}
                />
              </Flex>
            )
          );
        })}
      </GridItem>
    </Card>
  );
};
