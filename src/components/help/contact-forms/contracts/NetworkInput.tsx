import { FormControl, Input } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { FormLabel } from "tw-components";

export const NetworkInput = () => {
  const { register } = useFormContext();
  return (
    <FormControl isRequired>
      <FormLabel>Network</FormLabel>
      <Input
        autoComplete="off"
        {...register("extraInfo_Network", {
          required: true,
        })}
      ></Input>
    </FormControl>
  );
};
