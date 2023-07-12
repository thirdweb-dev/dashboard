import { useSpecialDashboardApiKey } from "@3rdweb-sdk/react/hooks/useApi";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { ComponentWithChildren } from "types/component-with-children";

export interface DashboardApiKeyContext {
  apiKey: string;
  setApiKey: Dispatch<SetStateAction<string>>;
}

const DashboardApiKeyContext = createContext<DashboardApiKeyContext>({
  apiKey: "",
  setApiKey: () => undefined,
});

export const DashboardApiKeyProvider: ComponentWithChildren = ({
  children,
}) => {
  const [apiKey, setApiKey] = useState("");

  return (
    <DashboardApiKeyContext.Provider value={{ apiKey, setApiKey }}>
      {children}
    </DashboardApiKeyContext.Provider>
  );
};

export function useDashboardApiKey() {
  return useContext(DashboardApiKeyContext).apiKey;
}

// THIS HAS TO BE USED INSIDE THE ROOT THIRDWEBPROVIDER!
export const DashboardApiKeySetter: React.FC = () => {
  const apiKeyQuery = useSpecialDashboardApiKey();
  const { setApiKey } = useContext(DashboardApiKeyContext);
  useEffect(() => {
    if (apiKeyQuery.data) {
      setApiKey(apiKeyQuery.data);
    } else {
      setApiKey("");
    }
    // setApiKey is stable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKeyQuery.data]);

  return null;
};
