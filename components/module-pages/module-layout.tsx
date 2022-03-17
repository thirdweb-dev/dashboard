import { EitherBaseModuleType } from "@3rdweb-sdk/react/types";
import { useWeb3 } from "@3rdweb/hooks";
import { ModuleMetadata } from "@3rdweb/sdk";
import {
  Box,
  Center,
  Container,
  Heading,
  HStack,
  Spinner,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { ModuleTab, useModuleTabs } from "components/module-tabs";
import { SupportedModule } from "constants/modules";
import { useRouter } from "next/router";
import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { UseQueryResult } from "react-query";
import { parseErrorToMessage } from "utils/errorParser";
import { removeNull } from "utils/removeNull";
import { IDistributeButtonProps } from "./action-buttons/DistributeButton";
import { IMintButtonProps } from "./action-buttons/mint-button";
import { IModuleEmptyState, ModuleEmptyState } from "./module-emptystate";
import { ModuleHeader } from "./module-header";

interface IModuleLayoutProps<
  TModule extends EitherBaseModuleType,
  TMetadata extends ModuleMetadata | undefined,
  TData,
> {
  module?: TModule;
  metadata: UseQueryResult<TMetadata>;
  data: UseQueryResult<TData>;
  primaryAction?: React.ElementType<IMintButtonProps | IDistributeButtonProps>;
  secondaryAction?: JSX.Element;
  tertiaryAction?: JSX.Element;
  emptyState?: Omit<IModuleEmptyState, "module">;
  activeTab?: number;
  setActiveTab?: Dispatch<SetStateAction<number | undefined>>;
}

export const ModuleLayout = <
  TModule extends EitherBaseModuleType,
  TMetadata extends ModuleMetadata | undefined,
  TData,
>({
  activeTab,
  setActiveTab,
  module,
  metadata,
  data,
  primaryAction,
  secondaryAction,
  tertiaryAction,
  children,
  emptyState,
}: PropsWithChildren<IModuleLayoutProps<TModule, TMetadata, TData>>) => {
  const {
    query: { tabIndex },
  } = useRouter();
  const { address } = useWeb3();
  const tabs = useModuleTabs(module as SupportedModule);
  const [tab, setTab] = useState(parseInt((tabIndex as string) || "0"));

  useEffect(() => {
    if (activeTab) {
      setTab(activeTab);
    }
  }, [activeTab]);

  useEffect(() => {
    if (tab && setActiveTab) {
      setActiveTab(tab);
    }
  }, [tab, setActiveTab]);

  const PrimaryActionButton = useMemo(() => {
    return primaryAction;
  }, [primaryAction]);

  // handle metadata still loading
  if (metadata.isLoading || !metadata.data) {
    return (
      <Center p={16}>
        <HStack>
          <Spinner size="sm" />
          <Text>Loading Module...</Text>
        </HStack>
      </Center>
    );
  }
  // handle metadata error (probably the contract doesn't exist)
  if (metadata.isError && metadata.error && metadata.error instanceof Error) {
    return (
      <Center>
        <Container>
          <Heading as="h1" size="xl">
            {parseErrorToMessage(metadata.error)}
          </Heading>
        </Container>
      </Center>
    );
  }

  return (
    <Stack spacing={8}>
      <ModuleHeader
        module={module}
        contractMetadata={metadata.data}
        primaryAction={
          PrimaryActionButton && (
            <PrimaryActionButton
              colorScheme="primary"
              module={module}
              account={removeNull(address)}
            />
          )
        }
        secondaryAction={secondaryAction}
        tertiaryAction={tertiaryAction}
      />
      <Tabs index={tab} isLazy>
        <TabList>
          <Tab>
            <Heading
              color="inherit"
              as="h4"
              size="label.lg"
              onClick={() => setTab(0)}
            >
              Overview
            </Heading>
          </Tab>
          {tabs?.map((moduleTab: ModuleTab, index: number) => (
            <Tab key={moduleTab.title} onClick={() => setTab(index + 1)}>
              <Heading color="inherit" as="h4" size="label.lg">
                {moduleTab.title}
              </Heading>
            </Tab>
          ))}
        </TabList>

        <TabPanels>
          <TabPanel px={0}>
            <Box minH="50vh" position="relative">
              {data.isRefetching && (
                <Spinner
                  color="primary"
                  size="xs"
                  position="absolute"
                  top={2}
                  right={4}
                />
              )}
              {data.isLoading ? (
                <Center position="absolute" w="full" h="full" top={0} left={0}>
                  <HStack>
                    <Spinner size="sm" />
                    <Text>Loading Module Data...</Text>
                  </HStack>
                </Center>
              ) : (!data.data ||
                  (Array.isArray(data.data) && data.data.length === 0)) &&
                emptyState ? (
                <ModuleEmptyState {...emptyState} module={module} />
              ) : (
                children
              )}
            </Box>
          </TabPanel>
          {tabs?.map((moduleTab: ModuleTab) => (
            <TabPanel px={0} key={moduleTab.title}>
              {moduleTab.content}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Stack>
  );
};
