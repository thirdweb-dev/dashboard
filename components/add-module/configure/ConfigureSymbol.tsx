import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import useAddModuleContext from "contexts/AddModuleContext";

export const ConfigureSymbol: React.FC = () => {
  const { register, errors } = useAddModuleContext();

  return (
    <FormControl isInvalid={!!errors.symbol}>
      <FormLabel>Symbol</FormLabel>
      <Input {...register("symbol")} />
      <FormHelperText>
        This symbol will be used publicly to identify this module.
      </FormHelperText>
      <FormErrorMessage>{errors?.symbol?.message}</FormErrorMessage>
    </FormControl>
  );
};
