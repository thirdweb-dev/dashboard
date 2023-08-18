import {
  Flex,
  FormControl,
  Input,
  IconButton,
  Icon,
  Divider,
  Select,
} from "@chakra-ui/react";
import React from "react";
import { useFormContext } from "react-hook-form";
import { FiTrash } from "react-icons/fi";
import { FormLabel } from "tw-components";
import { useAllVersions, usePublishedContractsQuery } from "../hooks";

interface ExtensionInputProps {
  index: number;
  remove: (index: number) => void;
}

export const ExtensionInput: React.FC<ExtensionInputProps> = ({
  index,
  remove,
}) => {
  const form = useFormContext();

  const publishedContractsQuery = usePublishedContractsQuery(
    form.watch(`defaultExtensions.${index}.publisherAddress`),
  );

  const allVersions = useAllVersions(
    form.watch(`defaultExtensions.${index}.publisherAddress`),
    form.watch(`defaultExtensions.${index}.extensionName`),
  );

  return (
    <Flex flexDir="column" gap={2}>
      <Flex w="full" gap={2}>
        <FormControl as={Flex} flexDir="column" gap={1}>
          <FormLabel textTransform="capitalize">Publisher</FormLabel>
          <Input
            placeholder="Name"
            {...form.register(`defaultExtensions.${index}.publisherAddress`)}
          />
        </FormControl>
        <FormControl as={Flex} flexDir="column" gap={1}>
          <FormLabel textTransform="capitalize">Extension Name</FormLabel>
          <Select
            isDisabled={!publishedContractsQuery.data}
            {...form.register(`defaultExtensions.${index}.extensionName`)}
          >
            {publishedContractsQuery?.data?.map(({ id }) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl as={Flex} flexDir="column" gap={1}>
          <FormLabel textTransform="capitalize">Extension Version</FormLabel>
          <Select
            isDisabled={!allVersions.data}
            {...form.register(`defaultExtensions.${index}.extensionVersion`)}
          >
            <option value="">Always latest</option>
            {allVersions?.data?.map(({ version }) => (
              <option key={version} value={version}>
                {version}
              </option>
            ))}
          </Select>
          {/*           <Input
            placeholder="Name"
            {...form.register(`defaultExtensions.${index}.extensionVersion`)}
          /> */}
        </FormControl>
        <IconButton
          icon={<Icon as={FiTrash} boxSize={5} />}
          aria-label="Remove row"
          onClick={() => remove(index)}
          alignSelf="end"
        />
      </Flex>
      <Divider />
    </Flex>
  );
};
