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
import { useAddress } from "@thirdweb-dev/react";
import { useErrorHandler } from "contexts/error-handler";
import { replaceIpfsUrl } from "lib/sdk";
import { useCallback, useState } from "react";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import { useFieldArray, useForm } from "react-hook-form";
import { BsCheck2Circle, BsFillCloudUploadFill } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";
import {
  Card,
  Link,
  Text,
  TrackedCopyButton,
  TrackedIconButton,
} from "tw-components";
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
  const address = useAddress();
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
          bg="transparent"
          _hover={{
            borderColor: "primary.500",
          }}
          border="2px solid"
          borderColor="borderColor"
          borderRadius="xl"
          pointerEvents={address ? "auto" : "none"}
          cursor={address ? "pointer" : "not-allowed"}
        >
          <input {...getInputProps()} />
          <VStack p={6}>
            {!address ? (
              <Flex flexDir="column" gap={6} alignItems="center">
                <Text size="label.lg" color="gray.700">
                  You need to connect your wallet to start uploading
                </Text>
              </Flex>
            ) : storageUpload.isLoading ? (
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
      <Flex flexDir="column" gap={{ base: 6, md: 3 }}>
        {fields.map((field, index) => (
          <Flex
            key={field.id}
            gap={{ base: 2, md: 4 }}
            alignItems={{ base: "flex-start", md: "center" }}
            flexDir={{ base: "column", md: "row" }}
          >
            <Flex
              w={{ base: "inherit", md: "25%" }}
              minW={{ base: "inherit", md: "25%" }}
            >
              <Text noOfLines={1} size="body.lg">
                {form.watch(`files.${index}.name`)}{" "}
              </Text>
            </Flex>
            <Card
              as={Flex}
              w="full"
              alignItems="center"
              py={2}
              justifyContent="space-between"
            >
              <Text
                fontFamily="mono"
                overflow={{ base: "scroll", md: "inherit" }}
              >
                {`${form
                  .watch(`files.${index}.hash`)
                  .split("/")
                  .slice(0, 3)
                  .join("/")}/...`}
              </Text>
              <Flex>
                <TrackedCopyButton
                  value={form.watch(`files.${index}.hash`)}
                  category="storage"
                  label="copy-ipfs-hash"
                  aria-label="Copy IPFS hash"
                />
                <TrackedIconButton
                  as={Link}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  isExternal
                  href={replaceIpfsUrl(form.watch(`files.${index}.hash`))}
                  category="storage"
                  label="open-in-gateway"
                  borderRadius="md"
                  variant="ghost"
                  colorScheme="whiteAlpha"
                  size="sm"
                  aria-label="Open in gateway"
                  icon={<Icon as={FiExternalLink} />}
                />
              </Flex>
            </Card>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};
