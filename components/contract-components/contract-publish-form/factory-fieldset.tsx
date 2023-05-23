import { NetworkDropdown } from "./NetworkDropdown";
import {
  Flex,
  FormControl,
  Input,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { Heading, Link, Text } from "tw-components";

export const FactoryFieldset = () => {
  const form = useFormContext();
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
              onClick={() => form.setValue("deployType", "customFactory")}
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
              <Flex flexDir="column" gap={4}>
                <Flex flexDir="column" gap={2}>
                  <Heading size="title.md">
                    Networks that your contract can be deployed to
                  </Heading>
                </Flex>
                <FormControl isRequired>
                  <Select
                    onChange={(e) =>
                      form.setValue(
                        `networksForDeployment.allNetworks`,
                        e.target.value === "all",
                      )
                    }
                  >
                    <option value="all">All networks</option>
                    <option value="specific">Specific networks</option>
                  </Select>
                </FormControl>
                {!form.watch(`networksForDeployment.allNetworks`) && (
                  <Flex flexDir="column" gap={2}>
                    <Text>Please select the networks you want to enable:</Text>
                    <NetworkDropdown
                      onChange={(networksEnabled) =>
                        form.setValue(
                          "networksForDeployment.networksEnabled",
                          networksEnabled,
                        )
                      }
                    />
                  </Flex>
                )}
              </Flex>
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
