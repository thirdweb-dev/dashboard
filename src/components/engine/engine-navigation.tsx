import {
  EngineInstance,
  useEngineConnectedInstance,
} from "@3rdweb-sdk/react/hooks/useEngine";
import { Divider, Flex, Stack } from "@chakra-ui/react";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Button, Heading, Text } from "tw-components";
import { EngineVersionBadge } from "./badges/version";

interface EnginePageLayoutProps {
  children: ReactNode;
}

export const EnginePageLayout: React.FC<EnginePageLayoutProps> = ({
  children,
}) => {
  const { instance, setInstance } = useEngineConnectedInstance();
  if (!instance) {
    return null;
  }

  return (
    <Stack spacing={4}>
      <Button
        onClick={() => setInstance(null)}
        variant="link"
        leftIcon={<FiArrowLeft />}
        w="fit-content"
        color="primary.500"
      >
        Back to Engine list
      </Button>

      <Stack>
        <Heading size="title.lg" as="h1" isTruncated>
          {instance.name}
        </Heading>

        <Flex gap={3} alignItems="center">
          {!instance.name.startsWith("https://") && (
            <Text color="gray.600">{instance.url}</Text>
          )}
          <EngineVersionBadge instance={instance} />
        </Flex>
      </Stack>

      <Divider />

      {children}
    </Stack>
  );
};
