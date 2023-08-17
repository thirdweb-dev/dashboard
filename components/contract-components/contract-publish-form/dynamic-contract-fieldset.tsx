import {
  Box,
  Divider,
  Flex,
  FormControl,
  Icon,
  IconButton,
  Input,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FiPlus, FiTrash } from "react-icons/fi";
import { Heading, Text, Button, FormLabel } from "tw-components";

export const DynamicContractsFieldset = () => {
  const form = useFormContext();

  const { fields, append, remove } = useFieldArray({
    name: "defaultExtensions",
    control: form.control,
  });

  useEffect(() => {
    if (fields.length === 0) {
      append(
        {
          extensionName: "",
          extensionVersion: "",
          publisherAddress: "",
        },
        { shouldFocus: false },
      );
    }
  }, [fields, append, form]);

  return (
    <Flex gap={8} direction="column" as="fieldset">
      <Flex gap={2} direction="column">
        <Heading size="title.md">Dynamic Contract settings</Heading>
        <Text>You can set default extensions for your dynamic contract.</Text>
      </Flex>
      <Flex flexDir="column" gap={4}>
        {fields.map((item, index) => (
          <Flex key={item.id} flexDir="column" gap={2}>
            <Flex w="full" gap={2}>
              <FormControl as={Flex} flexDir="column" gap={1}>
                <FormLabel textTransform="capitalize">Extension Name</FormLabel>
                <Input
                  placeholder="Name"
                  {...form.register(`defaultExtensions.${index}.extensionName`)}
                />
              </FormControl>
              <FormControl as={Flex} flexDir="column" gap={1}>
                <FormLabel textTransform="capitalize">
                  Extension Version
                </FormLabel>
                <Input
                  placeholder="Name"
                  {...form.register(
                    `defaultExtensions.${index}.extensionVersion`,
                  )}
                />
              </FormControl>
              <FormControl as={Flex} flexDir="column" gap={1}>
                <FormLabel textTransform="capitalize">Publisher</FormLabel>
                <Input
                  placeholder="Name"
                  {...form.register(
                    `defaultExtensions.${index}.publisherAddress`,
                  )}
                />
              </FormControl>
              <IconButton
                isDisabled={fields.length === 1 || form.formState.isSubmitting}
                icon={<Icon as={FiTrash} boxSize={5} />}
                aria-label="Remove row"
                onClick={() => remove(index)}
                alignSelf="end"
              />
            </Flex>
            <Divider />
          </Flex>
        ))}
        <Box>
          <Button
            type="button"
            size="sm"
            colorScheme="primary"
            borderRadius="md"
            leftIcon={<Icon as={FiPlus} />}
            onClick={() =>
              append({
                extensionName: "",
                extensionVersion: "",
                publisherAddress: "",
              })
            }
          >
            Add Extension
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
};
