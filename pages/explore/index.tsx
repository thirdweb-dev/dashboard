import { ButtonGroup, Flex } from "@chakra-ui/react";
import { AppLayout } from "components/app-layouts/app";
import { ContractRow } from "components/explore/contract-row";
import { PublisherSDKContext } from "contexts/custom-sdk-context";
import { PageId } from "page-id";
import { ThirdwebNextPage } from "pages/_app";
import { ReactElement } from "react";
import { Button, Card, Heading, Text } from "tw-components";

const ExplorePage: ThirdwebNextPage = () => {
  return (
    <Flex direction="column" gap={{ base: 6, md: 12 }}>
      <Heading as="h1">Explore Contracts</Heading>
      <ContractRow />
      <ContractRow />

      <Card
        my={3}
        bg="black"
        borderColor="transparent"
        _light={{
          bg: "white",
          borderColor: "borderColor",
        }}
        p={8}
        borderRadius="lg"
        as={Flex}
        gap={3}
        flexDirection="column"
      >
        <Heading size="title.sm">Feature your contract</Heading>
        <Text size="body.lg">
          Releasing your contract is the best way to get your contract in front
          of our network of web3 builders.
        </Text>

        <ButtonGroup size="md">
          <Button
            bg="accent.900"
            color="accent.100"
            borderColor="accent.900"
            borderWidth="1px"
            _hover={{
              bg: "accent.100",
              color: "accent.900",
            }}
          >
            Submit Your Contract
          </Button>
          <Button
            variant="ghost"
            _hover={{
              bg: "accent.200",
            }}
          >
            Learn More
          </Button>
        </ButtonGroup>
      </Card>

      <ContractRow />
    </Flex>
  );
};

ExplorePage.getLayout = (page: ReactElement) => (
  <AppLayout>
    <PublisherSDKContext>{page}</PublisherSDKContext>
  </AppLayout>
);

ExplorePage.pageId = PageId.Contracts;

export default ExplorePage;
