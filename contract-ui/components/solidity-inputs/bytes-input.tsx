import { SolidityInputWithTypeProps } from ".";
import { Input } from "@chakra-ui/react";
import { isBytesLike } from "ethers/lib/utils";

const isValidBytes = (value: string, solidityType: string) => {
  const isBytesType = solidityType === "bytes";

  const maxLength =
    solidityType === "byte"
      ? 1
      : parseInt(solidityType.replace("bytes", "") || "0", 10);

  if (value === "[]" || value === "0x00") {
    return true;
  }

  if (value.startsWith("[") && value.endsWith("]")) {
    try {
      const arrayify = JSON.parse(value);
      return isBytesType ? !!arrayify.length : arrayify.length === maxLength;
    } catch (error) {
      return false;
    }
  }

  if (!isBytesType && value.length !== maxLength) {
    return false;
  }

  return isBytesLike(value);
};

export const SolidityBytesInput: React.FC<SolidityInputWithTypeProps> = ({
  formContext: form,
  solidityType,
  ...inputProps
}) => {
  const inputName = inputProps.name as string;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    form.setValue(inputName, value, { shouldDirty: true });

    if (!value.startsWith("0x") && !value.startsWith("[")) {
      form.setError(inputName, {
        type: "pattern",
        message: `Invalid input. Accepted formats are hex strings (0x...) or array of numbers ([...]).`,
      });
    } else if (!isValidBytes(value, solidityType)) {
      form.setError(inputName, {
        type: "pattern",
        message: `Value is not a valid ${solidityType}. Please check the length.`,
      });
    } else {
      form.clearErrors(inputName);
    }
  };

  return <Input {...inputProps} onChange={handleChange} />;
};
