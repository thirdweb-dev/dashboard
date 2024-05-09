import { CreateTicketInput } from "@3rdweb-sdk/react/hooks/useApi";
import { FormControl, Select } from "@chakra-ui/react";
import { useFormContext, useWatch } from "react-hook-form";
import { FormLabel } from "tw-components";
import DescriptionInput from "../shared/DescriptionInput";
import { ReactElement } from "react";
import { NetworkInput } from "./NetworkInput";
import { ContractTypeInput } from "./ContractTypeInput";
import { ContractAddressInput } from "./ContractAddressInput";
import { ContractAffectedAreaInput } from "./ContractAffectedAreasInput";
import { ContractFunctionInput } from "./ContractFunctionInput";

type ProblemAreaItem = {
  label: string;
  component: ReactElement;
};

const CONTRACT_PROBLEM_AREAS: ProblemAreaItem[] = [
  {
    label: "Deploying a contract",
    component: (
      <>
        <NetworkInput />
        <ContractTypeInput />
        <ContractAffectedAreaInput />
        <DescriptionInput />
      </>
    ),
  },
  {
    label: "Contract verification",
    component: (
      <>
        <NetworkInput />
        <ContractAddressInput />
        <ContractTypeInput />
        <DescriptionInput />
      </>
    ),
  },
  {
    label: "Calling a function in my contract",
    component: (
      <>
        <NetworkInput />
        <ContractAddressInput />
        <ContractFunctionInput />
        <ContractAffectedAreaInput />
        <DescriptionInput />
      </>
    ),
  },
  {
    label: "Developing a custom contract",
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

export default function ContractSupportForm() {
  const { register } = useFormContext<CreateTicketInput>();
  const problemArea: string =
    useWatch<CreateTicketInput>({
      name: "extraInfo_Problem_Area",
    }) || "";
  const SubFormComponent = () => {
    return (
      CONTRACT_PROBLEM_AREAS.find((o) => o.label === problemArea)
        ?.component || <></>
    );
  };
  return (
    <>
      <FormControl isRequired>
        <FormLabel>Problem area</FormLabel>
        <Select {...register("extraInfo_Problem_Area", { required: true })}>
          <option value="">Select an problem area</option>
          {CONTRACT_PROBLEM_AREAS.map((item) => (
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
