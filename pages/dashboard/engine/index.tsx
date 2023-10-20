import {
  Box,
  ButtonGroup,
  Divider,
  Flex,
  FormControl,
  HStack,
  Input,
  Tooltip,
} from "@chakra-ui/react";
import { AppLayout } from "components/app-layouts/app";
import { EngineSidebar } from "core-ui/sidebar/engine";
import { PageId } from "page-id";
import { FormEventHandler, useRef, useState } from "react";
import { Button, Card, Heading, Link, Text } from "tw-components";
import { ThirdwebNextPage } from "utils/types";
import { EngineAnalytics } from "components/engine/engine-analytics";
import { EngineFunctions } from "components/engine/engine-functions";
import { EngineConfiguration } from "components/engine/engine-configuration";

const EngineOverview: ThirdwebNextPage = () => {
  const [hostedEngineUrl, setHostedEngineUrl] = useState(
    "https://web3-api-akbv.chainsaw-dev.zeet.app/",
  );
  const hostedEngineUrlRef = useRef<HTMLInputElement>(null);
  const tabs = [
    {
      title: "Analytics",
      isDisabled: false,
      disabledText: "",
      children: <EngineAnalytics instance={hostedEngineUrl} />,
    },
    {
      title: "Functions",
      isDisabled: false,
      disabledText: "",
      children: <EngineFunctions instance={hostedEngineUrl} />,
    },
    {
      title: "Configuration",
      isDisabled: false,
      disabledText: "",
      children: <EngineConfiguration instance={hostedEngineUrl} />,
    },
    {
      title: "Permissions",
      isDisabled: true,
      disabledText: "",
      children: <></>,
    },
  ];

  const [tab, setTab] = useState(tabs[0].title);

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
            Engine
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

            <Flex flexDir="column" gap={{ base: 0, md: 4 }} mb={4} mt={4}>
              <Box
                w="full"
                overflow={{ base: "auto", md: "hidden" }}
                pb={{ base: 4, md: 0 }}
              >
                <ButtonGroup
                  size="sm"
                  variant="ghost"
                  spacing={2}
                  w={(tabs.length + 1) * 95}
                >
                  {tabs.map((tb) => (
                    <Tooltip
                      key={tb.title}
                      p={0}
                      bg="transparent"
                      boxShadow={"none"}
                      label={
                        tb.isDisabled ? (
                          <Card py={2} px={4} bgColor="backgroundHighlight">
                            <Text size="label.sm">
                              {tb?.disabledText || "Coming Soon"}
                            </Text>
                          </Card>
                        ) : (
                          ""
                        )
                      }
                    >
                      <Button
                        isDisabled={tb.isDisabled}
                        type="button"
                        isActive={tab === tb.title}
                        _active={{
                          bg: "bgBlack",
                          color: "bgWhite",
                        }}
                        rounded="lg"
                        onClick={() => setTab(tb.title)}
                      >
                        {tb.title}
                      </Button>
                    </Tooltip>
                  ))}
                </ButtonGroup>
              </Box>
              <Divider />
            </Flex>

            {tabs.find((t) => t.title === tab)?.children}
          </>
        )}
      </Flex>
    </Flex>
  );
};

EngineOverview.getLayout = (page, props) => (
  <AppLayout {...props} hasSidebar={true}>
    <EngineSidebar activePage="overview" />
    {page}
  </AppLayout>
);

EngineOverview.pageId = PageId.EngineOverview;

export default EngineOverview;
