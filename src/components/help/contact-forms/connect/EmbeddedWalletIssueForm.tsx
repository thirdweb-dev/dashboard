import { CreateTicketInput } from "@3rdweb-sdk/react/hooks/useApi";
import { FormControl, Select } from "@chakra-ui/react";
import { useFormContext, useWatch } from "react-hook-form";
import { FormLabel } from "tw-components";
import DescriptionInput from "../shared/DescriptionInput";
import { SdkVersionInput } from "../shared/SdkVersionInput";
import { ApplicationURLInput } from "../shared/ApplicationURLInput";
import { SDKSelector } from "../shared/SDKSelector";

const AFFECTED_AREAS = ["Dashboard", "Application"];

export const EmbeddedWalletIssueForm = () => {
  const { register } = useFormContext<CreateTicketInput>();
  const selectedAffectedArea = useWatch<CreateTicketInput>({
    name: "extraInfo_Affected_Area",
  });
  const selectedSDK = useWatch<CreateTicketInput>({
    name: "extraInfo_SDK",
  });
  return (
    <>
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
      {selectedAffectedArea && selectedAffectedArea === "Dashboard" && (
        <DescriptionInput />
      )}

      {selectedAffectedArea && selectedAffectedArea === "Application" && (
        <>
          <SDKSelector />
          {selectedSDK && (
            <>
              <SdkVersionInput />
              <ApplicationURLInput />
              <DescriptionInput />
            </>
          )}
        </>
      )}
    </>
  );
};
