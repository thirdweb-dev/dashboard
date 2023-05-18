import { NetworkDropdown } from "./NetworkDropdown";
import { Flex, FormControl, Input, Select } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { Heading, Link, Text } from "tw-components";

export const FactoryFieldset = () => {
  const form = useFormContext();
  return (
    <Flex gap={12} direction="column" as="fieldset">
      <Flex gap={2} direction="column">
        <Heading size="title.lg">Factory deploy settings</Heading>
        <Text fontStyle="normal">
          Auto factory lets users deploy your contract to any network with much
          lower gas fees. Your contract needs to be written in the upgradeable
          pattern (as per EIP-1967).{" "}
          <Link
            href="https://portal.thirdweb.com/publish#factory-deploys"
            color="blue.600"
          >
            Learn more
          </Link>
          .
        </Text>
      </Flex>
      <Flex flexDir="column" gap={4}>
        <Flex flexDir="column" gap={2}>
          <Heading size="title.md">Initializer function</Heading>
          <Text>
            Choose the initializer function to invoke on your proxy contracts.
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
    </Flex>
  );
};
