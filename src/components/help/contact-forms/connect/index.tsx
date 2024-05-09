import { CreateTicketInput } from "@3rdweb-sdk/react/hooks/useApi";
import { FormControl, Select } from "@chakra-ui/react";
import { useFormContext, useWatch } from "react-hook-form";
import { FormLabel } from "tw-components";
import { AffectedAreaInput } from "./AffectedAreaInput";
import { ReactElement } from "react";
import { SdkVersionInput } from "../shared/SdkVersionInput";
import { ApplicationURLInput } from "../shared/ApplicationURLInput";
import DescriptionInput from "../shared/DescriptionInput";
import { UnitySupportForm } from "../shared/UnitySupportForm";

type ProblemAreaItem = {
  label: string;
  component: ReactElement;
};

const PROBLEM_AREAS: ProblemAreaItem[] = [
  {
    label: "Embedded wallet login issues",
    component: <AffectedAreaInput />,
  },
  {
    label: "Embedded wallet transaction issues",
    component: <AffectedAreaInput />,
  },
  {
    label: "Embedded wallet Custom Auth",
    component: <AffectedAreaInput />,
  },
  {
    label: "Account Abstraction",
    component: <AffectedAreaInput />,
  },
  {
    label: "React SDK",
    component: <AffectedAreaInput />,
  },
  {
    label: "TypeScript",
    component: (
      <>
        <SdkVersionInput />
        <ApplicationURLInput />
        <DescriptionInput />
      </>
    ),
  },
  {
    label: "Unity SDK",
    component: <UnitySupportForm />,
  },
];

export default function ConnectSupportForm() {
  const { register } = useFormContext<CreateTicketInput>();
  const selectedProblemArea: string =
    useWatch<CreateTicketInput>({
      name: "extraInfo_Problem_Area",
    }) || "";
  const SubFormComponent = () => {
    return (
      PROBLEM_AREAS.find((o) => o.label === selectedProblemArea)?.component || (
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
          {PROBLEM_AREAS.map((area) => (
            <option key={area.label} value={area.label}>
              {area.label}
            </option>
          ))}
        </Select>
      </FormControl>
      <SubFormComponent />
    </>
  );
}
