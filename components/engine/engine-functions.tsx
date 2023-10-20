import { Box } from "@chakra-ui/react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

interface EngineFunctionsProps {
  instance: string;
}

export const EngineFunctions: React.FC<EngineFunctionsProps> = ({
  instance,
}) => {
  return (
    <Box bg="white" borderRadius="xl">
      {/* <SwaggerUI url={`${instance}json`} /> */}
    </Box>
  );
};
