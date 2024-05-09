import { FormControl, Input } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { FormLabel } from "tw-components";

export const ApplicationURLInput = () => {
  const { register } = useFormContext();
  return (
    <FormControl isRequired={false}>
      <FormLabel>Application URL</FormLabel>
      <Input
        autoComplete="off"
        {...register("extraInfo_Application_URL", {
          required: false,
        })}
        placeholder="https://..."
        type="url"
      ></Input>
    </FormControl>
  );
};
