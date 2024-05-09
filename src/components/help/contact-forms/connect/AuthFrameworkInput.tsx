import { FormControl, Input } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { FormLabel } from "tw-components";

export const AuthFrameworkInput = () => {
  const { register } = useFormContext();
  return (
    <FormControl isRequired>
      <FormLabel>Auth framework</FormLabel>
      <Input
        autoComplete="off"
        {...register("extraInfo_Auth_Framework", {
          required: true,
        })}
      ></Input>
    </FormControl>
  );
};
