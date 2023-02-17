import {
  AspectRatio,
  Center,
  Flex,
  Icon,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseMutationResult } from "@tanstack/react-query";
import { useErrorHandler } from "contexts/error-handler";
import { useCallback, useState } from "react";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import { useFieldArray, useForm } from "react-hook-form";
import { BsCheck2Circle, BsFillCloudUploadFill } from "react-icons/bs";
import { CodeBlock, Text } from "tw-components";
import { z } from "zod";

const ipfsUploadDropzoneSchema = z.array(
  z.object({
    name: z.string().min(1),
    hash: z.string().min(1),
  }),
);

export interface IpfsUploadDropzoneProps {
  storageUpload: UseMutationResult<string[], unknown, any, unknown>;
}

export const IpfsUploadDropzone: React.FC<IpfsUploadDropzoneProps> = ({
  storageUpload,
}) => {
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const form = useForm({
    resolver: zodResolver(ipfsUploadDropzoneSchema),
  });

  const { fields, append } = useFieldArray({
    control: form.control,
    name: "files",
  });

  const { onError } = useErrorHandler();

  const onDrop = useCallback<
    <T extends File>(
      acceptedFiles: T[],
      fileRejections: FileRejection[],
      event: DropEvent,
    ) => void
  >(
    (droppedFiles) => {
      const handleUpload = (files: File[]) => {
        storageUpload.mutate(
          { data: files },
          {
            onSuccess: (uris) => {
              setUploadSuccess(true);
              setTimeout(() => setUploadSuccess(false), 1200);

              if (files?.length === 1) {
                append({ name: files[0].name, hash: uris[0] });
              } else if (files?.length > 1) {
                append({
                  name: `${files.length} files`,
                  hash: `${uris[0].split("/").slice(0, 3).join("/")}/`,
                });
              } else {
                onError("No files were uploaded", "Failed to upload file");
              }
            },
            onError: (error) => onError(error, "Failed to upload file"),
          },
        );
      };

      if (droppedFiles) {
        handleUpload(droppedFiles);
      }
    },
    [append, onError, storageUpload],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <Flex flexDir="column" gap={4}>
      <AspectRatio ratio={{ base: 20 / 9, md: 40 / 9 }} w="100%">
        <Center
          {...getRootProps()}
          cursor="pointer"
          bg="transparent"
          _hover={{
            borderColor: "primary.500",
          }}
          border="2px solid"
          borderColor="borderColor"
          borderRadius="xl"
        >
          <input {...getInputProps()} />
          <VStack p={6}>
            {storageUpload.isLoading ? (
              <Flex flexDir="column" gap={6} alignItems="center">
                <Text size="label.lg">Upload in progress...</Text>
                <Spinner size="xl" color="blue.500" />
              </Flex>
            ) : uploadSuccess ? (
              <Flex flexDir="column" gap={6} alignItems="center">
                <Text size="label.lg">Upload successful</Text>
                <Icon as={BsCheck2Circle} boxSize={12} color="green.500" />
              </Flex>
            ) : isDragActive ? (
              <>
                <Icon
                  as={BsFillCloudUploadFill}
                  boxSize={8}
                  mb={2}
                  color="gray.600"
                />
                <Text size="label.lg">Drop the files here</Text>
              </>
            ) : (
              <>
                <Icon
                  as={BsFillCloudUploadFill}
                  boxSize={8}
                  mb={2}
                  color="gray.600"
                />
                <Text size="label.lg" textAlign="center" lineHeight="150%">
                  Drag and drop your file or folder here to upload it to IPFS
                </Text>
              </>
            )}
          </VStack>
        </Center>
      </AspectRatio>
      <Flex flexDir="column" gap={3}>
        {fields.map((field, index) => (
          <Flex
            key={field.id}
            gap={4}
            justifyContent="center"
            alignItems="center"
          >
            <Flex w="20%">
              <Text noOfLines={1}>{form.watch(`files.${index}.name`)} </Text>
            </Flex>
            <CodeBlock
              code={JSON.stringify(
                `${form.watch(`files.${index}.hash`)}`,
                null,
                2,
              )}
              language="bash"
            />
            <Text>o</Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};
