import { Box } from "@chakra-ui/react";
import { ClientOnly } from "components/ClientOnly/ClientOnly";
import "swagger-ui-react/swagger-ui.css";
import dynamic from "next/dynamic";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

interface EngineFunctionsProps {
  instance: string;
}

export const EngineFunctions: React.FC<EngineFunctionsProps> = ({
  instance,
}) => {
  return (
    <ClientOnly ssr={null}>
      <Box bg="white" borderRadius="xl">
        <SwaggerUI url={`${instance}json`} />
      </Box>
    </ClientOnly>
  );
};
