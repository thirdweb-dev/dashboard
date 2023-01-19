import { SolidityAddressInput } from "./address-input";
import { SolidityBoolInput } from "./bool-input";
import { SolidityBytesInput } from "./bytes-input";
import { SolidityIntInput } from "./int-input";
import { SolidityStringInput } from "./string-input";
import { Input, InputProps } from "@chakra-ui/react";
import { UseFormReturn, useFormContext } from "react-hook-form";

export interface SolidityInputProps extends InputProps {
  formObject: UseFormReturn<any, any>;
}
export interface SolidityInputWithTypeProps extends SolidityInputProps {
  solidityType: string;
}
export interface SolidityInputPropsOptionalFormProps extends InputProps {
  solidityType: string;
  formObject?: UseFormReturn<any, any>;
}

export const SolidityInput: React.FC<SolidityInputPropsOptionalFormProps> = ({
  solidityType,
  ...inputProps
}) => {
  const formContext = useFormContext();

  const form = inputProps.formObject || formContext;

  if (!form) {
    throw new Error(
      "SolidityInput must be used within a form context provided by useFormContext or provide the formObject prop.",
    );
  }

  if (
    solidityType.startsWith("uint") ||
    (solidityType.startsWith("int") && !solidityType.endsWith("[]"))
  ) {
    return (
      <SolidityIntInput
        formObject={form}
        solidityType={solidityType}
        {...inputProps}
      />
    );
  } else if (solidityType === "address") {
    return <SolidityAddressInput formObject={form} {...inputProps} />;
  } else if (solidityType === "string") {
    return <SolidityStringInput formObject={form} {...inputProps} />;
  } else if (solidityType.startsWith("byte") && !solidityType.endsWith("[]")) {
    return (
      <SolidityBytesInput
        formObject={form}
        solidityType={solidityType}
        {...inputProps}
      />
    );
  } else if (solidityType === "bool") {
    return <SolidityBoolInput formObject={form} {...inputProps} />;
  }
  return <Input {...inputProps} />;
};
