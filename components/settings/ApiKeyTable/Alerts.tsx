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
          Do not leave the allowed domains field blank if you intend to use this
          key in frontend applications (websites). Doing so will deny requests
          from all origins, rendering the key unusable. Proceed only if you will
          be using this key in server environments.
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
          You have unrestricted access enabled. Requests from all origins will
          be authorized. If your key is leaked it could be misused.
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
          Do not leave the allowed bundle IDs field blank if you intend to use
          this in mobile apps or games. Doing so will deny requests from all
          applications, rendering the key unusable. Proceed only if you will be
          using this key in server environments.
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
          You have unrestricted access enabled. Requests from all applications
          will be authorized. If your key is leaked it could be misused.
        </Text>
      </Flex>
    </Alert>
  );
};
