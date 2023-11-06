import { ApiKey, useApiKeys } from "@3rdweb-sdk/react/hooks/useApi";
import { useEmbeddedWallets } from "@3rdweb-sdk/react/hooks/useEmbeddedWallets";
import { Flex, Grid, HStack, Icon, Spacer } from "@chakra-ui/react";
import { AppLayout } from "components/app-layouts/app";
import { EmbeddedWallets } from "components/embedded-wallets";
import { WalletsSidebar } from "core-ui/sidebar/wallets";
import { PageId } from "page-id";
import { useEffect, useMemo, useState } from "react";
import { Card, Heading, Text, TrackedLink } from "tw-components";

import { ThirdwebNextPage } from "utils/types";
import { NoApiKeys } from "components/settings/ApiKeys/NoApiKeys";
import { ApiKeysMenu } from "components/settings/ApiKeys/Menu";
import { LoggedInOnlyView } from "components/dashboard/LoggedInOnlyView";
import { AiOutlineArrowRight } from "react-icons/ai";
import { SupportedPlatformLink } from "../../../components/wallets/SupportedPlatformLink";

const TRACKING_CATEGORY = "embedded-wallet";

const DashboardWalletsEmbedded: ThirdwebNextPage = () => {
  const keysQuery = useApiKeys();

  const [selectedKey, setSelectedKey] = useState<undefined | ApiKey>();
  const walletsQuery = useEmbeddedWallets(selectedKey?.key as string);

  const apiKeys = useMemo(() => {
    return (keysQuery?.data || []).filter((key) => {
      return !!(key.services || []).find(
        (srv) => srv.name === "embeddedWallets",
      );
    });
  }, [keysQuery]);

  const wallets = walletsQuery?.data || [];
  const hasApiKeys = apiKeys.length > 0;

  useEffect(() => {
    if (selectedKey) {
      return;
    }
    if (apiKeys.length > 0) {
      setSelectedKey(apiKeys[0]);
    } else {
      setSelectedKey(undefined);
    }
  }, [apiKeys, selectedKey]);

  return (
    <>
      <Flex flexDir="column" gap={8}>
        <Flex flexDir="column" gap={2}>
          <Flex
            justifyContent="space-between"
            direction={{ base: "column", lg: "row" }}
            gap={4}
          >
            <Heading size="title.lg" as="h1">
              Embedded Wallets
            </Heading>
            {hasApiKeys && (
              <HStack gap={3}>
                {selectedKey && (
                  <ApiKeysMenu
                    apiKeys={apiKeys}
                    selectedKey={selectedKey}
                    onSelect={setSelectedKey}
                  />
                )}
              </HStack>
            )}
          </Flex>

          <Text maxW="xl">
            A wallet infrastructure that enables apps to create, manage, and
            control their users wallets. Email login, social login, and
            bring-your-own auth supported.{" "}
            <TrackedLink
              isExternal
              href="https://portal.thirdweb.com/embedded-wallet"
              label="learn-more"
              category={TRACKING_CATEGORY}
              color="primary.500"
            >
              Learn more
            </TrackedLink>
          </Text>
        </Flex>

        {!hasApiKeys && <NoApiKeys />}

        {hasApiKeys && selectedKey && (
          <EmbeddedWallets
            apiKey={selectedKey}
            wallets={wallets}
            isLoading={walletsQuery.isLoading}
            isFetched={walletsQuery.isFetched}
            trackingCategory={TRACKING_CATEGORY}
          />
        )}
      </Flex>

      <Spacer height={20} />

      <FooterSection />
    </>
  );
};

function FooterSection() {
  return (
    <Grid templateColumns={["1fr", "1fr 1fr"]} gap={5}>
      <Grid templateColumns="1fr" gap={5}>
        <ViewDocs />
        <ShareYourFeedback />
      </Grid>
      <RelevantGuides />
    </Grid>
  );
}

function ViewDocs() {
  return (
    <Card p={5}>
      <Flex gap={2} alignItems="center">
        <Heading fontSize={16} as="h3">
          View Docs
        </Heading>
        <Icon as={AiOutlineArrowRight} width={5} height={5} />
      </Flex>

      <Spacer height={6} />

      <Grid templateColumns={"1fr 1fr"} gap={3} maxW="400px">
        <SupportedPlatformLink
          trackingCategory={TRACKING_CATEGORY}
          size="md"
          noBorder
          platform="React"
          href="https://portal.thirdweb.com/react/react.embeddedwallet"
        />

        <SupportedPlatformLink
          trackingCategory={TRACKING_CATEGORY}
          noBorder
          size="md"
          platform="Unity"
          href="https://portal.thirdweb.com/unity/wallet/embeddedwallet"
        />
        <SupportedPlatformLink
          trackingCategory={TRACKING_CATEGORY}
          noBorder
          size="md"
          platform="React Native"
          href="https://portal.thirdweb.com/react-native/react-native.embeddedwallet"
        />
        <SupportedPlatformLink
          trackingCategory={TRACKING_CATEGORY}
          noBorder
          size="md"
          platform="TypeScript"
          href="https://portal.thirdweb.com/wallet/embedded-wallet"
        />
      </Grid>
    </Card>
  );
}

function RelevantGuides() {
  return (
    <Card p={5}>
      <Flex gap={2} alignItems="center">
        <Heading fontSize={16} as="h3">
          Relevant Guides
        </Heading>
        <Icon as={AiOutlineArrowRight} width={5} height={5} />
      </Flex>

      <Spacer height={5} />

      <Flex gap={3} flexDirection="column">
        <GuideLink
          href="https://blog.thirdweb.com/what-are-embedded-wallets/"
          label="what-is-an-embedded-wallet"
        >
          What is an embedded wallet?
        </GuideLink>

        <GuideLink
          href="https://portal.thirdweb.com/embedded-wallet/getting-started"
          label="sdks-get-started"
        >
          Get started with our SDKs
        </GuideLink>

        <GuideLink
          href="https://portal.thirdweb.com/embedded-wallet/connect"
          label="how-to-connect-your-users"
        >
          How to Connect Your Users
        </GuideLink>

        <GuideLink
          href="https://portal.thirdweb.com/embedded-wallet/custom"
          label="how-to-build-your-own-ui"
        >
          How to Build Your Own UI
        </GuideLink>
      </Flex>
    </Card>
  );
}

function GuideLink(props: {
  label: string;
  children: React.ReactNode;
  href: string;
}) {
  return (
    <TrackedLink
      category={TRACKING_CATEGORY}
      label={`guide`}
      trackingProps={{
        guide: props.label,
      }}
      href={props.href}
      color="paragraph"
      isExternal
      _hover={{
        color: "blue.500",
      }}
    >
      {props.children}
    </TrackedLink>
  );
}

function ShareYourFeedback() {
  return (
    <TrackedLink
      category={TRACKING_CATEGORY}
      label="feedback"
      href="https://docs.google.com/forms/d/e/1FAIpQLSdL6H8rscuWpKkwlRvwxsCN0u4sSSL4qh6KiBFmZwn19PGGIw/viewform"
      isExternal
      _hover={{
        textDecor: "none",
        color: "blue.500",
      }}
    >
      <Card
        p={5}
        _hover={{
          borderColor: "blue.500",
        }}
      >
        <Flex gap={2} alignItems="center">
          <Heading fontSize={16} as="h3" color="inherit">
            Share your feedback
          </Heading>
          <Icon as={AiOutlineArrowRight} width={5} height={5} />
        </Flex>
        <Spacer height={3} />
        <Text color="paragraph">
          Report bugs, echo your thoughts, and suggest improvements.
        </Text>
      </Card>
    </TrackedLink>
  );
}

DashboardWalletsEmbedded.getLayout = (page, props) => (
  <AppLayout {...props} hasSidebar={true}>
    <WalletsSidebar activePage="embedded" />
    {page}
  </AppLayout>
);

DashboardWalletsEmbedded.pageId = PageId.DashboardWalletsEmbedded;

export default DashboardWalletsEmbedded;
