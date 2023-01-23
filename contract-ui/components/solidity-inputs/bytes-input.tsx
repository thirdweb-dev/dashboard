import { SolidityInputWithTypeProps } from ".";
import { Input } from "@chakra-ui/react";
import { isBytesLike } from "ethers/lib/utils";

const isValidBytes = (value: string, solidityType: string) => {
  const maxLength =
    solidityType === "byte"
      ? 1
      : solidityType === "bytes"
      ? 32
      : parseInt(solidityType.replace("bytes", ""));

  if (value === "0x") {
    return true;
  }

  if (value.startsWith("[") && value.endsWith("]")) {
    try {
      const arrayify = JSON.parse(value);
      return arrayify.length === maxLength;
    } catch (error) {
      return false;
    }
  }

  if (value.length !== maxLength) {
    return false;
  }

  if (isBytesLike(value)) {
    return true;
  }
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

    if (!isValidBytes(value, solidityType)) {
      form.setError(inputName, {
        type: "pattern",
        message: `Value is not a valid ${solidityType}.`,
      });
    } else {
      form.clearErrors(inputName);
    }
  };

  return <Input {...inputProps} onChange={handleChange} />;
};
