import { CreateTicketInput } from "@3rdweb-sdk/react/hooks/useApi";
import { FormControl, Select } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { FormLabel } from "tw-components";

const AFFECTED_AREAS = ["Dashboard", "SDK"];

export const ContractAffectedAreaInput = () => {
  const { register } = useFormContext<CreateTicketInput>();
  return (
    <FormControl isRequired>
      <FormLabel>Affected area</FormLabel>
      <Select {...register("extraInfo_Affected_Area", { required: true })}>
        <option value="">Select an affected area</option>
        {AFFECTED_AREAS.map((area) => (
          <option key={area} value={area}>
            {area}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};
