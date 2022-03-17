import { Stack } from "@chakra-ui/react";
import { ConfigureRoyalty } from "../ConfigureRoyalty";
import { ConfigureSaleRecipient } from "../ConfigureSaleRecipient";

export const ConfigureBundleDrop: React.FC = () => {
  return (
    <Stack spacing={4}>
      <ConfigureSaleRecipient />
      <ConfigureRoyalty />
    </Stack>
  );
};
