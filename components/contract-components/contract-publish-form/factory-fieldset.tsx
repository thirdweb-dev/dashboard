import { NetworkDropdown } from "./NetworkDropdown";
import { NetworksFieldset } from "./networks-fieldset";
import {
  Box,
  Flex,
  FormControl,
  Icon,
  IconButton,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { FiPlus, FiTrash } from "react-icons/fi";
import { Button, Heading, Link, Text } from "tw-components";

export const FactoryFieldset = () => {
  const form = useFormContext();

  const { fields, append, remove } = useFieldArray({
    name: "factoryDeploymentData.customFactoryInput.customFactoryAddresses",
    control: form.control,
  });

  useEffect(() => {
    if (fields.length === 0) {
      append({ key: "", value: "" }, { shouldFocus: false });
    }
  }, [fields, append]);

  return (
    <Flex gap={12} direction="column" as="fieldset">
      <Flex gap={2} direction="column">
        <Heading size="title.lg">Factory deploy settings</Heading>
        <Tabs isLazy lazyBehavior="keepMounted" colorScheme="gray" pt={4}>
          <TabList
            px={0}
            borderBottomColor="borderColor"
            borderBottomWidth="1px"
          >
            <Tab
              gap={2}
              onClick={() => form.setValue("deployType", "autoFactory")}
            >
              <Heading size="label.lg">Auto Factory (Proxy Contracts)</Heading>
            </Tab>
            <Tab
              gap={2}
              onClick={() => {
                form.setValue("deployType", "customFactory");
                form.setValue("networksForDeployment.allNetworks", false);
              }}
            >
              <Heading size="label.lg">Custom Factory (Advanced)</Heading>
            </Tab>
          </TabList>
          <TabPanels pt={2}>
            <TabPanel px={0} pb={0} as={Flex} flexDir="column" gap={12}>
              <Text fontStyle="normal">
                Auto factory lets users deploy your contract to any network with
                much lower gas fees. Your contract needs to be written in the
                upgradeable pattern (as per EIP-1967).{" "}
                <Link
                  href="https://portal.thirdweb.com/publish/factory-contracts"
                  color="blue.600"
                >
                  Learn more
                </Link>
                .
              </Text>
              <Flex flexDir="column" gap={4}>
                <Flex flexDir="column" gap={2}>
                  <Heading size="title.md">Initializer function</Heading>
                  <Text>
                    Choose the initializer function to invoke on your proxy
                    contracts.
                  </Text>
                </Flex>
                <FormControl isRequired>
                  {/** TODO this should be a selector of ABI functions **/}
                  <Input
                    value={
                      form.watch(
                        `factoryDeploymentData.implementationInitializerFunction`,
                      )?.name
                    }
                    onChange={(e) =>
                      form.setValue(
                        `factoryDeploymentData.implementationInitializerFunction`,
                        e.target.value,
                      )
                    }
                    placeholder="Function name to invoke"
                    defaultValue="initialize"
                  />
                </FormControl>
              </Flex>
              <NetworksFieldset />
            </TabPanel>
            <TabPanel px={0} pb={0} as={Flex} flexDir="column" gap={12}>
              <Text fontStyle="normal">
                Custom factory lets you specify what function should be called
                when a user attempts to deploy your contract. You need to deploy
                your factory contract to every network that you want your
                contract to support.{" "}
                <Link
                  href="https://portal.thirdweb.com/publish/factory-contracts"
                  color="blue.600"
                >
                  Learn more
                </Link>
                .
              </Text>
              <Flex flexDir="column" gap={4}>
                {fields.map((field, index) => (
                  <div key={field.id}>
                    <FormControl isRequired as={Flex} gap={4}>
                      <Box w={{ base: "full", md: "30%" }}>
                        <Controller
                          name={`factoryDeploymentData.customFactoryInput.customFactoryAddresses[${index}].key`}
                          control={form.control}
                          render={({ field: _field }) => (
                            <NetworkDropdown
                              {..._field}
                              onSingleChange={(value) => {
                                _field.onChange(value);
                              }}
                              value={_field.value}
                            />
                          )}
                        />
                      </Box>
                      <Box w="full">
                        <Input
                          {...form.register(
                            `factoryDeploymentData.customFactoryInput.customFactoryAddresses[${index}].value`,
                          )}
                          placeholder="Factory contract address"
                        />
                      </Box>
                      <IconButton
                        isDisabled={
                          fields.length === 1 || form.formState.isSubmitting
                        }
                        icon={<Icon as={FiTrash} boxSize={5} />}
                        aria-label="Remove row"
                        onClick={() => remove(index)}
                      />
                    </FormControl>
                  </div>
                ))}
                <Box>
                  <Button
                    type="button"
                    size="sm"
                    colorScheme="primary"
                    borderRadius="md"
                    leftIcon={<Icon as={FiPlus} />}
                    onClick={() => append({ key: "", value: "" })}
                  >
                    Add Network
                  </Button>
                </Box>
              </Flex>
              <Flex flexDir="column" gap={4}>
                <Flex flexDir="column" gap={2}>
                  <Heading size="title.md">Factory function</Heading>
                  <Text>
                    Choose the factory function to deploy your contracts.
                  </Text>
                </Flex>
                <FormControl isRequired>
                  {/** TODO this should be a selector of ABI functions **/}
                  <Input
                    value={
                      form.watch(
                        `factoryDeploymentData.customFactoryInput.factoryFunction`,
                      )?.name
                    }
                    onChange={(e) =>
                      form.setValue(
                        `factoryDeploymentData.customFactoryInput.factoryFunction`,
                        e.target.value,
                      )
                    }
                    placeholder="Function name to invoke"
                    defaultValue="deployProxyByImplementation"
                  />
                </FormControl>
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
};
