import { Box, DarkMode } from "@chakra-ui/react";
import { ClientOnly } from "components/ClientOnly/ClientOnly";
import "swagger-ui-react/swagger-ui.css";
import dynamic from "next/dynamic";
import { useApiAuthToken } from "@3rdweb-sdk/react/hooks/useApi";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

interface EngineExplorerProps {
  instanceUrl: string;
}

export const EngineExplorer: React.FC<EngineExplorerProps> = ({
  instanceUrl,
}) => {
  const { token } = useApiAuthToken();
  return (
    <ClientOnly ssr={null}>
      <DarkMode>
        <Box bg="backgroundDark" borderRadius="xl">
          <SwaggerUI
            url={`${instanceUrl}${instanceUrl.endsWith("/") ? "" : "/"}json`}
            docExpansion="none"
            persistAuthorization={true}
            requestInterceptor={(req) => {
              req.headers["Authorization"] = `Bearer ${token}`;
              // This is required to skip the browser warning when using ngrok
              // else, Engine -> Explorer doesn't work
              req.headers["ngrok-skip-browser-warning"] = "true";
              return req;
            }}
          />
        </Box>
      </DarkMode>
    </ClientOnly>
  );
};
