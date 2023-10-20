import {
  useEngineSetWalletConfig,
  useEngineWalletConfig,
} from "@3rdweb-sdk/react/hooks/useEngine";
import React from "react";
import { Button } from "tw-components";

interface RemoveConfigButtonProps {
  instance: string;
}

export const RemoveConfigButton: React.FC<RemoveConfigButtonProps> = ({
  instance,
}) => {
  const { mutate: setWalletConfig } = useEngineSetWalletConfig(instance);
  const { data: walletConfig } = useEngineWalletConfig(instance);

  if (walletConfig?.type === "local") {
    return null;
  }

  return (
    <Button
      type="button"
      onClick={() => setWalletConfig({ type: "local" })}
      variant="ghost"
    >
      Remove Config
    </Button>
  );
};
