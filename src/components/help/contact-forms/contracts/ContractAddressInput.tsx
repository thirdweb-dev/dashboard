import { FormControl, Input } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { FormLabel } from "tw-components";

export const ContractAddressInput = () => {
  const { register } = useFormContext();
  return (
    <FormControl isRequired>
      <FormLabel>Contract address</FormLabel>
      <Input
        autoComplete="off"
        {...register("extraInfo_Contract_Address", {
          required: true,
        })}
      ></Input>
    </FormControl>
  );
};
