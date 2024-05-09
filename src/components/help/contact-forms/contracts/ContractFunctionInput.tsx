import { FormControl, Input } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { FormLabel } from "tw-components";

export const ContractFunctionInput = () => {
  const { register } = useFormContext();
  return (
    <FormControl isRequired>
      <FormLabel>Contract function</FormLabel>
      <Input
        autoComplete="off"
        {...register("extraInfo_Contract_Function", {
          required: true,
        })}
      ></Input>
    </FormControl>
  );
};
