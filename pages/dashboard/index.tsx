import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAppContext } from "context/sdk/modules/app-context";
import {
  Button,
  Image,
  Heading,
  Box,
  Center,
  VStack,
  Text,
  Link,
  Flex,
  HStack,
  Spinner,
} from "@chakra-ui/react";

const AppSelector: React.FC = () => {
  const { apps, activeApp, isLoading } = useAppContext((c) => c);

  return (
    <VStack
      width="100%"
      height="100%"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <Heading size="sm">Select an App</Heading>
      {apps?.map((app) => {
        return (
          <Link
            key={app.address}
            href={`/dashboard/${app.address}`}
            width="100%"
          >
            <Flex
              p={2}
              bg="white"
              borderRadius="lg"
              width="100%"
              justifyContent="flex-start"
            >
              <VStack p={4} justifyContent="flex-start" alignItems="flex-start">
                {app.metadata?.image ? <Image src={app.metadata?.image} /> : ""}
                <Text fontSize="lg" fontWeight="medium">
                  {app.metadata?.name}
                </Text>
                <Text fontSize="sm">{app.metadata?.description}</Text>
              </VStack>
            </Flex>
          </Link>
        );
      })}
    </VStack>
  );
};

const FallbackApps: React.FC = () => {
  return (
    <Center p={8}>
      <VStack>
        <Text p={4} fontSize="xl">
          You have no apps
        </Text>
      </VStack>
    </Center>
  );
};

const DashboardPage: NextPage = () => {
  const router = useRouter();
  const { asPath } = useRouter();
  const { apps, activeApp, isLoading } = useAppContext((c) => c);

  if (isLoading) {
    return (
      <Center width="100vw" height="100vh">
        Loading...
      </Center>
    );
  }

  return (
    <Box width="100%" minH="100vh" p={8}>
      <Flex p={4} width="100%" alignItems="flex-end" justifyContent="flex-end">
        <Button
          variant="solid"
          colorScheme="teal"
          onClick={() => router.push("/create-app")}
        >
          Create An App
        </Button>
      </Flex>

      {apps?.length ? <AppSelector /> : <FallbackApps />}
    </Box>
  );
};

export default DashboardPage;
