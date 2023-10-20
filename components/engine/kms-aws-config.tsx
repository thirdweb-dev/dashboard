import {
  SetWalletConfigInput,
  useEngineSetWalletConfig,
  useEngineWalletConfig,
} from "@3rdweb-sdk/react/hooks/useEngine";
import { Flex, FormControl, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Button, FormLabel, Text } from "tw-components";
import { RemoveConfigButton } from "./remove-config-button";

interface KmsAwsConfigProps {
  instance: string;
}

export const KmsAwsConfig: React.FC<KmsAwsConfigProps> = ({ instance }) => {
  const { mutate: setAwsKmsConfig } = useEngineSetWalletConfig(instance);
  const { data: awsConfig } = useEngineWalletConfig(instance);

  const transformedQueryData: SetWalletConfigInput = {
    type: "aws-kms" as const,
    awsAccessKeyId:
      awsConfig?.type === "aws-kms" ? awsConfig?.awsAccessKeyId ?? "" : "",
    awsSecretAccessKey: "",
    awsRegion: awsConfig?.type === "aws-kms" ? awsConfig?.awsRegion ?? "" : "",
  };

  const form = useForm<SetWalletConfigInput>({
    defaultValues: transformedQueryData,
    values: transformedQueryData,
    resetOptions: {
      keepDirty: true,
      keepDirtyValues: true,
    },
  });

  return (
    <Flex
      as="form"
      flexDir="column"
      gap={4}
      onSubmit={form.handleSubmit((data) => setAwsKmsConfig(data))}
    >
      <Text>
        Engine supports AWS KWS for signing & sending transactions over any EVM
        chain.
      </Text>
      <Flex flexDir={{ base: "column", md: "row" }} gap={4}>
        <FormControl isRequired>
          <FormLabel>Access Key</FormLabel>
          <Input
            placeholder="e.g. AKIA..."
            autoComplete="off"
            type="text"
            {...form.register("awsAccessKeyId", { required: true })}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Secret Key</FormLabel>
          <Input
            placeholder="e.g. UW7A..."
            autoComplete="off"
            type="text"
            {...form.register("awsSecretAccessKey", { required: true })}
          />
        </FormControl>
      </Flex>
      <FormControl isRequired>
        <FormLabel>Region</FormLabel>
        <Input
          w={{ base: "full", md: "49%" }}
          placeholder="e.g. us-west-1"
          autoComplete="off"
          type="text"
          {...form.register("awsRegion", { required: true })}
        />
      </FormControl>
      <Flex justifyContent="end" gap={3}>
        <RemoveConfigButton instance={instance} />
        <Button
          w={{ base: "full", md: "inherit" }}
          colorScheme="primary"
          px={12}
          type="submit"
        >
          {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </Flex>
    </Flex>
  );
};
