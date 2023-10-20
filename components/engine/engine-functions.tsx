import { Box } from "@chakra-ui/react";
import { ClientOnly } from "components/ClientOnly/ClientOnly";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

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
