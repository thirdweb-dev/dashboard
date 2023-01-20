import { SolidityInput, SolidityInputWithTypeProps } from ".";
import { Flex, Input, InputGroup } from "@chakra-ui/react";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "tw-components";

export const SolidityArrayInput: React.FC<SolidityInputWithTypeProps> = ({
  formContext: form,
  solidityType,
  ...inputProps
}) => {
  const localForm = useForm({ defaultValues: { array: [{ value: "" }] } });
  const { fields, append, remove } = useFieldArray({
    name: "array",
    control: localForm.control,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    form.setValue(inputProps.name as string, val);
  };

  console.log(fields);

  return (
    <>
      {/*       <Input {...inputProps} onChange={handleChange} /> */}
      <Flex flexDir="column">
        {/*         {fields.map((field, index) => {
          return (
            <SolidityInput
              solidityType={solidityType}
              key={field.id}
              w="full"
               {...localForm.register(`array.${index}.value` as const)}
              onChange={(e) => {
                const val = e.target.value;
                localForm.setValue(`array.${index}.value`, val);
                form.setValue(inputProps.name as string, localForm.getValues());
              }}
            />
          );
        })} */}
      </Flex>
      <Button
        onClick={() => {
          append({ value: "" });
        }}
      >
        Add
      </Button>
      <Button
        onClick={() => {
          remove(fields.length - 1);
        }}
      >
        Remove
      </Button>
    </>
  );
};
