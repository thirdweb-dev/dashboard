import { CreateTicketInput } from "@3rdweb-sdk/react/hooks/useApi";
import { FormControl, Input, Select } from "@chakra-ui/react";
import { useFormContext, useWatch } from "react-hook-form";
import { FormLabel } from "tw-components";
import DescriptionInput from "../shared/DescriptionInput";

const ENGINE_TYPES = ["Managed", "Self-hosted"];
const ENGINE_PROBLEM_AREAS = [
  "SSL Issues",
  "Transaction queueing issues",
  "401 - Unauthorized",
  "404 - Endpoint Not Found",
  "Other",
];
export default function EngineSupportForm() {
  const { register } = useFormContext<CreateTicketInput>();
  const selectedEngineType: string =
    useWatch<CreateTicketInput>({
      name: "extraInfo_Engine_Type",
    }) || "";
  const problemArea: string =
    useWatch<CreateTicketInput>({
      name: "extraInfo_Problem_Area",
    }) || "";
  return (
    <>
      <FormControl isRequired>
        <FormLabel>Engine type</FormLabel>
        <Select {...register("extraInfo_Engine_Type", { required: true })}>
          <option value="">Select engine type</option>
          {ENGINE_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Select>
      </FormControl>
      {selectedEngineType && (
        <>
          <FormControl isRequired>
            <FormLabel>Problem area</FormLabel>
            <Select {...register("extraInfo_Problem_Area", { required: true })}>
              <option value="">Select an problem area</option>
              {ENGINE_PROBLEM_AREAS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </FormControl>

          {problemArea && (
            <>
              <FormControl isRequired>
                <FormLabel>Engine URL</FormLabel>
                <Input
                  autoComplete="off"
                  {...register("extraInfo_Engine_URL", {
                    required: true,
                  })}
                ></Input>
              </FormControl>
              <DescriptionInput />
            </>
          )}
        </>
      )}
    </>
  );
}
