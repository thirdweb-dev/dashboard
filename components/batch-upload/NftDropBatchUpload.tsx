import {
  useDropBatchMint,
  useDropDelayedRevealBatchMint,
  useHasDelayedReveal,
} from "@3rdweb-sdk/react/hooks/useDrop";
import { DropModule } from "@3rdweb/sdk";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Container,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Radio,
  Stack,
  Text,
  Textarea,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { FileInput } from "components/shared/FileInput";
import { useImageFileOrUrl } from "hooks/useImageFileOrUrl";
import Papa from "papaparse";
import {
  MouseEventHandler,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { IoChevronBack } from "react-icons/io5";
import {
  DelayedRevealInput,
  DelayedRevealSchema,
  DropTokenInput,
} from "schema/tokens";
import { zodResolver } from "schema/zodResolver";
import { parseErrorToMessage } from "utils/errorParser";
import { BatchTable } from "./BatchTable";
import { UploadStep } from "./UploadStep";

interface NftDropBatchUploadProps {
  module?: DropModule;
  isOpen: boolean;
  onClose: () => void;
}

function removeEmptyKeysFromObject(obj: any) {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === "" || obj[key] === null || obj[key] === undefined) {
      delete obj[key];
    }
  });
  return obj;
}

interface CSVData extends Record<string, string | undefined> {
  name: string;
  description?: string;
  external_url?: string;
  background_color?: string;
  youtube_url?: string;
}

export const NftDropBatchUpload: React.FC<NftDropBatchUploadProps> = ({
  module,
  isOpen,
  onClose,
}) => {
  const { nextStep, prevStep, setStep, activeStep } = useSteps({
    initialStep: 0,
  });
  const [csvData, setCSVData] = useState<Papa.ParseResult<CSVData>>();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const [noCsv, setNoCsv] = useState(false);

  const reset = useCallback(() => {
    setCSVData(undefined);
    setImageFiles([]);
    setVideoFiles([]);
    setNoCsv(false);
  }, []);

  const _onClose = useCallback(() => {
    reset();
    setStep(0);
    onClose();
  }, [onClose, setStep, reset]);

  const onDrop = useCallback<Required<DropzoneOptions>["onDrop"]>(
    (acceptedFiles) => {
      setNoCsv(false);

      const csvMimeTypes = [
        "text/csv",
        "text/plain",
        "text/x-csv",
        "application/vnd.ms-excel",
        "application/csv",
        "application/x-csv",
        "text/comma-separated-values",
        "text/x-comma-separated-values",
        "text/tab-separated-values",
      ];

      const csv = acceptedFiles.find(
        (f) => csvMimeTypes.includes(f.type) || f.name.endsWith(".csv"),
      );
      const images = acceptedFiles
        .filter((f) => f.type.includes("image/"))
        // sort in ascending order
        .sort((a, b) => parseInt(a.name) - parseInt(b.name));
      const videos = acceptedFiles
        .filter((f) => f.type.includes("video/"))
        // sort in ascending order
        .sort((a, b) => parseInt(a.name) - parseInt(b.name));
      if (!csv) {
        console.error("No CSV file found");
        setNoCsv(true);
        return;
      }

      Papa.parse<CSVData>(csv, {
        header: true,
        complete: (results) => {
          const validResults: Papa.ParseResult<CSVData> = {
            ...results,
            data: [],
          };
          for (let i = 0; i < results.data.length; i++) {
            if (!results.errors.find((e) => e.row === i)) {
              if (
                results.data[i].name ||
                results.data[i].Name ||
                results.data[i].NAME
              ) {
                validResults.data.push(results.data[i]);
              }
            }
          }
          setCSVData(validResults);
        },
      });

      setImageFiles(images);
      setVideoFiles(videos);
    },
    [],
  );

  const mergedData = useMemo(() => {
    if (!csvData?.data) {
      return [];
    }

    return csvData.data.map((row, index) => {
      const {
        name,
        Name,
        NAME,
        description,
        image,
        animation_url,
        external_url,
        background_color,
        youtube_url,
        ...properties
      } = row;

      return removeEmptyKeysFromObject({
        name: name || Name || NAME,
        description,
        external_url,
        background_color,
        youtube_url,
        properties: removeEmptyKeysFromObject(properties),
        image: imageFiles[index] || image || undefined,
        animation_url: videoFiles[index] || animation_url || undefined,
      });
    });
  }, [csvData, imageFiles, videoFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const paginationPortalRef = useRef<HTMLDivElement>(null);
  return (
    <Drawer
      allowPinchZoom
      preserveScrollBarGap
      size="full"
      onClose={_onClose}
      isOpen={isOpen}
    >
      <DrawerOverlay />
      <DrawerContent bg="gray.50" overflowY="scroll">
        <Container maxW="container.page" bg="white" borderRadius="2xl" my={12}>
          <Flex flexDir="column" width="100%" p={4}>
            <Steps activeStep={activeStep}>
              <Step hidden>
                <Flex
                  align="center"
                  justify="space-between"
                  py={4}
                  w="100%"
                  mb={2}
                >
                  <Heading size="title.md">Upload your NFTs</Heading>
                  <DrawerCloseButton position="relative" right={0} top={0} />
                </Flex>
                <Flex direction="column" gap={6} h="100%">
                  {csvData ? (
                    <BatchTable
                      portalRef={paginationPortalRef}
                      data={mergedData}
                      fields={csvData?.meta.fields || []}
                    />
                  ) : (
                    <UploadStep
                      getRootProps={getRootProps}
                      getInputProps={getInputProps}
                      noCsv={noCsv}
                      isDragActive={isDragActive}
                    />
                  )}
                  <Flex borderTop="1px solid" borderTopColor="gray.200">
                    <Container maxW="container.page">
                      <Flex align="center" justify="space-between" p={4}>
                        <Box ref={paginationPortalRef} />
                        <Flex gap={2} align="center">
                          <Button
                            size="md"
                            isDisabled={!csvData}
                            colorScheme="gray"
                            onClick={() => {
                              reset();
                            }}
                          >
                            Reset
                          </Button>
                          <Button
                            size="lg"
                            colorScheme="blue"
                            isDisabled={!csvData}
                            onClick={nextStep}
                          >
                            Next
                          </Button>
                        </Flex>
                      </Flex>
                    </Container>
                  </Flex>
                </Flex>
              </Step>
              <Step hidden>
                <Flex
                  align="center"
                  justify="space-between"
                  py={4}
                  w="100%"
                  mb={2}
                >
                  <HStack>
                    <Icon
                      boxSize={5}
                      as={IoChevronBack}
                      color="gray.600"
                      onClick={prevStep}
                      cursor="pointer"
                    />
                    <Heading size="title.md">
                      When will you reveal your NFTs?
                    </Heading>
                  </HStack>
                  <DrawerCloseButton position="relative" right={0} top={0} />
                </Flex>
                <SelectReveal
                  module={module}
                  mergedData={mergedData}
                  onClose={_onClose}
                />
              </Step>
            </Steps>
          </Flex>
        </Container>
      </DrawerContent>
    </Drawer>
  );
};

interface SelectRevealOptionProps {
  name: string;
  description: string;
  isActive: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
  disabled?: boolean;
}

const SelectRevealOption: React.FC<SelectRevealOptionProps> = ({
  name,
  description,
  isActive,
  onClick,
  disabled,
}) => {
  return (
    <Tooltip
      label={disabled && "To use this feature please deploy a new NFT drop"}
    >
      <Stack
        padding={5}
        width="350px"
        borderRadius="md"
        outline={isActive ? "3px solid" : "1px solid"}
        outlineColor={isActive ? "primary.500" : "#EAEAEA"}
        onClick={disabled ? () => null : onClick}
        cursor={disabled ? "default" : "pointer"}
        background="white"
        _hover={{
          outlineColor: isActive ? "primary.500" : "#EAEAEA",
        }}
      >
        <Stack flexDirection="row" alignItems="start" spacing={0}>
          <Radio
            cursor={disabled ? "default" : "pointer"}
            size="lg"
            colorScheme="blue"
            mt={0.5}
            mr={2.5}
            isChecked={isActive}
          />
          <Stack ml={4} flexDirection="column" alignSelf="start">
            <Heading
              size="subtitle.sm"
              fontWeight="700"
              mb={0}
              color={disabled ? "gray.500" : "inherit"}
            >
              {name}
            </Heading>
            <Text size="body.sm" color="gray.600" mt="4px">
              {description}
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </Tooltip>
  );
};

interface SelectRevealProps {
  module?: DropModule;
  mergedData: DropTokenInput[];
  onClose: () => void;
}

const SelectReveal: React.FC<SelectRevealProps> = ({
  module,
  mergedData,
  onClose,
}) => {
  const [selectedReveal, setSelectedReveal] = useState<
    "unselected" | "instant" | "delayed"
  >("unselected");
  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DelayedRevealInput>({
    resolver: zodResolver(DelayedRevealSchema),
  });

  const imageUrl = useImageFileOrUrl(watch("image"));

  const mintBatch = useDropBatchMint(module);
  const mintDelayedRevealBatch = useDropDelayedRevealBatchMint(module);

  const hasDelayedReveal = useHasDelayedReveal(module?.address);

  const toast = useToast();

  const onSuccess = (): void => {
    toast({
      title: "Success",
      description: "Batch uploaded successfully",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    onClose();
  };

  const onSubmit = (data: DelayedRevealInput) => {
    mintDelayedRevealBatch.mutate(
      {
        placeholder: {
          name: data.name,
          description: data.description,
          image: data.image,
        },
        tokens: mergedData,
        password: data.password,
      },
      {
        onSuccess,
        onError: (error) => {
          toast({
            title: "Error creating batch upload",
            description: parseErrorToMessage(error),
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        },
      },
    );
  };

  return (
    <Flex flexDir="column">
      <HStack spacing={6} mb={6}>
        <SelectRevealOption
          name="Reveal upon mint"
          description="Collectors will inmediately see the final NFT when they complete the minting"
          isActive={selectedReveal === "instant"}
          onClick={() => setSelectedReveal("instant")}
        />
        <SelectRevealOption
          name="Delayed Reveal"
          description="Collectors will mint your placeholder image, then you reveal at a later time"
          isActive={selectedReveal === "delayed"}
          onClick={() => setSelectedReveal("delayed")}
          disabled={!hasDelayedReveal.data}
        />
      </HStack>
      <Flex>
        {selectedReveal === "instant" ? (
          <Flex flexDir="column">
            <Text size="body.md" color="gray.600">
              You&apos;re ready to go! Now you can upload the files, we will be
              uploading each file to IPFS so it might take a while.
            </Text>
            <Button
              mt={4}
              size="lg"
              colorScheme="blue"
              isLoading={mintBatch.isLoading}
              isDisabled={!mergedData.length}
              onClick={() => {
                mintBatch.mutate(mergedData, {
                  onSuccess: onClose,
                });
              }}
            >
              Upload {mergedData.length} NFTs
            </Button>
          </Flex>
        ) : selectedReveal === "delayed" ? (
          <Stack spacing={6} as="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <Heading size="title.sm">Let&apos;s set a password</Heading>
              <Alert status="warning" borderRadius="lg">
                <AlertIcon />
                You&apos;ll need this password to reveal your NFTs. Please save
                it somewhere safe.
              </Alert>
              <Flex>
                <FormControl isRequired isInvalid={!!errors.password} mr={4}>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      {...register("password")}
                      placeholder="Choose password"
                      type={show ? "text" : "password"}
                    />
                    <InputRightElement
                      cursor="pointer"
                      children={
                        <Icon
                          as={show ? AiFillEye : AiFillEyeInvisible}
                          onClick={() => setShow(!show)}
                        />
                      }
                    />
                  </InputGroup>

                  <FormErrorMessage>
                    {errors?.password?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={!!errors.confirmPassword}>
                  <FormLabel>Confirm password</FormLabel>
                  <Input
                    {...register("confirmPassword")}
                    placeholder="Confirm password"
                    type="password"
                  />
                  <FormErrorMessage>
                    {errors?.confirmPassword?.message}
                  </FormErrorMessage>
                </FormControl>
              </Flex>
            </Stack>
            <Stack spacing={5}>
              <Heading size="title.sm">Placeholder</Heading>
              <FormControl isInvalid={!!errors.image}>
                <FormLabel>Image</FormLabel>
                <FileInput
                  accept="image/*"
                  value={imageUrl}
                  showUploadButton
                  setValue={(file) => setValue("image", file)}
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius="md"
                  transition="all 200ms ease"
                  _hover={{ shadow: "sm" }}
                />
                <FormHelperText>
                  You can optionally upload an image as the placeholder.
                </FormHelperText>
                <FormErrorMessage>{errors?.image?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isRequired isInvalid={!!errors.name}>
                <FormLabel>Name</FormLabel>
                <Input
                  {...register("name")}
                  placeholder="eg. My NFT (Coming soon)"
                />
                <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.description}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  {...register("description")}
                  placeholder="eg. Reveal on July 15th!"
                />
                <FormErrorMessage>
                  {errors?.description?.message}
                </FormErrorMessage>
              </FormControl>
              <Button
                mt={4}
                size="lg"
                colorScheme="blue"
                type="submit"
                isLoading={mintDelayedRevealBatch.isLoading}
                isDisabled={!mergedData.length}
              >
                Upload {mergedData.length} NFTs
              </Button>
            </Stack>
          </Stack>
        ) : null}
      </Flex>
    </Flex>
  );
};
