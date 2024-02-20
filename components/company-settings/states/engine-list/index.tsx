import {
  EngineInstance,
  useEngineInstances,
} from "@3rdweb-sdk/react/hooks/useEngine";
import { Divider, Flex, Stack } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { Heading, TrackedLink } from "tw-components";
import { EngineInstancesTable } from "./engine-instances-table";
import { ImportEngineInstanceButton } from "../import-engine-instance";
import { EngineOverviewDescription } from "../../overview/company-settings-description";
import { isProd } from "constants/rpc";
import { CreateEngineInstanceButton } from "components/engine/create-engine-instance";

interface EngineInstancesListProps {
  setConnectedInstance: Dispatch<SetStateAction<EngineInstance | undefined>>;
}

export const EngineInstancesList = ({
  setConnectedInstance,
}: EngineInstancesListProps) => {
  const instancesQuery = useEngineInstances();

  return (
    <Stack spacing={8}>
      <Stack>
        <Heading size="title.lg" as="h1">
          Company Settings
        </Heading>
      </Stack>

      <Stack spacing={4}>
        {instancesQuery.data && instancesQuery.data.length === 0 ? (
          <>
            <Divider />

            <Flex
              direction={{ base: "column", md: "row" }}
              gap={3}
              justify="space-between"
            >
              <Stack>
                <Heading size="title.sm">Get Started</Heading>
                <TrackedLink
                  href={`${isProd ? "https://thirdweb.com" : "http://localhost:3000"}/dashboard/engine`}
                  isExternal
                  category="engine"
                  label="clicked-self-host-instructions"
                  color="blue.500"
                >
                  Create or import an Engine instance to get started.
                </TrackedLink>
              </Stack>
            </Flex>
            <EngineOverviewDescription />
          </>
        ) : (
          <>
            <Divider />

            <Flex
              direction={{ base: "column", md: "row" }}
              gap={3}
              justify="flex-end"
            >
              <Flex direction={{ base: "column-reverse", md: "row" }} gap={3}>
                <ImportEngineInstanceButton refetch={instancesQuery.refetch} />
                <CreateEngineInstanceButton refetch={instancesQuery.refetch} />
              </Flex>
            </Flex>

            <EngineInstancesTable
              instances={instancesQuery.data ?? ([] as EngineInstance[])}
              isFetched={instancesQuery.isFetched}
              isLoading={instancesQuery.isLoading}
              refetch={instancesQuery.refetch}
              setConnectedInstance={setConnectedInstance}
            />
          </>
        )}
      </Stack>
    </Stack>
  );
};
