import { Box } from "@chakra-ui/react";
import { ClientOnly } from "components/ClientOnly/ClientOnly";
import "swagger-ui-react/swagger-ui.css";
import dynamic from "next/dynamic";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

interface EngineExplorerProps {
  instance: string;
}

export const EngineExplorer: React.FC<EngineExplorerProps> = ({ instance }) => {
  return (
    <ClientOnly ssr={null}>
      {/*       <DarkMode> */}
      <Box /* bg="backgroundDark" */ bg="#fff" borderRadius="xl">
        <SwaggerUI
          url={`${instance}${instance.endsWith("/") ? "" : "/"}json`}
          docExpansion="none"
          persistAuthorization={true}
          withCredentials={true}
        />
      </Box>
      {/*       </DarkMode> */}
    </ClientOnly>
  );
};
