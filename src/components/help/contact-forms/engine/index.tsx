import { CreateTicketInput } from "@3rdweb-sdk/react/hooks/useApi";
import { useWatch } from "react-hook-form";
import { DescriptionInput } from "../shared/DescriptionInput";
import { SupportForm_SelectInput } from "../shared/SupportForm_SelectInput";
import { SupportForm_TextInput } from "../shared/SupportForm_TextInput";
import { AttachmentForm } from "../shared/AttachmentForm";

const ENGINE_TYPES = ["Cloud-Hosted", "Self-Hosted"];
const ENGINE_PROBLEM_AREAS = [
  "SSL Issues",
  "Transaction queueing issues",
  "401 - Unauthorized",
  "404 - Endpoint Not Found",
  "Other",
];

export default function EngineSupportForm() {
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
      <SupportForm_SelectInput
        formLabel="Problem area"
        formValue="extraInfo_Engine_Type"
        promptText="Select Engine type"
        options={ENGINE_TYPES}
        required={true}
      />
      {selectedEngineType && (
        <>
          <SupportForm_SelectInput
            formLabel="Problem area"
            formValue="extraInfo_Problem_Area"
            promptText="Select a problem area"
            options={ENGINE_PROBLEM_AREAS}
            required={true}
          />

          {problemArea && (
            <>
              <SupportForm_TextInput
                formLabel="Engine URL"
                formValue="extraInfo_Engine_URL"
                required={true}
                inputType="url"
              />
              <DescriptionInput />
              <AttachmentForm />
            </>
          )}
        </>
      )}
    </>
  );
}
