import {
  useIsAdmin,
  useModuleMetadata,
  useModuleMetadataMutation,
  useModuleTypeOfModule,
} from "@3rdweb-sdk/react";
import { Module, ModuleType } from "@3rdweb/sdk";
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { FileInput } from "components/shared/FileInput";
import { useImageFileOrUrl } from "hooks/useImageFileOrUrl";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { parseErrorToMessage } from "utils/errorParser";
import { ModuleSetting } from "./ModuleSetting";

interface IModuleMetadata {
  module?: Module;
}

interface NewMetadata {
  name: string;
  image?: File | string;
  description?: string;
}

export const ModuleMetadata: React.FC<IModuleMetadata> = ({ module }) => {
  const toast = useToast();
  const isAdmin = useIsAdmin(module);
  const moduleType = useModuleTypeOfModule(module);
  const { data: metadata, isLoading } = useModuleMetadata(module);
  const { mutate: update, isLoading: isSaving } =
    useModuleMetadataMutation(module);
  const {
    setValue,
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<NewMetadata>();

  const imageUrl = useImageFileOrUrl(watch("image"));
  const isDisabled =
    !watch("name") ||
    (watch("name") === metadata?.metadata?.name &&
      watch("description") === metadata?.metadata?.description &&
      watch("image") === metadata?.metadata?.image);

  useEffect(() => {
    if (metadata) {
      setValue("image", metadata.metadata?.image);
      setValue("name", metadata.metadata?.name || "");
      setValue("description", metadata.metadata?.description || "");
    }
  }, [metadata, setValue]);

  const updateMetadata = (data: NewMetadata) => {
    update(data, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Succesfully updated metadata",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      },
      onError: (error) => {
        toast({
          title: "Error updating metadata",
          description: parseErrorToMessage(error),
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      },
    });
  };

  return (
    <ModuleSetting
      heading="Module Metadata"
      description="Update your modules name, description, and image."
      isLoading={isLoading}
      canSave={isAdmin}
      isSaving={isSaving}
      isDisabled={isDisabled}
      onSave={handleSubmit(updateMetadata)}
    >
      <Flex mt="24px">
        <Stack flexShrink={1}>
          <FormControl
            isInvalid={!!errors.image}
            isDisabled={moduleType === ModuleType.VOTE}
          >
            <Heading as={FormLabel} size="label.md">
              Image
            </Heading>
            <FileInput
              isDisabled={moduleType === ModuleType.VOTE}
              accept="image/*"
              value={imageUrl}
              setValue={(file) => setValue("image", file)}
              border="1px solid"
              borderColor="gray.200"
              borderRadius="md"
              transition="all 200ms ease"
              _hover={{ shadow: "sm" }}
            />
            <FormErrorMessage>{errors?.image?.message}</FormErrorMessage>
          </FormControl>
        </Stack>

        <Stack spacing={4} flexGrow={1} width="100%">
          <FormControl
            isRequired
            isInvalid={!!errors.name}
            isDisabled={moduleType === ModuleType.VOTE}
          >
            <Heading as={FormLabel} size="label.md">
              Name
            </Heading>
            <Input {...register("name")} />
            <FormErrorMessage>
              {(errors?.name as any)?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={!!errors.name}
            isDisabled={moduleType === ModuleType.VOTE}
          >
            <Heading as={FormLabel} size="label.md">
              Description
            </Heading>
            <Textarea {...register("description")} />
            <FormErrorMessage>
              {(errors?.description as any)?.message}
            </FormErrorMessage>
          </FormControl>
        </Stack>
      </Flex>
    </ModuleSetting>
  );
};
