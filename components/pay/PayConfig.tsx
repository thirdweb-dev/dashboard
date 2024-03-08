import {
  Box,
  Divider,
  Flex,
  FormControl,
  Input,
  Spacer,
} from "@chakra-ui/react";
import {
  Button,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from "tw-components";

import { ApiKey } from "@3rdweb-sdk/react/hooks/useApi";
import {
  ApiKeyPayConfigValidationSchema,
  apiKeyPayConfigValidationSchema,
} from "components/settings/ApiKeys/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface PayConfigProps {
  apiKey: ApiKey;
}

export const PayConfig: React.FC<PayConfigProps> = ({ apiKey }) => {
  const form = useForm<ApiKeyPayConfigValidationSchema>({
    resolver: zodResolver(apiKeyPayConfigValidationSchema),
    defaultValues: {
      developerFeeBPS: 100,
      payoutAddress: "0x0000000000000000000000000000000000000000",
    },
  });

  const handleSubmit = form.handleSubmit((values) => {
    const { developerFeeBPS, payoutAddress } = values;
    console.log(`${apiKey.key} - ${developerFeeBPS} - ${payoutAddress}`);
  });

  return (
    <Flex flexDir="column">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        autoComplete="off"
      >
        <Flex flexDir="column" gap={4}>
          <Flex flexDir="column" gap={8}>
            <Flex flexDir="column" gap={6}>
              <FormControl
                isInvalid={
                  !!form.getFieldState(`payoutAddress`, form.formState).error
                }
              >
                <FormLabel size="label.sm">Payout address</FormLabel>
                <Input
                  placeholder="0x0000000000000000000000000000000000000000"
                  type="text"
                  {...form.register(`payoutAddress`)}
                />
                {!form.getFieldState(`payoutAddress`, form.formState).error ? (
                  <FormHelperText>
                    Your wallet address to receive transaction fee funds
                  </FormHelperText>
                ) : (
                  <FormErrorMessage>
                    {
                      form.getFieldState(`payoutAddress`, form.formState).error
                        ?.message
                    }
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl
                isInvalid={
                  !!form.getFieldState(`developerFeeBPS`, form.formState).error
                }
              >
                <FormLabel size="label.sm">Fee BPS</FormLabel>
                <Input
                  placeholder="https://"
                  type="text"
                  {...form.register(`developerFeeBPS`)}
                />
                {!form.getFieldState(`developerFeeBPS`, form.formState)
                  .error ? (
                  <FormHelperText>
                    The amount (in basis points) of fee you will take on each
                    transaction.
                  </FormHelperText>
                ) : (
                  <FormErrorMessage>
                    {
                      form.getFieldState(`developerFeeBPS`, form.formState)
                        .error?.message
                    }
                  </FormErrorMessage>
                )}
              </FormControl>
            </Flex>
          </Flex>
          <Spacer />
          <Divider />

          <Box alignSelf="flex-end">
            <Button type="submit" colorScheme="primary">
              Save changes
            </Button>
          </Box>
        </Flex>
      </form>
    </Flex>
  );
};
