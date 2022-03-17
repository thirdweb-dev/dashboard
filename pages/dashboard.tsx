import { useProjects } from "@3rdweb-sdk/react/hooks/useDashboard";
import { useWeb3 } from "@3rdweb/hooks";
import {
  Badge,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { AppLayout } from "components/app-layouts/app";
import { AppDetailCard } from "components/AppDetailCard";
import { CreateProjectButton } from "components/dashboard/CreateProjectButton";
import { NoProjectsFound } from "components/dashboard/NoProjectsFound";
import { Card } from "components/layout/Card";
import { useEffect, useMemo, useState } from "react";
import { ConnectWalletButton } from "../components/dashboard/ConnectWallet";
import { ConsolePage } from "./_app";

type Filter = "all" | "mainnet" | "testnet";

const Dashboard: ConsolePage = () => {
  const { getNetworkMetadata, address, chainId } = useWeb3();
  const [currentFilter, setCurrentFilter] = useState<Filter>("all");
  const { data: projects, isLoading } = useProjects();

  // TODO make this better once we have a better way to do this
  const [timedOut, setTimeOut] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setTimeOut(true);
    }, 2000);
    return () => {
      clearTimeout(t);
    };
  }, []);

  const filteredProjects = useMemo(() => {
    switch (currentFilter) {
      case "mainnet":
        return (projects || []).filter(
          (project) => !getNetworkMetadata(project.chainId).isTestnet,
        );
      case "testnet":
        return (projects || []).filter(
          (project) => getNetworkMetadata(project.chainId).isTestnet,
        );
      default:
        return projects || [];
    }
  }, [currentFilter, getNetworkMetadata, projects]);

  if (isLoading || (!timedOut && !address)) {
    return (
      <Stack spacing={12} align="center">
        <Stack direction="row" align="center" spacing={4}>
          <Spinner />
          <Heading size="label.md">Fetching projects...</Heading>
        </Stack>
      </Stack>
    );
  }

  if (!address) {
    return <ConnectWalletButton />;
  }

  if (!isLoading && projects?.every(({ projects: prj }) => prj.length === 0)) {
    return <NoProjectsFound />;
  }

  return (
    <Stack spacing={5} minHeight="600px">
      <Flex justifyContent="space-between" align="center">
        <Heading size="title.md">Your projects</Heading>
        <CreateProjectButton />
      </Flex>
      <ButtonGroup isAttached size="sm" variant="outline">
        <Button
          w={20}
          bg={currentFilter === "all" ? "gray.100" : "white"}
          _hover={{
            bg: "gray.200",
          }}
          onClick={() => setCurrentFilter("all")}
        >
          All
        </Button>
        <Button
          w={20}
          bg={currentFilter === "mainnet" ? "gray.100" : "white"}
          _hover={{
            bg: "gray.200",
          }}
          onClick={() => setCurrentFilter("mainnet")}
        >
          Mainnet
        </Button>
        <Button
          w={20}
          bg={currentFilter === "testnet" ? "gray.100" : "white"}
          _hover={{
            bg: "gray.200",
          }}
          onClick={() => setCurrentFilter("testnet")}
        >
          Testnet
        </Button>
      </ButtonGroup>
      {filteredProjects.map(
        (project) =>
          project.projects.length > 0 && (
            <Card key={project.chainId} p={5}>
              <Stack>
                <HStack mb={2} spacing={3}>
                  <Icon
                    border="1px solid"
                    borderColor="rgba(0, 0, 0, 0.1)"
                    borderRadius="full"
                    padding={1.5}
                    as={getNetworkMetadata(project.chainId).icon as any}
                    boxSize={8}
                    overflow="visible"
                  />
                  <Stack spacing={0}>
                    <Heading size="subtitle.sm" lineHeight={1}>
                      {getNetworkMetadata(project.chainId).chainName}{" "}
                      <Text fontSize={"inherit"} as="span" fontWeight={400}>
                        ({project.projects.length})
                      </Text>
                    </Heading>
                    <Text
                      size="label.sm"
                      textTransform="capitalize"
                      lineHeight={1}
                      color="gray.500"
                    >
                      {getNetworkMetadata(project.chainId).isTestnet
                        ? "Testnet"
                        : "Mainnet"}
                    </Text>
                  </Stack>
                  {project.chainId === chainId && (
                    <Badge
                      textTransform="initial"
                      bg="blue.100"
                      border="1px solid"
                      borderColor="blue.200"
                      color="blue.800"
                      colorScheme="blue"
                      py={2}
                      px={4}
                      borderRadius="md"
                      fontWeight={500}
                    >
                      Your wallet is currently connected to this network.
                    </Badge>
                  )}
                </HStack>
                <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4}>
                  {project.projects.map((app) => (
                    <AppDetailCard
                      key={app.address}
                      contract={app}
                      chainId={project.chainId}
                    />
                  ))}
                </SimpleGrid>
              </Stack>
            </Card>
          ),
      )}
    </Stack>
  );
};

Dashboard.Layout = AppLayout;

export default Dashboard;
