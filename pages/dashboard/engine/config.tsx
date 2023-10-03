import { Box, Flex, FormControl, HStack, Input } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import { AppLayout } from "components/app-layouts/app";
import { ConnectWalletPrompt } from "components/settings/ConnectWalletPrompt";
import { EngineSidebar } from "core-ui/sidebar/engine";
import { PageId } from "page-id";
import { FormEventHandler, useRef, useState } from "react";
import { Button, Heading, Link, Text } from "tw-components";
import { ThirdwebNextPage } from "utils/types";

const EngineConfigPage: ThirdwebNextPage = () => {
  const address = useAddress();
  const [hostedEngineUrl, setHostedEngineUrl] = useState("");
  const hostedEngineUrlRef = useRef<HTMLInputElement>(null);

  //   if (!address) {
  //     return <ConnectWalletPrompt />;
  //   }

  const onSubmit: FormEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setHostedEngineUrl(hostedEngineUrlRef.current?.value ?? "");
  };

  return (
    <Flex flexDir="column" gap={8} mt={{ base: 2, md: 6 }}>
      <Flex direction="column" gap={2}>
        <Flex
          justifyContent="space-between"
          direction={{ base: "column", md: "row" }}
          gap={4}
          h={10}
        >
          <Heading size="title.lg" as="h1">
            Configuration
          </Heading>
        </Flex>

        {!hostedEngineUrl ? (
          <>
            <Text>
              Enter your self-hosted Engine URL. {` `}
              <Link
                target="_blank"
                color="blue.500"
                href="https://portal.thirdweb.com/engine"
                isExternal
              >
                Learn more
              </Link>
            </Text>

            <Flex
              flexDir="column"
              as="form"
              alignItems="start"
              onSubmit={onSubmit}
            >
              <FormControl isRequired>
                <HStack w="full">
                  <Input
                    ref={hostedEngineUrlRef}
                    type="url"
                    id="url"
                    variant="outline"
                    placeholder="Enter your Engine URL"
                  />
                  <Button type="submit">Save</Button>
                </HStack>
              </FormControl>
            </Flex>
          </>
        ) : (
          <>
            <Text>
              Managing Engine instance: <em>{hostedEngineUrl}</em> {` `}
              <Button
                size="sm"
                variant="link"
                onClick={() => setHostedEngineUrl("")}
                color="blue.500"
              >
                Edit
              </Button>
            </Text>

            <Box
              borderWidth="1px"
              borderColor="gray.200"
              h={600}
              rounded="lg"
              overflow="hidden"
            >
              <iframe src="https://withpaper.com" width="100%" height="100%" />
            </Box>
          </>
        )}
      </Flex>
    </Flex>
  );
};

EngineConfigPage.getLayout = (page, props) => (
  <AppLayout {...props} hasSidebar={true}>
    <EngineSidebar activePage="config" />
    {page}
  </AppLayout>
);

EngineConfigPage.pageId = PageId.EngineConfig;

export default EngineConfigPage;
