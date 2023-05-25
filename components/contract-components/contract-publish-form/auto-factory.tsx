import { AbiSelector } from "./abi-selector";
import { NetworksFieldset } from "./networks-fieldset";
import { Flex, FormControl } from "@chakra-ui/react";
import { Abi } from "@thirdweb-dev/sdk";
import { useFormContext } from "react-hook-form";
import { Heading, Link, Text } from "tw-components";

interface AutoFactoryProps {
  abi: Abi;
}

export const AutoFactory: React.FC<AutoFactoryProps> = ({ abi }) => {
  const form = useFormContext();

  return (
    <Flex px={0} pb={0} flexDir="column" gap={12}>
      <Text fontStyle="normal">
        Auto factory lets users deploy your contract to any network with much
        lower gas fees. Your contract needs to be written in the upgradeable
        pattern (as per EIP-1967).{" "}
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
            Choose the initializer function to invoke on your proxy contracts.
          </Text>
        </Flex>
        <FormControl isRequired>
          <AbiSelector
            defaultValue="initialize"
            abi={abi}
            value={form.watch(
              `factoryDeploymentData.implementationInitializerFunction`,
            )}
            onChange={(selectedFn) =>
              form.setValue(
                `factoryDeploymentData.implementationInitializerFunction`,
                selectedFn,
              )
            }
          />
        </FormControl>
      </Flex>
      <NetworksFieldset />
    </Flex>
  );
};
