import {
  useEngineBackendWallets,
  useEngineTransactions,
} from "@3rdweb-sdk/react/hooks/useEngine";

interface EngineAnalyticsProps {
  instance: string;
}

export const EngineAnalytics: React.FC<EngineAnalyticsProps> = ({
  instance,
}) => {
  const backendWallets = useEngineBackendWallets(instance);
  const transactions = useEngineTransactions(instance);

  console.log({ backendWallets, transactions });

  return <div>hello</div>;
};
