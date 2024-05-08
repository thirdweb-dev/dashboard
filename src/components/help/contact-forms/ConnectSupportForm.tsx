import { CreateTicketInput } from "@3rdweb-sdk/react/hooks/useApi";
import { FormControl, Input, Select } from "@chakra-ui/react";
import { useFormContext, useWatch } from "react-hook-form";
import { FormLabel } from "tw-components";
import DescriptionInput from "./DescriptionInput";

const AFFECTED_AREAS = ["Dashboard", "Application"];
const SDKs = ["TypeScript", "React", "React Native", "Unity"];

export default function ConnectSupportForm() {
  const { register } = useFormContext<CreateTicketInput>();
  const extraInfo = useWatch<CreateTicketInput>({
    name: "extraInfo",
  }) as Record<string, string>;
  const selectedAffectedArea = extraInfo?.Affected_Area || null;
  const selectedSDK = extraInfo?.SDK || null;
  return (
    <>
      <FormControl isRequired>
        <FormLabel>Affected area</FormLabel>
        <Select {...register("extraInfo.Affected_Area", { required: true })}>
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
          <FormControl isRequired>
            <FormLabel>SDK</FormLabel>
            <Select {...register("extraInfo.SDK", { required: true })}>
              <option value="">Select SDK</option>
              {SDKs.map((sdk) => (
                <option key={sdk} value={sdk}>
                  {sdk}
                </option>
              ))}
            </Select>

            {selectedSDK && (
              <>
                <FormControl isRequired>
                  <FormLabel mt={"16px"}>SDK version</FormLabel>
                  <Input
                    id="_connect_form_sdk"
                    autoComplete="off"
                    {...register("extraInfo.SDK_Version", {
                      required: true,
                    })}
                  ></Input>
                </FormControl>
                <FormControl isRequired={false}>
                  <FormLabel mt={"16px"}>Application URL</FormLabel>
                  <Input
                    mb={"16px"}
                    autoComplete="off"
                    {...register("extraInfo.Application_URL", {
                      required: false,
                    })}
                    placeholder="https://..."
                    type="url"
                  ></Input>
                </FormControl>
                <DescriptionInput />
              </>
            )}
          </FormControl>
        </>
      )}
    </>
  );
}
