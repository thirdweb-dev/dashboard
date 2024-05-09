import { FormControl, Input } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { FormLabel } from "tw-components";

export const ContractTypeInput = () => {
  const { register } = useFormContext();
  return (
    <FormControl>
      <FormLabel>Contract type</FormLabel>
      <Input
        autoComplete="off"
        {...register("extraInfo_Contract_Type", {
          required: false,
        })}
      ></Input>
    </FormControl>
  );
};
