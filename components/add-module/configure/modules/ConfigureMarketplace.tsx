import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  Stack,
} from "@chakra-ui/react";
import useAddModuleContext from "contexts/AddModuleContext";

export const ConfigureMarketplace: React.FC = () => {
  const { register, errors } = useAddModuleContext();

  return (
    <Stack spacing={4}>
      <FormControl isInvalid={!!errors.feeRecipient}>
        <FormLabel>Marketplace Fee</FormLabel>
        <InputGroup width="240px">
          <Input
            type="number"
            step="0.01"
            {...register("marketFeeBasisPoints")}
          />
          <InputRightAddon children="%" />
        </InputGroup>
        <FormHelperText>
          The fee taken on all sales that occur in the marketplace.
        </FormHelperText>
        <FormErrorMessage>
          {errors?.marketFeeBasisPoints?.message}
        </FormErrorMessage>
      </FormControl>
    </Stack>
  );
};
