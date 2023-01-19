import { SolidityInputProps } from ".";
import { Input } from "@chakra-ui/react";
import { BigNumber, constants } from "ethers";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

// I tried getting these from constants but they were nowhere to be found, only some, so hardcoding the rest.
const minValues: Record<string, BigNumber> = {
  int8: BigNumber.from("-128"),
  int16: BigNumber.from("-32768"),
  int32: BigNumber.from("-2147483648"),
  int64: BigNumber.from("-9223372036854775808"),
  int128: BigNumber.from("-170141183460469231731687303715884105728"),
  int256: BigNumber.from(constants.MinInt256),
  int: BigNumber.from(constants.MinInt256),
  uint8: BigNumber.from(0),
  uint16: BigNumber.from(0),
  uint32: BigNumber.from(0),
  uint64: BigNumber.from(0),
  uint128: BigNumber.from(0),
  uint256: BigNumber.from(0),
  uint: BigNumber.from(0),
};

const maxValues: Record<string, BigNumber> = {
  int8: BigNumber.from("127"),
  int16: BigNumber.from("32767"),
  int32: BigNumber.from("2147483647"),
  int64: BigNumber.from("9223372036854775807"),
  int128: BigNumber.from("170141183460469231731687303715884105727"),
  int256: constants.MaxInt256,
  int: constants.MaxInt256,
  uint8: BigNumber.from("255"),
  uint16: BigNumber.from("65535"),
  uint32: BigNumber.from("4294967295"),
  uint64: BigNumber.from("18446744073709551615"),
  uint128: BigNumber.from("340282366920938463463374607431768211455"),
  uint256: constants.MaxUint256,
  uint: constants.MaxUint256,
};

export const SolidityIntInput: React.FC<SolidityInputProps> = ({
  solidityType,
  ...inputProps
}) => {
  const { setValue, setError, clearErrors } = useFormContext();

  const maxValue = useMemo(() => maxValues[solidityType], [solidityType]);
  const minValue = useMemo(() => minValues[solidityType], [solidityType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (isNaN(parseInt(val))) {
      setError(inputProps.name as string, {
        type: "pattern",
        message: "Input is not a valid number.",
      });
    } else if (BigNumber.from(val).gt(maxValue)) {
      setError(inputProps.name as string, {
        type: "maxValue",
        message: `Value is higher than what ${solidityType} can store.`,
      });
    } else if (BigNumber.from(val).lt(minValue)) {
      setError(inputProps.name as string, {
        type: "minValue",
        message: solidityType.startsWith("uint")
          ? `Value must be a positive number for uint types.`
          : `Value is lower than what ${solidityType} can store.}`,
      });
    } else {
      setValue(inputProps.name as string, val.toString());
      clearErrors(inputProps.name as string);
    }
  };

  return (
    <Input
      pattern="^[0-9]*$"
      max={maxValue.toString()}
      min={minValue.toString()}
      step={1}
      {...inputProps}
      type="number"
      onChange={handleChange}
    />
  );
};
