import { SolidityInputProps } from ".";
import { Input } from "@chakra-ui/react";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

export const SolidityIntInput: React.FC<SolidityInputProps> = ({
  type,
  ...inputProps
}) => {
  const { setValue } = useFormContext();

  const bits = useMemo(() => {
    if (type === "int" || type === "uint") {
      return 256;
    } else {
      const match = type.match(/^(int|uint)(\d+)$/);
      if (!match) {
        throw new Error(
          `Invalid type: ${type}. Expected format: "int" or "uint" or "int<number>" or "uint<number>"`,
        );
      }
      return parseInt(match[2], 10);
    }
  }, [type]);

  const isUnsigned = type.startsWith("uint");
  const maxValue = useMemo(() => Math.pow(2, bits) - 1, [bits]);
  const minValue = useMemo(
    () => (isUnsigned ? 0 : -1 * maxValue - 1),
    [isUnsigned, maxValue],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (val > maxValue) {
      setValue(inputProps.name as string, maxValue.toString());
    }
    if (val < minValue) {
      setValue(inputProps.name as string, minValue.toString());
    }
    // TODO: handle NaN
    setValue(inputProps.name as string, val.toString());
  };

  return (
    <Input
      type="number"
      pattern={isUnsigned ? "^[0-9]*.?[0-9]+$" : "^[0-9]+$"}
      max={maxValue}
      min={minValue}
      step={1}
      {...inputProps}
      onChange={handleChange}
    />
  );
};
