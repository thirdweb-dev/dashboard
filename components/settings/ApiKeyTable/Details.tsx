import { ApiKeyDetailsRow } from "./DetailsRow";
import { GenerateApiKeyButton } from "./GenerateButton";
import { findByName } from "./services";
import { ApiKey } from "@3rdweb-sdk/react/hooks/useApi";
import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react";
import { Card, CodeBlock, Heading, Text } from "tw-components";
import { toDateTimeLocal } from "utils/date-utils";
import { shortenString } from "utils/usedapp-external";

interface ApiKeyDetailsProps {
  apiKey: ApiKey;
  selectedSection: number;
  onSectionChange: (idx: number) => void;
}
export const ApiKeyDetails: React.FC<ApiKeyDetailsProps> = ({
  apiKey,
  selectedSection,
  onSectionChange,
}) => {
  const {
    id,
    name,
    key,
    secretMasked,
    domains,
    walletAddresses,
    createdAt,
    updatedAt,
    lastAccessedAt,
    services,
  } = apiKey;

  const servicesCount = (services || []).length;

  return (
    <Tabs defaultIndex={selectedSection} onChange={onSectionChange}>
      <TabList>
        <Tab>General</Tab>
        <Tab>Services ({servicesCount})</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <VStack alignItems="flex-start" w="full" gap={4} pt={4}>
            <ApiKeyDetailsRow
              title="Key"
              tooltip="The Key is provided in x-api-key header and restricted by the access controls (domains, wallets, services, etc.) when accessing thirdweb services."
              content={
                <CodeBlock codeValue={key} code={shortenString(key, false)} />
              }
            />

            <ApiKeyDetailsRow
              title="Secret"
              tooltip="The Secret is provided in x-api-secret header and has full, unrestricted access to all thirdweb services."
              content={
                <Box position="relative" w="full">
                  <CodeBlock code={secretMasked} canCopy={false} />
                  <GenerateApiKeyButton id={id} name={name} />
                </Box>
              }
            />

            <ApiKeyDetailsRow
              title="Allowed Domains"
              tooltip="The list of origin domains allowed to access thirdweb services via the configured Public API Key."
              content={
                domains.includes("*") ? (
                  "Any"
                ) : (
                  <CodeBlock code={domains.join("\n")} />
                )
              }
            />

            <ApiKeyDetailsRow
              title="Allowed Wallet Addresses"
              tooltip="The list of wallet address allowed to access thirdweb services via the configured Public API Key."
              content={
                walletAddresses.includes("*") ? (
                  "Any"
                ) : (
                  <CodeBlock code={walletAddresses.join("\n")} />
                )
              }
            />

            <ApiKeyDetailsRow
              title="Created"
              content={toDateTimeLocal(createdAt)}
            />
            <ApiKeyDetailsRow
              title="Last updated"
              content={toDateTimeLocal(updatedAt)}
            />
            <ApiKeyDetailsRow
              title="Last accessed"
              content={
                lastAccessedAt ? toDateTimeLocal(lastAccessedAt) : "Unknown"
              }
            />
          </VStack>
        </TabPanel>

        <TabPanel>
          <VStack alignItems="flex-start" w="full" gap={4} pt={3}>
            {servicesCount === 0 && (
              <Text>
                There are no services linked to this API Key. It can be used to
                access all thirdweb services.
              </Text>
            )}

            {servicesCount > 0 && (
              <Text size="body.md">
                Here are thirdweb services this API Key can access.
              </Text>
            )}

            {(services || []).map((srv) => {
              const service = findByName(srv.name);

              return service ? (
                <Card w="full" key={srv.id}>
                  <Heading size="label.lg" pb={1}>
                    {service.title}
                  </Heading>
                  <Text pb={3} size="body.md">
                    {service.description}
                  </Text>

                  <ApiKeyDetailsRow
                    title="Allowed Contract Addresses"
                    tooltip={`The list of contract address allowed to access thirdweb ${service.title} service via the configured Public API Key.`}
                    content={
                      srv.contractAddresses.includes("*") ? (
                        "Any"
                      ) : (
                        <CodeBlock code={srv.contractAddresses.join("\n")} />
                      )
                    }
                  />
                </Card>
              ) : null;
            })}
          </VStack>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
