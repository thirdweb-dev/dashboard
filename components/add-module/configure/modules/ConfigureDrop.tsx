import { Stack } from "@chakra-ui/react";
import { ConfigureRoyalty } from "../ConfigureRoyalty";
import { ConfigureSaleRecipient } from "../ConfigureSaleRecipient";
import { ConfigureSymbol } from "../ConfigureSymbol";

export const ConfigureDrop: React.FC = () => {
  return (
    <Stack spacing={4}>
      <ConfigureSymbol />
      <ConfigureSaleRecipient />
      <ConfigureRoyalty />
    </Stack>
  );
};
