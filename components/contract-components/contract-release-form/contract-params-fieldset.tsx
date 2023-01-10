import {
  useConstructorParamsFromABI,
  useFunctionParamsFromABI,
} from "../hooks";
import {
  Code,
  Divider,
  Flex,
  FormControl,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { getTemplateValuesForType } from "lib/deployment/tempalte-values";
import { useFormContext } from "react-hook-form";
import { Card, FormHelperText, FormLabel, Heading, Text } from "tw-components";

interface ContractParamsFieldsetProps {
  deployParams:
    | ReturnType<typeof useFunctionParamsFromABI>
    | ReturnType<typeof useConstructorParamsFromABI>;
}

export const ContractParamsFieldset: React.FC<ContractParamsFieldsetProps> = ({
  deployParams,
}) => {
  const form = useFormContext();
  return (
    <Flex gap={16} direction="column" as="fieldset">
      <Flex gap={2} direction="column">
        <Heading size="title.lg">Contract Parameters</Heading>
        <Text fontStyle="normal">
          These are the parameters users will need to fill inwhen deploying this
          contract.
        </Text>
      </Flex>
      <Flex flexDir="column" gap={10}>
        {deployParams.map((param, idx) => {
          const paramTemplateValues = getTemplateValuesForType(param.type);
          return (
            <Flex flexDir="column" gap={6} key={`implementation_${param.name}`}>
              <Flex justify="space-between" align="center">
                <Heading size="title.sm">{param.name}</Heading>
                <Text size="body.sm">{param.type}</Text>
              </Flex>
              <Flex gap={6}>
                <Flex flexDir="column" gap={4} w="60%">
                  <FormControl isInvalid={!!form.formState.errors[param.name]}>
                    <FormLabel flex="1" as={Text}>
                      Display Name
                    </FormLabel>
                    <Input
                      {...form.register(
                        `constructorParams.${param.name}.displayName`,
                      )}
                      placeholder={param.name}
                    />
                  </FormControl>
                  <FormControl isInvalid={!!form.formState.errors[param.name]}>
                    <FormLabel as={Text}>Default Value</FormLabel>

                    <Input
                      {...form.register(
                        `constructorParams.${param.name}.defaultValue`,
                      )}
                    />

                    <FormHelperText>
                      This value will be pre-filled in the deploy form.
                      {paramTemplateValues.length > 0 && (
                        <Flex
                          as={Card}
                          mt={3}
                          borderRadius="md"
                          py={3}
                          px={3}
                          direction="column"
                          gap={2}
                        >
                          <Heading as="h5" size="label.sm">
                            Supported template variables
                          </Heading>
                          <Flex direction="column">
                            {paramTemplateValues.map((val) => (
                              <Text size="body.sm" key={val.value}>
                                <Code
                                  as="button"
                                  type="button"
                                  display="inline"
                                  onClick={() => {
                                    form.setValue(
                                      `constructorParams.${param.name}.defaultValue`,
                                      val.value,
                                    );
                                  }}
                                >
                                  {val.value}
                                </Code>{" "}
                                - {val.helperText}
                              </Text>
                            ))}
                          </Flex>
                        </Flex>
                      )}
                    </FormHelperText>
                  </FormControl>
                </Flex>
                <Flex flexDir="column" w="full">
                  <FormControl>
                    <FormLabel as={Text}>Description</FormLabel>
                    <Textarea
                      height="119px"
                      {...form.register(
                        `constructorParams.${param.name}.description`,
                      )}
                      h="full"
                      maxLength={400}
                    />
                    <FormHelperText>
                      {form.watch(`constructorParams.${param.name}.description`)
                        ?.length ?? 0}
                      /400 characters
                    </FormHelperText>
                  </FormControl>
                </Flex>
              </Flex>
              {idx !== deployParams.length - 1 ? <Divider mt={8} /> : null}
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
};
