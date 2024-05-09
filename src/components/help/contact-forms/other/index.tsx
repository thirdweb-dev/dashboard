import { ReactElement } from "react";
import DescriptionInput from "../shared/DescriptionInput";
import { CreateTicketInput } from "@3rdweb-sdk/react/hooks/useApi";
import { useFormContext, useWatch } from "react-hook-form";
import { FormControl, Select } from "@chakra-ui/react";
import { FormLabel } from "tw-components";

type ProblemAreaItem = {
  label: string;
  component: ReactElement;
};

const OTHER_PROBLEM_AREAS: ProblemAreaItem[] = [
  {
    label: "General inquiry",
    component: (
      <>
        <DescriptionInput />
      </>
    ),
  },
  {
    label: "Security",
    component: (
      <>
        <DescriptionInput />
      </>
    ),
  },
  {
    label: "Feedback",
    component: (
      <>
        <DescriptionInput />
      </>
    ),
  },
  {
    label: "Other",
    component: (
      <>
        <DescriptionInput />
      </>
    ),
  },
];

export default function OtherSupportForm() {
  const { register } = useFormContext<CreateTicketInput>();
  const problemArea: string =
    useWatch<CreateTicketInput>({
      name: "extraInfo_Problem_Area",
    }) || "";
  const SubFormComponent = () => {
    return (
      OTHER_PROBLEM_AREAS.find((o) => o.label === problemArea)?.component || (
        <></>
      )
    );
  };
  return (
    <>
      <FormControl isRequired>
        <FormLabel>Problem area</FormLabel>
        <Select {...register("extraInfo_Problem_Area", { required: true })}>
          <option value="">Select an problem area</option>
          {OTHER_PROBLEM_AREAS.map((item) => (
            <option key={item.label} value={item.label}>
              {item.label}
            </option>
          ))}
        </Select>
      </FormControl>
      <SubFormComponent />
    </>
  );
}
