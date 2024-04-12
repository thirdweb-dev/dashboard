import { useEngineSystemHealth } from "@3rdweb-sdk/react/hooks/useEngine";
import { Stack } from "@chakra-ui/react";
import { Text } from "tw-components";

interface EngineSystemProps {
  instanceUrl: string;
}

export const EngineSystem: React.FC<EngineSystemProps> = ({ instanceUrl }) => {
  const { data } = useEngineSystemHealth(instanceUrl);
  if (!data) {
    return null;
  }

  return (
    <Stack fontFamily="mono" fontSize="small" opacity={0.5}>
      <Text>Version: {data.engineVersion ?? "..."}</Text>
      <Text>Enabled: {data.features?.join(", ")}</Text>
    </Stack>
  );
};
