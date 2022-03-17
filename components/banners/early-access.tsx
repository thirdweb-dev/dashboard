import { Center, Link } from "@chakra-ui/layout";
import { Alert, AlertIcon, Stack, Text } from "@chakra-ui/react";
import React from "react";

export const EarlyAccessBanner: React.FC = () => {
  return (
    <Alert
      colorScheme="green"
      bg="green.100"
      status="info"
      flexShrink={0}
      py={2}
    >
      <Center w="100%">
        <Stack direction="row" align="center">
          <AlertIcon color="green.800" boxSize={4} />
          <Text color="green.800" fontSize="body.md">
            <strong>thirdweb v2 is live!</strong> Up to 10x cheaper deployments
            with 0 fees. Check out the{" "}
            <Link
              fontWeight="bold"
              color="inherit"
              href="https://nightly.thirdweb.com/dashboard"
              isExternal
            >
              new dashboard
            </Link>{" "}
            and the{" "}
            <Link
              fontWeight="bold"
              color="inherit"
              href="https://blog.thirdweb.com/thirdweb-v2"
              isExternal
            >
              announcement blog
            </Link>
            .
          </Text>
        </Stack>
      </Center>
    </Alert>
  );
};
