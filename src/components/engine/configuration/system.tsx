import {
  useEngineResourceMetrics,
  useEngineSystemHealth,
} from "@3rdweb-sdk/react/hooks/useEngine";
import { Text } from "tw-components";

interface EngineSystemProps {
  instanceUrl: string;
}

export const EngineSystem: React.FC<EngineSystemProps> = ({ instanceUrl }) => {
  const { data } = useEngineSystemHealth(instanceUrl);
  const metrics = useEngineResourceMetrics(instanceUrl);
  if (!data) {
    return null;
  }

  return (
    <Text fontSize="x-small" fontFamily="mono" opacity={0.5} gap={0}>
      Version: {data.engineVersion ?? "..."}
      <br />
      Enabled: {data.features?.join(", ")}
      <br />
      CPU: {metrics.data?.data?.cpu ?? "..."}
      <br />
      Memory: {metrics.data?.data?.memory ?? "..."}
    </Text>
  );
};
