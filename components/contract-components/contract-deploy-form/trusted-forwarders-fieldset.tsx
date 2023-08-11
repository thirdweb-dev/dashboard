import { Flex, FormControl } from "@chakra-ui/react";
import { SolidityInput } from "contract-ui/components/solidity-inputs";
import { UseFormReturn } from "react-hook-form";
import { FormErrorMessage, FormLabel, Heading, Text } from "tw-components";

interface TrustedForwardersFieldsetProps {
  form: UseFormReturn<any, any>;
}

export const TrustedForwardersFieldset: React.FC<
  TrustedForwardersFieldsetProps
> = ({ form }) => {
  return (
    <Flex pb={4} direction="column" gap={2}>
      <Heading size="label.lg">Trusted Forwarders</Heading>

      <Text size="body.md" fontStyle="italic">
        EIP-2770 forwarder contracts that enable gasless transactions for your
        contract.
      </Text>
      <Flex gap={4} direction={{ base: "column", md: "row" }}>
        <FormControl
          isRequired
          isInvalid={
            !!form.getFieldState(
              "deployParams._trustedForwarders",
              form.formState,
            ).error
          }
        >
          <FormLabel>Addreses</FormLabel>
          <SolidityInput
            solidityType="address[]"
            variant="filled"
            {...form.register("deployParams._trustedForwarders")}
          />
          <FormErrorMessage>
            {
              form.getFieldState(
                "deployParams._trustedForwarders",
                form.formState,
              ).error?.message
            }
          </FormErrorMessage>
        </FormControl>
      </Flex>
    </Flex>
  );
};
