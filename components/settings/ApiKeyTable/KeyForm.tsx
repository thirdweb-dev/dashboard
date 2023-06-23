import { THIRDWEB_SERVICES, findByName } from "./services";
import { ApiKeyFormValues } from "./types";
import {
  Box,
  FormControl,
  HStack,
  Icon,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuList,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { FiChevronDown, FiTrash2 } from "react-icons/fi";
import {
  Button,
  Card,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  MenuItem,
  Text,
} from "tw-components";

interface ApiKeyKeyFormProps {
  form: UseFormReturn<ApiKeyFormValues, any>;
  selectedSection: number;
  onSubmit: () => void;
  onSectionChange: (idx: number) => void;
}
export const ApiKeyKeyForm: React.FC<ApiKeyKeyFormProps> = ({
  form,
  selectedSection,
  onSubmit,
  onSectionChange,
}) => {
  const selectedServices = form.getValues("services");

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "services",
  });

  const availableServices = useMemo(() => {
    const selectedServiceNames = (selectedServices || []).map((s) => s.name);

    return THIRDWEB_SERVICES.filter(
      (srv) => !selectedServiceNames.includes(srv.name),
    );
  }, [selectedServices]);

  return (
    <form onSubmit={onSubmit} autoComplete="off">
      <Tabs defaultIndex={selectedSection} onChange={onSectionChange}>
        <TabList>
          <Tab>General</Tab>
          <Tab>Services ({selectedServices?.length || 0})</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <VStack gap={4} pt={4}>
              <FormControl>
                <FormLabel>Key name</FormLabel>
                <Input
                  placeholder="Descriptive name"
                  type="text"
                  {...form.register("name", { minLength: 3 })}
                />
                <FormErrorMessage>
                  {form.getFieldState("name", form.formState).error?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel>Allowed Domains</FormLabel>
                <Textarea
                  placeholder="thirdweb.com, rpc.example.com"
                  {...form.register("domains")}
                />
                <FormHelperText>
                  New line or comma-separated list of domain names.
                  <br />
                  To allow any domain, set to <code>*</code>.
                </FormHelperText>
              </FormControl>

              <FormControl>
                <FormLabel>Allowed Wallet addresses</FormLabel>
                <Textarea
                  placeholder="0xa1234567890AbcC1234567Bb1bDa6c885b2886b6"
                  {...form.register("walletAddresses")}
                />
                <FormHelperText>
                  New line or comma-separated list of wallet addresses.
                  <br />
                  To allow any wallet, set to <code>*</code>.
                </FormHelperText>
              </FormControl>
            </VStack>
          </TabPanel>

          <TabPanel>
            <VStack alignItems="flex-start" w="full" gap={2} pt={3}>
              {availableServices.length > 0 && (
                <>
                  <Text size="body.md">
                    Pick thirdweb services this API Key is allowed access.
                  </Text>

                  <Menu>
                    <MenuButton
                      as={Button}
                      size="sm"
                      rightIcon={<FiChevronDown />}
                    >
                      Choose Services
                    </MenuButton>

                    <MenuList>
                      {availableServices.map((service) => {
                        return (
                          <MenuItem
                            key={service.name}
                            onClick={() =>
                              append({
                                name: service.name,
                                contractAddresses: "*",
                              })
                            }
                          >
                            <HStack gap={0} alignItems="center">
                              <Text size="label.md">{service.title}</Text>
                              <Text>-</Text>
                              <Text>{service.description}</Text>
                            </HStack>
                          </MenuItem>
                        );
                      })}
                    </MenuList>
                  </Menu>
                </>
              )}

              <VStack alignItems="flex-start" w="full" gap={4}>
                {fields.map((srv, idx) => {
                  const service = findByName(srv.name);

                  return service ? (
                    <Card w="full" key={srv.name}>
                      <HStack
                        justifyContent="space-between"
                        alignItems="flex-start"
                        pb={3}
                      >
                        <Box>
                          <Heading size="label.lg" pb={1}>
                            {service.title}
                          </Heading>
                          <Text size="body.md">{service.description}</Text>
                        </Box>

                        <IconButton
                          size="sm"
                          aria-label={`Remove ${service.title}`}
                          onClick={() => remove(idx)}
                          icon={<Icon as={FiTrash2} />}
                        />
                      </HStack>

                      <FormControl>
                        <FormLabel>Allowed Contract addresses</FormLabel>
                        <Textarea
                          placeholder="0xa1234567890AbcC1234567Bb1bDa6c885b2886b6"
                          {...form.register(
                            `services.${idx}.contractAddresses`,
                          )}
                        />
                        <FormHelperText>
                          New line or comma-separated list of contract
                          addresses.
                          <br />
                          To allow any contract, set to <code>*</code>.
                        </FormHelperText>
                      </FormControl>
                    </Card>
                  ) : null;
                })}
              </VStack>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </form>
  );
};
