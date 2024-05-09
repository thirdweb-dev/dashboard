import { FormControl, Select } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { FormLabel } from "tw-components";

const SDKs = ["TypeScript", "React", "React Native", "Unity"];

export const SDKSelector = () => {
  const { register } = useFormContext();
  return (
    <FormControl isRequired>
      <FormLabel>SDK</FormLabel>
      <Select {...register("extraInfo_SDK", { required: true })}>
        <option value="">Select SDK</option>
        {SDKs.map((sdk) => (
          <option key={sdk} value={sdk}>
            {sdk}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};
