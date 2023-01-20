import { SolidityInput, SolidityInputWithTypeProps } from ".";
import { SolidityRawInput } from "./raw-input";
import { Box, Flex, Icon, IconButton, InputGroup } from "@chakra-ui/react";
import { IoMdAdd } from "@react-icons/all-files/io/IoMdAdd";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { FiTrash } from "react-icons/fi";
import { Button, Text } from "tw-components";

export const SolidityArrayInput: React.FC<SolidityInputWithTypeProps> = ({
  formContext: form,
  solidityType,
  ...inputProps
}) => {
  const [showRawInput, setShowRawInput] = useState(false);
  const localForm = useForm({ defaultValues: { array: [{ value: "" }] } });
  const { fields, append, remove } = useFieldArray({
    name: "array",
    control: localForm.control,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    form.setValue(inputProps.name as string, val);
  };

  const typeWithoutArray = solidityType.replace("[]", "");

  if (showRawInput) {
    return (
      <Flex flexDir="column" gap={2}>
        <SolidityRawInput formContext={form} {...inputProps} />
        <Text
          size="label.sm"
          textAlign="right"
          color="blue.600"
          onClick={() => setShowRawInput(false)}
          cursor="pointer"
        >
          Switch to Interface
        </Text>
      </Flex>
    );
  }

  return (
    <Flex flexDir="column" gap={2}>
      {fields.map((field, index) => {
        return (
          <InputGroup key={field.id} gap={2}>
            <SolidityInput
              solidityType={typeWithoutArray}
              w="full"
              isRequired
              {...localForm.register(`array.${index}.value` as const)}
            />
            <IconButton
              aria-label="Remove"
              onClick={() => {
                remove(index);
              }}
              icon={<Icon as={FiTrash} />}
            >
              Remove
            </IconButton>
          </InputGroup>
        );
      })}
      <Flex align="center" gap={2}>
        <Box w="50%">
          <Button
            size="sm"
            leftIcon={<IoMdAdd />}
            onClick={() => append({ value: "" })}
          >
            Add Input
          </Button>
        </Box>
        <Flex w="50%" direction="column">
          <Text
            size="label.sm"
            textAlign="right"
            color="blue.600"
            onClick={() => setShowRawInput(true)}
            cursor="pointer"
          >
            Switch to Raw Input
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
