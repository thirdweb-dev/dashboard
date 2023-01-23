import { SolidityInputWithTypeProps } from ".";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { BigNumber, constants } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { useMemo } from "react";
import { Button } from "tw-components";

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

export const SolidityIntInput: React.FC<SolidityInputWithTypeProps> = ({
  formContext: form,
  solidityType,
  ...inputProps
}) => {
  const inputName = inputProps.name as string;

  const maxValue = useMemo(() => maxValues[solidityType], [solidityType]);
  const minValue = useMemo(() => minValues[solidityType], [solidityType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    form.setValue(inputName, value, {
      shouldDirty: true,
    });

    if (value.includes(".") || value.includes(",")) {
      form.setError(inputName, {
        type: "pattern",
        message:
          "Can't use decimals, you need to convert your input to Wei first.",
      });
    } else if (!value.match(new RegExp(`^-?\\d+$`))) {
      form.setError(inputName, {
        type: "pattern",
        message: "Input is not a valid number.",
      });
    } else if (BigNumber.from(parseInt(value) || 0).gt(maxValue)) {
      form.setError(inputName, {
        type: "maxValue",
        message: `Value is higher than what ${solidityType} can store.`,
      });
    } else if (BigNumber.from(parseInt(value) || 0).lt(minValue)) {
      form.setError(inputName, {
        type: "minValue",
        message: solidityType.startsWith("uint")
          ? `Value must be a positive number for uint types.`
          : `Value is lower than what ${solidityType} can store.}`,
      });
    } else {
      form.clearErrors(inputName);
    }
  };

  const handleConversion = () => {
    const val: string = form.getValues(inputName);

    try {
      const parsed = parseEther(val.replace(",", "."));
      form.setValue(inputName, parsed.toString(), {
        shouldDirty: true,
      });
      form.clearErrors(inputName);
    } catch (e) {
      form.setError(inputName, {
        type: "pattern",
        message: "Can't be converted to wei.",
      });
    }
  };

  return (
    <InputGroup>
      <Input
        {...inputProps}
        value={form.watch(inputName)}
        onChange={handleChange}
      />
      {(form.watch(inputName).includes(".") ||
        form.watch(inputName).includes(",")) && (
        <InputRightElement width="72px">
          <Button
            size="xs"
            padding={2}
            paddingY="3.5"
            aria-label="Convert to WEI"
            onClick={handleConversion}
            bgColor="gray.700"
            ml={2}
          >
            To Wei
          </Button>
        </InputRightElement>
      )}
    </InputGroup>
  );
};
