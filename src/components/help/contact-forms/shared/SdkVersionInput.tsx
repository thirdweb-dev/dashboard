import { FormControl, Input } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { FormLabel } from "tw-components";

export const SdkVersionInput = () => {
  const { register } = useFormContext();
  return (
    <FormControl isRequired>
      <FormLabel>SDK version</FormLabel>
      <Input
        autoComplete="off"
        {...register("extraInfo_SDK_Version", {
          required: true,
        })}
      ></Input>
    </FormControl>
  );
};
