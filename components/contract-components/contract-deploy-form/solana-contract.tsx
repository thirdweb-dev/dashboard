import { useContractPublishMetadataFromURI } from "../hooks";
import { Divider, Flex, FormControl, Input, Textarea } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  NFTCollectionMetadataInputSchema,
  NFTDropContractSchema,
  TokenMetadataInputSchema,
} from "@thirdweb-dev/solana";
import { FileInput } from "components/shared/FileInput";
import { SolContractType } from "constants/mappings";
import { useImageFileOrUrl } from "hooks/useImageFileOrUrl";
import { useMemo } from "react";
import {
  FieldPath,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  Heading,
  Text,
  TrackedLink,
} from "tw-components";
import { z } from "zod";

const SOL_DEPLOY_SCHEMAS = {
  "nft-collection": NFTCollectionMetadataInputSchema,
  token: TokenMetadataInputSchema,
  "nft-drop": NFTDropContractSchema,
} as const;

function useDeployForm<TContractType extends SolContractType>(
  deploySchema: typeof SOL_DEPLOY_SCHEMAS[TContractType],
) {
  const { handleSubmit: _handleSubmit, ...restForm } = useForm<
    z.infer<typeof deploySchema>
  >({
    resolver: zodResolver(deploySchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    criteriaMode: "all",
  });

  function handleSubmit(
    onValid: SubmitHandler<z.infer<typeof deploySchema>>,
    onInvalid?: SubmitErrorHandler<z.infer<typeof deploySchema>>,
  ) {
    return _handleSubmit((d) => {
      onValid(stripNullishKeys(d));
    }, onInvalid);
  }

  return { ...restForm, handleSubmit };
}

function stripNullishKeys<T extends object>(obj: T) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value || value === 0) {
      acc[key as keyof T] = value;
    }
    return acc;
  }, {} as T);
}

type BuiltinSolanaDeployFormProps<TContractType extends SolContractType> = {
  formId: string;
  contractType: TContractType;
  onSubmitForm: (
    data: z.output<typeof SOL_DEPLOY_SCHEMAS[TContractType]>,
  ) => Promise<void> | void;
};
const BuiltinSolanaDeployForm = <TContractType extends SolContractType>({
  formId,
  contractType,
  onSubmitForm,
}: BuiltinSolanaDeployFormProps<TContractType>) => {
  const publishMetadata = useContractPublishMetadataFromURI(contractType);

  const deploySchema = SOL_DEPLOY_SCHEMAS[contractType];

  const form = useDeployForm<TContractType>(deploySchema);

  const { handleSubmit, getFieldState, formState, watch, register, setValue } =
    form;
  const hasSymbol = useMemo(
    () => "symbol" in deploySchema.shape,
    [deploySchema],
  );

  function isRequired<
    TFieldName extends FieldPath<z.infer<typeof deploySchema>> | string,
  >(name: TFieldName): boolean {
    return name in deploySchema.shape
      ? !deploySchema.shape[
          name as keyof typeof deploySchema.shape
        ].isOptional()
      : true;
  }

  return (
    <Flex
      id={formId}
      flexGrow={1}
      minH="full"
      gap={4}
      direction="column"
      as="form"
      onSubmit={handleSubmit((data) => onSubmitForm(data))}
    >
      <Flex direction="column">
        <Heading size="subtitle.md">Contract Metadata</Heading>
        <Text size="body.md" fontStyle="italic">
          Settings to organize and distinguish between your different contracts.
        </Text>
      </Flex>
      <Flex gap={4} direction={{ base: "column", md: "row" }}>
        <Flex flexShrink={0} flexGrow={1} maxW={{ base: "100%", md: "160px" }}>
          <FormControl
            isRequired={isRequired("image")}
            isDisabled={!publishMetadata.isSuccess}
            display="flex"
            flexDirection="column"
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            isInvalid={!!getFieldState("image", formState).error}
          >
            <FormLabel>Image</FormLabel>
            <FileInput
              accept={{ "image/*": [] }}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              value={useImageFileOrUrl(watch("image"))}
              setValue={(file) =>
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                setValue("image", file, { shouldTouch: true })
              }
              border="1px solid"
              borderColor="gray.200"
              borderRadius="md"
              transition="all 200ms ease"
            />
            <FormErrorMessage>
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-expect-error */}
              {getFieldState("image", formState).error?.message}
            </FormErrorMessage>
          </FormControl>
        </Flex>

        <Flex direction="column" gap={4} flexGrow={1} justify="space-between">
          <Flex gap={4} direction={{ base: "column", md: "row" }}>
            <FormControl
              isDisabled={!publishMetadata.isSuccess}
              isRequired={isRequired("name")}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              isInvalid={!!getFieldState("name", formState).error}
            >
              <FormLabel>Name</FormLabel>
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-expect-error */}
              <Input autoFocus variant="filled" {...register("name")} />
              <FormErrorMessage>
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/* @ts-expect-error */}
                {getFieldState("name", formState).error?.message}
              </FormErrorMessage>
            </FormControl>
            {hasSymbol && (
              <FormControl
                maxW={{ base: "100%", md: "200px" }}
                isRequired={isRequired("symbol")}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                isInvalid={!!getFieldState("symbol", formState).error}
              >
                <FormLabel>Symbol</FormLabel>
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/* @ts-expect-error */}
                <Input variant="filled" {...register("symbol")} />
                <FormErrorMessage>
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-expect-error */}
                  {getFieldState("symbol", formState).error?.message}
                </FormErrorMessage>
              </FormControl>
            )}
          </Flex>

          <FormControl
            isRequired={isRequired("description")}
            isDisabled={!publishMetadata.isSuccess}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            isInvalid={!!getFieldState("description", formState).error}
          >
            <FormLabel>Description</FormLabel>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-expect-error */}
            <Textarea variant="filled" {...register("description")} />
            <FormErrorMessage>
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-expect-error */}
              {getFieldState("description", formState).error?.message}
            </FormErrorMessage>
          </FormControl>
        </Flex>
      </Flex>

      {/* splits end */}
      <Divider mt="auto" />
      <Flex direction="column">
        <Heading size="subtitle.md">Network / Chain</Heading>
        <Text size="body.md" fontStyle="italic">
          Select a network to deploy this contract on. We recommend starting
          with a testnet.{" "}
          <TrackedLink
            href="https://portal.thirdweb.com/guides/which-network-should-you-use"
            color="primary.600"
            category="deploy"
            label="learn-networks"
            isExternal
          >
            Learn more about the different networks.
          </TrackedLink>
        </Text>
      </Flex>
    </Flex>
  );
};

export default BuiltinSolanaDeployForm;
