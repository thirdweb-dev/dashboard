import { CreateTicketInput } from "@3rdweb-sdk/react/hooks/useApi";
import { DescriptionInput } from "../shared/DescriptionInput";
import { ReactElement } from "react";
import { SupportForm_TextInput } from "../shared/SupportForm_TextInput";
import { SupportForm_SelectInput } from "../shared/SupportForm_SelectInput";
import { useWatch } from "react-hook-form";
import { AttachmentForm } from "../shared/AttachmentForm";

type ProblemAreaItem = {
  label: string;
  component: ReactElement;
};

const NetworkInput = () => (
  <SupportForm_TextInput
    formLabel="Network"
    formValue="extraInfo_Network"
    inputType="text"
    required={true}
  />
);

const ContractAddressInput = () => (
  <SupportForm_TextInput
    formLabel="Contract address"
    formValue="extraInfo_Contract_Address"
    required={true}
    inputType="text"
  />
);

const ContractFunctionInput = () => (
  <SupportForm_TextInput
    formLabel="Contract function"
    formValue="extraInfo_Contract_Function"
    required={true}
    inputType="text"
  />
);

const ContractTypeInput = () => (
  <SupportForm_TextInput
    formLabel="Contract type"
    formValue="extraInfo_Contract_Type"
    required={false}
    inputType="text"
  />
);

const ContractAffectedAreaInput = () => (
  <SupportForm_SelectInput
    formLabel="Contract affected area"
    formValue="extraInfo_Affected_Area"
    options={["Dashboard", "SDK"]}
    required={true}
    promptText="Select an affected area"
  />
);

const CONTRACT_PROBLEM_AREAS: ProblemAreaItem[] = [
  {
    label: "Deploying a contract",
    component: (
      <>
        <NetworkInput />
        <ContractTypeInput />
        <ContractAffectedAreaInput />
        <DescriptionInput />
        <AttachmentForm />
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
        <AttachmentForm />
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
        <AttachmentForm />
      </>
    ),
  },
  {
    label: "Developing a custom contract",
    component: (
      <>
        <DescriptionInput />
        <AttachmentForm />
      </>
    ),
  },
  {
    label: "Other",
    component: (
      <>
        <DescriptionInput />
        <AttachmentForm />
      </>
    ),
  },
];

export default function ContractSupportForm() {
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
      <SupportForm_SelectInput
        formLabel="Problem area"
        formValue="extraInfo_Problem_Area"
        promptText="Select a problem area"
        options={CONTRACT_PROBLEM_AREAS.map((o) => o.label)}
        required={true}
      />
      <SubFormComponent />
    </>
  );
}
