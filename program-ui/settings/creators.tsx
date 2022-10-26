import {
  Alert,
  AlertDescription,
  AlertIcon,
  Flex,
  FormControl,
  IconButton,
  Input,
} from "@chakra-ui/react";
import { IoMdAdd } from "@react-icons/all-files/io/IoMdAdd";
import { IoMdRemove } from "@react-icons/all-files/io/IoMdRemove";
import { PublicKey } from "@solana/web3.js";
import { useCreators, useUpdateCreators } from "@thirdweb-dev/react/solana";
import {
  CreatorInputSchema,
  NFTCollection,
  NFTDrop,
} from "@thirdweb-dev/sdk/solana";
import { TransactionButton } from "components/buttons/TransactionButton";
import { BasisPointsInput } from "components/inputs/BasisPointsInput";
import { useTrack } from "hooks/analytics/useTrack";
import { useTxNotifications } from "hooks/useTxNotifications";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Button, Card, FormErrorMessage, Heading, Text } from "tw-components";
import { z } from "zod";

interface SettingsCreatorsProps {
  program: NFTCollection | NFTDrop;
}

export const SettingsCreators: React.FC<SettingsCreatorsProps> = ({
  program,
}) => {
  const trackEvent = useTrack();
  const query = useCreators(program);
  const mutation = useUpdateCreators(program);

  console.log(query.data);

  const {
    register,
    control,
    getFieldState,
    formState,
    watch,
    setValue,
    reset,
    handleSubmit,
  } = useForm<any>();
  const { fields, append, remove } = useFieldArray({
    name: "creators",
    control,
  });

  useEffect(() => {
    if (fields.length === 0) {
      append({ address: "", sharePercentage: 100 }, { shouldFocus: false });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (query.data && !formState.isDirty) {
      reset();
      /*         query.data.map((c) => ({
          address: c.address,
          sharePercentage: c.sharePercentage,
        })), */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.data, formState.isDirty]);

  const { onSuccess, onError } = useTxNotifications(
    "Creators updated",
    "Error updating creators",
  );

  const totalPercentage =
    watch("creators")?.reduce((a: any, b: any) => a + b.sharePercentage, 0) ||
    0;

  return (
    <Card p={0} position="relative">
      <Flex
        as="form"
        onSubmit={handleSubmit((d) => {
          trackEvent({
            category: "settings",
            action: "set-creators",
            label: "attempt",
          });
          console.log(d);
          mutation.mutateAsync(d, {
            onSuccess: () => {
              trackEvent({
                category: "settings",
                action: "set-creators",
                label: "success",
              });
              reset();
              onSuccess();
            },
            onError: (error) => {
              trackEvent({
                category: "settings",
                action: "set-creators",
                label: "error",
                error,
              });
              onError(error);
            },
          });
        })}
        direction="column"
      >
        <Flex p={{ base: 6, md: 10 }} as="section" direction="column" gap={4}>
          <Heading size="title.sm">Creators</Heading>
          <Text size="body.md" fontStyle="italic">
            Determine the creators that will receive royalties for this program.
          </Text>
          <Flex gap={4} direction="column">
            {totalPercentage < 100 ? (
              <Alert status="warning" borderRadius="lg">
                <AlertIcon />
                <AlertDescription>
                  Total shares need to add up to 100%. Total shares currently
                  add up to {totalPercentage}%.
                </AlertDescription>
              </Alert>
            ) : totalPercentage > 100 ? (
              <Alert status="warning">
                <AlertIcon />
                <AlertDescription>
                  Total shares cannot go over 100%.
                </AlertDescription>
              </Alert>
            ) : null}

            <Flex direction="column" gap={2}>
              {fields.map((field, index) => {
                return (
                  <Flex
                    key={field.id}
                    gap={2}
                    direction={{ base: "column", md: "row" }}
                  >
                    <FormControl
                      isInvalid={
                        !!getFieldState(`creators.${index}.address`, formState)
                          .error
                      }
                    >
                      <Input
                        variant="filled"
                        placeholder={PublicKey.default.toBase58()}
                        {...register(`creators.${index}.address`)}
                      />
                      <FormErrorMessage>
                        {
                          getFieldState(`creators.${index}.address`, formState)
                            .error?.message
                        }
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={
                        !!getFieldState(
                          `creators.${index}.sharePercentage`,
                          formState,
                        ).error
                      }
                    >
                      <BasisPointsInput
                        variant="filled"
                        value={watch(`creators.${index}.sharePercentage`)}
                        onChange={(value) =>
                          setValue(`creators.${index}.sharePercentage`, value, {
                            shouldTouch: true,
                            shouldValidate: true,
                            shouldDirty: true,
                          })
                        }
                      />
                      <FormErrorMessage>
                        {
                          getFieldState(
                            `creators.${index}.sharePercentage`,
                            formState,
                          ).error?.message
                        }
                      </FormErrorMessage>
                    </FormControl>
                    <IconButton
                      borderRadius="md"
                      isDisabled={index === 0 || formState.isSubmitting}
                      colorScheme="red"
                      icon={<IoMdRemove />}
                      aria-label="remove row"
                      onClick={() => remove(index)}
                    />
                  </Flex>
                );
              })}
            </Flex>

            {/* then render high level controls */}
            <Flex>
              <Button
                leftIcon={<IoMdAdd />}
                onClick={() => append({ address: "", sharePercentage: 0 })}
              >
                Add Recipient
              </Button>
            </Flex>
          </Flex>
        </Flex>
        <TransactionButton
          ecosystem="solana"
          colorScheme="primary"
          transactionCount={1}
          isDisabled={query.isLoading || !formState.isDirty}
          type="submit"
          isLoading={mutation.isLoading}
          loadingText="Saving..."
          size="md"
          borderRadius="xl"
          borderTopLeftRadius="0"
          borderTopRightRadius="0"
        >
          Update Creators
        </TransactionButton>
      </Flex>
    </Card>
  );
};
