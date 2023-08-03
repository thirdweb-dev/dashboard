import {
  Alert,
  AlertDescription,
  AlertTitle,
  Flex,
  Kbd,
} from "@chakra-ui/react";

import { Heading, Text } from "tw-components";

export const NoDomainsAlert = () => {
  return (
    <Alert status="error" variant="left-accent">
      <Flex direction="column" gap={1.5}>
        <Heading size="label.md" as={AlertTitle}>
          No Domains Configured
        </Heading>
        <Text size="body.sm" as={AlertDescription}>
          This Client ID cannot be used from the web until at least one domain
          is configured. To allow access from any domain, use the wildcard:{" "}
          <Kbd>*</Kbd>
        </Text>
      </Flex>
    </Alert>
  );
};

export const AnyDomainAlert = () => {
  return (
    <Alert status="warning" variant="left-accent">
      <Flex direction="column" gap={1.5}>
        <Heading size="label.md" as={AlertTitle}>
          Unrestricted Web Access
        </Heading>
        <Text size="body.sm" as={AlertDescription}>
          This Client ID can be used from any domain. Anyone with the key can
          use it to access all the services enabled for this key.
        </Text>
      </Flex>
    </Alert>
  );
};

export const NoBundleIdsAlert = () => {
  return (
    <Alert status="error" variant="left-accent">
      <Flex direction="column" gap={1.5}>
        <Heading size="label.md" as={AlertTitle}>
          No Bundle IDs Configured
        </Heading>
        <Text size="body.sm" as={AlertDescription}>
          This Client ID cannot be used from the native app until at least one
          bundle ID is configured. To allow access from any app bundle, use the
          wildcard: <Kbd>*</Kbd>
        </Text>
      </Flex>
    </Alert>
  );
};

export const AnyBundleIdAlert = () => {
  return (
    <Alert status="warning" variant="left-accent">
      <Flex direction="column" gap={1.5}>
        <Heading size="label.md" as={AlertTitle}>
          Unrestricted App Access
        </Heading>
        <Text size="body.sm" as={AlertDescription}>
          This Client ID can be used from any app bundle. Anyone with the key
          can use it to access all the services enabled for this key.
        </Text>
      </Flex>
    </Alert>
  );
};
